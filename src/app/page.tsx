"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import EnvelopeStage from "@/components/EnvelopeStage";
import VideoInvitation from "@/components/VideoInvitation";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/cinematic-piano-ambient.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      if (fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current);
      }
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const startAudioWithFade = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;
    audio.play().catch(() => {
      // Ignore autoplay restrictions if device blocks playback
    });

    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current);
    }

    let vol = audio.volume;
    fadeIntervalRef.current = window.setInterval(() => {
      vol = Math.min(0.42, vol + 0.03);
      audio.volume = vol;
      if (vol >= 0.42 && fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    }, 80);
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (audioRef.current) {
      audioRef.current.muted = next;
      if (!next && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setOpened(false);
  };

  return (
    <AnimatePresence>
      {!opened ? (
        <EnvelopeStage
          key="envelope"
          onStartAudio={startAudioWithFade}
          onOpenComplete={() => setOpened(true)}
        />
      ) : (
        <VideoInvitation
          key="invitation"
          isMuted={isMuted}
          onToggleMute={toggleMute}
          onReplay={handleReplay}
        />
      )}
    </AnimatePresence>
  );
}

