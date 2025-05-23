import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendPurchaseEmail } from "@/lib/sendPurchaseEmail";

// Puedes definir interfaces más específicas si solo necesitas ciertos campos
interface PurchaseItem {
  ebook_id: string;
}

interface EbookItemForEmail {
  id: string;
  title: string;
  cover_url?: string | null;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { ebook_id, customer_email, amount, status } = await req.json();

    if (!ebook_id || !customer_email || !amount || !status) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    console.log("Registrando compra para:", { ebook_id, customer_email, amount, status });

    // Registrar la compra
    const { error } = await supabase.from("purchases").insert([
      {
        ebook_id,
        customer_email,
        amount,
        status,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
    ]);

    if (error) {
      console.error("Error al registrar la compra:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Compra registrada exitosamente");

    // Buscar todos los ebooks comprados por este usuario
    const { data: purchases, error: purchasesError } = await supabase
      .from("purchases")
      .select("ebook_id")
      .eq("customer_email", customer_email)
      .eq("status", "completed");

    if (purchasesError) {
      console.error("Error al buscar compras:", purchasesError);
      return NextResponse.json({ error: purchasesError.message }, { status: 500 });
    }

    console.log("Compras encontradas:", purchases);

    const ebookIds = (purchases as PurchaseItem[]).map((p) => p.ebook_id);

    // Obtener los datos de los ebooks
    const { data: ebooks, error: ebooksError } = await supabase
      .from("ebooks")
      .select("title, cover_url, id")
      .in("id", ebookIds);

    if (ebooksError) {
      console.error("Error al obtener ebooks:", ebooksError);
      return NextResponse.json({ error: ebooksError.message }, { status: 500 });
    }

    console.log("Ebooks encontrados:", ebooks);

    // Construir los enlaces de descarga
    const ebooksWithLinks = (ebooks as EbookItemForEmail[]).map((ebook) => ({
      title: ebook.title,
      download_url: `${process.env.NEXT_PUBLIC_APP_URL}/download/${ebook.id}`,
    }));

    console.log("Enviando email a:", customer_email);
    console.log("Contenido del email:", ebooksWithLinks);

    try {
      // Enviar el email de compra exitosa
      const emailResult = await sendPurchaseEmail(customer_email, ebooksWithLinks);
      console.log("Resultado del envío de email:", emailResult);
    } catch (emailError) {
      console.error("Error al enviar el email:", emailError);
      // No retornamos error aquí para no interrumpir el flujo de la compra
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error general en register-purchase:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 }
    );
  }
} 