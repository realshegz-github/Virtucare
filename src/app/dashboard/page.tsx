"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doctors } from "@/data/doctors";
import { getAppointments } from "@/utils/storage"; // Adjust path if needed
import { Appointment } from "@/types/interface"; // Adjust path if needed
import { 
  Button, 
  Card, 
  CardContent, 
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import InboxIcon from "@mui/icons-material/Inbox";

export default function DashboardOverview() {
  const router = useRouter();
  
  // State for dynamic appointments
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const storedAppointments = getAppointments();
    
    // Sort appointments chronologically so the closest ones appear first
    const sorted = storedAppointments.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });

    setAppointments(sorted);
  }, []);

  const totalDoctors = doctors.length;
  const totalSlots = doctors.reduce((acc, doc) => acc + doc.availableSlots.length, 0);
  const specialties = new Set(doctors.map((doc) => doc.specialty)).size;

  const cards = [
    { title: "Available Doctors", value: totalDoctors, icon: <LocalHospitalIcon />, bg: "bg-blue-50", color: "text-blue-600" },
    { title: "Booked Appointments", value: appointments.length, icon: <EventAvailableIcon />, bg: "bg-green-50", color: "text-green-600" },
    { title: "Available Slots", value: totalSlots, icon: <AccessTimeIcon />, bg: "bg-purple-50", color: "text-purple-600" },
    { title: "Specialties", value: specialties, icon: <CategoryIcon />, bg: "bg-orange-50", color: "text-orange-600" },
  ];

  return (
    <Box className="px-[5%] py-5">
      {/* HEADER SECTION */}
      <Box className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <Box>
        
          <h1 className="text-3xl font-bold text-gray-900">
               Dashboard Overview
            </h1>
          <p className="text-gray-600">
            Welcome back, John 👋
          </p>
        </Box>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => router.push("/dashboard/appointments/book/doc-1")} // Or redirect to doctor list
          disableElevation
          sx={{ borderRadius: "8px", textTransform: "none", px: 3, py: 1.2 }}
        >
          Book an Appointment
        </Button>
      </Box>

      {/* STATS CARDS */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <Card 
            key={card.title} 
            elevation={0} 
            className={`${card.bg} border border-transparent hover:border-gray-200 transition-all duration-300`}
            sx={{ borderRadius: "16px" }}
          >
            <CardContent className="flex items-center justify-between p-6 pb-6!important">
              <Box>
                <Typography component="p" variant="subtitle2" fontWeight="medium" color="text.secondary">
                  {card.title}
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="text.primary" sx={{ mt: 1 }}>
                  {card.value}
                </Typography>
              </Box>
              <Box className={`p-3 rounded-xl ${card.color} bg-white shadow-sm flex items-center justify-center`}>
                {card.icon}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* RECENT APPOINTMENTS SECTION */}
      <Box className="flex items-center justify-between mb-3">
        <Typography variant="h5" component="h2" fontWeight="bold">
          Upcoming Appointments
        </Typography>
        {appointments.length > 5 && (
          <Button 
            variant="text" 
            onClick={() => router.push("/dashboard/appointments")}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            View All
          </Button>
        )}
      </Box>

      {appointments.length === 0 ? (
        <Paper 
          elevation={0} 
          sx={{ p: 8, textAlign: "center", borderRadius: "16px", border: "1px dashed #e5e7eb", backgroundColor: "#f9fafb" }}
        >
          <InboxIcon sx={{ fontSize: 60, color: "#9ca3af", mb: 2 }} />
          <Typography variant="h6" color="text.primary" fontWeight="medium">
            No Appointments Booked
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, mt: 1 }}>
            You haven't scheduled any medical appointments yet.
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => router.push("/dashboard/doctor")}
            sx={{ borderRadius: "8px", textTransform: "none" }}
          >
            Find a Doctor
          </Button>
        </Paper>
      ) : (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "12px", border: "1px solid #f3f4f6" }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: "#f9fafb" }}>
              <TableRow>
                <TableCell><Typography variant="subtitle2" fontWeight="bold" color="text.secondary">ID</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight="bold" color="text.secondary">Doctor</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight="bold" color="text.secondary">Date</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight="bold" color="text.secondary">Time</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight="bold" color="text.secondary">Status</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Only show the top 5 closest appointments on the dashboard */}
              {appointments.slice(0, 5).map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#fcfcfc' } }}>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">{row.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{row.doctorName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{row.time}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label="Confirmed" 
                      size="small" 
                      color="success" 
                      variant="outlined"
                      sx={{ fontWeight: "medium" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}