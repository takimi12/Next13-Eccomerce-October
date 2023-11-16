import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser)  return NextResponse.error();

  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
    }
  

  const id = params.id;

  const product = await prisma.product.delete({
    where: { id: id },
  });

  return NextResponse.json(product);
}
