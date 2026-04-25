"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doctors } from "@/data/doctors";
import { addAppointment, isSlotBooked } from "@/utils/storage";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  MenuItem,
  IconButton,
  Stack,
  InputAdornment,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StethoscopeIcon from "@mui/icons-material/MedicalServices";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditNoteIcon from "@mui/icons-material/EditNote";
import VerifiedIcon from "@mui/icons-material/Verified";

// Reusable styling for our custom inputs
const modernInputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    backgroundColor: "#f8fafc", // slate-50
    transition: "all 0.3s ease",
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "#cbd5e1", // slate-300
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3b82f6", // blue-500
      borderWidth: "2px",
    },
    "&.Mui-focused": {
      backgroundColor: "#ffffff",
      boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.1)",
    },
  },
  "& .MuiInputBase-input": {
    padding: "16px 14px",
  },
};

export default function BookAppointmentPage() {
  const params = useParams();
  const router = useRouter();

  const doctorId = params.id as string;
  const doctor = doctors.find((d) => d.id === doctorId);

  const [form, setForm] = useState({
    date: "",
    time: "",
    reason: "",
  });

  const [errors, setErrors] = useState({
    date: "",
    time: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  if (!doctor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-800">Doctor not found</h2>
        <Button
          onClick={() => router.back()}
          sx={{ mt: 3, borderRadius: "10px", textTransform: "none" }}
          variant="outlined"
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

  // 🔍 VALIDATION
  const validate = () => {
    const newErrors = { date: "", time: "", reason: "" };

    if (!form.date) newErrors.date = "Please select a preferred date";

    if (!form.time) {
      newErrors.time = "Please select an available time slot";
    } else if (isSlotBooked(doctor.id, form.date, form.time)) {
      newErrors.time = "This specific slot is already booked";
    }

    if (!form.reason.trim())
      newErrors.reason =
        "Please briefly describe your symptoms or reason for visit";

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => !err);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate slight network delay 
    setTimeout(() => {
      addAppointment({
        id: crypto.randomUUID(),
        doctorId: doctor.id,
        doctorName: doctor.name,
        date: form.date,
        time: form.time,
        reason: form.reason.trim(),
      });
      router.push("/dashboard/appointments");
    }, 800);
  };

  return (
    <Box className="py-8 px-[5%] max-w-7xl mx-auto min-h-screen">
      {/* NAVIGATION */}
      <div className="flex items-center gap-3 mb-10">
        <IconButton
          onClick={() => router.back()}
          sx={{
            backgroundColor: "#f1f5f9",
            "&:hover": { backgroundColor: "#e2e8f0" },
          }}
        >
          <ArrowBackIcon sx={{ color: "#475569" }} />
        </IconButton>
        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
          Back to Doctors
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COL: DOCTOR PROFILE */}
        <div className="lg:col-span-4">
          <Card
            elevation={0}
            sx={{
              borderRadius: "24px",
              border: "1px solid #f1f5f9",
              background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
              position: "sticky",
              top: "24px",
            }}
          >
            <CardContent className="p-8 text-center flex flex-col items-center relative">
              <div className="hidden sm:flex absolute top-6 right-6">
                <Chip
                  icon={<VerifiedIcon fontSize="small" />}
                  label="Available"
                  size="small"
                  sx={{
                    bgcolor: "#ecfdf5",
                    color: "#10b981",
                    fontWeight: "bold",
                    border: "1px solid #d1fae5",
                  }}
                />
              </div>

              <Avatar
                src={doctor.avatar}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 3,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  border: "4px solid white",
                }}
              />

              <h1 className="text-2xl font-extrabold text-gray-900 mb-1">
                {doctor.name}
              </h1>

              <div className="flex items-center justify-center gap-2 text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full mb-6">
                <StethoscopeIcon fontSize="small" />
                <span className="text-sm font-bold">{doctor.specialty}</span>
              </div>

              <div className="w-full sm:bg-white rounded-2xl sm:p-5 sm:border border-gray-100 text-left">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  About
                </p>
                <p className=" text-gray-600 leading-relaxed">
                  Highly experienced specialist dedicated to providing
                  exceptional patient care and comprehensive medical
                  evaluations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COL: BOOKING FORM */}
        <div className="lg:col-span-8">
          <div className="mb-8">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Book Appointment
            </h2>
            <p className="text-gray-500 mt-2">
              Fill out the details below to secure your consultation slot.
            </p>
          </div>

          <Card
            elevation={0}
            sx={{
              borderRadius: "24px",
              border: "1px solid #f1f5f9",
              p: { xs: 2, sm: 4 },
            }}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                {/* DATE SELECTION */}
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-2 ml-1">
                    Preferred Date
                  </p>
                  <TextField
                    type="date"
                    fullWidth
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    error={!!errors.date}
                    helperText={errors.date}
                    sx={modernInputStyles}
                    
                   slotProps={{
      input: {
        startAdornment: (
          <InputAdornment 
            position="start" 
            sx={{ alignSelf: "flex-start", mt: 2, ml: 2 }}
          >
           <CalendarMonthIcon
                            sx={{ color: form.date ? "#3b82f6" : "#94a3b8" }}
                          />
          </InputAdornment>
        ),
      },
    }}
                  
                  />
                </div>

                {/* TIME SELECTION */}
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-2 ml-1">
                    Available Time Slot
                  </p>
                  <TextField
                    select
                    fullWidth
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    error={!!errors.time}
                    helperText={errors.time}
                    sx={modernInputStyles}
                    slotProps={{
      input: {
        startAdornment: (
          <InputAdornment 
            position="start" 
            sx={{ alignSelf: "flex-start", mt: 2, ml: 2 }}
          >
           <AccessTimeIcon
                            sx={{ color: form.time ? "#3b82f6" : "#94a3b8" }}
                          />
          </InputAdornment>
        ),
      },
    }}
                    
                  >
                    <MenuItem value="" disabled>
                      Select a time
                    </MenuItem>
                    {doctor.availableSlots.map((slot) => {
                      const booked =
                        form.date && isSlotBooked(doctor.id, form.date, slot);
                      return (
                        <MenuItem key={slot} value={slot} disabled={booked as boolean}>
                          {slot} {booked && "— Booked"}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </div>

                {/* REASON */}
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-2 ml-1">
                    Reason for Visit
                  </p>
                  <TextField
                    multiline
                    variant="outlined"
                    rows={4}
                    fullWidth
                    placeholder="Briefly describe your symptoms or reason for the appointment..."
                    value={form.reason}
                    onChange={(e) =>
                      setForm({ ...form, reason: e.target.value })
                    }
                    error={!!errors.reason}
                    helperText={errors.reason}
                    sx={{
                      ...modernInputStyles,
                      "& .MuiInputBase-root": { padding: "0px" },
                      "& .MuiInputBase-input": { padding: "16px" },
                    }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ alignSelf: "flex-start", mt: 2, ml: 2 }}
                          >
                            <EditNoteIcon
                              sx={{
                                color: form.reason ? "#3b82f6" : "#94a3b8",
                              }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <div className="py-3">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    fullWidth
                    sx={{
                      py: 1.6,
                      borderRadius: "14px",
                      textTransform: "none",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      background:
                        "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.6)",
                      },
                      "&:disabled": {
                        background: "#cbd5e1",
                        color: "#f8fafc",
                      },
                    }}
                  >
                    {isSubmitting ? "Booking Slot..." : "Book Appointment"}
                  </Button>
                </div>
              </Stack>
            </form>
          </Card>
        </div>
      </div>
    </Box>
  );
}
