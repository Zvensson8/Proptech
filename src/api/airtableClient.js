import Airtable from 'airtable';
import dotenv from 'dotenv';

dotenv.config();

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;

Airtable.configure({ apiKey: AIRTABLE_API_KEY });

const base = Airtable.base(AIRTABLE_BASE_ID);

export default base;
