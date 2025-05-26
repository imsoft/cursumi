import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Puedes definir interfaces más específicas si solo necesitas ciertos campos
interface EbookForCheckout {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  cover_url?: string | null;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    console.log("API: Recibida solicitud de checkout");
    const { cart: cartItems, email: customer_email } = await req.json();

    if (!cartItems || cartItems.length === 0 || !customer_email) {
      console.error("API: Faltan datos en la solicitud de checkout");
      return NextResponse.json({ error: "Missing cart items or email" }, { status: 400 });
    }

    console.log("API: Datos recibidos - Email:", customer_email, "Items en carrito:", cartItems.length);

    // Crear una sesión de pago con Stripe
    const line_items = cartItems.map((item: EbookForCheckout) => {
      const price = item.price;
      const tax = price * 0.16; // 16% IVA
      const totalWithTax = price + tax;
      
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            description: item.description,
            images: item.cover_url ? [item.cover_url] : [],
          },
          unit_amount: Math.round(totalWithTax * 100), // Precio en centavos incluyendo impuestos
        },
        quantity: 1,
      };
    });

    console.log("API: Creando sesión de Stripe con line_items:", line_items);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/thank-you?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart?canceled=true`,
      customer_email,
      locale: "auto",
      metadata: {
        ebook_ids: JSON.stringify(cartItems.map((item: EbookForCheckout) => item.id)),
        customer_email: customer_email,
      }
    });

    console.log("API: Sesión de Stripe creada exitosamente. URL:", session.url);

    // Registrar la compra en Supabase con estado pendiente
    const purchaseData = cartItems.map((item: EbookForCheckout) => ({
        ebook_id: item.id,
        customer_email: customer_email,
        amount: item.price,
        status: "pending", // Cambiado a pending
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }));
    
    console.log("API: Intentando registrar compra en Supabase:", purchaseData);

    const { error: insertError } = await supabase
      .from("purchases")
      .insert(purchaseData);

    if (insertError) {
      console.error("API: Error al registrar la compra en Supabase:", insertError);
    } else {
      console.log("API: Compra(s) registrada(s) exitosamente en Supabase con estado pendiente");
    }

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error("API: Error general en /api/create-checkout-session:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error occurred" },
      { status: 500 }
    );
  }
} 