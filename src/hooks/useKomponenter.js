import { useState, useEffect } from 'react';
import { getAllFrom_Komponenter } from '../api/airtableService.js';

export function useKomponenter() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const records = await getAllFrom_Komponenter();
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
