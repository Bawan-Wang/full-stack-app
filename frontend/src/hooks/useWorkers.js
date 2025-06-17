import { useState, useCallback } from 'react';
import { workerService } from '../services/api';

export const useWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWorkers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await workerService.getAllWorkers();
      setWorkers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err.message);
      setWorkers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addWorker = useCallback(async (workerData) => {
    try {
      setLoading(true);
      setError(null);
      await workerService.createWorker(workerData);
      await fetchWorkers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchWorkers]);

  return {
    workers,
    loading,
    error,
    fetchWorkers,
    addWorker,
  };
}; 