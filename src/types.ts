export interface Education {
  id: string;
  course: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CVData {
  fullName: string;
  address: string;
  phone: string;
  email: string;
  linkedin: string;
  objective: string;
  education: Education[];
  experience: Experience[];
  skills: string;
}
