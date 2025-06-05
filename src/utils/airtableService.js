// src/utils/airtableService.js

// Läser in .env‐variablerna (Vite kräver att de börjar med VITE_)
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;

/**
 * Hjälpfunktion som gör ett fetch-anrop till Airtable.
 * @param {string} endpoint - Tabellnamn (exakt som i Airtable) samt ev. query‐parametrar, t.ex. "Fastigheter?view=Grid%20view"
 * @param {RequestInit} options - Eventuella fetch‐alternativ (method, body, etc.)
 * @returns JSON‐svaret från Airtable
 */
async function airtableFetch(endpoint, options = {}) {
  // encodeURIComponent kodar mellanslag, &, åäö etc. i tabellnamnet korrekt
  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(endpoint)}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    ...options,
  });
  if (!response.ok) {
    // Försök läsa ut eventuell felbeskrivning från JSON, annars visa HTTP‐status
    const errorData = await response.json().catch(() => null);
    throw new Error(
      `Airtable error: ${errorData?.error?.message || response.statusText}`
    );
  }
  return response.json();
}

// ────────────────
// 1. Fastigheter
// ────────────────

/**
 * Hämta alla rader från tabellen "Fastigheter"
 * @returns {Promise<Array>} En array av Airtable‐records
 */
export async function fetchFastigheter() {
  const data = await airtableFetch("Fastigheter?view=Grid%20view");
  return data.records;
}

/**
 * Skapa (POST) eller uppdatera (PATCH) en rad i "Fastigheter"
 * @param {Object} fields - Fältobjekt, t.ex. { Fastighet: "Namn", Adress: "Gata 1", ... }
 * @param {string|null} recordId - Om null: skapa ny, annars uppdatera befintlig record
 * @returns {Promise<Object>} Den skapade/uppdaterade posten
 */
export async function saveFastighet(fields, recordId = null) {
  const method = recordId ? "PATCH" : "POST";
  const endpoint = recordId ? `Fastigheter/${recordId}` : "Fastigheter";
  const data = await airtableFetch(endpoint, {
    method,
    body: JSON.stringify({ fields }),
  });
  return data;
}

// ────────────────────
// 2. Komponenttyper
// ────────────────────

/**
 * Hämta alla rader från tabellen "Komponenttyper"
 * @returns {Promise<Array>}
 */
export async function fetchKomponenttyper() {
  const data = await airtableFetch("Komponenttyper?view=Grid%20view");
  return data.records;
}

/**
 * Skapa eller uppdatera en rad i "Komponenttyper"
 * @param {Object} fields - T.ex. { Komponent: "Hiss", Beskrivning: "Elevator", "Tillåtna fält": [...] }
 * @param {string|null} recordId
 */
export async function saveKomponenttyp(fields, recordId = null) {
  const method = recordId ? "PATCH" : "POST";
  const endpoint = recordId ? `Komponenttyper/${recordId}` : "Komponenttyper";
  const data = await airtableFetch(endpoint, {
    method,
    body: JSON.stringify({ fields }),
  });
  return data;
}

// ────────────────────
// 3. Komponentfält
// ────────────────────

/**
 * Hämta alla rader från tabellen "Komponentfält"
 * @returns {Promise<Array>}
 */
export async function fetchKomponentfält() {
  const data = await airtableFetch("Komponentfält?view=Grid%20view");
  return data.records;
}

/**
 * Skapa eller uppdatera en rad i "Komponentfält"
 * @param {Object} fields - T.ex. { Fältnamn: "Kapacitet", "Komponenttyper": [...] }
 * @param {string|null} recordId
 */
export async function saveKomponentfält(fields, recordId = null) {
  const method = recordId ? "PATCH" : "POST";
  const endpoint = recordId ? `Komponentfält/${recordId}` : "Komponentfält";
  const data = await airtableFetch(endpoint, {
    method,
    body: JSON.stringify({ fields }),
  });
  return data;
}

// ────────────────────
// 4. Komponenter
// ────────────────────

/**
 * Hämta alla rader från tabellen "Komponenter"
 * @returns {Promise<Array>}
 */
export async function fetchKomponenter() {
  const data = await airtableFetch("Komponenter?view=Grid%20view");
  return data.records;
}

/**
 * Skapa eller uppdatera en rad i "Komponenter"
 * @param {Object} fields - T.ex. { Komponent: "Kylmaskin 1", Fastighet: ["recID"], ... }
 * @param {string|null} recordId
 */
export async function saveKomponent(fields, recordId = null) {
  const method = recordId ? "PATCH" : "POST";
  const endpoint = recordId ? `Komponenter/${recordId}` : "Komponenter";
  const data = await airtableFetch(endpoint, {
    method,
    body: JSON.stringify({ fields }),
  });
  return data;
}

// ──────────────────────────────────────
// 5. Driftärenden & Beställningar
// ──────────────────────────────────────

/**
 * Hämta alla rader från tabellen "Driftärenden & Beställningar"
 * @returns {Promise<Array>}
 */
const DRIFT_TABELL = "Driftärenden & Beställningar";

export async function fetchDriftarenden() {
  // encodeURIComponent kodar mellanslag och &
  const endpoint = `${DRIFT_TABELL}?view=Grid%20view`;
  const data = await airtableFetch(endpoint);
  return data.records;
}

/**
 * Skapa eller uppdatera en rad i tabellen "Driftärenden & Beställningar"
 * @param {Object} fields - T.ex. { Åtgärd: "Byta lampor", Fastighet: ["recID"], Status: "Pågående", Datum: "2023-06-05", ... }
 * @param {string|null} recordId
 */
export async function saveDriftarende(fields, recordId = null) {
  const method = recordId ? "PATCH" : "POST";
  const endpoint = recordId
    ? `${DRIFT_TABELL}/${recordId}`
    : DRIFT_TABELL;
  const data = await airtableFetch(endpoint, {
    method,
    body: JSON.stringify({ fields }),
  });
  return data;
}

// ─────────────────────────────────
// 6. (Valfri) Radera post från tabell
// ─────────────────────────────────

/**
 * Radera en specifik post från valfri tabell
 * @param {string} tableName - Exakt tabellnamn i Airtable (t.ex. "Fastigheter" eller "Komponenter")
 * @param {string} recordId
 */
export async function deleteRecord(tableName, recordId) {
  const endpoint = `${tableName}/${recordId}`;
  const data = await airtableFetch(endpoint, { method: "DELETE" });
  return data;
}

/**
 * Hämta metadata (schema) om hela basen
 */
export async function fetchBaseSchema() {
  const data = await airtableFetch("?schema=public");
  return data;
}
