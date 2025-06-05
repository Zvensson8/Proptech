import base from './airtableClient.js';

async function getAll(table) {
  const records = await base(table).select().all();
  return records.map(r => ({ id: r.id, ...r.fields }));
}

async function createIn(table, fieldsObject) {
  const record = await base(table).create(fieldsObject);
  return { id: record.id, ...record.fields };
}

async function updateIn(table, recordId, fieldsObject) {
  const record = await base(table).update(recordId, fieldsObject);
  return { id: record.id, ...record.fields };
}

async function deleteFrom(table, recordId) {
  await base(table).destroy(recordId);
  return true;
}

// Fastigheter
export async function getAllFrom_Fastigheter() {
  return getAll('Fastigheter');
}

export async function createIn_Fastigheter(fieldsObject) {
  return createIn('Fastigheter', fieldsObject);
}

export async function updateIn_Fastigheter(recordId, fieldsObject) {
  return updateIn('Fastigheter', recordId, fieldsObject);
}

export async function deleteFrom_Fastigheter(recordId) {
  return deleteFrom('Fastigheter', recordId);
}

// Drift\u00e4renden & Best\u00e4llningar
export async function getAllFrom_Drift\u00e4renden_&_Best\u00e4llningar() {
  return getAll('Drift\u00e4renden & Best\u00e4llningar');
}

export async function createIn_Drift\u00e4renden_&_Best\u00e4llningar(fieldsObject) {
  return createIn('Drift\u00e4renden & Best\u00e4llningar', fieldsObject);
}

export async function updateIn_Drift\u00e4renden_&_Best\u00e4llningar(recordId, fieldsObject) {
  return updateIn('Drift\u00e4renden & Best\u00e4llningar', recordId, fieldsObject);
}

export async function deleteFrom_Drift\u00e4renden_&_Best\u00e4llningar(recordId) {
  return deleteFrom('Drift\u00e4renden & Best\u00e4llningar', recordId);
}

// Komponenter
export async function getAllFrom_Komponenter() {
  return getAll('Komponenter');
}

export async function createIn_Komponenter(fieldsObject) {
  return createIn('Komponenter', fieldsObject);
}

export async function updateIn_Komponenter(recordId, fieldsObject) {
  return updateIn('Komponenter', recordId, fieldsObject);
}

export async function deleteFrom_Komponenter(recordId) {
  return deleteFrom('Komponenter', recordId);
}

// Komponentf\u00e4lt
export async function getAllFrom_Komponentf\u00e4lt() {
  return getAll('Komponentf\u00e4lt');
}

export async function createIn_Komponentf\u00e4lt(fieldsObject) {
  return createIn('Komponentf\u00e4lt', fieldsObject);
}

export async function updateIn_Komponentf\u00e4lt(recordId, fieldsObject) {
  return updateIn('Komponentf\u00e4lt', recordId, fieldsObject);
}

export async function deleteFrom_Komponentf\u00e4lt(recordId) {
  return deleteFrom('Komponentf\u00e4lt', recordId);
}

// Komponenttyper
export async function getAllFrom_Komponenttyper() {
  return getAll('Komponenttyper');
}

export async function createIn_Komponenttyper(fieldsObject) {
  return createIn('Komponenttyper', fieldsObject);
}

export async function updateIn_Komponenttyper(recordId, fieldsObject) {
  return updateIn('Komponenttyper', recordId, fieldsObject);
}

export async function deleteFrom_Komponenttyper(recordId) {
  return deleteFrom('Komponenttyper', recordId);
}
