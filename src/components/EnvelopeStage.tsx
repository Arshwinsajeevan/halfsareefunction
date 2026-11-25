"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EnvelopeStageProps {
  onOpenComplete: () => void;
  onStartAudio: () => void;
}

const EASE_CINEMATIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function EnvelopeStage({
  onOpenComplete,
  onStartAudio,
}: EnvelopeStageProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isVideoMode, setIsVideoMode] = useState(false);

  useEffect(() => {
    setIsVideoMode(
      new URLSearchParams(window.location.search).get("video") === "1"
    );
  }, []);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    onStartAudio();
    window.setTimeout(() => {
      onOpenComplete();
    }, 1550);
  };

  return (
    <motion.div
      key="envelope-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-5 py-8 overflow-hidden select-none"
    >
      {/* Burgundy floral backdrop matching Image 4 & Image 5 mood */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url('/images/floral-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(72,18,30,0.42)_0%,rgba(48,10,19,0.72)_75%,rgba(34,6,12,0.84)_100%)]" />

      {/* Subtle ambient golden dust motes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { left: "16%", top: "22%", delay: "0s" },
          { left: "82%", top: "18%", delay: "1.2s" },
          { left: "24%", top: "76%", delay: "2.1s" },
          { left: "78%", top: "72%", delay: "0.7s" },
        ].map((dot, i) => (
          <span
            key={i}
            style={{ left: dot.left, top: dot.top, animationDelay: dot.delay }}
            className="animate-float-slow absolute h-1.5 w-1.5 rounded-full bg-[#E8C97A]/55 blur-[0.5px]"
          />
        ))}
      </div>

      {/* Top subtle prelude */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? -18 : 0 }}
        transition={{ duration: 0.65, ease: EASE_CINEMATIC }}
        className="relative z-10 text-center mb-7 sm:mb-9"
      >
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#F6E3A8] font-semibold drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)]">
          With Love &amp; Blessings
        </p>
        <h1 className="font-serif-editorial font-semibold text-4xl sm:text-5xl text-[#FCF8F2] mt-1 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
          Aarna&apos;s
        </h1>
        <p className="font-serif-editorial font-semibold text-xs sm:text-sm uppercase tracking-[0.24em] text-[#FCF8F2] mt-1 drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]">
          Half Saree Ceremony
        </p>
      </motion.div>

      {/* Interactive Matte Burgundy Envelope + Wax Seal (inspired by Image 5) */}
      <motion.button
        type="button"
        onClick={handleOpen}
        aria-label="Tap to open Aarna's Half Saree Ceremony invitation"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{
          opacity: 1,
          y: isOpening ? 24 : 0,
          scale: isOpening ? 1.03 : 1,
        }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
        className="relative z-10 w-full max-w-[338px] sm:max-w-[376px] aspect-[1.42/1] cursor-pointer focus:outline-none group"
        style={{ perspective: "1200px" }}
      >
        {/* Soft studio drop shadow underneath envelope */}
        <div className="absolute -inset-2 rounded-2xl bg-black/65 blur-2xl translate-y-4 pointer-events-none" />

        {/* Envelope back base */}
        <div
          className="relative w-full h-full rounded-xl overflow-visible shadow-[0_24px_60px_rgba(0,0,0,0.75)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Inner floral lining visible as flap opens */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden border border-[#D4AF37]/30"
            style={{
              background:
                "linear-gradient(160deg, #3D0712 0%, #56101F 55%, #34050E 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-30 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/floral-bg.jpg')" }}
            />
          </div>

          {/* Rising Ivory Invitation Card peeking & sliding out */}
          <motion.div
            initial={{ y: 8, opacity: 0.92 }}
            animate={
              isOpening
                ? { y: -115, opacity: 1, scale: 1.04 }
                : { y: 8, opacity: 0.95, scale: 1 }
            }
            transition={{
              delay: isOpening ? 0.45 : 0,
              duration: 0.95,
              ease: EASE_CINEMATIC,
            }}
            className="absolute inset-x-3.5 top-3 bottom-3 rounded-lg bg-[#FCF8F2] border border-[#D4AF37]/60 shadow-[0_-6px_25px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center px-4 text-center"
            style={{ zIndex: 2 }}
          >
            <div className="w-full h-full border border-[#6E1225]/20 rounded-md flex flex-col items-center justify-center py-2">
              <span className="text-[9px] uppercase tracking-[0.26em] text-[#9E6F2B]">
                Cordially Invited
              </span>
              <span className="font-serif-editorial font-semibold text-2xl text-[#5E1927] leading-tight mt-0.5">
                Aarna&apos;s
              </span>
              <span className="font-serif-editorial text-[11px] uppercase tracking-[0.2em] text-[#4A0A17] font-semibold">
                Half Saree Ceremony
              </span>
            </div>
          </motion.div>

          {/* Envelope Front Pocket (Left, Right, Bottom Matte Burgundy Flaps) */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
            style={{ zIndex: 3 }}
          >
            {/* Left fold */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 52% 54%, 0 100%)",
                background:
                  "linear-gradient(125deg, #5F1423 0%, #4A0C18 100%)",
              }}
            />
            {/* Right fold */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(100% 0, 48% 54%, 100% 100%)",
                background:
                  "linear-gradient(235deg, #5B1221 0%, #440A15 100%)",
              }}
            />
            {/* Bottom fold */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 100%, 50% 48%, 100% 100%)",
                background:
                  "linear-gradient(180deg, #681828 0%, #4A0C18 55%, #3C0712 100%)",
                boxShadow: "inset 0 2px 10px rgba(0,0,0,0.45)",
              }}
            />
            {/* Subtle fold seam highlights */}
            <svg
              viewBox="0 0 100 70"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full opacity-30"
            >
              <line
                x1="0"
                y1="70"
                x2="50"
                y2="34"
                stroke="#E8C97A"
                strokeWidth="0.35"
              />
              <line
                x1="100"
                y1="70"
                x2="50"
                y2="34"
                stroke="#E8C97A"
                strokeWidth="0.35"
              />
            </svg>
          </div>

          {/* Top Triangular Envelope Flap (Hinges Open in 3D) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpening ? -175 : 0 }}
            transition={{
              delay: isOpening ? 0.22 : 0,
              duration: 0.78,
              ease: EASE_CINEMATIC,
            }}
            className="absolute inset-x-0 top-0 h-[62%] pointer-events-none"
            style={{
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              zIndex: isOpening ? 1 : 4,
            }}
          >
            <div
              className="w-full h-full rounded-t-xl"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background:
                  "linear-gradient(180deg, #6E1A2B 0%, #58101F 68%, #470A16 100%)",
                filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.55))",
              }}
            />
          </motion.div>

          {/* Sculpted Burgundy & Antique Gold Wax Seal */}
          <AnimatePresence>
            {!isOpening && (
              <motion.div
                key="wax-seal"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.28, opacity: 0, y: -12 }}
                transition={{ duration: 0.38, ease: EASE_CINEMATIC }}
                className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
              >
                {/* Gentle pulsing outer halo */}
                <motion.div
                  animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.15, 0.45] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-3 rounded-full bg-[#D4AF37]/30 blur-md"
                />

                {/* Wax disc with organic sculpted border */}
                <div
                  className="relative w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full flex items-center justify-center shadow-[0_8px_22px_rgba(0,0,0,0.65),inset_0_2px_4px_rgba(255,220,160,0.35),inset_0_-4px_8px_rgba(30,2,8,0.75)]"
                  style={{
                    background:
                      "radial-gradient(circle at 32% 28%, #9B263D 0%, #6B1224 48%, #410612 100%)",
                    border: "2px solid rgba(224, 188, 96, 0.72)",
                  }}
                >
                  {/* Inner stamped wax ring */}
                  <div className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full border border-[#E8C97A]/65 flex items-center justify-center bg-[radial-gradient(circle_at_35%_30%,rgba(232,201,122,0.18),rgba(46,4,13,0.45))]">
                    <span className="font-script-calligraphy font-normal text-[27px] sm:text-[30px] text-[#F4DDA1] leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
                      A
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      {/* Tap to Open Prompt (hidden in video recording mode) */}
      {!isVideoMode && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? 10 : 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: EASE_CINEMATIC }}
          className="relative z-10 mt-8 sm:mt-10 text-center"
        >
          <button
            type="button"
            onClick={handleOpen}
            className="inline-flex flex-col items-center cursor-pointer focus:outline-none"
          >
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-[#E8C97A]/45 bg-[#4D1220]/75 backdrop-blur-sm px-6 py-2.5 text-xs sm:text-sm uppercase tracking-[0.22em] text-[#F6E3A8] shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
            >
              Tap to Open
            </motion.span>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

