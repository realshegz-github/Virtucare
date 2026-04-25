"use client";
import { DoctorCard } from "@/component/dashboard/DoctorCard";
import { doctors } from "@/data/doctors";
import { Stethoscope } from "lucide-react";

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-[5%] py-5">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {/* <Stethoscope className="w-8 h-8 text-blue-600" /> */}
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Available Doctors
            </h1>
          </div>
          <p className="text-gray-600">
            Browse our experienced healthcare professionals and book an
            appointment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
}
