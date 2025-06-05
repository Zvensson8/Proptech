import Airtable from 'airtable';
import dotenv from 'dotenv';

dotenv.config();

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;
const sanitizedBaseId = (AIRTABLE_BASE_ID || '').replace(/\.$/, '');

Airtable.configure({ apiKey: AIRTABLE_API_KEY });

const base = Airtable.base(sanitizedBaseId);

export default base;
