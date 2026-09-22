/**
 * TabReelsSlideComp — Slide vertical 1080×1920 para Instagram Reels
 * Conteúdo empilhado na parte inferior, imagem em tela cheia
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

export const TabReelsSlideComp: React.FC<{ slide: TabSlide }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const badgeScale   = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, delay: 4 });
  const titleOp      = spring({ frame, fps, config: { damping: 20, stiffness: 140 }, delay: 8 });
  const titleY       = interpolate(spring({ frame, fps, config: { damping: 20, stiffness: 140 }, delay: 8 }), [0, 1], [20, 0]);
  const descOp       = spring({ frame, fps, config: { damping: 20, stiffness: 70  }, delay: 22 });
  const hlOp         = spring({ frame, fps, config: { damping: 20, stiffness: 60  }, delay: 34 });
  const locOp        = spring({ frame, fps, config: { damping: 20, stiffness: 60  }, delay: 44 });
  const lineW        = spring({ frame, fps, config: { damping: 20, stiffness: 80  }, delay: 14 });

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 27, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const bgScale = interpolate(frame, [0, durationInFrames], [1.03, 1.10]);

  // Imagem secundária
  const img2Start  = slide.imageUrl2StartSec != null ? Math.round(slide.imageUrl2StartSec * fps) : 0;
  const img2Op     = interpolate(frame, [img2Start, img2Start + fps * 1.5], [0, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Retrato de líder
  const portraitStart = slide.portraitStartSec != null
    ? Math.round(slide.portraitStartSec * fps)
    : Math.round(fps * 6);
  const portraitOp = interpolate(frame, [portraitStart, portraitStart + fps * 1.2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const portraitSlideY = interpolate(frame, [portraitStart, portraitStart + fps * 1.2], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const titleLines = slide.title.split("\n");

  return (
    <AbsoluteFill style={{ background: slide.color, overflow: "hidden" }}>

      {/* Imagem principal — tela cheia */}
      <AbsoluteFill
        style={{
          backgroundImage: `url(${staticFile(slide.imageUrl)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `scale(${bgScale})`,
          opacity: 0.72,
        }}
      />

      {/* Imagem secundária */}
      {slide.imageUrl2 && (
        <AbsoluteFill
          style={{
            backgroundImage: `url(${staticFile(slide.imageUrl2)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `scale(${bgScale})`,
            opacity: img2Op,
          }}
        />
      )}

      {/* Gradiente inferior — legibilidade do texto */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(to top,
            ${slide.color} 0%,
            ${slide.color}f0 18%,
            ${slide.color}cc 32%,
            ${slide.color}88 46%,
            ${slide.color}33 60%,
            transparent 76%)`,
        }}
      />

      {/* Gradiente superior suave */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, ${slide.color}99 0%, transparent 20%)`,
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

      {/* Flag + Country — canto superior direito */}
      {slide.country && (
        <div
          style={{
            position: "absolute",
            top: 80, right: 60,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            opacity: locOp,
          }}
        >
          <div style={{ fontSize: 80 }}>{slide.flag}</div>
          <div
            style={{
              fontSize: 16,
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
            top: 92, left: 60,
            fontSize: 16,
            letterSpacing: 3,
            color: "rgba(255,255,255,0.60)",
            fontFamily: "Arial, sans-serif",
            fontWeight: 600,
            opacity: locOp,
          }}
        >
          {slide.dayBadge}
        </div>
      )}

      {/* Retrato de líder — canto direito, área média */}
      {slide.portraitUrl && (
        <div
          style={{
            position: "absolute",
            top: 230,
            right: 60,
            opacity: portraitOp * (1 - exitProgress * 2),
            transform: `translateY(${portraitSlideY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Img
            src={staticFile(slide.portraitUrl)}
            style={{
              width: 290,
              height: 290,
              objectFit: "cover",
              borderRadius: 16,
              border: `3px solid ${slide.accentColor}`,
              boxShadow: `0 0 40px rgba(0,0,0,0.8), 0 0 20px ${slide.accentColor}44`,
            }}
          />
          {slide.portraitCaption && (
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.88)",
                fontFamily: "Arial, sans-serif",
                letterSpacing: 1,
                textAlign: "center",
                background: "rgba(0,0,0,0.65)",
                padding: "5px 12px",
                borderRadius: 8,
                maxWidth: 290,
                lineHeight: 1.4,
              }}
            >
              {slide.portraitCaption}
            </div>
          )}
        </div>
      )}

      {/* Conteúdo principal — fixado na parte inferior */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 60px 140px",
          opacity: 1 - exitProgress * 2,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 18,
            opacity: badgeScale,
            transform: `scale(${badgeScale})`,
            transformOrigin: "left center",
          }}
        >
          <div
            style={{
              padding: "10px 28px",
              background: slide.accentColor,
              borderRadius: 40,
              color: "#000",
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: 4,
              fontFamily: "Arial, sans-serif",
              textTransform: "uppercase",
            }}
          >
            {slide.subtitle}
          </div>
          <div style={{ fontSize: 38 }}>{slide.icon}</div>
        </div>

        {/* Título — grande para mobile */}
        <div
          style={{
            opacity: titleOp,
            transform: `translateY(${titleY}px)`,
            marginBottom: 4,
          }}
        >
          {titleLines.map((line, i) => (
            <div
              key={i}
              style={{
                fontSize: 108,
                fontWeight: 900,
                color: "#ffffff",
                fontFamily: "Georgia, serif",
                letterSpacing: -3,
                lineHeight: 1.0,
                textShadow: "0 4px 60px rgba(0,0,0,0.9)",
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Linha decorativa */}
        <div
          style={{
            width: interpolate(lineW, [0, 1], [0, 120]),
            height: 4,
            background: slide.accentColor,
            borderRadius: 3,
            margin: "16px 0",
          }}
        />

        {/* Descrição */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.84)",
            fontFamily: "Georgia, serif",
            lineHeight: 1.5,
            fontStyle: "italic",
            opacity: descOp,
            marginBottom: 22,
          }}
        >
          {slide.description}
        </div>

        {/* Destaques — máx 3 para não sobrecarregar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            opacity: hlOp,
          }}
        >
          {slide.highlights.slice(0, 3).map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
                  fontSize: 24,
                  color: "rgba(255,255,255,0.82)",
                  fontFamily: "Arial, sans-serif",
                  letterSpacing: 0.3,
                  lineHeight: 1.35,
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
            marginTop: 18,
            opacity: locOp,
          }}
        >
          <div
            style={{
              fontSize: 16,
              color: slide.accentColor,
              letterSpacing: 3,
              fontFamily: "Arial, sans-serif",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            📍 {slide.location}
          </div>
        </div>
      </AbsoluteFill>

      {/* Branding */}
      <div
        style={{
          position: "absolute",
          bottom: 70, right: 60,
          opacity: 0.35,
          color: "rgba(255,255,255,0.6)",
          fontSize: 12,
          letterSpacing: 4,
          fontFamily: "Arial, sans-serif",
          textTransform: "uppercase",
        }}
      >
        XDREAMS TRAVEL
      </div>

    </AbsoluteFill>
  );
};
