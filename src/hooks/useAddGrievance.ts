import { useState, useCallback } from 'react';
import {
  GrievanceFormData,
  GrievanceFormErrors,
  GrievanceCategory,
} from '../types/grievance';
import { addGrievance } from '../services/grievanceService';
import { validateGrievanceForm, hasErrors } from '../utils/validation';

interface UseAddGrievanceReturn {
  formData: GrievanceFormData;
  errors: GrievanceFormErrors;
  isSubmitting: boolean;
  submitError: string | null;
  setField: <K extends keyof GrievanceFormData>(
    field: K,
    value: GrievanceFormData[K],
  ) => void;
  submitForm: () => Promise<boolean>;
  resetForm: () => void;
}

const INITIAL_FORM: GrievanceFormData = {
  title: '',
  description: '',
  category: 'General' as GrievanceCategory,
};


const useAddGrievance = (): UseAddGrievanceReturn => {
  const [formData, setFormData] = useState<GrievanceFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<GrievanceFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setField = useCallback(
    <K extends keyof GrievanceFormData>(
      field: K,
      value: GrievanceFormData[K],
    ): void => {
      setFormData(prev => ({ ...prev, [field]: value }));
      // Clear field-level error on change
      setErrors(prev => ({ ...prev, [field]: undefined }));
      setSubmitError(null);
    },
    [],
  );

  const submitForm = useCallback(async (): Promise<boolean> => {
    const validationErrors = validateGrievanceForm(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return false;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await addGrievance(formData);
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Submission failed.';
      setSubmitError(message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const resetForm = useCallback((): void => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setSubmitError(null);
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    submitError,
    setField,
    submitForm,
    resetForm,
  };
};

export default useAddGrievance;
