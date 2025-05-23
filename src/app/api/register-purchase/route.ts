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
  const { ebook_id, customer_email, amount, status } = await req.json();

  if (!ebook_id || !customer_email || !amount || !status) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Registrar la compra
  const { error } = await supabase.from("purchases").insert([
    {
      ebook_id,
      customer_email,
      amount,
      status,
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Buscar todos los ebooks comprados por este usuario
  const { data: purchases, error: purchasesError } = await supabase
    .from("purchases")
    .select("ebook_id")
    .eq("customer_email", customer_email)
    .eq("status", "completed");

  if (purchasesError) {
    return NextResponse.json({ error: purchasesError.message }, { status: 500 });
  }

  const ebookIds = (purchases as PurchaseItem[]).map((p) => p.ebook_id);

  // Obtener los datos de los ebooks
  const { data: ebooks, error: ebooksError } = await supabase
    .from("ebooks")
    .select("title, cover_url, id")
    .in("id", ebookIds);

  if (ebooksError) {
    return NextResponse.json({ error: ebooksError.message }, { status: 500 });
  }

  // Construir los enlaces de descarga (ajusta la lógica según tu sistema de descargas)
  const ebooksWithLinks = (ebooks as EbookItemForEmail[]).map((ebook) => ({
    title: ebook.title,
    download_url: `https://cursumi.com/download/${ebook.id}`,
  }));

  // Enviar el email de compra exitosa
  await sendPurchaseEmail(customer_email, ebooksWithLinks);

  return NextResponse.json({ success: true });
} 