/**
 * TabIntroSlide — Abertura da Caravana Tabernáculos 2026
 * Líderes: Ap. Renê Terra Nova + Ap. Carlos Huston Rocha
 * Logos: XDreams Travel + ICEJ Brasil + Personal Travel
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

export const TabIntroSlide: React.FC<{ slide: TabSlide }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const bgScale1    = interpolate(frame, [0, durationInFrames], [1.05, 1.13]);
  const bgScale2    = interpolate(frame, [0, durationInFrames], [1.0,  1.07]);

  const logoScale   = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, delay: 5  });
  const titleOpacity = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 14 });
  const titleY      = interpolate(
    spring({ frame, fps, config: { damping: 18, stiffness: 60 }, delay: 14 }),
    [0, 1], [60, 0]
  );
  const subOpacity  = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 28 });
  const lineScale   = spring({ frame, fps, config: { damping: 20, stiffness: 80 }, delay: 22 });
  const leadersOp   = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 44 });
  const logosOp     = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 56 });

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 27, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: "#050a1a", overflow: "hidden" }}>

      {/* Layer 2 — banner tabernáculos (direita) */}
      {slide.imageUrl2 && (
        <AbsoluteFill
          style={{
            backgroundImage: `url(${staticFile(slide.imageUrl2)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `scale(${bgScale2})`,
            opacity: 0.18,
          }}
        />
      )}

      {/* Layer 1 — Jerusalém (fundo) */}
      <AbsoluteFill
        style={{
          backgroundImage: `url(${staticFile(slide.imageUrl)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `scale(${bgScale1})`,
          opacity: 0.42,
        }}
      />

      {/* Vinheta radial profunda */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(5,10,26,0.15) 0%, rgba(5,10,26,0.90) 100%)",
        }}
      />

      {/* Linha dourada no topo */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, height: 5,
          background: `linear-gradient(90deg, transparent, #c9a84c, transparent)`,
          opacity: lineScale,
        }}
      />

      {/* Conteúdo central */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 100px 100px",
          opacity: 1 - exitProgress * 2,
        }}
      >
        {/* Label topo */}
        <div
          style={{
            fontSize: 14,
            letterSpacing: 10,
            color: "#c9a84c",
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
            opacity: titleOpacity,
            marginBottom: 20,
          }}
        >
          XDREAMS TRAVEL APRESENTA
        </div>

        {/* Título em 3 linhas — grande para telão */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 108,
              fontWeight: 900,
              color: "#ffffff",
              fontFamily: "Georgia, serif",
              letterSpacing: -3,
              lineHeight: 0.95,
              textShadow: "0 0 80px rgba(201,168,76,0.3)",
            }}
          >
            CARAVANA
          </div>
          <div
            style={{
              fontSize: 108,
              fontWeight: 900,
              color: "#c9a84c",
              fontFamily: "Georgia, serif",
              letterSpacing: -3,
              lineHeight: 0.95,
            }}
          >
            TABERNÁCULOS
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 200,
              color: "#fff",
              fontFamily: "Georgia, serif",
              letterSpacing: 22,
              opacity: subOpacity,
              marginTop: 10,
            }}
          >
            2026
          </div>
        </div>

        {/* Subtítulo */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.65)",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            opacity: subOpacity,
            marginBottom: 8,
          }}
        >
          ✨ Igrejas do Apocalipse + Tabernáculos ✨
        </div>

        {/* Países */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            margin: "20px 0",
            opacity: subOpacity,
          }}
        >
          {[
            { flag: "🇹🇷", name: "TURQUIA", color: "#f59e0b" },
            { sep: true },
            { flag: "🇮🇱", name: "ISRAEL", color: "#38bdf8" },
          ].map((c, i) =>
            "sep" in c ? (
              <div key={i} style={{ color: "rgba(201,168,76,0.4)", fontSize: 36, marginBottom: 20 }}>•</div>
            ) : (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ fontSize: 52 }}>{c.flag}</div>
                <div style={{ fontSize: 13, letterSpacing: 5, color: c.color, fontFamily: "Arial, sans-serif", fontWeight: 700 }}>
                  {c.name}
                </div>
              </div>
            )
          )}
        </div>

        {/* Divisor */}
        <div
          style={{
            width: interpolate(lineScale, [0, 1], [0, 520]),
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.8), transparent)",
            marginBottom: 28,
          }}
        />

        {/* Data */}
        <div
          style={{
            fontSize: 20,
            letterSpacing: 6,
            color: "#c9a84c",
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
            opacity: leadersOp,
            marginBottom: 28,
            textTransform: "uppercase",
          }}
        >
          📅 21 de Setembro a 02 de Outubro de 2026
        </div>

        {/* Líderes */}
        <div
          style={{
            display: "flex",
            gap: 28,
            opacity: leadersOp,
            marginBottom: 36,
          }}
        >
          {[
            { name: "Ap. Renê Terra Nova",    desc: "Mentor M12 • Presidente ICEJ Brasil" },
            { name: "Ap. Carlos Huston Rocha", desc: "Coordenador M12 Ceará" },
          ].map((l) => (
            <div
              key={l.name}
              style={{
                padding: "18px 32px",
                border: "1px solid rgba(201,168,76,0.35)",
                borderRadius: 16,
                background: "rgba(201,168,76,0.07)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 5,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: "#c9a84c",
                  letterSpacing: 4,
                  fontFamily: "Arial, sans-serif",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                Líder Espiritual
              </div>
              <div style={{ fontSize: 18, color: "#fff", fontFamily: "Georgia, serif", fontWeight: 700, textAlign: "center" }}>
                {l.name}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
                {l.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Logos parceiros */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            opacity: logosOp,
          }}
        >
          <Img
            src={staticFile("xdreams_logo.png")}
            style={{ height: 56, filter: "drop-shadow(0 0 8px rgba(0,0,0,0.7))" }}
          />
          <div style={{ width: 1, height: 44, background: "rgba(201,168,76,0.35)" }} />
          <Img
            src={staticFile("tab/logo-icej-brasil-white.png")}
            style={{ height: 50, opacity: 0.85 }}
          />
          <div style={{ width: 1, height: 44, background: "rgba(201,168,76,0.35)" }} />
          <Img
            src={staticFile("tab/logo-personal-travel-white.png")}
            style={{ height: 36, opacity: 0.85 }}
          />
        </div>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
