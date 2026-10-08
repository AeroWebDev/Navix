export interface CustomSoftwareRequest {
  id?: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  country: string;
  businessType: string;
  employeeCount: string;
  branchCount: string;
  skuCount: string;
  modules: string[];
  deploymentPreference: 'cloud' | 'on_premises' | 'hybrid';
  estimatedBudget: string;
  targetTimeline: string;
  additionalRequirements: string;
  submittedAt?: string;
}
