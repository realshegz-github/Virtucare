"use client";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@mui/material";



export default function LandingPage() {

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* --- HERO BANNER --- */}
      <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden  px-6 lg:px-20 py-16">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50 -z-0" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-50 -z-0" />

        <div className="grid lg:grid-cols-2 gap-14 items-center w-full max-w-7xl mx-auto relative z-10">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6"
            >
              Trusted Healthcare Booking Platform
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
            >
              Your Health, Our Priority — Book Trusted Doctors Easily
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl"
            >
              Find top specialists, schedule appointments, and manage your
              healthcare journey with ease using VirtuCare. Fast, secure, and
              designed for better patient experiences.
            </motion.p>

            <div className="flex gap-4 w-full mt-8 flex-wrap">
              <Link href="/dashboard/doctor" className="w-full sm:w-max">
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: "8px",
                    paddingInline: "28px",
                    paddingBlock: "12px",
                    textTransform: "none",
                    fontWeight: 600,
                    backgroundColor:"#2563eb",
                  width:"100%"
                    
                  }}
                >
                  Find a Doctor
                </Button>
              </Link>

              <Link href="/dashboard"className="w-full sm:w-max">
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: "8px",
                    paddingInline: "28px",
                    paddingBlock: "12px",
                    textTransform: "none",
                    fontWeight: 600,
                    width:"100%"
                  }}
                >
                  Book Appointment
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex gap-8 flex-wrap text-sm text-gray-600">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">100+</h3>
                <p>Verified Doctors</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
                <p>Patient Support</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">10K+</h3>
                <p>Appointments Booked</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative h-[329px] md:h-[550px] w-full rounded-[32px] overflow-hidden shadow-2xl border border-white/50">
              <Image
                src="/hero-img.jpg"
                alt="Doctor consultation"
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-5 border">
              <p className="text-sm text-gray-500">Quick Access</p>
              <h4 className="font-semibold text-gray-900">
                Book in less than 2 mins
              </h4>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
