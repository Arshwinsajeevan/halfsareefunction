"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Target: Sunday, 6 December 2026, 7:00 PM IST (+05:30)
const TARGET_DATE_MS = new Date("2026-12-06T19:00:00+05:30").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

function getTimeLeft(): TimeLeft {
  const diff = TARGET_DATE_MS - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    completed: false,
  };
}

export default function CountdownTimer() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => ({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    completed: false,
  }));

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());
    const id = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs mx-auto">
        {["Days", "Hours", "Mins", "Secs"].map((label) => (
          <div
            key={label}
            className="rounded-xl border border-[#D4AF37]/35 bg-[#4A0A17]/5 py-2.5 px-1 text-center"
          >
            <div className="font-sans text-xl sm:text-2xl font-semibold tabular-nums text-[#5E1B29]">
              --
            </div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-[#8E5B32] mt-0.5">
              {label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft.completed) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#5A0E1E]/8 px-5 py-2 text-sm font-medium text-[#5A0E1E]">
        The Celebration Has Begun
      </div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs mx-auto"
    >
      {units.map((unit) => (
        <div
          key={unit.label}
          className="rounded-xl border border-[#D4AF37]/40 bg-gradient-to-b from-[#FFFFFF]/80 to-[#F6EBDC]/75 py-2.5 px-1 text-center shadow-[0_4px_14px_rgba(90,14,30,0.05)]"
        >
          <div className="font-sans text-xl sm:text-2xl font-semibold tabular-nums tracking-tight text-[#5E1B29]">
            {String(unit.value).padStart(2, "0")}
          </div>
          <div className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.16em] font-medium text-[#8C6126] mt-0.5">
            {unit.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

