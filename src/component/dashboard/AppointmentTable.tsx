"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
} from "@mui/material";
import { Appointment } from "@/types/interface";

interface TableProps {
  data: Appointment[];
  limit?: number;
}

export default function AppointmentTable({ data, limit = 5 }: TableProps) {
  const displayData = data.slice(0, limit);

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: "6px",
        border: "1px solid #f1f5f9",
        overflow: "hidden",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ backgroundColor: "#f8fafc" }}>
          <TableRow>
            {["ID", "Doctor", "Scheduled Date", "Time", "Status"].map(
              (head) => (
                <TableCell key={head} sx={{ py: 2 }}>
                  <span className="text-[11px] font-bold text-gray-500 tracking-wider uppercase">
                    {head}
                  </span>
                </TableCell>
              ),
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {displayData.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { backgroundColor: "#f8fafc" },
              }}
            >
              <TableCell>
                <span className="text-sm font-semibold text-blue-600">
                  #{row.id.split("-")[1] || row.id}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm font-medium text-gray-900">
                  {row.doctorName}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">
                  {new Date(row.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">{row.time}</span>
              </TableCell>
              <TableCell>
                <Chip
                  label="Confirmed"
                  size="small"
                  sx={{
                    bgcolor: "#ecfdf5",
                    color: "#10b981",
                    fontWeight: "bold",
                    borderRadius: "6px",
                    border: "1px solid #d1fae5",
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
