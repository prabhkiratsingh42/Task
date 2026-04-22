import { GrievanceFormData, GrievanceFormErrors } from '../types/grievance';
import { Strings } from '../constants/strings';

export const validateGrievanceForm = (
  data: GrievanceFormData,
): GrievanceFormErrors => {
  const errors: GrievanceFormErrors = {};

  if (!data.title || data.title.trim().length === 0) {
    errors.title = Strings.errors.titleRequired;
  } else if (data.title.trim().length < 5) {
    errors.title = Strings.errors.titleMinLength;
  } else if (data.title.trim().length > 80) {
    errors.title = Strings.errors.titleMaxLength;
  }


  if (!data.description || data.description.trim().length === 0) {
    errors.description = Strings.errors.descriptionRequired;
  } else if (data.description.trim().length < 10) {
    errors.description = Strings.errors.descriptionMinLength;
  } else if (data.description.trim().length > 500) {
    errors.description = Strings.errors.descriptionMaxLength;
  }

  return errors;
};

export const hasErrors = (errors: GrievanceFormErrors): boolean => {
  return Object.keys(errors).some(
    key => !!errors[key as keyof GrievanceFormErrors],
  );
};
