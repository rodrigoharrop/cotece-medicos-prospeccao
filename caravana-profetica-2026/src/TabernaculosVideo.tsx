/**
 * TabernaculosVideo — Composição principal da Caravana Tabernáculos 2026
 * ~1min 49s | 1920×1080 | crossfade entre slides | música de fundo
 */
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { tabSlides, TAB_SLIDE_DURATIONS, TAB_TRANSITION } from "./dataTab";
import { TabIntroSlide  } from "./TabIntroSlide";
import { TabSlideComp   } from "./TabSlideComp";
import { TabClosingSlide } from "./TabClosingSlide";

// Renderizador por tipo
const TabSlideRenderer: React.FC<{ index: number }> = ({ index }) => {
  const slide = tabSlides[index];
  if (slide.type === "intro")   return <TabIntroSlide   slide={slide} />;
  if (slide.type === "closing") return <TabClosingSlide slide={slide} />;
  return <TabSlideComp slide={slide} />;
};

// Música de fundo — cresce no CTA final
const TabMusic: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const volume = interpolate(
    frame,
    [
      0,
      45,
      durationInFrames - 350,  // começa a crescer ~11s antes do fim
      durationInFrames - 60,   // pico no CTA
      durationInFrames - 5,
    ],
    [0, 0.24, 0.24, 0.46, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <Audio
      src={staticFile("audio/background_music.mp3")}
      volume={volume}
      loop
    />
  );
};

export const TabernaculosVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Posição de início de cada slide (com overlap para crossfade)
  const slideStarts: number[] = [];
  let cumulative = 0;
  for (let i = 0; i < tabSlides.length; i++) {
    slideStarts.push(cumulative);
    cumulative += TAB_SLIDE_DURATIONS[i] - TAB_TRANSITION;
  }

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <TabMusic />

      {tabSlides.map((slide, i) => {
        const start    = slideStarts[i];
        const isLast   = i === tabSlides.length - 1;
        const slideDur = TAB_SLIDE_DURATIONS[i];
        const seqDur   = isLast ? slideDur : slideDur + TAB_TRANSITION;
        const localFrame = frame - start;

        const fadeProgress = isLast
          ? 0
          : interpolate(
              localFrame,
              [slideDur - TAB_TRANSITION, slideDur],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

        return (
          <Sequence key={slide.id} from={start} durationInFrames={seqDur}>
            <AbsoluteFill style={{ opacity: 1 - fadeProgress }}>
              <TabSlideRenderer index={i} />
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* Marca d'água XDreams — sutil, por cima de todos os slides */}
      <Img
        src={staticFile("xdreams_logo.png")}
        style={{
          position: "absolute",
          bottom: 20,
          left: 52,
          width: 120,
          opacity: 0.22,
          pointerEvents: "none",
          filter: "drop-shadow(0 0 4px rgba(0,0,0,0.9))",
        }}
      />
    </AbsoluteFill>
  );
};
