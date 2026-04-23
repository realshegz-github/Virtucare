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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import InboxIcon from "@mui/icons-material/Inbox";

export default function DashboardOverview() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const storedAppointments = getAppointments();

    const sorted = storedAppointments.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });

    setAppointments(sorted);
  }, []);

  const totalDoctors = doctors.length;
  const totalSlots = doctors.reduce(
    (acc, doc) => acc + doc.availableSlots.length,
    0
  );
  const specialties = new Set(doctors.map((doc) => doc.specialty)).size;

  const cards = [
    {
      title: "Available Doctors",
      value: totalDoctors,
      icon: <LocalHospitalIcon />,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Booked Appointments",
      value: appointments.length,
      icon: <EventAvailableIcon />,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      title: "Available Slots",
      value: totalSlots,
      icon: <AccessTimeIcon />,
      bg: "bg-purple-50",
      color: "text-purple-600",
    },
    {
      title: "Specialties",
      value: specialties,
      icon: <CategoryIcon />,
      bg: "bg-orange-50",
      color: "text-orange-600",
    },
  ];

  return (
    <Box className="px-[5%] py-5">
      {/* HEADER */}
      <Box className="flex flex-col sm:flex-row justify-between mb-12 gap-4">
        <Box>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">Welcome back, John 👋</p>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push("/dashboard/doctor")}
          sx={{ borderRadius: "8px", textTransform: "none", px: 3, py: 1.2 }}
        >
          Book an Appointment
        </Button>
      </Box>

      {/* CARDS */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <Card
            key={card.title}
            elevation={0}
            className={`${card.bg} border hover:border-gray-200`}
            sx={{ borderRadius: "16px" }}
          >
            <CardContent className="flex justify-between items-center p-6">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <h2 className="text-3xl font-bold text-gray-900 mt-1">
                  {card.value}
                </h2>
              </div>

              <div
                className={`p-3 rounded-xl bg-white shadow-sm ${card.color}`}
              >
                {card.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* SECTION HEADER */}
      <Box className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-900">
          Upcoming Appointments
        </h2>

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

      {/* EMPTY STATE */}
      {appointments.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 8,
            textAlign: "center",
            borderRadius: "16px",
            border: "1px dashed #e5e7eb",
          }}
        >
          <InboxIcon sx={{ fontSize: 60, color: "#9ca3af", mb: 2 }} />

          <h3 className="text-lg font-semibold text-gray-900">
            No Appointments Booked
          </h3>

          <p className="text-gray-500 mt-2 mb-4">
            You haven’t scheduled any appointments yet.
          </p>

          <Button
            variant="outlined"
            onClick={() => router.push("/dashboard/doctor")}
            sx={{ borderRadius: "8px", textTransform: "none" }}
          >
            Find a Doctor
          </Button>
        </Paper>
      ) : (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ borderRadius: "12px", border: "1px solid #f3f4f6" }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#f9fafb" }}>
              <TableRow>
                <TableCell><span className="text-xs font-semibold text-gray-500">ID</span></TableCell>
                <TableCell><span className="text-xs font-semibold text-gray-500">Doctor</span></TableCell>
                <TableCell><span className="text-xs font-semibold text-gray-500">Date</span></TableCell>
                <TableCell><span className="text-xs font-semibold text-gray-500">Time</span></TableCell>
                <TableCell><span className="text-xs font-semibold text-gray-500">Status</span></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {appointments.slice(0, 5).map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>
                    <p className="text-sm font-medium">{row.id}</p>
                  </TableCell>

                  <TableCell>
                    <p className="text-sm">{row.doctorName}</p>
                  </TableCell>

                  <TableCell>
                    <p className="text-sm">
                      {new Date(row.date).toLocaleDateString()}
                    </p>
                  </TableCell>

                  <TableCell>
                    <p className="text-sm">{row.time}</p>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label="Confirmed"
                      size="small"
                      color="success"
                      variant="outlined"
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