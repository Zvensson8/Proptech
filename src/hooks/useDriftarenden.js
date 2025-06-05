import { useState, useEffect } from 'react';
import { getAllFrom_Drift\u00e4renden_&_Best\u00e4llningar } from '../api/airtableService.js';

export function useDriftarenden() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const records = await getAllFrom_Drift\u00e4renden_&_Best\u00e4llningar();
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
