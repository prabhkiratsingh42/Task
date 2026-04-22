import AsyncStorage from '@react-native-async-storage/async-storage';
import { Grievance, GrievanceFormData } from '../types/grievance';
import { generateId } from '../utils/helpers';

const STORAGE_KEY = '@GrievanceDesk:grievances';


export const getGrievances = async (): Promise<Grievance[]> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: Grievance[] = JSON.parse(raw);

    return parsed.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } catch (error) {
    console.error('[grievanceService] getGrievances error:', error);
    throw new Error('Failed to load grievances.');
  }
};


export const addGrievance = async (
  formData: GrievanceFormData,
): Promise<Grievance> => {
  try {
    const existing = await getGrievances();
    const now = new Date().toISOString();

    const newGrievance: Grievance = {
      id: generateId(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };


    const updated = [newGrievance, ...existing];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return newGrievance;
  } catch (error) {
    console.error('[grievanceService] addGrievance error:', error);
    throw new Error('Failed to submit grievance.');
  }
};

export const getGrievanceById = async (
  id: string,
): Promise<Grievance | null> => {
  try {
    const all = await getGrievances();
    return all.find(g => g.id === id) ?? null;
  } catch (error) {
    console.error('[grievanceService] getGrievanceById error:', error);
    throw new Error('Failed to fetch grievance.');
  }
};


export const clearAllGrievances = async (): Promise<void> => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};
