import { Doctor } from "@/types/interface";

export const doctors:Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialty: 'Cardiologist',
    availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: '2',
    name: 'Dr. James Chen',
    specialty: 'Dermatologist',
    availableSlots: ['08:00', '09:30', '11:00', '13:00', '14:30', '16:00'],
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: '3',
    name: 'Dr. Maria Rodriguez',
    specialty: 'Pediatrician',
    availableSlots: ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'],
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    id: '4',
    name: 'Dr. Robert Williams',
    specialty: 'Orthopedic Surgeon',
    availableSlots: ['08:30', '10:00', '11:30', '13:30', '15:00', '16:30'],
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg'
  },
  {
    id: '5',
    name: 'Dr. Emily Thompson',
    specialty: 'General Practitioner',
    availableSlots: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
  },
  {
    id: '6',
    name: 'Dr. Michael Lee',
    specialty: 'Neurologist',
    availableSlots: ['09:30', '11:00', '13:00', '14:30', '16:00'],
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
  }
];