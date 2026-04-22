"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAppointments, deleteAppointment } from "@/utils/storage"; 
import { Appointment } from "@/types/interface"; 
import { toast } from "sonner"; 
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Divider, 
  Paper,
  IconButton
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import EventBusyIcon from "@mui/icons-material/EventBusy";

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    setAppointments(getAppointments());
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

  // Improved sorting to handle both "HH:MM" and "HH:MM AM/PM" formats safely
  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <Box className="px-[5%]">
      {/* HEADER SECTION */}
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
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => router.push("/dashboard/doctor")}
          disableElevation
          sx={{ borderRadius: "8px", textTransform: "none", px: 3, py: 1.2 }}
        >
          Book New
        </Button>
      </Box>

      {/* APPOINTMENTS LIST OR EMPTY STATE */}
      {sortedAppointments.length === 0 ? (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 8, 
            textAlign: "center", 
            borderRadius: "16px", 
            border: "1px dashed #e5e7eb",
            backgroundColor: "#f9fafb"
          }}
        >
          <EventBusyIcon sx={{ fontSize: 60, color: "#9ca3af", mb: 2 }} />
          <Typography variant="h6" color="text.primary" fontWeight="medium">
            No appointments yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4, mt: 1, maxWidth: 400, mx: "auto" }}>
            You haven't booked any appointments. Start by browsing our available doctors and scheduling a time that works for you.
          </Typography>
          <Button 
            variant="contained" 
            disableElevation
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
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 4px 20px -5px rgba(0, 0, 0, 0.05)",
                  borderColor: "primary.light"
                }
              }}
            >
              <CardContent sx={{ p: 3, pb: "24px !important" }}>
                <Box className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  
                  {/* Info Section */}
                  <Box className="flex-1">
                    <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ mb: 2 }}>
                      {appointment.doctorName}
                    </Typography>

                    <Box className="space-y-2">
                      <Box className="flex items-center text-gray-600 gap-2">
                        <CalendarTodayIcon sx={{ fontSize: 18, color: "primary.main" }} />
                        <Typography variant="body2">{formatDate(appointment.date)}</Typography>
                      </Box>
                      <Box className="flex items-center text-gray-600 gap-2">
                        <AccessTimeIcon sx={{ fontSize: 18, color: "primary.main" }} />
                        <Typography variant="body2">{appointment.time}</Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2, borderStyle: "dashed" }} />
                    
                    <Box>
                      <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}>
                        Reason for visit
                      </Typography>
                      <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
                        {appointment.reason}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Action Section */}
                  <Button
                    variant="outlined"
                    color="error"
                    // startIcon={<DeleteOutlineIcon />}
                    onClick={() => handleDelete(appointment.id)}
                    sx={{ 
                      borderRadius: "8px", 
                      textTransform: "none", 
                      alignSelf: { xs: "stretch", sm: "flex-start" },
                      borderWidth: "1px",
                      "&:hover": { borderWidth: "1px", backgroundColor: "error.50" }
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