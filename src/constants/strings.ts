export const Strings = {
  app: {
    name: 'GrievanceDesk',
    tagline: 'Your voice, heard.',
  },

  home: {
    title: 'GrievanceDesk',
    subtitle: 'Submit and track your grievances\nor feedback with ease.',
    submitButton: 'Submit a Grievance',
    viewButton: 'View All Grievances',
    statsTotal: 'Total',
    statsPending: 'Pending',
    statsResolved: 'Resolved',
  },

  addGrievance: {
    title: 'New Grievance',
    titleLabel: 'Title',
    titlePlaceholder: 'Brief summary of your issue',
    descriptionLabel: 'Description',
    descriptionPlaceholder: 'Describe your grievance in detail...',
    categoryLabel: 'Category',
    submitButton: 'Submit Grievance',
    successMessage: 'Grievance submitted successfully!',
    submitting: 'Submitting...',
  },

  list: {
    title: 'All Grievances',
    empty: 'No grievances yet',
    emptySubtitle: 'Submit your first grievance\nto get started.',
    searchPlaceholder: 'Search grievances...',
  },

  detail: {
    title: 'Grievance Detail',
    categoryLabel: 'Category',
    statusLabel: 'Status',
    submittedLabel: 'Submitted',
    descriptionLabel: 'Description',
  },

  errors: {
    titleRequired: 'Title is required.',
    titleMinLength: 'Title must be at least 5 characters.',
    titleMaxLength: 'Title cannot exceed 80 characters.',
    descriptionRequired: 'Description is required.',
    descriptionMinLength: 'Description must be at least 10 characters.',
    descriptionMaxLength: 'Description cannot exceed 500 characters.',
    submitFailed: 'Failed to submit grievance. Please try again.',
    loadFailed: 'Failed to load grievances. Please try again.',
  },

  status: {
    pending: 'Pending',
    'in-review': 'In Review',
    resolved: 'Resolved',
  },
} as const;
