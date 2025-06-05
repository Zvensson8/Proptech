import { useState, useEffect } from 'react';
import { getAllFrom_Komponenttyper } from '../api/airtableService.js';

export function useKomponenttyper() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const records = await getAllFrom_Komponenttyper();
        setData(records);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, loading, error };
}
