"use client";

import { Doctor } from "@/types/interface";
import {
  Card,
  CardContent,
  Box,
  Avatar,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import StethoscopeIcon from "@mui/icons-material/MedicalServices";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useRouter } from "next/navigation";

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const router = useRouter();

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: "1px solid #f3f4f6",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-4px)",
          borderColor: "primary.light",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* PROFILE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar
            src={doctor.avatar}
            alt={doctor.name}
            sx={{
              width: 64,
              height: 64,
              borderRadius: "12px",
              bgcolor: "primary.light",
            }}
          />

          <Box>
            <h3 className="text-lg font-bold text-gray-900">
              {doctor.name}
            </h3>

            <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
              <StethoscopeIcon sx={{ fontSize: 16 }} />
              <span>{doctor.specialty}</span>
            </div>
          </Box>
        </Box>

        <Divider sx={{ my: 2, borderStyle: "dashed" }} />

        {/* AVAILABILITY */}
        <Box sx={{ mb: 3 }}>
          <div className="flex items-center gap-1 mb-2 text-sm font-semibold text-gray-700">
            <AccessTimeIcon sx={{ fontSize: 18 }} />
            <span>Available Slots</span>
          </div>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {doctor.availableSlots.slice(0, 4).map((slot) => (
              <Chip
                key={slot}
                label={slot}
                size="small"
                sx={{
                  borderRadius: "6px",
                  bgcolor: "#eff6ff",
                  color: "#2563eb",
                  fontWeight: 500,
                }}
              />
            ))}

            {doctor.availableSlots.length > 4 && (
              <span className="text-xs text-gray-500 self-center">
                +{doctor.availableSlots.length - 4} more
              </span>
            )}
          </Box>
        </Box>

        {/* ACTION */}
        <Button
          fullWidth
          variant="contained"
          disableElevation
          onClick={() =>
            router.push(`/dashboard/appointments/book/${doctor.id}`)
          }
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "bold",
            py: 1.2,
          }}
        >
          Book Appointment
        </Button>
      </CardContent>
    </Card>
  );
}