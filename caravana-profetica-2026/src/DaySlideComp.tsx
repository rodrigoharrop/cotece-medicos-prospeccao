import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { DaySlide, AUDIO_DURATIONS } from "./data";
import { NarrationCaption } from "./NarrationCaption";
import { SlideAudio } from "./SlideAudio";
import { DayAnnouncement, ANNOUNCEMENT_DURATION } from "./DayAnnouncement";

const COUNTRY_FLAGS: Record<string, string> = {
  italy: "🇮🇹",
  egypt: "🇪🇬",
  israel: "🇮🇱",
  closing: "✈️",
  intro: "✡️",
};

const COUNTRY_LABEL: Record<string, string> = {
  italy: "ITÁLIA",
  egypt: "EGITO",
  israel: "ISRAEL",
  closing: "",
  intro: "",
};

export const DaySlideComp: React.FC<{ slide: DaySlide }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const dayBadge = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, delay: 4 });
  // Deslocamento pequeno (12px) e spring rápido — título aparece limpo sem sumir no rodapé
  const titleY = interpolate(
    spring({ frame, fps, config: { damping: 20, stiffness: 160 }, delay: 6 }),
    [0, 1],
    [12, 0]
  );
  const titleOpacity = spring({ frame, fps, config: { damping: 20, stiffness: 160 }, delay: 6 });
  const descOpacity = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 22 });
  const highlightsOpacity = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 34 });
  const locationOpacity = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 46 });
  const lineWidth = spring({ frame, fps, config: { damping: 20, stiffness: 80 }, delay: 16 });

  const exitProgress = interpolate(frame, [durationInFrames - 27, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ken Burns: primary image pans left, secondary pans right
  const bgPan1 = interpolate(frame, [0, durationInFrames], [-2, 2]);
  const bgScale1 = interpolate(frame, [0, durationInFrames], [1.04, 1.12]);
  const bgPan2 = interpolate(frame, [0, durationInFrames], [2, -1]);
  const bgScale2 = interpolate(frame, [0, durationInFrames], [1.06, 1]);

  // Opacidade da imagem secundária: fade-in no momento definido por imageUrl2StartSec
  const img2StartFrame = slide.imageUrl2StartSec != null
    ? Math.round(slide.imageUrl2StartSec * fps)
    : 0;
  const img2Opacity = interpolate(
    frame,
    [img2StartFrame, img2StartFrame + fps * 1.5], // fade-in em 1.5s
    [0, 0.42],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: slide.color, overflow: "hidden" }}>
      {/* Secondary background image */}
      {slide.imageUrl2 && (
        <AbsoluteFill
          style={{
            backgroundImage: `url(${slide.imageUrl2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `scale(${bgScale2}) translateX(${bgPan2}%)`,
            opacity: img2Opacity,
            // Sem clipPath quando tem transição temporal — ocupa a tela toda ao aparecer
            clipPath: slide.imageUrl2StartSec != null ? undefined : "inset(0 0 0 50%)",
          }}
        />
      )}

      {/* Primary background image */}
      <AbsoluteFill
        style={{
          backgroundImage: `url(${slide.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `scale(${bgScale1}) translateX(${bgPan1}%)`,
          opacity: 0.55,
        }}
      />

      {/* Left-dominant gradient so text is legible */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(105deg, ${slide.color}f0 0%, ${slide.color}cc 38%, ${slide.color}77 58%, ${slide.color}22 72%, transparent 85%)`,
        }}
      />

      {/* Bottom fade */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(to top, ${slide.color}bb 0%, transparent 42%)`,
        }}
      />

      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          background: `linear-gradient(90deg, ${slide.accentColor}, ${slide.accentColor}55, transparent)`,
          opacity: lineWidth,
        }}
      />

      {/* Country badge — top right */}
      <div
        style={{
          position: "absolute",
          top: 36,
          right: 56,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 5,
          opacity: locationOpacity,
        }}
      >
        <div style={{ fontSize: 48 }}>{COUNTRY_FLAGS[slide.country]}</div>
        <div
          style={{
            fontSize: 11,
            letterSpacing: 5,
            color: slide.accentColor,
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
          }}
        >
          {COUNTRY_LABEL[slide.country]}
        </div>
      </div>

      {/* Date — top left */}
      <div
        style={{
          position: "absolute",
          top: 46,
          left: 72,
          fontSize: 13,
          letterSpacing: 5,
          color: "rgba(255,255,255,0.45)",
          fontFamily: "Arial, sans-serif",
          opacity: locationOpacity,
        }}
      >
        {slide.date}
      </div>

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "88px 72px 180px",
          opacity: 1 - exitProgress * 2,
        }}
      >
        {/* Day badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 22,
            opacity: dayBadge,
            transform: `scale(${dayBadge})`,
            transformOrigin: "left center",
          }}
        >
          <div
            style={{
              padding: "8px 30px",
              background: slide.accentColor,
              borderRadius: 40,
              color: "#000",
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 5,
              fontFamily: "Arial, sans-serif",
              textTransform: "uppercase",
            }}
          >
            {slide.title}
          </div>
          <div style={{ fontSize: 32 }}>{slide.icon}</div>
        </div>

        {/* Location title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#ffffff",
            fontFamily: "Georgia, serif",
            letterSpacing: -1,
            lineHeight: 1.05,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textShadow: "0 4px 40px rgba(0,0,0,0.65)",
            maxWidth: 780,
          }}
        >
          {slide.subtitle}
        </div>

        {/* Accent line */}
        <div
          style={{
            width: interpolate(lineWidth, [0, 1], [0, 90]),
            height: 4,
            background: slide.accentColor,
            borderRadius: 2,
            margin: "18px 0",
          }}
        />

        {/* Description */}
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.84)",
            fontFamily: "Georgia, serif",
            lineHeight: 1.65,
            maxWidth: 640,
            opacity: descOpacity,
            fontStyle: "italic",
            marginBottom: 24,
          }}
        >
          {slide.description}
        </div>

        {/* Highlights list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 9,
            opacity: highlightsOpacity,
          }}
        >
          {slide.highlights.map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: slide.accentColor,
                  flexShrink: 0,
                  boxShadow: `0 0 8px ${slide.accentColor}`,
                }}
              />
              <div
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.72)",
                  fontFamily: "Arial, sans-serif",
                  letterSpacing: 0.3,
                  lineHeight: 1.4,
                }}
              >
                {h}
              </div>
            </div>
          ))}
        </div>

        {/* Location pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 24,
            opacity: locationOpacity,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: slide.accentColor,
              letterSpacing: 4,
              fontFamily: "Arial, sans-serif",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            📍 {slide.location}
          </div>
        </div>
      </AbsoluteFill>

      {/* Bottom branding */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 56,
          opacity: 0.35,
          color: "rgba(255,255,255,0.6)",
          fontSize: 11,
          letterSpacing: 5,
          fontFamily: "Arial, sans-serif",
          textTransform: "uppercase",
        }}
      >
        XDREAMS TRAVEL • CARAVANA PROFÉTICA 2026
      </div>

      {/* Cartela de abertura cinematográfica — Primeiro Dia, Segundo Dia... */}
      {slide.day >= 1 && slide.day <= 10 && (
        <DayAnnouncement
          day={slide.day}
          subtitle={slide.subtitle}
          accentColor={slide.accentColor}
          color={slide.color}
        />
      )}

      <NarrationCaption
        text={slide.narration}
        accentColor={slide.accentColor}
        startFrame={ANNOUNCEMENT_DURATION}
        audioDurationSec={AUDIO_DURATIONS[slide.day]}
      />
      <SlideAudio index={slide.day} startFrame={0} />
    </AbsoluteFill>
  );
};
