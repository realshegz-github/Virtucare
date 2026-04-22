import { Appointment } from "@/types/interface";

const APPOINTMENTS_KEY = "virtucare_appointments";

export const getAppointments = (): Appointment[] => {
  try {
    const stored = localStorage.getItem(APPOINTMENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading appointments:", error);
    return [];
  }
};

export const saveAppointments = (appointments: Appointment[]): void => {
  try {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  } catch (error) {
    console.error("Error saving appointments:", error);
  }
};

export const addAppointment = (appointment: Appointment): void => {
  const appointments = getAppointments();
  appointments.push(appointment);
  saveAppointments(appointments);
};

export const deleteAppointment = (id: string): void => {
  const appointments = getAppointments();
  const filtered = appointments.filter((apt) => apt.id !== id);
  saveAppointments(filtered);
};

export const isSlotBooked = (
  doctorId: string,
  date: string,
  time: string,
): boolean => {
  const appointments = getAppointments();
  return appointments.some(
    (apt) =>
      apt.doctorId === doctorId && apt.date === date && apt.time === time,
  );
};
