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

  // Duração REAL do slide (useVideoConfig retorna o total da composição, não do slide)
  const SLIDE_DUR = fps * 21; // 630 frames = 21 segundos

  const bgScale1 = interpolate(frame, [0, SLIDE_DUR], [1.0, 1.10]);

  const iconScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, delay: 5 });
  const titleOp   = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 14 });
  const cardsOp   = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 34 });
  const ctaOp     = spring({ frame, fps, config: { damping: 12, stiffness: 70 }, delay: 54 });
  const ctaScale  = spring({ frame, fps, config: { damping: 12, stiffness: 70 }, delay: 54 });
  const lineScale = spring({ frame, fps, config: { damping: 20, stiffness: 80 }, delay: 24 });
  const logosOp   = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 64 });

  // Luz dourada emocional — baseada na duração REAL do slide (600 frames = 20s)
  const hardStop       = SLIDE_DUR - 10;        // 590 (19.7s)
  const emotionalStart = hardStop - 160;         // 430 (14.3s)
  const emotionalPeak  = hardStop - 40;          // 550 (18.3s)
  const glow = interpolate(
    frame,
    [emotionalStart, emotionalPeak, hardStop],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ── QR Code tela cheia ────────────────────────────────────────────────────
  // Expande a partir de 8s no slide → ~1:41 global
  // Fica fixo até o final — sem fade out
  const QR_START = 240;  // 8.0s local → ~1:41 global
  const QR_PEAK  = 290;  // 9.7s — totalmente expandido

  const qrExpand = interpolate(frame, [QR_START, QR_PEAK], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const qrVisible = qrExpand; // sem fade out — QR fica fixo até o fim
  const qrScale   = interpolate(qrExpand, [0, 1], [0.10, 1]);
  const qrBgOp    = interpolate(qrExpand, [0, 1], [0, 0.97]);

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

      {/* Conteúdo principal — some quando QR expande */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 120,
          opacity: 1 - qrExpand * 0.9,
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
              fontSize: 90,
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
              fontSize: 20,
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
              fontSize: 130,
              fontWeight: 900,
              color: "#ffffff",
              fontFamily: "Georgia, serif",
              letterSpacing: -4,
              lineHeight: 1,
              opacity: titleOp,
            }}
          >
            VAGAS
          </div>
          <div
            style={{
              fontSize: 130,
              fontWeight: 900,
              color: "#c9a84c",
              fontFamily: "Georgia, serif",
              letterSpacing: -4,
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
              { emoji: "👤", label: "Liderança",   value: "Ap. Renê Terra Nova\n& Ap. Huston Rocha" },
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
                <div style={{ fontSize: 44 }}>{c.emoji}</div>
                <div
                  style={{
                    fontSize: 16,
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
                    fontSize: 22,
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
              gap: 16,
            }}
          >
            <div
              style={{
                fontSize: 26,
                color: "rgba(255,255,255,0.65)",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
              }}
            >
              Garanta já sua vaga e viva uma experiência que marca a eternidade
            </div>
            <div
              style={{
                padding: "26px 90px",
                background: "#c9a84c",
                borderRadius: 50,
                color: "#000",
                fontSize: 30,
                fontWeight: 900,
                letterSpacing: 3,
                fontFamily: "Arial, sans-serif",
                textTransform: "uppercase",
                boxShadow: "0 0 80px rgba(201,168,76,0.6)",
              }}
            >
              www.xdreamstravel.com.br
            </div>
            <div
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.40)",
                letterSpacing: 5,
                fontFamily: "Arial, sans-serif",
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              🇹🇷 Turquia &nbsp;•&nbsp; 🇮🇱 Israel &nbsp;•&nbsp; 12 Dias
            </div>
          </div>

          {/* Logos + QR Code */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 36,
              marginTop: 28,
              opacity: logosOp,
            }}
          >
            {/* Logos parceiros */}
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
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

            {/* Separador */}
            <div style={{ width: 1, height: 70, background: "rgba(201,168,76,0.25)" }} />

            {/* QR Code */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <Img
                src={staticFile("tab/qrcode.png")}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 8,
                  border: "2px solid rgba(201,168,76,0.5)",
                  filter: "drop-shadow(0 0 6px rgba(0,0,0,0.6))",
                }}
              />
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.40)",
                  letterSpacing: 3,
                  fontFamily: "Arial, sans-serif",
                  textTransform: "uppercase",
                }}
              >
                Saiba mais
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* ══ QR Code — expansão tela cheia a partir de ~1:34 ════════════════ */}
      {/* Sempre renderizado — opacity controla visibilidade (sem remount) */}
      <AbsoluteFill
        style={{
          background: `rgba(3, 3, 15, ${qrBgOp})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
          opacity: qrVisible,
          pointerEvents: "none",
        }}
      >
        {/* Brilho dourado nas bordas */}
        <AbsoluteFill
          style={{
            boxShadow: `inset 0 0 200px rgba(201,168,76,0.40)`,
            pointerEvents: "none",
          }}
        />

        {/* Barra dourada topo e base */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 7, background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 7, background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />

        {/* Instrução */}
        <div
          style={{
            fontSize: 32,
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

        {/* QR Code — escala de 10% até 100% */}
        <div
          style={{
            transform: `scale(${qrScale})`,
            transformOrigin: "center center",
          }}
        >
          <Img
            src={staticFile("tab/qrcode.png")}
            style={{
              width: 780,
              height: 780,
              borderRadius: 32,
              border: "6px solid rgba(201,168,76,0.90)",
              boxShadow: "0 0 140px rgba(201,168,76,0.65), 0 0 60px rgba(0,0,0,0.9)",
              display: "block",
            }}
          />
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.85)",
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
            letterSpacing: 3,
            textAlign: "center",
            textShadow: "0 0 20px rgba(0,0,0,0.8)",
          }}
        >
          www.xdreamstravel.com.br
        </div>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
