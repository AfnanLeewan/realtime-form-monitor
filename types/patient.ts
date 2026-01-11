export interface PatientFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  preferredLanguage: string;
  nationality: string;
  emergencyContact: string;
  religion: string;
}

export const initialFormData: PatientFormData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  phone: '',
  email: '',
  address: '',
  preferredLanguage: '',
  nationality: '',
  emergencyContact: '',
  religion: '',
};
