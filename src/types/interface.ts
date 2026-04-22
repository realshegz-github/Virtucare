export interface Doctor {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  availableSlots: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
}