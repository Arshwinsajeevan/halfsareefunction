"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  MapPin,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Calendar,
  Sparkles,
} from "lucide-react";
import CountdownTimer from "./CountdownTimer";

interface VideoInvitationProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onReplay: () => void;
}

const EASE_CINEMATIC: [number, number, number, number] = [0.22, 1, 0.36, 1];
const MAP_URL = "https://maps.app.goo.gl/Z5RJub9TTYSAPntu9";
const RSVP_PHONE = "9972563679";

function FloralDivider({ light = false }: { light?: boolean }) {
  const stroke = light ? "rgba(232, 201, 122, 0.5)" : "rgba(155, 110, 44, 0.42)";
  const accent = light ? "#E8C97A" : "#9A6B2F";
  return (
    <div className="flex items-center justify-center gap-3 my-4 sm:my-5">
      <span
        className="h-px w-12 sm:w-16"
        style={{
          background: `linear-gradient(90deg, transparent, ${stroke})`,
        }}
      />
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 3C13.8 7 17 10.2 21 12C17 13.8 13.8 17 12 21C10.2 17 7 13.8 3 12C7 10.2 10.2 7 12 3Z"
          stroke={accent}
          strokeWidth="1.4"
          fill={accent}
          fillOpacity="0.16"
        />
      </svg>
      <span
        className="h-px w-12 sm:w-16"
        style={{
          background: `linear-gradient(90deg, ${stroke}, transparent)`,
        }}
      />
    </div>
  );
}

export default function VideoInvitation({
  isMuted,
  onToggleMute,
  onReplay,
}: VideoInvitationProps) {
  const [isAutoGlide, setIsAutoGlide] = useState(true);
  const autoGlideRef = useRef(true);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    autoGlideRef.current = isAutoGlide;
  }, [isAutoGlide]);

  const startGlideLoop = () => {
    if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    let lastTime = 0;
    let virtualY = window.scrollY;

    const step = (ts: number) => {
      if (!autoGlideRef.current) return;
      if (lastTime === 0) lastTime = ts;
      const dt = Math.min((ts - lastTime) / 1000, 0.05);
      lastTime = ts;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (virtualY >= maxScroll - 1) {
        autoGlideRef.current = false;
        setIsAutoGlide(false);
        return;
      }

      // Accumulate sub-pixel scroll smoothly without browser smooth-scroll fighting
      virtualY = Math.min(maxScroll, virtualY + 38 * dt);
      window.scrollTo({ top: virtualY, behavior: "instant" as ScrollBehavior });
      rafRef.current = window.requestAnimationFrame(step);
    };

    rafRef.current = window.requestAnimationFrame(step);
  };

  // Smooth video-like auto-glide that yields instantly when the user touches or scrolls
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

    let startTimer = 0;

    const stopOnUserInteraction = () => {
      if (autoGlideRef.current) {
        autoGlideRef.current = false;
        setIsAutoGlide(false);
        if (rafRef.current) {
          window.cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        }
      }
    };

    window.addEventListener("touchstart", stopOnUserInteraction, { passive: true });
    window.addEventListener("wheel", stopOnUserInteraction, { passive: true });
    window.addEventListener("pointerdown", stopOnUserInteraction, { passive: true });

    // Wait 4s after the opening card's 2.5s text reveal finishes so guests can read it completely
    startTimer = window.setTimeout(() => {
      if (autoGlideRef.current) {
        startGlideLoop();
      }
    }, 6500);

    return () => {
      window.clearTimeout(startTimer);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("touchstart", stopOnUserInteraction);
      window.removeEventListener("wheel", stopOnUserInteraction);
      window.removeEventListener("pointerdown", stopOnUserInteraction);
    };
  }, []);

  const toggleAutoGlide = () => {
    if (isAutoGlide) {
      autoGlideRef.current = false;
      setIsAutoGlide(false);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
      return;
    }
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= maxScroll - 10) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
    autoGlideRef.current = true;
    setIsAutoGlide(true);
    startGlideLoop();
  };

  return (
    <motion.div
      key="video-invitation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.85, ease: EASE_CINEMATIC }}
      className="relative min-h-[100dvh] w-full overflow-x-hidden"
    >
      {/* Fixed Burgundy Peony Theme Backdrop with softened contrast */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-20"
        style={{ backgroundImage: "url('/images/floral-bg.jpg')" }}
      />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(68,18,28,0.52)_0%,rgba(74,20,32,0.48)_50%,rgba(52,12,22,0.68)_100%)]" />

      {/* Subtle ambient golden sparkles */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {[
          { left: "10%", top: "18%", delay: "0s" },
          { left: "88%", top: "24%", delay: "1.4s" },
          { left: "14%", top: "64%", delay: "2.3s" },
          { left: "86%", top: "78%", delay: "0.9s" },
        ].map((dot, idx) => (
          <span
            key={idx}
            style={{ left: dot.left, top: dot.top, animationDelay: dot.delay }}
            className="animate-float-slow absolute h-1.5 w-1.5 rounded-full bg-[#E8C97A]/40"
          />
        ))}
      </div>

      {/* Floating Glass Control Bar */}
      <div
        className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 rounded-full border border-[#E8C97A]/35 bg-[#46131E]/82 backdrop-blur-md px-2.5 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={toggleAutoGlide}
          aria-label={isAutoGlide ? "Pause auto scroll" : "Play auto scroll"}
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium text-[#F6E3A8] hover:bg-white/10 transition-colors cursor-pointer"
        >
          {isAutoGlide ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Playing</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Auto-Play</span>
            </>
          )}
        </button>

        <span className="h-3.5 w-px bg-[#E8C97A]/25" />

        <button
          type="button"
          onClick={onToggleMute}
          aria-label={isMuted ? "Unmute music" : "Mute music"}
          className="p-1.5 rounded-full text-[#F6E3A8] hover:bg-white/10 transition-colors cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>

        <button
          type="button"
          onClick={onReplay}
          aria-label="Replay envelope opening"
          className="p-1.5 rounded-full text-[#F6E3A8] hover:bg-white/10 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Centered Mobile-First Editorial Column */}
      <main className="relative mx-auto w-full max-w-[460px] px-4 pt-6 pb-24 space-y-8 sm:space-y-10">
        {/* ================================================================
            SCENE 1: MAIN INVITATION DETAILS (Recreated cleanly from Image 1)
           ================================================================ */}
        <motion.section
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.95, ease: EASE_CINEMATIC }}
          className="relative rounded-[28px] bg-[#FCF8F2]/94 paper-grain text-[#5C1C29] px-5 sm:px-7 py-6 sm:py-7 shadow-[0_22px_60px_rgba(32,5,11,0.45)] border-2 border-[#D4AF37]/70 overflow-hidden"
        >
          {/* Inner hairline ornamental border */}
          <div className="pointer-events-none absolute inset-2.5 rounded-[20px] border border-[#7C2939]/22" />

          {/* Top Botanical Header in Layout Flow (Zero overlap with text) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.95, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: EASE_CINEMATIC }}
            className="relative z-10 flex items-start justify-between pointer-events-none select-none -mx-1 mb-2"
          >
            <img
              src="/images/peony-cluster.png"
              alt=""
              aria-hidden="true"
              className="w-28 sm:w-32 h-auto"
            />
            <img
              src="/images/peony-cluster.png"
              alt=""
              aria-hidden="true"
              className="w-24 sm:w-28 h-auto -scale-x-100 opacity-90"
            />
          </motion.div>

          {/* Choreographed Video-Title Text Reveals */}
          <div className="relative z-10 text-center px-1">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.75, ease: EASE_CINEMATIC }}
            >
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#9A6826] font-semibold">
                With Love &amp; Blessings of
              </p>
              <div className="mt-2 font-serif-editorial text-[16px] sm:text-[17px] leading-relaxed font-semibold text-[#541925]">
                <p>Dr. Bachina Chenchu Garataiah</p>
                <p>Mrs. Ratna Kumari</p>
                <p className="text-[#9A6826] text-sm my-0.5">&amp;</p>
                <p>Mr. Krishna - Mrs. Padmavathi</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.75, ease: EASE_CINEMATIC }}
              className="mt-4"
            >
              <p className="font-serif-editorial italic text-[16px] sm:text-[17px] text-[#6B2734] leading-snug">
                Joyfully invite you to celebrate
                <br />
                their beloved granddaughter
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.85, ease: EASE_CINEMATIC }}
              className="mt-3"
            >
              <h2 className="font-script-calligraphy font-normal text-[50px] sm:text-[58px] leading-[1.12] tracking-wide text-[#6B182A]">
                Aarna&apos;s
              </h2>
              <p className="font-serif-editorial text-[17px] sm:text-[20px] font-bold tracking-[0.18em] text-[#541925] uppercase mt-1.5">
                Half Saree Ceremony
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.75, ease: EASE_CINEMATIC }}
              className="mt-3.5"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#9A6826] font-medium">
                Daughter of
              </p>
              <p className="font-serif-editorial text-[17px] sm:text-[18px] font-semibold text-[#541925] mt-0.5">
                Mr. Krishna Chaitanya
                <br />
                &amp; Mrs. Neetu Krishna
              </p>
            </motion.div>

            <FloralDivider />

            {/* Date & Time Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.45, duration: 0.75, ease: EASE_CINEMATIC }}
            >
              <div className="inline-flex items-center justify-center gap-3 sm:gap-4 font-serif-editorial text-[#5E1B29]">
                <span className="text-sm sm:text-base font-bold tracking-[0.16em] uppercase">
                  Sunday
                </span>
                <span className="h-6 w-px bg-[#C99B3B]/60" />
                <span className="font-sans text-2xl sm:text-3xl font-bold leading-none tabular-nums text-[#6E1A2D]">
                  6
                </span>
                <span className="h-6 w-px bg-[#C99B3B]/60" />
                <span className="text-sm sm:text-base font-bold tracking-[0.16em] uppercase">
                  December
                </span>
              </div>
              <p className="text-xs uppercase tracking-[0.26em] text-[#9A6826] font-semibold mt-1">
                2026 &bull; 7:00 PM Onwards
              </p>

              <div className="mt-4">
                <CountdownTimer />
              </div>
            </motion.div>

            <FloralDivider />

            {/* Venue & Plain RSVP Text */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.75, duration: 0.75, ease: EASE_CINEMATIC }}
              className="space-y-2.5"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#9A6826] font-semibold">
                  Venue
                </p>
                <p className="font-serif-editorial text-[19px] sm:text-[20px] font-bold tracking-[0.06em] text-[#541925] uppercase mt-1">
                  Eventara Convention
                </p>
                <p className="text-sm text-[#6E3440] leading-relaxed">
                  Near Neopolis, Vattinagulapally
                  <br />
                  Hyderabad
                </p>
              </div>

              <p className="pt-1 font-sans text-[13px] sm:text-sm font-semibold tracking-[0.12em] tabular-nums text-[#6B182A]">
                RSVP : {RSVP_PHONE}
              </p>
            </motion.div>
          </div>

          {/* Bottom Botanical Footer in Layout Flow (Zero overlap with text) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.92, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: EASE_CINEMATIC }}
            className="relative z-10 flex items-end justify-between pointer-events-none select-none -mx-1 mt-2"
          >
            <img
              src="/images/peony-cluster.png"
              alt=""
              aria-hidden="true"
              className="w-24 sm:w-28 h-auto -scale-y-100 opacity-90"
            />
            <img
              src="/images/peony-cluster.png"
              alt=""
              aria-hidden="true"
              className="w-28 sm:w-32 h-auto rotate-180"
            />
          </motion.div>
        </motion.section>

        {/* ================================================================
            SCENE 2: SECONDARY DETAILS (Image 2 — Softened Burgundy Card)
           ================================================================ */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
          className="relative rounded-[26px] border border-[#E8C97A]/40 bg-[linear-gradient(160deg,rgba(104,36,50,0.96)_0%,rgba(84,26,38,0.97)_100%)] px-6 sm:px-8 py-9 sm:py-10 text-center shadow-[0_20px_50px_rgba(32,5,11,0.38)] overflow-hidden will-change-transform"
        >
          <div className="pointer-events-none absolute inset-2.5 rounded-[18px] border border-[#E8C97A]/22" />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.12, duration: 0.75, ease: EASE_CINEMATIC }}
            className="relative z-10"
          >
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#E8C97A]/40 bg-[#E8C97A]/12 text-[#F3D992] mb-4">
              <Sparkles className="w-4 h-4" />
            </div>

            <p className="font-serif-editorial italic text-[20px] sm:text-[22px] leading-relaxed text-[#F9EBC3]">
              &ldquo;A beautiful milestone, a precious moment and a celebration
              of cherished traditions!&rdquo;
            </p>

            <FloralDivider light />

            <p className="font-serif-editorial text-[17px] sm:text-[18px] leading-relaxed text-[#F9EFF1]/95">
              With immense joy and heartfelt happiness, we cordially invite you
              and your family to grace the auspicious occasion of the
            </p>

            <p className="font-serif-editorial text-[23px] sm:text-[25px] font-bold tracking-[0.06em] text-gold-foil mt-2.5">
              Half Saree Ceremony
            </p>

            <p className="font-serif-editorial text-[17px] sm:text-[18px] text-[#F9EFF1]/95 mt-1.5">
              of our beloved granddaughter{" "}
              <span className="font-script-calligraphy font-normal text-3xl text-[#F7E5B2] ml-1">
                Aarna
              </span>
            </p>
          </motion.div>
        </motion.section>

        {/* ================================================================
            SCENE 3: LOCATION QR CODE & MAP LINK (Image 3)
           ================================================================ */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
          className="relative rounded-[26px] bg-[#FCF8F2]/94 paper-grain text-[#5C1C29] border-2 border-[#D4AF37]/70 px-6 sm:px-8 py-9 text-center shadow-[0_20px_50px_rgba(32,5,11,0.38)] overflow-hidden will-change-transform"
        >
          <div className="pointer-events-none absolute inset-2.5 rounded-[18px] border border-[#7C2939]/20" />

          <div className="relative z-10">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#9A6826] font-semibold">
              Directions &amp; Venue
            </p>
            <h3 className="font-serif-editorial text-2xl sm:text-[26px] font-bold text-[#541925] mt-1">
              Eventara Convention
            </h3>
            <p className="text-xs sm:text-sm text-[#703642] mt-1">
              Near Neopolis, Vattinagulapally, Hyderabad
            </p>

            {/* Clean Scannable QR Code */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.15, duration: 0.75, ease: EASE_CINEMATIC }}
              className="mt-5 inline-flex flex-col items-center rounded-2xl border border-[#D4AF37]/50 bg-white p-4 shadow-[0_10px_28px_rgba(74,10,23,0.07)]"
            >
              <QRCodeSVG
                value={MAP_URL}
                size={164}
                bgColor="#FFFFFF"
                fgColor="#541925"
                level="M"
                includeMargin={false}
              />
              <span className="mt-2.5 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#7E2436]">
                Scan for Location
              </span>
            </motion.div>

            {/* 1-Tap Navigation & Calendar Buttons */}
            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6B1C2D] via-[#802337] to-[#6B1C2D] text-[#FCF8F2] py-3 px-5 text-sm font-semibold tracking-wide shadow-[0_10px_24px_rgba(90,14,30,0.25)] hover:brightness-110 active:scale-[0.99] transition-all"
              >
                <MapPin className="w-4 h-4 text-[#E8C97A]" />
                <span>Open Venue in Google Maps</span>
              </a>

              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Aarna%27s+Half+Saree+Ceremony&dates=20261206T133000Z/20261206T173000Z&details=With+Love+%26+Blessings+of+the+Family.+Eventara+Convention%2C+Hyderabad.&location=Eventara+Convention%2C+Near+Neopolis%2C+Vattinagulapally%2C+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#7C2939]/30 bg-white/80 py-2.5 px-4 text-xs font-semibold text-[#5E1B29] hover:bg-white transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-[#9A6826]" />
                <span>Save Date to Calendar</span>
              </a>
            </div>
          </div>
        </motion.section>

        {/* ================================================================
            SCENE 4: ALL ARE WELCOME & FOOTER (Softened Burgundy Card)
           ================================================================ */}
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: EASE_CINEMATIC }}
          className="relative rounded-[26px] border border-[#E8C97A]/35 bg-[linear-gradient(160deg,rgba(104,36,50,0.96)_0%,rgba(84,26,38,0.97)_100%)] px-6 py-8 text-center shadow-[0_20px_50px_rgba(32,5,11,0.38)] will-change-transform"
        >
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#F3D992] font-medium">
            With Warmth &amp; Gratitude
          </p>
          <h3 className="font-script-calligraphy font-normal text-[38px] sm:text-[42px] leading-tight text-[#FCF8F2] mt-2 tracking-wide">
            All Are Welcome
          </h3>
          <FloralDivider light />
          <p className="font-serif-editorial text-[16px] sm:text-[17px] leading-relaxed text-[#F7ECEE]/95 max-w-sm mx-auto">
            Your presence, love, and heartfelt blessings will make Aarna&apos;s
            Half Saree Ceremony truly unforgettable. We eagerly look forward to
            celebrating with all our family and friends.
          </p>

          <div className="mt-6 pt-5 border-t border-[#E8C97A]/20 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={onReplay}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#E8C97A]/40 bg-[#5C1A28]/70 px-4 py-1.5 text-xs font-medium text-[#F6E3A8] hover:bg-[#6E2031] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Invitation</span>
            </button>

            <a
              href="https://www.inviteus.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.12em] text-[#F2DCE0]/75 hover:text-[#F3D992] transition-colors"
            >
              Crafted with ♥ by{" "}
              <span className="underline underline-offset-2">InviteUs</span>
            </a>
          </div>
        </motion.section>
      </main>
    </motion.div>
  );
}
