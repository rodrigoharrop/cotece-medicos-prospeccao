import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TRANSITION_DURATION } from "./data";

interface NarrationCaptionProps {
  text: string;
  accentColor: string;
  startFrame?: number;
  // Duração total do áudio em segundos — para calcular o ritmo real de fala
  audioDurationSec?: number;
}

export const NarrationCaption: React.FC<NarrationCaptionProps> = ({
  text,
  accentColor,
  startFrame = 5,
  audioDurationSec,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Mesmo ponto de parada do SlideAudio — legenda e áudio terminam juntos
  const hardStop = durationInFrames - 2 * TRANSITION_DURATION + 4;
  // Janela de exibição começa no frame 0 (sem delay)
  const audioWindowSec = hardStop / fps;

  if (frame > hardStop) return null;

  const localFrame = frame;

  const allWords = text.split(" ");

  let visibleWords: string[];
  let framesPerWord: number;

  if (audioDurationSec && audioDurationSec > 0) {
    const actualWPS = allWords.length / audioDurationSec;
    const wordsInSlide = Math.min(
      allWords.length,
      Math.ceil(audioWindowSec * actualWPS)
    );
    visibleWords = allWords.slice(0, wordsInSlide);
    framesPerWord = fps / actualWPS;
  } else {
    visibleWords = allWords;
    framesPerWord = (audioWindowSec * fps) / allWords.length;
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "0 72px 44px",
        pointerEvents: "none",
      }}
    >
      {/* Gradiente acima da legenda */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 180,
          background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 6 }}>
        {/* Indicador de narração */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ width: 28, height: 2, background: accentColor, borderRadius: 1 }} />
          <div
            style={{
              fontSize: 11,
              letterSpacing: 4,
              color: accentColor,
              fontFamily: "Arial, sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            NARRAÇÃO
          </div>
        </div>

        {/* Palavras reveladas no ritmo real do áudio — sem fade-in/out na barra */}
        <div
          style={{
            fontSize: 22,
            lineHeight: 1.55,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            color: "#ffffff",
            maxWidth: 1100,
            textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)",
          }}
        >
          {visibleWords.map((word, i) => {
            const wordRevealFrame = localFrame - i * framesPerWord;
            const isLastWord = i === visibleWords.length - 1;

            const wordOpacity = interpolate(
              wordRevealFrame,
              [0, framesPerWord * 0.4],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            // Última palavra: sem deslocamento vertical — aparece direto na posição final
            const wordY = isLastWord
              ? 0
              : interpolate(
                  spring({
                    frame: Math.max(0, wordRevealFrame),
                    fps,
                    config: { damping: 25, stiffness: 300 },
                  }),
                  [0, 1],
                  [8, 0]
                );

            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity: wordOpacity,
                  transform: `translateY(${wordY}px)`,
                  marginRight: "0.28em",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
