import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { sendPurchaseEmail } from "@/lib/sendPurchaseEmail";

// Puedes definir interfaces más específicas si solo necesitas ciertos campos
interface EbookForCheckout {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  cover_url?: string | null;
}

// interface PurchaseItem { // Eliminamos PurchaseItem ya que no se usa
//   ebook_id: string;
// }

interface EbookItemForEmail {
  id: string;
  title: string;
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
    const line_items = cartItems.map((item: EbookForCheckout) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          description: item.description,
          images: item.cover_url ? [item.cover_url] : [],
        },
        unit_amount: Math.round(item.price * 100), // Precio en centavos
      },
      quantity: 1,
    }));

    console.log("API: Creando sesión de Stripe con line_items:", line_items);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/thank-you?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart?canceled=true`,
      customer_email,
      metadata: {
        ebook_ids: JSON.stringify(cartItems.map((item: EbookForCheckout) => item.id)),
        customer_email: customer_email,
      },
    });

    console.log("API: Sesión de Stripe creada exitosamente. URL:", session.url);

    // --- Inicio de la lógica de registro en Supabase y envío de correo --- //
    // Nota: Idealmente, el registro de la compra y el envío del email deberían manejarse con Stripe webhooks
    // para garantizar que solo se ejecuten después de un pago exitoso. Sin embargo, para depuración y
    // un flujo más simple inicial, lo incluiremos aquí de forma básica.

    // Registrar la compra en Supabase (Estado inicial: pendiente o completado si usas 'payment_intent.succeeded' webhook)
    // Para este ejemplo simple, lo registramos como completado aquí. En un entorno real, usa webhooks.
    const purchaseData = cartItems.map((item: EbookForCheckout) => ({
        ebook_id: item.id,
        customer_email: customer_email,
        amount: item.price,
        status: "completed", // Cambiar a 'pending' y actualizar con webhook de Stripe
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }));
    
    console.log("API: Intentando registrar compra en Supabase:", purchaseData);

    const { error: insertError, data: insertedPurchases } = await supabase
      .from("purchases")
      .insert(purchaseData);

    if (insertError) {
      console.error("API: Error al registrar la compra en Supabase:", insertError);
      // Considerar qué hacer si falla el registro en Supabase después de crear la sesión de Stripe
      // Por ahora, continuamos para no bloquear el checkout, pero esto podría necesitar manejo manual.
    } else {
        console.log("API: Compra(s) registrada(s) exitosamente en Supabase:", insertedPurchases);

        // --- Envío del correo --- //
        console.log("API: Buscando ebooks comprados para enviar email...");
        const ebookIds = purchaseData.map((p: { ebook_id: string }) => p.ebook_id);
        const { data: ebooks, error: ebooksError } = await supabase
            .from("ebooks")
            .select("title, cover_url, id") // Asegúrate de seleccionar 'id' para la URL
            .in("id", ebookIds);

        if (ebooksError) {
            console.error("API: Error al obtener datos de ebooks para el email:", ebooksError);
        } else if (ebooks && ebooks.length > 0) {
            console.log("API: Ebooks encontrados para el email:", ebooks);
            const ebooksWithLinks = (ebooks as EbookItemForEmail[]).map((ebook) => ({
                title: ebook.title,
                download_url: `${process.env.NEXT_PUBLIC_APP_URL}/download/${ebook.id}`,
            }));

            console.log("API: Enviando email de compra a:", customer_email, "con enlaces:", ebooksWithLinks);
            try {
                const emailResult = await sendPurchaseEmail(customer_email, ebooksWithLinks);
                console.log("API: Resultado del envío de email:", emailResult);
            } catch (emailError) {
                console.error("API: Error al enviar el email de compra:", emailError);
                // El envío de email falló, pero la compra ya fue registrada. Decide si quieres notificar al usuario.
            }
        } else {
            console.log("API: No se encontraron datos de ebooks para enviar el email.");
        }
    }
    // --- Fin de la lógica de registro en Supabase y envío de correo --- //

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error("API: Error general en /api/create-checkout-session:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error occurred" },
      { status: 500 }
    );
  }
} 