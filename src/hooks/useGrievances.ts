import { useState, useCallback } from 'react';
import { Grievance } from '../types/grievance';
import { getGrievances } from '../services/grievanceService';

interface UseGrievancesReturn {
  grievances: Grievance[];
  isLoading: boolean;
  error: string | null;
  fetchGrievances: () => Promise<void>;
  refresh: () => Promise<void>;
}


const useGrievances = (): UseGrievancesReturn => {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGrievances = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getGrievances();
      setGrievances(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async (): Promise<void> => {
    await fetchGrievances();
  }, [fetchGrievances]);

  return { grievances, isLoading, error, fetchGrievances, refresh };
};

export default useGrievances;
