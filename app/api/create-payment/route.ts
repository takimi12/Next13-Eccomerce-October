import Stripe from "stripe";
import  prisma  from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import { CartProduct } from "@/app/product/[productId]/ProductDetails";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

const calculateOrderAmount = (items: CartProduct[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);
  return totalPrice;
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
    currency: "usd",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentID: payment_intent_id,
    products: items,
  };


  if(payment_intent_id){
    // update the order
  } else {
    // create a new order
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "pln",
        automatic_payment_methods: {enabled: true},
        });

        // create the order
  }
}