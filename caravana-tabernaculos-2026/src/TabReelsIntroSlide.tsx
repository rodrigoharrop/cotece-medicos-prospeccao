/**
 * TabReelsIntroSlide — Intro vertical 1080×1920 para Instagram Reels
 * Redesign: Ap. Renê centralizado grande (60% superior) + texto compacto inferior
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

export const TabReelsIntroSlide: React.FC<{ slide: TabSlide }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const bgScale    = interpolate(frame, [0, durationInFrames], [1.05, 1.12]);
  const photoScale = interpolate(frame, [0, durationInFrames], [1.0, 1.04]);

  const titleOp    = spring({ frame, fps, config: { damping: 20, stiffness: 60  }, delay: 10 });
  const titleY     = interpolate(spring({ frame, fps, config: { damping: 18, stiffness: 60  }, delay: 10 }), [0, 1], [40, 0]);
  const subOp      = spring({ frame, fps, config: { damping: 20, stiffness: 60  }, delay: 26 });
  const lineScale  = spring({ frame, fps, config: { damping: 20, stiffness: 80  }, delay: 18 });
  const leadersOp  = spring({ frame, fps, config: { damping: 20, stiffness: 60  }, delay: 40 });
  const logosOp    = spring({ frame, fps, config: { damping: 20, stiffness: 60  }, delay: 54 });
  const photoOp    = spring({ frame, fps, config: { damping: 14, stiffness: 45  }, delay: 3  });
  const glowPulse  = interpolate(frame, [0, 90, 180], [0.7, 1.0, 0.7], { extrapolateRight: "clamp" });

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 27, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: "#050a1a", overflow: "hidden" }}>

      {/* ── Jerusalem background — tela cheia ─────────────────────────── */}
      <AbsoluteFill
        style={{
          backgroundImage: `url(${staticFile(slide.imageUrl)})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          transform: `scale(${bgScale})`,
          opacity: 0.38,
        }}
      />

      {/* Gradiente de topo — escurece só o céu */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,10,26,0.60) 0%, rgba(5,10,26,0.10) 30%, transparent 55%)",
        }}
      />

      {/* Gradiente inferior — prepara área de texto */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(5,10,26,1) 0%, rgba(5,10,26,0.97) 26%, rgba(5,10,26,0.80) 42%, rgba(5,10,26,0.30) 58%, transparent 74%)",
        }}
      />

      {/* ── Aura dourada atrás da figura ──────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "4%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(201,168,76,${(0.18 * glowPulse).toFixed(3)}) 0%, rgba(201,168,76,${(0.06 * glowPulse).toFixed(3)}) 50%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* ── Barra dourada no topo ─────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, height: 5,
          background: "linear-gradient(90deg, transparent 0%, #c9a84c 40%, #fff8e0 50%, #c9a84c 60%, transparent 100%)",
          opacity: lineScale,
        }}
      />

      {/* ── Banner hero — mostra rosto do Ap. Renê, esconde texto embutido */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "52%",
          overflow: "hidden",
          opacity: photoOp * (1 - exitProgress * 1.5),
          transform: `scale(${photoScale})`,
          transformOrigin: "center top",
        }}
      >
        <Img
          src={staticFile("tab/ap-rene-cutout-crop.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />

        {/* Gradiente lateral — cobre bordas onde o texto do banner vaza */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(5,10,26,0.70) 0%, rgba(5,10,26,0.20) 18%, transparent 35%, transparent 65%, rgba(5,10,26,0.20) 82%, rgba(5,10,26,0.70) 100%)",
        }} />

        {/* Gradiente inferior PESADO — apaga o texto embutido do banner */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0, height: "82%",
          background: "linear-gradient(to top, rgba(5,10,26,1) 0%, rgba(5,10,26,0.99) 30%, rgba(5,10,26,0.94) 50%, rgba(5,10,26,0.70) 68%, rgba(5,10,26,0.20) 85%, transparent 100%)",
        }} />
      </div>

      {/* ── Conteúdo textual — parte inferior ─────────────────────────── */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "50% 64px 100px", // começa logo abaixo da seção do banner
          opacity: 1 - exitProgress * 2,
        }}
      >
        {/* Label */}
        <div
          style={{
            fontSize: 15,
            letterSpacing: 8,
            color: "#c9a84c",
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
            opacity: titleOp,
            marginBottom: 12,
          }}
        >
          XDREAMS TRAVEL APRESENTA
        </div>

        {/* Título principal */}
        <div
          style={{
            opacity: titleOp,
            transform: `translateY(${titleY}px)`,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: "#ffffff",
              fontFamily: "Georgia, serif",
              letterSpacing: -4,
              lineHeight: 0.92,
              textShadow: "0 0 60px rgba(201,168,76,0.35)",
            }}
          >
            CARAVANA
          </div>
          <div
            style={{
              fontSize: 94,
              fontWeight: 900,
              color: "#c9a84c",
              fontFamily: "Georgia, serif",
              letterSpacing: -3,
              lineHeight: 0.92,
            }}
          >
            TABERNÁCULOS
          </div>
          <div
            style={{
              fontSize: 62,
              fontWeight: 200,
              color: "rgba(255,255,255,0.80)",
              fontFamily: "Georgia, serif",
              letterSpacing: 20,
              opacity: subOp,
              marginTop: 8,
            }}
          >
            2026
          </div>
        </div>

        {/* Divisor */}
        <div
          style={{
            width: interpolate(lineScale, [0, 1], [0, 420]),
            height: 1,
            background:
              "linear-gradient(90deg, #c9a84c 0%, rgba(201,168,76,0.35) 70%, transparent 100%)",
            margin: "16px 0",
          }}
        />

        {/* Data + Países */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 12,
            opacity: subOp,
          }}
        >
          <span style={{ fontSize: 42 }}>🇹🇷</span>
          <span style={{ fontSize: 14, letterSpacing: 5, color: "#f59e0b", fontFamily: "Arial, sans-serif", fontWeight: 700 }}>
            TURQUIA
          </span>
          <span style={{ color: "rgba(201,168,76,0.45)", fontSize: 22 }}>•</span>
          <span style={{ fontSize: 42 }}>🇮🇱</span>
          <span style={{ fontSize: 14, letterSpacing: 5, color: "#38bdf8", fontFamily: "Arial, sans-serif", fontWeight: 700 }}>
            ISRAEL
          </span>
        </div>

        {/* Data */}
        <div
          style={{
            fontSize: 17,
            letterSpacing: 3,
            color: "rgba(255,255,255,0.65)",
            fontFamily: "Arial, sans-serif",
            fontWeight: 600,
            opacity: leadersOp,
            marginBottom: 14,
          }}
        >
          📅 21 de Setembro a 02 de Outubro de 2026
        </div>

        {/* Líderes — texto simples, sem cards pesados */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            opacity: leadersOp,
            marginBottom: 22,
            paddingLeft: 2,
            borderLeft: "3px solid rgba(201,168,76,0.50)",
            paddingLeft: 16,
          }}
        >
          <div style={{ fontSize: 21, color: "#fff", fontFamily: "Georgia, serif", fontWeight: 700 }}>
            Ap. Renê Terra Nova
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.50)", fontFamily: "Arial, sans-serif", letterSpacing: 2 }}>
            Presidente ICEJ Brasil
          </div>
          <div style={{ fontSize: 21, color: "#fff", fontFamily: "Georgia, serif", fontWeight: 700, marginTop: 6 }}>
            Ap. Carlos Huston Rocha
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.50)", fontFamily: "Arial, sans-serif", letterSpacing: 2 }}>
            Coordenador M12 Ceará
          </div>
        </div>

        {/* Logos parceiros */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            opacity: logosOp,
          }}
        >
          <Img
            src={staticFile("xdreams_logo.png")}
            style={{ height: 40, filter: "drop-shadow(0 0 8px rgba(0,0,0,0.8))" }}
          />
          <div style={{ width: 1, height: 32, background: "rgba(201,168,76,0.35)" }} />
          <Img
            src={staticFile("tab/logo-icej-brasil-white.png")}
            style={{ height: 36, opacity: 0.88 }}
          />
          <div style={{ width: 1, height: 32, background: "rgba(201,168,76,0.35)" }} />
          <Img
            src={staticFile("tab/logo-personal-travel-white.png")}
            style={{ height: 28, opacity: 0.88 }}
          />
        </div>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
