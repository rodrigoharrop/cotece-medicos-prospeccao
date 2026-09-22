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

export const ClosingSlide: React.FC<{ slide: DaySlide }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const iconScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, delay: 5 });
  const titleOpacity = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 14 });
  const lineScale = spring({ frame, fps, config: { damping: 20, stiffness: 80 }, delay: 24 });
  const cardsOpacity = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 34 });
  const ctaScale = spring({ frame, fps, config: { damping: 12, stiffness: 70 }, delay: 58 });
  const ctaOpacity = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 58 });

  const bgScale1 = interpolate(frame, [0, durationInFrames], [1, 1.08]);
  const bgScale2 = interpolate(frame, [0, durationInFrames], [1.05, 1]);

  // Final emocionante: luz dourada cresce nos últimos ~6s (quando "É uma virada" é dita)
  const hardStop = durationInFrames - 2 * Math.round(30 * 1.2) + 4; // ~581
  const emotionalStart = hardStop - 180; // ~6s antes do fim
  const emotionalPeak  = hardStop - 40;

  const emotionalGlow = interpolate(
    frame,
    [emotionalStart, emotionalPeak, hardStop],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const ctaFinalScale = interpolate(
    frame,
    [emotionalStart, emotionalPeak],
    [1, 1.04],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: "#030310", overflow: "hidden" }}>
      {/* Layer 2 — secondary image */}
      {slide.imageUrl2 && (
        <AbsoluteFill
          style={{
            backgroundImage: `url(${slide.imageUrl2})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            transform: `scale(${bgScale2})`,
            opacity: 0.2,
          }}
        />
      )}
      {/* Layer 1 — primary image */}
      <AbsoluteFill
        style={{
          backgroundImage: `url(${slide.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `scale(${bgScale1})`,
          opacity: 0.32,
        }}
      />

      {/* Deep radial vignette */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.08) 0%, rgba(3,3,16,0.96) 65%)`,
        }}
      />

      {/* Top accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${slide.accentColor}, transparent)`,
          opacity: lineScale,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 140,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 100px",
          }}
        >
          {/* Icon */}
          <div
            style={{
              fontSize: 68,
              transform: `scale(${iconScale})`,
              marginBottom: 20,
              filter: `drop-shadow(0 0 40px ${slide.accentColor}cc)`,
            }}
          >
            🙏
          </div>

          <div
            style={{
              fontSize: 13,
              letterSpacing: 10,
              color: slide.accentColor,
              fontFamily: "Arial, sans-serif",
              opacity: titleOpacity,
              marginBottom: 12,
              textTransform: "uppercase",
            }}
          >
            NÃO PERCA ESTA OPORTUNIDADE
          </div>

          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: "#ffffff",
              fontFamily: "Georgia, serif",
              letterSpacing: -3,
              lineHeight: 1,
              opacity: titleOpacity,
            }}
          >
            VAGAS LIMITADAS
          </div>

          {/* Divider */}
          <div
            style={{
              width: interpolate(lineScale, [0, 1], [0, 560]),
              height: 1,
              background: `linear-gradient(90deg, transparent, ${slide.accentColor}99, transparent)`,
              margin: "28px 0",
            }}
          />

          {/* Cards */}
          <div
            style={{
              display: "flex",
              gap: 20,
              opacity: cardsOpacity,
              marginBottom: 40,
            }}
          >
            {[
              { emoji: "📅", label: "Saída", value: "01/12/2026" },
              { emoji: "🌍", label: "Países", value: "Itália • Egito • Israel" },
              { emoji: "🛏️", label: "Duração", value: "10 Dias / 09 Noites" },
              { emoji: "👤", label: "Liderança", value: "Profeta Ricardo Strobel" },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  padding: "22px 28px",
                  border: `1px solid rgba(201,168,76,0.28)`,
                  borderRadius: 16,
                  background: "rgba(201,168,76,0.06)",
                  minWidth: 162,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <div style={{ fontSize: 30 }}>{c.emoji}</div>
                <div
                  style={{
                    fontSize: 10,
                    color: slide.accentColor,
                    letterSpacing: 4,
                    fontFamily: "Arial, sans-serif",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  {c.label}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: "#fff",
                    fontFamily: "Georgia, serif",
                    fontWeight: 700,
                    lineHeight: 1.35,
                    textAlign: "center",
                  }}
                >
                  {c.value}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div
            style={{
              opacity: ctaOpacity,
              transform: `scale(${ctaScale * ctaFinalScale})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.6)",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
              }}
            >
              Garanta já sua vaga e descubra o que Deus tem reservado para você
            </div>
            <div
              style={{
                padding: "20px 70px",
                background: slide.accentColor,
                borderRadius: 50,
                color: "#000",
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: 3,
                fontFamily: "Arial, sans-serif",
                textTransform: "uppercase",
                boxShadow: `0 0 60px ${slide.accentColor}55`,
              }}
            >
              www.xdreamstravel.com.br
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: 5,
                fontFamily: "Arial, sans-serif",
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              🇮🇹 Roma &nbsp;•&nbsp; 🇪🇬 Egito &nbsp;•&nbsp; 🇮🇱 Israel
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Explosão de luz dourada no clímax — "É uma virada" */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 45%, rgba(201,168,76,${(emotionalGlow * 0.55).toFixed(3)}) 0%, rgba(255,220,100,${(emotionalGlow * 0.15).toFixed(3)}) 35%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      {/* Vinheta de brilho nas bordas */}
      <AbsoluteFill
        style={{
          boxShadow: `inset 0 0 ${emotionalGlow * 200}px rgba(201,168,76,${(emotionalGlow * 0.3).toFixed(3)})`,
          pointerEvents: "none",
        }}
      />

      <NarrationCaption
        text={slide.narration}
        accentColor={slide.accentColor}
        startFrame={0}
        audioDurationSec={AUDIO_DURATIONS[10]}
      />
      <SlideAudio index={10} startFrame={0} />
    </AbsoluteFill>
  );
};
