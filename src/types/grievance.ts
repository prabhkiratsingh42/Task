export type GrievanceStatus = 'pending' | 'in-review' | 'resolved';

export interface Grievance {
  id: string;
  title: string;
  description: string;
  category: GrievanceCategory;
  status: GrievanceStatus;
  createdAt: string;
  updatedAt: string;
}

export type GrievanceCategory =
  | 'General'
  | 'Technical'
  | 'Billing'
  | 'Service'
  | 'Other';

export const GRIEVANCE_CATEGORIES: GrievanceCategory[] = [
  'General',
  'Technical',
  'Billing',
  'Service',
  'Other',
];

export interface GrievanceFormData {
  title: string;
  description: string;
  category: GrievanceCategory;
}

export interface GrievanceFormErrors {
  title?: string;
  description?: string;
  category?: string;
}
