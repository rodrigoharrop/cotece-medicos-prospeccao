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
import { DaySlide, AUDIO_DURATIONS } from "./data";
import { NarrationCaption } from "./NarrationCaption";
import { SlideAudio } from "./SlideAudio";

export const IntroSlide: React.FC<{ slide: DaySlide }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, delay: 5 });
  const titleOpacity = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 12 });
  const titleY = interpolate(
    spring({ frame, fps, config: { damping: 16, stiffness: 60 }, delay: 12 }),
    [0, 1],
    [70, 0]
  );
  const subtitleOpacity = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 28 });
  const lineScale = spring({ frame, fps, config: { damping: 20, stiffness: 80 }, delay: 22 });
  const badgesOpacity = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 48 });

  // Foto do Profeta — aparece depois (~2s) e vai sumindo suavemente antes dos badges
  const PHOTO_ENTER = 52;   // frame em que começa a entrar (~1.7s)
  const PHOTO_FADE_START = 220; // começa a sair (~7.3s)
  const PHOTO_FADE_END   = 320; // totalmente invisível (~10.7s)

  const photoEnterOpacity = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 50 },
    delay: PHOTO_ENTER,
  });
  const photoFadeOut = interpolate(
    frame,
    [PHOTO_FADE_START, PHOTO_FADE_END],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const photoOpacity = photoEnterOpacity * photoFadeOut;

  const photoY = interpolate(
    spring({ frame, fps, config: { damping: 16, stiffness: 50 }, delay: PHOTO_ENTER }),
    [0, 1],
    [60, 0]
  );

  const exitProgress = interpolate(frame, [durationInFrames - 27, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Two-layer parallax background
  const bgScale1 = interpolate(frame, [0, durationInFrames], [1.06, 1.14]);
  const bgScale2 = interpolate(frame, [0, durationInFrames], [1, 1.08]);

  const countries = [
    { flag: "🇮🇹", name: "ROMA", color: "#fb923c" },
    { flag: "🇪🇬", name: "EGITO", color: "#d4a017" },
    { flag: "🇮🇱", name: "ISRAEL", color: "#60a5fa" },
  ];

  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      {/* Layer 1 — secondary image slightly brighter */}
      {slide.imageUrl2 && (
        <AbsoluteFill
          style={{
            backgroundImage: `url(${slide.imageUrl2})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            transform: `scale(${bgScale2})`,
            opacity: 0.22,
          }}
        />
      )}
      {/* Layer 2 — primary image */}
      <AbsoluteFill
        style={{
          backgroundImage: `url(${slide.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `scale(${bgScale1})`,
          opacity: 0.45,
        }}
      />

      {/* Deep vignette gradient */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, rgba(8,8,26,0.2) 0%, rgba(8,8,26,0.92) 100%)`,
        }}
      />

      {/* Top accent line */}
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 100px 120px",
          opacity: 1 - exitProgress * 2,
        }}
      >
        {/* Agency label */}
        <div
          style={{
            fontSize: 14,
            letterSpacing: 10,
            color: slide.accentColor,
            fontFamily: "Arial, sans-serif",
            opacity: titleOpacity,
            marginBottom: 20,
            textTransform: "uppercase",
          }}
        >
          XDREAMS TRAVEL APRESENTA
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 108,
            fontWeight: 900,
            color: "#ffffff",
            fontFamily: "Georgia, serif",
            letterSpacing: -3,
            lineHeight: 0.95,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textShadow: `0 0 80px rgba(201,168,76,0.3)`,
          }}
        >
          CARAVANA
        </div>
        <div
          style={{
            fontSize: 108,
            fontWeight: 900,
            color: slide.accentColor,
            fontFamily: "Georgia, serif",
            letterSpacing: -3,
            lineHeight: 0.95,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          PROFÉTICA
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 200,
            color: "#fff",
            fontFamily: "Georgia, serif",
            letterSpacing: 22,
            opacity: subtitleOpacity,
            marginTop: 14,
          }}
        >
          2026
        </div>

        {/* Country flags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            margin: "30px 0",
            opacity: subtitleOpacity,
          }}
        >
          {countries.map((c, i) => (
            <React.Fragment key={c.name}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div style={{ fontSize: 48 }}>{c.flag}</div>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: 5,
                    color: c.color,
                    fontFamily: "Arial, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {c.name}
                </div>
              </div>
              {i < countries.length - 1 && (
                <div
                  style={{
                    color: "rgba(201,168,76,0.4)",
                    fontSize: 32,
                    marginBottom: 20,
                  }}
                >
                  •
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            width: interpolate(lineScale, [0, 1], [0, 480]),
            height: 1,
            background: `linear-gradient(90deg, transparent, ${slide.accentColor}99, transparent)`,
            marginBottom: 36,
          }}
        />

        {/* Info badges */}
        <div style={{ display: "flex", gap: 20, opacity: badgesOpacity }}>
          {[
            { icon: "📅", label: "Saída", value: "01 dez. 2026" },
            { icon: "🗓️", label: "Duração", value: "10 Dias / 09 Noites" },
            { icon: "✈️", label: "Partida", value: "São Paulo – GRU" },
            { icon: "👤", label: "Liderança", value: "Profeta Ricardo Strobel" },
          ].map((b) => (
            <div
              key={b.label}
              style={{
                padding: "18px 24px",
                border: `1px solid rgba(201,168,76,0.28)`,
                borderRadius: 14,
                background: "rgba(201,168,76,0.07)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 5,
                minWidth: 160,
              }}
            >
              <div style={{ fontSize: 24 }}>{b.icon}</div>
              <div
                style={{
                  fontSize: 10,
                  color: slide.accentColor,
                  letterSpacing: 3,
                  fontFamily: "Arial, sans-serif",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                {b.label}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#fff",
                  fontFamily: "Georgia, serif",
                  fontWeight: 600,
                  textAlign: "center",
                  lineHeight: 1.3,
                }}
              >
                {b.value}
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>

      {/* Foto do Profeta Ricardo Strobel — lado direito */}
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          height: "92%",
          display: "flex",
          alignItems: "flex-end",
          opacity: photoOpacity,
          transform: `translateY(${photoY}px)`,
          pointerEvents: "none",
        }}
      >
        {/* Brilho dourado atrás da figura */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 60% 80%, rgba(201,168,76,0.35) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />
        <Img
          src={staticFile("profeta_strobel.png")}
          style={{
            height: "100%",
            objectFit: "contain",
            objectPosition: "bottom right",
            filter:
              "drop-shadow(0 0 40px rgba(201,168,76,0.45)) drop-shadow(0 8px 24px rgba(0,0,0,0.6))",
          }}
        />
      </div>

      <NarrationCaption
        text={slide.narration}
        accentColor={slide.accentColor}
        startFrame={0}
        audioDurationSec={AUDIO_DURATIONS[0]}
      />
      <SlideAudio index={0} startFrame={0} />
    </AbsoluteFill>
  );
};
