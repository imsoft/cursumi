import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

// Asegúrate de que estas variables de entorno estén configuradas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Eliminamos supabaseAnonKey
// NECESITAS CONFIGURAR ESTA VARIABLE DE ENTORNO CON TU CLAVE DE ROL DE SERVICIO DE SUPABASE
// Esta clave tiene permisos elevados y debe mantenerse SIEMPRE EN EL SERVIDOR.
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Ojo: Puede ser undefined si no está configurada

// Usamos la clave de rol de servicio en el servidor. 
// Si SUPABASE_SERVICE_ROLE_KEY no está configurada, la creación del cliente fallará o tendrás problemas de permisos.
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey as string); 

export async function GET(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
) {
  const { id } = params;


  if (!id) {
    return notFound();
  }

  // --- Lógica de verificación de compra (PENDIENTE) ---
  // En un sistema real, aquí verificarías si el usuario autenticado ha comprado este ebook.
  // Si no ha comprado, deberías retornar un error 403 Forbidden o redirigir a la página de compra.
  // Por ahora, la descarga se permitirá si el ebook existe.
  console.log(`Intentando descargar ebook con ID: ${id}`);

  // --- Verificación de la clave de rol de servicio ---
  if (!supabaseServiceRoleKey) {
    console.error("Error de configuración: SUPABASE_SERVICE_ROLE_KEY no está configurada.");
    return NextResponse.json({ error: "Error interno del servidor (clave de servicio no configurada)" }, { status: 500 });
  }

  try {
    // 1. Obtener la ruta del archivo del ebook desde la base de datos
    const { data: ebook, error: ebookError } = await supabase
      .from('ebooks')
      .select('file_url') // Asegúrate de que 'file_url' es el nombre correcto de tu columna en la tabla 'ebooks'
      .eq('id', id)
      .single();

    if (ebookError || !ebook || !ebook.file_url) {
      console.error('Error fetching ebook or file_url:', ebookError?.message);
      // Podrías redirigir a una página de error o mostrar un mensaje
      return notFound();
    }

    // 2. Generar una URL firmada para el archivo en Supabase Storage
    // Según tu información, tu bucket se llama 'ebooks'
    const bucketName = 'ebooks'; // Nombre correcto de tu bucket en Supabase Storage
    
    // Extraer la ruta del archivo dentro del bucket
    // Si la ruta en la DB es '/ebooks/ruta/al/archivo.pdf', queremos 'ruta/al/archivo.pdf'
    const filePathFull = ebook.file_url;
    const pathSegments = filePathFull.split('/');
    // Eliminar el primer segmento si está vacío (ruta absoluta como /bucket/file) y el nombre del bucket
    const filePath = pathSegments.filter((segment: string) => segment !== '' && segment !== bucketName).join('/');

    if (!filePath) {
        console.error('Error: La ruta del archivo dentro del bucket está vacía.');
        return NextResponse.json({ error: 'Ruta de archivo no válida' }, { status: 500 });
    }

    console.log(`Generando URL firmada para bucket: ${bucketName}, archivo: ${filePath}`);

    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(filePath, 60); // URL válida por 60 segundos (ajusta según necesites)

    if (signedUrlError || !signedUrlData) {
      console.error('Error generating signed URL:', signedUrlError?.message);
      return NextResponse.json({ error: 'Error al generar el enlace de descarga' }, { status: 500 });
    }

    console.log('URL firmada generada exitosamente.');

    // 3. Redirigir al usuario a la URL firmada para descargar el archivo
    return NextResponse.redirect(signedUrlData.signedUrl);

  } catch (error) {
    console.error('Error general en la ruta de descarga:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
} 