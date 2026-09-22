/**
 * TabIntroSlide — Abertura da Caravana Tabernáculos 2026
 * Layout split: texto à esquerda | foto do Ap. Renê à direita
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

  const bgScale1     = interpolate(frame, [0, durationInFrames], [1.05, 1.13]);
  const photoScale   = interpolate(frame, [0, durationInFrames], [1.0, 1.06]);

  const titleOpacity = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 10 });
  const titleY       = interpolate(
    spring({ frame, fps, config: { damping: 18, stiffness: 60 }, delay: 10 }),
    [0, 1], [50, 0]
  );
  const subOpacity   = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 24 });
  const lineScale    = spring({ frame, fps, config: { damping: 20, stiffness: 80 }, delay: 18 });
  const leadersOp    = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 38 });
  const logosOp      = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 52 });
  const photoOp      = spring({ frame, fps, config: { damping: 16, stiffness: 50 }, delay: 6  });
  const photoX       = interpolate(
    spring({ frame, fps, config: { damping: 20, stiffness: 50 }, delay: 6 }),
    [0, 1], [80, 0]
  );

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 27, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: "#050a1a", overflow: "hidden" }}>

      {/* Fundo — Jerusalém */}
      <AbsoluteFill
        style={{
          backgroundImage: `url(${staticFile(slide.imageUrl)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `scale(${bgScale1})`,
          opacity: 0.30,
        }}
      />

      {/* Vinheta lateral esquerda — área de texto mais escura */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(5,10,26,0.97) 0%, rgba(5,10,26,0.90) 40%, rgba(5,10,26,0.55) 65%, transparent 85%)",
        }}
      />

      {/* Vinheta radial suave */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(5,10,26,0.0) 0%, rgba(5,10,26,0.50) 100%)",
        }}
      />

      {/* ══ Ap. Renê — cutout sem fundo, ancorado no canto inferior direito ══ */}
      <div
        style={{
          position: "absolute",
          bottom: -30,
          right: -30,
          width: "56%",
          height: "110%",
          opacity: photoOp * (1 - exitProgress * 1.5),
          transform: `translateX(${photoX}px) scale(${photoScale})`,
          transformOrigin: "right bottom",
        }}
      >
        <Img
          src={staticFile("tab/ap-rene-cutout.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "right bottom",
            filter: "drop-shadow(-30px 0 80px rgba(201,168,76,0.20)) drop-shadow(0 0 50px rgba(5,10,26,0.5))",
          }}
        />
        {/* Gradiente base — integra figura com o fundo */}
        <div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: "20%",
            background: "linear-gradient(to top, rgba(5,10,26,1) 0%, transparent 100%)",
          }}
        />
        {/* Gradiente esquerda — funde suavemente com área de texto */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(5,10,26,0.92) 0%, rgba(5,10,26,0.35) 18%, transparent 42%)",
          }}
        />
      </div>

      {/* Linha dourada no topo */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, height: 5,
          background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
          opacity: lineScale,
        }}
      />

      {/* ══ Conteúdo — lado esquerdo ══════════════════════════════════════ */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px 80px 90px",
          opacity: 1 - exitProgress * 2,
          maxWidth: "58%",
        }}
      >
        {/* Label topo */}
        <div
          style={{
            fontSize: 18,
            letterSpacing: 10,
            color: "#c9a84c",
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
            opacity: titleOpacity,
            marginBottom: 18,
          }}
        >
          XDREAMS TRAVEL APRESENTA
        </div>

        {/* Título em 3 linhas */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 128,
              fontWeight: 900,
              color: "#ffffff",
              fontFamily: "Georgia, serif",
              letterSpacing: -4,
              lineHeight: 0.95,
              textShadow: "0 0 80px rgba(201,168,76,0.4)",
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
              letterSpacing: -4,
              lineHeight: 0.95,
            }}
          >
            TABERNÁCULOS
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 200,
              color: "#fff",
              fontFamily: "Georgia, serif",
              letterSpacing: 24,
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
            fontSize: 26,
            color: "rgba(255,255,255,0.65)",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            opacity: subOpacity,
            marginBottom: 16,
          }}
        >
          ✨ Igrejas do Apocalipse + Tabernáculos ✨
        </div>

        {/* Países inline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 20,
            opacity: subOpacity,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 52 }}>🇹🇷</span>
            <span style={{ fontSize: 16, letterSpacing: 5, color: "#f59e0b", fontFamily: "Arial, sans-serif", fontWeight: 700 }}>TURQUIA</span>
          </div>
          <div style={{ color: "rgba(201,168,76,0.4)", fontSize: 28 }}>•</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 52 }}>🇮🇱</span>
            <span style={{ fontSize: 16, letterSpacing: 5, color: "#38bdf8", fontFamily: "Arial, sans-serif", fontWeight: 700 }}>ISRAEL</span>
          </div>
        </div>

        {/* Divisor */}
        <div
          style={{
            width: interpolate(lineScale, [0, 1], [0, 460]),
            height: 1,
            background: "linear-gradient(90deg, #c9a84c, rgba(201,168,76,0.3), transparent)",
            marginBottom: 22,
          }}
        />

        {/* Data */}
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            color: "#c9a84c",
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
            opacity: leadersOp,
            marginBottom: 22,
            textTransform: "uppercase",
          }}
        >
          📅 21 de Setembro a 02 de Outubro de 2026
        </div>

        {/* Líderes */}
        <div
          style={{
            display: "flex",
            gap: 16,
            opacity: leadersOp,
            marginBottom: 28,
          }}
        >
          {[
            { name: "Ap. Renê Terra Nova",     desc: "Mentor M12 • Presidente ICEJ Brasil" },
            { name: "Ap. Carlos Huston Rocha", desc: "Coordenador M12 Ceará" },
          ].map((l) => (
            <div
              key={l.name}
              style={{
                padding: "16px 26px",
                border: "1px solid rgba(201,168,76,0.35)",
                borderRadius: 14,
                background: "rgba(201,168,76,0.07)",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
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
                Líder Espiritual
              </div>
              <div style={{ fontSize: 20, color: "#fff", fontFamily: "Georgia, serif", fontWeight: 700 }}>
                {l.name}
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", fontFamily: "Arial, sans-serif" }}>
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
            gap: 28,
            opacity: logosOp,
          }}
        >
          <Img
            src={staticFile("xdreams_logo.png")}
            style={{ height: 52, filter: "drop-shadow(0 0 8px rgba(0,0,0,0.8))" }}
          />
          <div style={{ width: 1, height: 40, background: "rgba(201,168,76,0.35)" }} />
          <Img
            src={staticFile("tab/logo-icej-brasil-white.png")}
            style={{ height: 46, opacity: 0.88 }}
          />
          <div style={{ width: 1, height: 40, background: "rgba(201,168,76,0.35)" }} />
          <Img
            src={staticFile("tab/logo-personal-travel-white.png")}
            style={{ height: 34, opacity: 0.88 }}
          />
        </div>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
