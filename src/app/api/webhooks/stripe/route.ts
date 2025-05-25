import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { sendPurchaseEmail } from "@/lib/sendPurchaseEmail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Obtener los datos de la sesión
      const customerEmail = session.customer_email;
      const ebookIds = JSON.parse(session.metadata?.ebook_ids || "[]");

      if (!customerEmail || !ebookIds.length) {
        throw new Error("Missing customer email or ebook IDs");
      }

      // Actualizar el estado de las compras a completed
      const { error: updateError } = await supabase
        .from("purchases")
        .update({ status: "completed", updated_at: new Date().toISOString() })
        .eq("customer_email", customerEmail)
        .eq("status", "pending");

      if (updateError) {
        console.error("Error updating purchase status:", updateError);
        throw updateError;
      }

      // Obtener los datos de los ebooks para el email
      const { data: ebooks, error: ebooksError } = await supabase
        .from("ebooks")
        .select("title, cover_url, id")
        .in("id", ebookIds);

      if (ebooksError) {
        console.error("Error fetching ebooks:", ebooksError);
        throw ebooksError;
      }

      // Enviar el email con los enlaces de descarga
      const ebooksWithLinks = ebooks.map((ebook) => ({
        title: ebook.title,
        download_url: `${process.env.NEXT_PUBLIC_APP_URL}/download/${ebook.id}`,
      }));

      await sendPurchaseEmail(customerEmail, ebooksWithLinks);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook error" },
      { status: 400 }
    );
  }
} 