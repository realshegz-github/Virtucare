"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAppointments, deleteAppointment } from "@/utils/storage";
import { Appointment } from "@/types/interface";
import { toast } from "sonner";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Paper,
  CircularProgress, // Import the loader
  Typography,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import EventBusyIcon from "@mui/icons-material/EventBusy";

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 1. Add loading state

  useEffect(() => {
    // Simulate a small delay for a smoother UX or handle instant local load
    const timer = setTimeout(() => {
      setAppointments(getAppointments());
      setIsLoading(false); // 2. Stop loading once data is fetched
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      deleteAppointment(id);
      setAppointments(getAppointments());
      toast.success("Appointment cancelled successfully");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  // 3. Render Loader before the main content
  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: "column",
          alignItems: "center", 
          justifyContent: "center", 
          minHeight: "60vh" 
        }}
      >
        <CircularProgress size={40} thickness={4} sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary">
          Loading your appointments...
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="px-[5%]">
      {/* HEADER */}
      <Box className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <Box>
          <h1 className="text-3xl font-bold text-gray-900">
            My Appointments
          </h1>
          <p className="text-gray-600">
            View and manage your scheduled appointments
          </p>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push("/dashboard/doctor")}
          sx={{ borderRadius: "8px", textTransform: "none", px: 3, py: 1.2 }}
        >
          Book New
        </Button>
      </Box>

      {/* EMPTY STATE */}
      {sortedAppointments.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 8,
            textAlign: "center",
            borderRadius: "16px",
            border: "1px dashed #e5e7eb",
            backgroundColor: "#f9fafb",
          }}
        >
          <EventBusyIcon sx={{ fontSize: 60, color: "#9ca3af", mb: 2 }} />

          <h2 className="text-xl font-semibold text-gray-900">
            No appointments yet
          </h2>

          <p className="text-gray-500 mt-2 mb-6 max-w-md mx-auto">
            You haven&apos;t booked any appointments. Start by browsing doctors.
          </p>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push("/dashboard/doctor")}
            sx={{ borderRadius: "8px", textTransform: "none", px: 4, py: 1.2 }}
          >
            Book Your First Appointment
          </Button>
        </Paper>
      ) : (
        <Box className="space-y-4">
          {sortedAppointments.map((appointment) => (
            <Card
              key={appointment.id}
              elevation={0}
              sx={{
                borderRadius: "16px",
                border: "1px solid #f3f4f6",
                "&:hover": {
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                },
              }}
            >
              <CardContent>
                <Box className="flex flex-col sm:flex-row justify-between gap-4">
                  {/* INFO */}
                  <Box className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {appointment.doctorName}
                    </h3>

                    <div className="space-y-2 text-gray-600 text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarTodayIcon sx={{ fontSize: 18 }} />
                        <span>{formatDate(appointment.date)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <AccessTimeIcon sx={{ fontSize: 18 }} />
                        <span>{appointment.time}</span>
                      </div>
                    </div>

                    <Divider sx={{ my: 2, borderStyle: "dashed" }} />

                    <div>
                      <p className="text-xs uppercase text-gray-400 font-semibold">
                        Reason for visit
                      </p>
                      <p className="text-sm text-gray-800 mt-1">
                        {appointment.reason}
                      </p>
                    </div>
                  </Box>

                  {/* ACTION */}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(appointment.id)}
                    sx={{
                      borderRadius: "8px",
                      textTransform: "none",
                      alignSelf: { xs: "stretch", sm: "flex-start" },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}