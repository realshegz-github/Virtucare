"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doctors } from "@/data/doctors";
import { getAppointments } from "@/utils/storage";
import { Appointment } from "@/types/interface";
import {
  Button,
  Card,
  CardContent,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import InboxIcon from "@mui/icons-material/Inbox";
import AppointmentTable from "@/component/dashboard/AppointmentTable";

export default function DashboardOverview() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = () => {
      const stored = getAppointments();
      const sorted = stored.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateA.getTime() - dateB.getTime();
      });
      setAppointments(sorted);
      setLoading(false);
    };

    const timer = setTimeout(fetchDashboardData, 600);
    return () => clearTimeout(timer);
  }, []);

  const totalDoctors = doctors.length;
  const totalSlots = doctors.reduce((acc, doc) => acc + doc.availableSlots.length, 0);
  const specialties = new Set(doctors.map((doc) => doc.specialty)).size;

  const cards = [
    { title: "Available Doctors", value: totalDoctors, icon: <LocalHospitalIcon />, bg: "bg-blue-50", color: "text-blue-600" },
    { title: "My Appointments", value: appointments.length, icon: <EventAvailableIcon />, bg: "bg-green-50", color: "text-green-600" },
    { title: "Total Slots", value: totalSlots, icon: <AccessTimeIcon />, bg: "bg-purple-50", color: "text-purple-600" },
    { title: "Specialties", value: specialties, icon: <CategoryIcon />, bg: "bg-orange-50", color: "text-orange-600" },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', gap: 2 }}>
        <CircularProgress thickness={5} size={50} />
        <p className="text-sm font-medium text-gray-500">Syncing dashboard data...</p>
      </Box>
    );
  }

  return (
    <Box className="px-[5%] py-5">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-base text-gray-500 mt-1">Welcome back, John 👋</p>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push("/dashboard/doctor")}
          sx={{ borderRadius: "10px", textTransform: "none", px: 4, py: 1.2, fontWeight: '600',backgroundColor:"#2563eb", }}
        >
          Book Appointment
        </Button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map((card) => (
          <Card key={card.title} elevation={0} className={`${card.bg} border border-transparent hover:border-gray-200 transition-all`} sx={{ borderRadius: "20px" }}>
            <CardContent className="flex justify-between items-center p-6">
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{card.title}</p>
                <h2 className="text-3xl font-black text-gray-900 mt-1">{card.value}</h2>
              </div>
              <div className={`p-3 rounded-2xl bg-white shadow-sm ${card.color}`}>
                {card.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* TABLE SECTION */}
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
          <p className=" text-gray-500 my-2">Your next scheduled medical visits</p>
        </div>
        {appointments.length > 5 && (
          <Button variant="text" onClick={() => router.push("/dashboard/appointments")} sx={{ textTransform: "none", fontWeight: "700" }}>
            View Full Schedule
          </Button>
        )}
      </div>

      {appointments.length === 0 ? (
        <Paper elevation={0} sx={{ p: 8, textAlign: "center", borderRadius: "20px", border: "2px dashed #e2e8f0", bgcolor: '#f8fafc' }}>
          <InboxIcon sx={{ fontSize: 60, color: "#cbd5e1", mb: 2 }} />
          <h3 className="text-lg font-bold text-gray-900">No scheduled visits</h3>
          <p className=" text-gray-500 mt-1 mb-4">You haven&apos;t booked any appointments with our doctors yet.</p>
          <Button variant="outlined" onClick={() => router.push("/dashboard/doctor")} sx={{ borderRadius: "10px", textTransform: "none", fontWeight: '600' }}>
            Browse Doctors
          </Button>
        </Paper>
      ) : (
        <AppointmentTable data={appointments} limit={5} />
      )}
    </Box>
  );
}