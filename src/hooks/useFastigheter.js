import { useState, useEffect } from 'react';
import { getAllFrom_Fastigheter } from '../api/airtableService.js';

export function useFastigheter() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const records = await getAllFrom_Fastigheter();
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
