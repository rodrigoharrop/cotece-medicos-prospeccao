/**
 * CaravanaVertical — Versão letterbox 9:16 (1080×1920) do vídeo completo.
 * O vídeo 16:9 é escalado para caber na largura e centralizado verticalmente.
 * Áreas sobrando acima/abaixo recebem branding da XDreams Travel.
 */
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { CaravanaVideo } from "./CaravanaVideo";

const SOURCE_W = 1920;
const SOURCE_H = 1080;
const REEL_W = 1080;
const REEL_H = 1920;

const scale = REEL_W / SOURCE_W;          // 0.5625
const scaledH = Math.round(SOURCE_H * scale); // 607
const sidebarH = Math.round((REEL_H - scaledH) / 2); // 656

export const CaravanaVertical: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#03030f", overflow: "hidden" }}>

      {/* ── Gradiente de fundo em toda a tela ── */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.07) 0%, #03030f 70%)",
        }}
      />

      {/* ══ Faixa superior — branding ══ */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: sidebarH,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background: `linear-gradient(180deg, #03030f 55%, transparent 100%)`,
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <Img
          src={staticFile("xdreams_logo.png")}
          style={{ width: 200, opacity: 0.95, filter: "drop-shadow(0 0 6px rgba(0,0,0,0.6))" }}
        />

        {/* Linha dourada */}
        <div
          style={{
            width: 280,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(201,168,76,0.7), transparent)",
          }}
        />

        {/* Título do evento */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div
            style={{
              fontSize: 13,
              letterSpacing: 7,
              color: "#c9a84c",
              fontFamily: "Arial, sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            CARAVANA PROFÉTICA
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "#ffffff",
              fontFamily: "Georgia, serif",
              letterSpacing: -2,
              lineHeight: 1,
              textShadow: "0 0 40px rgba(201,168,76,0.4)",
            }}
          >
            2026
          </div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 4,
              color: "rgba(255,255,255,0.4)",
              fontFamily: "Arial, sans-serif",
              textTransform: "uppercase",
            }}
          >
            🇮🇹 Roma &nbsp;•&nbsp; 🇪🇬 Egito &nbsp;•&nbsp; 🇮🇱 Israel
          </div>
        </div>
      </div>

      {/* ══ Vídeo escalado e centralizado ══ */}
      <div
        style={{
          position: "absolute",
          top: sidebarH,
          left: 0,
          width: REEL_W,
          height: scaledH,
          overflow: "hidden",
        }}
      >
        {/* Wrapper com dimensões originais do vídeo — AbsoluteFill preenche este div */}
        <div
          style={{
            position: "relative",
            width: SOURCE_W,
            height: SOURCE_H,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
          }}
        >
          <CaravanaVideo />
        </div>
      </div>

      {/* ══ Faixa inferior — CTA ══ */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: sidebarH,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          background: `linear-gradient(0deg, #03030f 55%, transparent 100%)`,
          zIndex: 10,
        }}
      >
        {/* Info rápida */}
        <div
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.55)",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            letterSpacing: 0.5,
          }}
        >
          Saída: 01/12/2026 &nbsp;•&nbsp; 10 Dias / 09 Noites
        </div>

        {/* Botão CTA */}
        <div
          style={{
            padding: "18px 56px",
            background: "#c9a84c",
            borderRadius: 50,
            color: "#000",
            fontSize: 19,
            fontWeight: 900,
            letterSpacing: 2,
            fontFamily: "Arial, sans-serif",
            textTransform: "uppercase",
            boxShadow: "0 0 50px rgba(201,168,76,0.4)",
          }}
        >
          www.xdreamstravel.com.br
        </div>

        {/* Liderança */}
        <div
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: 4,
            fontFamily: "Arial, sans-serif",
            textTransform: "uppercase",
          }}
        >
          Profeta Ricardo Strobel
        </div>
      </div>

    </AbsoluteFill>
  );
};
