/**
 * TabClosingSlide — CTA final da Caravana Tabernáculos 2026
 * "Vagas Limitadas" + cards + website + logos + explosão dourada
 */
import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TabSlide } from "./dataTab";

export const TabClosingSlide: React.FC<{ slide: TabSlide }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const bgScale1 = interpolate(frame, [0, durationInFrames], [1.0, 1.08]);

  const iconScale  = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, delay: 5 });
  const titleOp    = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 14 });
  const cardsOp    = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 34 });
  const ctaOp      = spring({ frame, fps, config: { damping: 12, stiffness: 70 }, delay: 54 });
  const ctaScale   = spring({ frame, fps, config: { damping: 12, stiffness: 70 }, delay: 54 });
  const lineScale  = spring({ frame, fps, config: { damping: 20, stiffness: 80 }, delay: 24 });
  const logosOp    = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 64 });

  // Luz dourada emocional no clímax
  const hardStop = durationInFrames - 10;
  const emotionalStart = hardStop - 150;
  const emotionalPeak  = hardStop - 35;
  const glow = interpolate(
    frame,
    [emotionalStart, emotionalPeak, hardStop],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: "#03030f", overflow: "hidden" }}>

      <AbsoluteFill
        style={{
          backgroundImage: `url(${staticFile(slide.imageUrl)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `scale(${bgScale1})`,
          opacity: 0.28,
        }}
      />

      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.07) 0%, rgba(3,3,15,0.96) 65%)",
        }}
      />

      {/* Explosão dourada */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 45%, rgba(201,168,76,${(glow * 0.55).toFixed(3)}) 0%, rgba(255,220,100,${(glow * 0.15).toFixed(3)}) 35%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          boxShadow: `inset 0 0 ${glow * 220}px rgba(201,168,76,${(glow * 0.3).toFixed(3)})`,
          pointerEvents: "none",
        }}
      />

      {/* Barra superior */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, height: 5,
          background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
          opacity: lineScale,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 120,
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
          {/* Ícone */}
          <div
            style={{
              fontSize: 72,
              transform: `scale(${iconScale})`,
              marginBottom: 22,
              filter: "drop-shadow(0 0 40px rgba(201,168,76,0.9))",
            }}
          >
            🙏
          </div>

          {/* Label */}
          <div
            style={{
              fontSize: 14,
              letterSpacing: 10,
              color: "#c9a84c",
              fontFamily: "Arial, sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
              opacity: titleOp,
              marginBottom: 12,
            }}
          >
            NÃO PERCA ESTA OPORTUNIDADE
          </div>

          {/* Título — grande para telão */}
          <div
            style={{
              fontSize: 100,
              fontWeight: 900,
              color: "#ffffff",
              fontFamily: "Georgia, serif",
              letterSpacing: -3,
              lineHeight: 1,
              opacity: titleOp,
            }}
          >
            VAGAS
          </div>
          <div
            style={{
              fontSize: 100,
              fontWeight: 900,
              color: "#c9a84c",
              fontFamily: "Georgia, serif",
              letterSpacing: -3,
              lineHeight: 1,
              opacity: titleOp,
              marginBottom: 6,
            }}
          >
            LIMITADAS
          </div>

          {/* Divisor */}
          <div
            style={{
              width: interpolate(lineScale, [0, 1], [0, 600]),
              height: 1,
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.8), transparent)",
              margin: "24px 0",
            }}
          />

          {/* Cards de info */}
          <div
            style={{
              display: "flex",
              gap: 20,
              opacity: cardsOp,
              marginBottom: 36,
            }}
          >
            {[
              { emoji: "📅", label: "Saída",      value: "21/09/2026" },
              { emoji: "🌍", label: "Destinos",    value: "Turquia • Israel" },
              { emoji: "🛏️", label: "Duração",    value: "12 Dias / 11 Noites" },
              { emoji: "👤", label: "Liderança",   value: "Ap. Renê Terra Nova" },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  padding: "22px 30px",
                  border: "1px solid rgba(201,168,76,0.28)",
                  borderRadius: 16,
                  background: "rgba(201,168,76,0.06)",
                  minWidth: 168,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div style={{ fontSize: 32 }}>{c.emoji}</div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#c9a84c",
                    letterSpacing: 4,
                    fontFamily: "Arial, sans-serif",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {c.label}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    color: "#fff",
                    fontFamily: "Georgia, serif",
                    fontWeight: 700,
                    textAlign: "center",
                    lineHeight: 1.35,
                  }}
                >
                  {c.value}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              opacity: ctaOp,
              transform: `scale(${ctaScale})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                fontSize: 19,
                color: "rgba(255,255,255,0.65)",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
              }}
            >
              Garanta já sua vaga e viva uma experiência que marca a eternidade
            </div>
            <div
              style={{
                padding: "22px 80px",
                background: "#c9a84c",
                borderRadius: 50,
                color: "#000",
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: 3,
                fontFamily: "Arial, sans-serif",
                textTransform: "uppercase",
                boxShadow: "0 0 70px rgba(201,168,76,0.55)",
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
              🇹🇷 Turquia &nbsp;•&nbsp; 🇮🇱 Israel &nbsp;•&nbsp; 12 Dias
            </div>
          </div>

          {/* Logos parceiros */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
              marginTop: 28,
              opacity: logosOp,
            }}
          >
            <Img
              src={staticFile("xdreams_logo.png")}
              style={{ height: 54, opacity: 0.90, filter: "drop-shadow(0 0 8px rgba(0,0,0,0.7))" }}
            />
            <div style={{ width: 1, height: 40, background: "rgba(201,168,76,0.35)" }} />
            <Img
              src={staticFile("tab/logo-icej-brasil-white.png")}
              style={{ height: 46, opacity: 0.82 }}
            />
            <div style={{ width: 1, height: 40, background: "rgba(201,168,76,0.35)" }} />
            <Img
              src={staticFile("tab/logo-personal-travel-white.png")}
              style={{ height: 34, opacity: 0.82 }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
