"use client";

import { Doctor } from "@/types/interface";
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Avatar, 
  Chip, 
  Button, 
  Divider 
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
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-4px)",
          borderColor: "primary.light"
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Profile Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar 
            src={doctor.avatar} 
            alt={doctor.name}
            sx={{ width: 64, height: 64, borderRadius: "12px", bgcolor: "primary.light" }}
          />
          <Box>
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              {doctor.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary" }}>
              <StethoscopeIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2">{doctor.specialty}</Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2, borderStyle: "dashed" }} />

        {/* Availability Section */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
            <AccessTimeIcon sx={{ fontSize: 18, color: "primary.main" }} />
            <Typography variant="subtitle2" fontWeight="bold">
              Available Slots
            </Typography>
          </Box>
          
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {doctor.availableSlots.slice(0, 4).map((slot) => (
              <Chip 
                key={slot} 
                label={slot} 
                size="small" 
                sx={{ 
                  borderRadius: "6px", 
                  bgcolor: "blue.50", 
                  color: "primary.main",
                  fontWeight: "medium",
                  border: "none"
                }} 
              />
            ))}
            {doctor.availableSlots.length > 4 && (
              <Typography variant="caption" color="text.secondary" sx={{ alignSelf: "center" }}>
                +{doctor.availableSlots.length - 4} more
              </Typography>
            )}
          </Box>
        </Box>

        {/* Action Button */}
        <Button
          fullWidth
          variant="contained"
          disableElevation
          onClick={() => router.push(`/dashboard/appointments/book/${doctor.id}`)}
          sx={{ 
            borderRadius: "10px", 
            textTransform: "none", 
            fontWeight: "bold",
            py: 1.2
          }}
        >
          Book Appointment
        </Button>
      </CardContent>
    </Card>
  );
}