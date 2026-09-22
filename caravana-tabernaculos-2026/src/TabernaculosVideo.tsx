/**
 * TabernaculosVideo — Composição principal da Caravana Tabernáculos 2026
 * ~2min | 1920×1080 | crossfade entre slides | narração + música de fundo
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

// Arquivo de narração por índice de slide
const NARRATION_FILES = [
  "audio/narration_tab_0.mp3",  // Intro
  "audio/narration_tab_1.mp3",  // Turquia
  "audio/narration_tab_2.mp3",  // Galileia
  "audio/narration_tab_3.mp3",  // Jerusalém
  "audio/narration_tab_4.mp3",  // Closing
];

// Renderizador por tipo
const TabSlideRenderer: React.FC<{ index: number }> = ({ index }) => {
  const slide = tabSlides[index];
  if (slide.type === "intro")   return <TabIntroSlide   slide={slide} />;
  if (slide.type === "closing") return <TabClosingSlide slide={slide} />;
  return <TabSlideComp slide={slide} />;
};

/**
 * Envelope de volume da música — nível fixo e suave durante toda narração
 *
 *  Narração Callum é sempre a voz principal — música é fundo discreto.
 *  Pequeno aumento só após a narração terminar (QR code + CTA visual).
 *
 *  0──30: fade in → 0.12 fixo até frame ~3300 → sobe levemente → fade out
 */
const TabMusic: React.FC = () => {
  const frame = useCurrentFrame();

  const volume = interpolate(
    frame,
    [
      0,     // silêncio inicial
      45,    // fade in suave
      1900,  // antes de Jerusalém — começa a baixar
      1960,  // slide Jerusalém — nível reduzido
      2800,  // fim de Jerusalém — volta ao normal
      2860,  // nível normal restaurado
      3420,  // fade out
      3425,  // silêncio total
    ],
    [0, 0.07, 0.07, 0.05, 0.05, 0.07, 0.07, 0],
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
            {/* Narração do locutor — entra 0.5s após o início do slide */}
            <Sequence from={15}>
              <Audio
                src={staticFile(NARRATION_FILES[i])}
                volume={1.0}
              />
            </Sequence>
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
