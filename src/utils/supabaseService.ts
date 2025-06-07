import { supabase } from './supabaseClient'

export async function fetchFastigheter() {
  const { data, error } = await supabase.from('Fastigheter').select('*')
  if (error) throw error
  return data
}

export async function fetchFastighet(id: string) {
  const { data, error } = await supabase
    .from('Fastigheter')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function saveFastighet(fields: any, id?: string) {
  if (id) {
    const { data, error } = await supabase
      .from('Fastigheter')
      .update(fields)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  }
  const { data, error } = await supabase
    .from('Fastigheter')
    .insert(fields)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function fetchKomponenttyper() {
  const { data, error } = await supabase.from('Komponenttyper').select('*')
  if (error) throw error
  return data
}

export async function saveKomponenttyp(fields: any, id?: string) {
  if (id) {
    const { data, error } = await supabase
      .from('Komponenttyper')
      .update(fields)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  }
  const { data, error } = await supabase
    .from('Komponenttyper')
    .insert(fields)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function fetchKomponentfält() {
  const { data, error } = await supabase.from('Komponentfält').select('*')
  if (error) throw error
  return data
}

export async function saveKomponentfält(fields: any, id?: string) {
  if (id) {
    const { data, error } = await supabase
      .from('Komponentfält')
      .update(fields)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  }
  const { data, error } = await supabase
    .from('Komponentfält')
    .insert(fields)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function fetchKomponenter() {
  const { data, error } = await supabase.from('Komponenter').select('*')
  if (error) throw error
  return data
}

export async function saveKomponent(fields: any, id?: string) {
  if (id) {
    const { data, error } = await supabase
      .from('Komponenter')
      .update(fields)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  }
  const { data, error } = await supabase
    .from('Komponenter')
    .insert(fields)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function fetchDriftarenden() {
  const { data, error } = await supabase.from('Driftärenden & Beställningar').select('*')
  if (error) throw error
  return data
}

export async function saveDriftarende(fields: any, id?: string) {
  if (id) {
    const { data, error } = await supabase
      .from('Driftärenden & Beställningar')
      .update(fields)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  }
  const { data, error } = await supabase
    .from('Driftärenden & Beställningar')
    .insert(fields)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteRecord(table: string, id: string) {
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) throw error
}
