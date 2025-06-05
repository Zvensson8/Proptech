import { useState, useEffect } from 'react';
import { getAllFrom_Komponentf\u00e4lt } from '../api/airtableService.js';

export function useKomponentf\u00e4lt() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const records = await getAllFrom_Komponentf\u00e4lt();
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
