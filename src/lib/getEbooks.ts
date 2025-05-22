import { supabase } from './supabaseClient'

export async function getEbooks() {
  const { data, error } = await supabase
    .from('ebooks')
    .select('*')
    .order('title', { ascending: true })

  if (error) throw error
  return data
}

export async function getEbookById(id: string) {
  const { data, error } = await supabase
    .from('ebooks')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  // Asegurarse de que los campos JSONB sean arrays
  return {
    ...data,
    tableOfContents: Array.isArray(data.table_of_contents) ? data.table_of_contents : (data.table_of_contents ? Object.values(data.table_of_contents) : []),
    features: Array.isArray(data.features) ? data.features : (data.features ? Object.values(data.features) : []),
  }
}

export async function getPopularEbooks(limit: number = 3) {
  try {
    // Intentar obtener los ebooks ordenados por compras
    const { data, error } = await supabase
      .from('ebooks')
      .select('*')
      .order('purchases', { ascending: false })
      .limit(limit)

    if (error) {
      // Si hay error (probablemente porque la columna no existe), obtener los ebooks más recientes
      const { data: recentData, error: recentError } = await supabase
        .from('ebooks')
        .select('*')
        .order('publish_date', { ascending: false })
        .limit(limit)

      if (recentError) throw recentError
      return recentData
    }

    return data
  } catch (error) {
    console.error('Error getting popular ebooks:', error)
    // En caso de error, devolver los primeros ebooks
    const { data, error: fallbackError } = await supabase
      .from('ebooks')
      .select('*')
      .limit(limit)

    if (fallbackError) throw fallbackError
    return data
  }
} 