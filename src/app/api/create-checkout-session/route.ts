import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Elimina apiVersion para usar la versión por defecto del SDK
});

export async function POST(req: NextRequest) {
  const { cart, email } = await req.json();

  if (!cart || !email) {
    return NextResponse.json({ error: "Missing cart or email" }, { status: 400 });
  }

  try {
    const line_items = cart.map((ebook: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: ebook.title,
          description: ebook.description,
        },
        unit_amount: Math.round(Number(ebook.price) * 100),
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      metadata: {
        ebooks: cart.map((e: any) => e.id).join(","),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 