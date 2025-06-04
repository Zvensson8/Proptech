import Airtable from 'airtable'

const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY
const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID

const base = new Airtable({ apiKey }).base(baseId)

export async function fetchRecords(table: string) {
  const records: any[] = []
  await base(table)
    .select({})
    .eachPage((pageRecords, fetchNextPage) => {
      records.push(...pageRecords.map(r => ({ id: r.id, ...r.fields })))
      fetchNextPage()
    })
  return records
}

export async function createRecord(table: string, fields: Record<string, any>) {
  const record = await base(table).create(fields)
  return { id: record.id, ...record.fields }
}

export async function updateRecord(table: string, id: string, fields: Record<string, any>) {
  const record = await base(table).update(id, fields)
  return { id: record.id, ...record.fields }
}
