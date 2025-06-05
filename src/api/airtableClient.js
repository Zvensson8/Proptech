import Airtable from 'airtable';

const { VITE_AIRTABLE_API_KEY, VITE_AIRTABLE_BASE_ID } = import.meta.env;
const sanitizedBaseId = (VITE_AIRTABLE_BASE_ID || '').replace(/\.$/, '');

Airtable.configure({ apiKey: VITE_AIRTABLE_API_KEY });

const base = Airtable.base(sanitizedBaseId);

export default base;
