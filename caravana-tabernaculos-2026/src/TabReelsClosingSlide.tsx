/**
 * TabReelsClosingSlide — CTA final vertical 1080×1920 para Reels
 * Cards em grid 2×2, QR Code tela cheia sem fade out
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

export const TabReelsClosingSlide: React.FC<{ slide: TabSlide }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const SLIDE_DUR = fps * 21; // 630 frames = 21 segundos

  const bgScale1  = interpolate(frame, [0, SLIDE_DUR], [1.0, 1.10]);

  const iconScale = spring({ frame, fps, config: { damping: 14, stiffness: 80  }, delay: 5  });
  const titleOp   = spring({ frame, fps, config: { damping: 20, stiffness: 60  }, delay: 14 });
  const cardsOp   = spring({ frame, fps, config: { damping: 20, stiffness: 60  }, delay: 34 });
  const ctaOp     = spring({ frame, fps, config: { damping: 12, stiffness: 70  }, delay: 54 });
  const ctaScale  = spring({ frame, fps, config: { damping: 12, stiffness: 70  }, delay: 54 });
  const lineScale = spring({ frame, fps, config: { damping: 20, stiffness: 80  }, delay: 24 });
  const logosOp   = spring({ frame, fps, config: { damping: 20, stiffness: 60  }, delay: 64 });

  // Luz dourada emocional
  const hardStop       = SLIDE_DUR - 10;
  const emotionalStart = hardStop - 160;
  const emotionalPeak  = hardStop - 40;
  const glow = interpolate(
    frame,
    [emotionalStart, emotionalPeak, hardStop],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // QR Code — expande a partir de 8s, fica fixo até o fim (sem fade out)
  const QR_START = 240;
  const QR_PEAK  = 290;

  const qrExpand  = interpolate(frame, [QR_START, QR_PEAK], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const qrVisible = qrExpand;
  const qrScale   = interpolate(qrExpand, [0, 1], [0.10, 1]);
  const qrBgOp    = interpolate(qrExpand, [0, 1], [0, 0.97]);

  const cards = [
    { emoji: "📅", label: "Saída",       value: "21/09/2026" },
    { emoji: "🌍", label: "Destinos",    value: "Turquia\n• Israel" },
    { emoji: "🛏️", label: "Duração",    value: "12 Dias\n11 Noites" },
    { emoji: "👤", label: "Liderança",   value: "Ap. Renê\n& Ap. Huston" },
  ];

  return (
    <AbsoluteFill style={{ background: "#03030f", overflow: "hidden" }}>

      {/* Fundo */}
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
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: "linear-gradient(90deg, transparent, #c9a84c, transparent)", opacity: lineScale }} />

      {/* Conteúdo principal — some quando QR expande */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 1 - qrExpand * 0.9,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 70px",
            width: "100%",
          }}
        >
          {/* Ícone */}
          <div
            style={{
              fontSize: 90,
              transform: `scale(${iconScale})`,
              marginBottom: 20,
              filter: "drop-shadow(0 0 40px rgba(201,168,76,0.9))",
            }}
          >
            🙏
          </div>

          {/* Label */}
          <div
            style={{
              fontSize: 18,
              letterSpacing: 8,
              color: "#c9a84c",
              fontFamily: "Arial, sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
              opacity: titleOp,
              marginBottom: 14,
            }}
          >
            NÃO PERCA ESTA OPORTUNIDADE
          </div>

          {/* Título */}
          <div style={{ fontSize: 148, fontWeight: 900, color: "#ffffff", fontFamily: "Georgia, serif", letterSpacing: -5, lineHeight: 1, opacity: titleOp }}>
            VAGAS
          </div>
          <div style={{ fontSize: 118, fontWeight: 900, color: "#c9a84c", fontFamily: "Georgia, serif", letterSpacing: -4, lineHeight: 1, opacity: titleOp, marginBottom: 8 }}>
            LIMITADAS
          </div>

          {/* Divisor */}
          <div
            style={{
              width: interpolate(lineScale, [0, 1], [0, 700]),
              height: 1,
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.8), transparent)",
              margin: "20px 0",
            }}
          />

          {/* Cards 2×2 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              opacity: cardsOp,
              marginBottom: 30,
              width: "100%",
            }}
          >
            {cards.map((c) => (
              <div
                key={c.label}
                style={{
                  padding: "20px 18px",
                  border: "1px solid rgba(201,168,76,0.28)",
                  borderRadius: 16,
                  background: "rgba(201,168,76,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div style={{ fontSize: 40 }}>{c.emoji}</div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#c9a84c",
                    letterSpacing: 3,
                    fontFamily: "Arial, sans-serif",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {c.label}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    color: "#fff",
                    fontFamily: "Georgia, serif",
                    fontWeight: 700,
                    textAlign: "center",
                    lineHeight: 1.35,
                    whiteSpace: "pre-line",
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
              gap: 14,
              width: "100%",
            }}
          >
            <div
              style={{
                fontSize: 24,
                color: "rgba(255,255,255,0.65)",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              Garanta já sua vaga e viva uma experiência que marca a eternidade
            </div>
            <div
              style={{
                padding: "22px 60px",
                background: "#c9a84c",
                borderRadius: 50,
                color: "#000",
                fontSize: 26,
                fontWeight: 900,
                letterSpacing: 2,
                fontFamily: "Arial, sans-serif",
                textTransform: "uppercase",
                boxShadow: "0 0 80px rgba(201,168,76,0.6)",
              }}
            >
              www.xdreamstravel.com.br
            </div>
          </div>

          {/* Logos + QR pequeno */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 28,
              marginTop: 24,
              opacity: logosOp,
            }}
          >
            <Img src={staticFile("xdreams_logo.png")} style={{ height: 48, opacity: 0.90 }} />
            <div style={{ width: 1, height: 36, background: "rgba(201,168,76,0.35)" }} />
            <Img src={staticFile("tab/logo-icej-brasil-white.png")} style={{ height: 42, opacity: 0.82 }} />
            <div style={{ width: 1, height: 36, background: "rgba(201,168,76,0.35)" }} />
            <Img src={staticFile("tab/logo-personal-travel-white.png")} style={{ height: 30, opacity: 0.82 }} />
          </div>
        </div>
      </AbsoluteFill>

      {/* ══ QR Code — tela cheia, fica fixo até o fim ══════════════════════ */}
      <AbsoluteFill
        style={{
          background: `rgba(3, 3, 15, ${qrBgOp})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          opacity: qrVisible,
          pointerEvents: "none",
        }}
      >
        <AbsoluteFill style={{ boxShadow: `inset 0 0 200px rgba(201,168,76,0.40)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 7, background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 7, background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />

        <div
          style={{
            fontSize: 30,
            letterSpacing: 10,
            color: "#c9a84c",
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
            textAlign: "center",
            textShadow: "0 0 40px rgba(201,168,76,0.8)",
          }}
        >
          📱 APONTE SEU CELULAR
        </div>

        <div style={{ transform: `scale(${qrScale})`, transformOrigin: "center center" }}>
          <Img
            src={staticFile("tab/qrcode.png")}
            style={{
              width: 820,
              height: 820,
              borderRadius: 32,
              border: "6px solid rgba(201,168,76,0.90)",
              boxShadow: "0 0 160px rgba(201,168,76,0.65), 0 0 60px rgba(0,0,0,0.9)",
              display: "block",
            }}
          />
        </div>

        <div
          style={{
            fontSize: 30,
            color: "rgba(255,255,255,0.85)",
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
            letterSpacing: 3,
            textAlign: "center",
          }}
        >
          www.xdreamstravel.com.br
        </div>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
