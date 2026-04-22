"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doctors } from "@/data/doctors";
import { addAppointment, isSlotBooked } from "@/utils/storage";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  MenuItem,
  Alert,
  IconButton,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StethoscopeIcon from "@mui/icons-material/MedicalServices";

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
      <Box textAlign="center" mt={10}>
        <Typography variant="h5">Doctor not found</Typography>
        <Button onClick={() => router.back()} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  // 🔍 VALIDATION
  const validate = () => {
    const newErrors = { date: "", time: "", reason: "" };

    if (!form.date) {
      newErrors.date = "Please select a date";
    }

    if (!form.time) {
      newErrors.time = "Please select a time slot";
    } else if (isSlotBooked(doctor.id, form.date, form.time)) {
      newErrors.time = "This slot is already booked";
    }

    if (!form.reason.trim()) {
      newErrors.reason = "Please enter a reason";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((err) => !err);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    addAppointment({
      id: crypto.randomUUID(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      date: form.date,
      time: form.time,
      reason: form.reason.trim(),
    });

    router.push("/dashboard/appointments");
  };

  return (
    <Box className="py-5 px-[5%]">
      <div className="flex gap-4 mb-8">
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconButton>

        <Typography component={"span"} variant="body1" fontWeight={700}>
          Go Back
        </Typography>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* DOCTOR CARD */}
        <Card sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Avatar
              src={doctor.avatar}
              sx={{ width: 72, height: 72, borderRadius: 3 }}
            />

            <Box>
              <Typography fontWeight={700}>{doctor.name}</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <StethoscopeIcon fontSize="small" />
                <Typography color="text.secondary">
                  {doctor.specialty}
                </Typography>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        {/* FORM */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography fontWeight={600} mb={3}>
              Appointment Details
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {/* DATE */}
                <TextField
                  label="Select Date"
                  type="date"
                  fullWidth
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: today }}
                  error={!!errors.date}
                  helperText={errors.date}
                  sx={{ borderRadius: 2 }}
                />

                {/* TIME */}
                <TextField
                  select
                  label="Select Time Slot"
                  fullWidth
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  error={!!errors.time}
                  helperText={errors.time}
                >
                  {doctor.availableSlots.map((slot) => {
                    const booked =
                      form.date && isSlotBooked(doctor.id, form.date, slot);

                    return (
                      <MenuItem key={slot} value={slot} disabled={booked}>
                        {slot} {booked && "(Booked)"}
                      </MenuItem>
                    );
                  })}
                </TextField>

                {/* REASON */}
                <TextField
                  label="Reason for Visit"
                  multiline
                  rows={4}
                  fullWidth
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  error={!!errors.reason}
                  helperText={errors.reason}
                />

                {/* ACTION */}
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    py: 1.5,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  {isSubmitting ? "Booking..." : "Confirm Appointment"}
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
}
