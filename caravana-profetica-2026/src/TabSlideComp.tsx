/**
 * TabSlideComp — Slide genérico da Caravana Tabernáculos 2026
 * Fontes grandes, otimizado para projeção em telão
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
import { TabSlide, TAB_TRANSITION } from "./dataTab";

export const TabSlideComp: React.FC<{ slide: TabSlide }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ── Animações de entrada ─────────────────────────────────────────────────
  const badgeScale  = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, delay: 4 });
  const titleOpacity = spring({ frame, fps, config: { damping: 20, stiffness: 140 }, delay: 8 });
  const titleY = interpolate(
    spring({ frame, fps, config: { damping: 20, stiffness: 140 }, delay: 8 }),
    [0, 1], [16, 0]
  );
  const descOpacity  = spring({ frame, fps, config: { damping: 20, stiffness: 70 }, delay: 22 });
  const hlOpacity    = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 34 });
  const locOpacity   = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 46 });
  const lineW        = spring({ frame, fps, config: { damping: 20, stiffness: 80 }, delay: 14 });

  // ── Saída suave ───────────────────────────────────────────────────────────
  const exitProgress = interpolate(
    frame,
    [durationInFrames - 27, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ── Ken Burns ─────────────────────────────────────────────────────────────
  const bgScale1 = interpolate(frame, [0, durationInFrames], [1.03, 1.10]);
  const bgPan1   = interpolate(frame, [0, durationInFrames], [-1.5, 1.5]);
  const bgScale2 = interpolate(frame, [0, durationInFrames], [1.05, 1.0]);
  const bgPan2   = interpolate(frame, [0, durationInFrames], [1.5, -1.0]);

  // ── Imagem secundária com fade-in temporizado ─────────────────────────────
  const img2StartFrame = slide.imageUrl2StartSec != null
    ? Math.round(slide.imageUrl2StartSec * fps) : 0;
  const img2Opacity = interpolate(
    frame,
    [img2StartFrame, img2StartFrame + fps * 1.5],
    [0, 0.38],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const titleLines = slide.title.split("\n");

  return (
    <AbsoluteFill style={{ background: slide.color, overflow: "hidden" }}>

      {/* Imagem secundária */}
      {slide.imageUrl2 && (
        <AbsoluteFill
          style={{
            backgroundImage: `url(${staticFile(slide.imageUrl2)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `scale(${bgScale2}) translateX(${bgPan2}%)`,
            opacity: img2Opacity,
            clipPath: slide.imageUrl2StartSec != null ? undefined : "inset(0 0 0 50%)",
          }}
        />
      )}

      {/* Imagem principal */}
      <AbsoluteFill
        style={{
          backgroundImage: `url(${staticFile(slide.imageUrl)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `scale(${bgScale1}) translateX(${bgPan1}%)`,
          opacity: 0.58,
        }}
      />

      {/* Gradiente lateral — texto legível */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(105deg, ${slide.color}f2 0%, ${slide.color}cc 38%, ${slide.color}77 58%, ${slide.color}22 72%, transparent 85%)`,
        }}
      />

      {/* Gradiente inferior */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(to top, ${slide.color}bb 0%, transparent 40%)`,
        }}
      />

      {/* Barra superior colorida */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, height: 6,
          background: `linear-gradient(90deg, ${slide.accentColor}, ${slide.accentColor}55, transparent)`,
          opacity: lineW,
        }}
      />

      {/* País / flag — canto superior direito */}
      {slide.country && (
        <div
          style={{
            position: "absolute",
            top: 40, right: 64,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 6,
            opacity: locOpacity,
          }}
        >
          <div style={{ fontSize: 56 }}>{slide.flag}</div>
          <div
            style={{
              fontSize: 13,
              letterSpacing: 6,
              color: slide.accentColor,
              fontFamily: "Arial, sans-serif",
              fontWeight: 700,
            }}
          >
            {slide.country}
          </div>
        </div>
      )}

      {/* Data — canto superior esquerdo */}
      {slide.dayBadge && (
        <div
          style={{
            position: "absolute",
            top: 50, left: 80,
            fontSize: 14,
            letterSpacing: 5,
            color: "rgba(255,255,255,0.50)",
            fontFamily: "Arial, sans-serif",
            opacity: locOpacity,
          }}
        >
          {slide.dayBadge}
        </div>
      )}

      {/* ── Conteúdo central ─────────────────────────────────────────── */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "100px 80px 200px",
          opacity: 1 - exitProgress * 2,
        }}
      >
        {/* Badge do tipo */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
            opacity: badgeScale,
            transform: `scale(${badgeScale})`,
            transformOrigin: "left center",
          }}
        >
          <div
            style={{
              padding: "10px 34px",
              background: slide.accentColor,
              borderRadius: 40,
              color: "#000",
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: 5,
              fontFamily: "Arial, sans-serif",
              textTransform: "uppercase",
            }}
          >
            {slide.subtitle}
          </div>
          <div style={{ fontSize: 36 }}>{slide.icon}</div>
        </div>

        {/* Título principal — GRANDE para telão */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: 6,
          }}
        >
          {titleLines.map((line, i) => (
            <div
              key={i}
              style={{
                fontSize: 88,
                fontWeight: 900,
                color: "#ffffff",
                fontFamily: "Georgia, serif",
                letterSpacing: -2,
                lineHeight: 1.02,
                textShadow: "0 4px 40px rgba(0,0,0,0.7)",
                maxWidth: 860,
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Linha decorativa */}
        <div
          style={{
            width: interpolate(lineW, [0, 1], [0, 100]),
            height: 5,
            background: slide.accentColor,
            borderRadius: 3,
            margin: "20px 0",
          }}
        />

        {/* Descrição */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.84)",
            fontFamily: "Georgia, serif",
            lineHeight: 1.6,
            maxWidth: 680,
            fontStyle: "italic",
            opacity: descOpacity,
            marginBottom: 28,
          }}
        >
          {slide.description}
        </div>

        {/* Destaques */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 11,
            opacity: hlOpacity,
          }}
        >
          {slide.highlights.map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 7, height: 7,
                  borderRadius: "50%",
                  background: slide.accentColor,
                  flexShrink: 0,
                  boxShadow: `0 0 10px ${slide.accentColor}`,
                }}
              />
              <div
                style={{
                  fontSize: 20,
                  color: "rgba(255,255,255,0.78)",
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

        {/* Localização */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 28,
            opacity: locOpacity,
          }}
        >
          <div
            style={{
              fontSize: 14,
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

      {/* Branding inferior */}
      <div
        style={{
          position: "absolute",
          bottom: 28, right: 64,
          opacity: 0.35,
          color: "rgba(255,255,255,0.6)",
          fontSize: 12,
          letterSpacing: 5,
          fontFamily: "Arial, sans-serif",
          textTransform: "uppercase",
        }}
      >
        XDREAMS TRAVEL • CARAVANA TABERNÁCULOS 2026
      </div>

    </AbsoluteFill>
  );
};
