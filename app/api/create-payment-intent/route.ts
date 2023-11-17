import Stripe from "stripe";
import { NextResponse } from "next/server";
import  prisma  from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});



const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);

const price:any  = Math.floor(totalPrice);

return price;
};


export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: " Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;
  const total = calculateOrderAmount(items) * 100;

  const orderData = {
    user: { connect: { id: currentUser?.id } },
    amount: total,
    currency: "pln",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentID: payment_intent_id,
    products: items,
  };


  if(payment_intent_id){
    const current_intent = await stripe.paymentIntents.retrieve(
        payment_intent_id);

    if(current_intent) {
        const updated_intent = await stripe.paymentIntents.update(
            payment_intent_id, 
            {amount: total}
        );

        const [existing_order, updated_order] = await Promise.all([
            prisma.order.findFirst({
              where: { paymentIntentID: payment_intent_id },
              // include: { products: true },
            }),
            prisma.order.update({
              where: { paymentIntentID: payment_intent_id },
              data: {
                amount: total,
                products: items,
              },
            }),
          ]);
          if (!existing_order) {
            return NextResponse.json(
              { error: "Invalid Payment Intent" },
              { status: 400 }
            );
          }
          return NextResponse.json({ paymentIntent: updated_intent });
        }
    
  } else {
    // create a new order
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "pln",
        automatic_payment_methods: {enabled: true},
        });

        // create the order
        orderData.paymentIntentID = paymentIntent.id;

        await prisma.order.create({
            data: orderData,
        });

        return NextResponse.json({paymentIntent});
  }
}

