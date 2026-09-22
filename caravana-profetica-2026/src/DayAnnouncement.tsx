import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Nomes dos dias em extenso — estilo documentário
const DAY_NAMES: Record<number, string> = {
  1:  "Primeiro Dia",
  2:  "Segundo Dia",
  3:  "Terceiro Dia",
  4:  "Quarto Dia",
  5:  "Quinto Dia",
  6:  "Sexto Dia",
  7:  "Sétimo Dia",
  8:  "Oitavo Dia",
  9:  "Nono Dia",
  10: "Décimo Dia",
};

interface DayAnnouncementProps {
  day: number;
  subtitle: string;   // destino do dia (ex: "Roma Eterna")
  accentColor: string;
  color: string;      // cor de fundo do slide
}

// Duração da cartela em frames (2.8s @ 30fps)
export const ANNOUNCEMENT_DURATION = 84;
const FADE_OUT_START = 64;

export const DayAnnouncement: React.FC<DayAnnouncementProps> = ({
  day,
  subtitle,
  accentColor,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dayName = DAY_NAMES[day];
  if (!dayName) return null;

  // Overlay escuro aparece imediatamente
  const overlayOpacity = interpolate(
    frame,
    [0, 6, FADE_OUT_START, ANNOUNCEMENT_DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Linha dourada cresce da esquerda
  const lineWidth = interpolate(
    spring({ frame, fps, config: { damping: 22, stiffness: 100 }, delay: 8 }),
    [0, 1],
    [0, 320]
  );

  // Número do dia — entra rápido
  const numOpacity = spring({ frame, fps, config: { damping: 20, stiffness: 120 }, delay: 10 });

  // Nome principal — sobe do centro
  const nameY = interpolate(
    spring({ frame, fps, config: { damping: 18, stiffness: 90 }, delay: 16 }),
    [0, 1],
    [40, 0]
  );
  const nameOpacity = spring({ frame, fps, config: { damping: 20, stiffness: 90 }, delay: 16 });

  // Segunda linha — destino
  const subtitleOpacity = spring({ frame, fps, config: { damping: 20, stiffness: 70 }, delay: 30 });

  if (frame >= ANNOUNCEMENT_DURATION) return null;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #050508 0%, ${color}ee 100%)`,
        opacity: overlayOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
      }}
    >
      {/* Linha dourada horizontal */}
      <div
        style={{
          width: lineWidth,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          marginBottom: 28,
        }}
      />

      {/* Número do dia — pequeno, espaçado */}
      <div
        style={{
          fontSize: 13,
          letterSpacing: 10,
          color: accentColor,
          fontFamily: "Arial, sans-serif",
          fontWeight: 700,
          textTransform: "uppercase",
          opacity: numOpacity,
          marginBottom: 18,
        }}
      >
        {String(day).padStart(2, "0")}
      </div>

      {/* Nome do dia — destaque máximo */}
      <div
        style={{
          fontSize: 96,
          fontWeight: 900,
          color: "#ffffff",
          fontFamily: "Georgia, serif",
          letterSpacing: -2,
          lineHeight: 1,
          opacity: nameOpacity,
          transform: `translateY(${nameY}px)`,
          textShadow: `0 0 80px ${accentColor}55`,
          textAlign: "center",
        }}
      >
        {dayName}
      </div>

      {/* Destino do dia */}
      <div
        style={{
          marginTop: 24,
          fontSize: 20,
          color: "rgba(255,255,255,0.55)",
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          letterSpacing: 1,
          opacity: subtitleOpacity,
          textAlign: "center",
        }}
      >
        {subtitle}
      </div>

      {/* Linha dourada inferior */}
      <div
        style={{
          width: lineWidth,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          marginTop: 28,
        }}
      />
    </AbsoluteFill>
  );
};
