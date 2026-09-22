/**
 * TabernaculosReels — Versão vertical 1080×1920 para Instagram Reels
 * Mesma narração e música do vídeo horizontal, layout redesenhado para mobile
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
} from "remotion";
import { tabSlides, TAB_SLIDE_DURATIONS, TAB_TRANSITION } from "./dataTab";
import { TabReelsIntroSlide   } from "./TabReelsIntroSlide";
import { TabReelsSlideComp    } from "./TabReelsSlideComp";
import { TabReelsClosingSlide } from "./TabReelsClosingSlide";

// Mesmos arquivos de narração do vídeo horizontal
const NARRATION_FILES = [
  "audio/narration_tab_0.mp3",
  "audio/narration_tab_1.mp3",
  "audio/narration_tab_2.mp3",
  "audio/narration_tab_3.mp3",
  "audio/narration_tab_4.mp3",
];

const TabReelsSlideRenderer: React.FC<{ index: number }> = ({ index }) => {
  const slide = tabSlides[index];
  if (slide.type === "intro")   return <TabReelsIntroSlide   slide={slide} />;
  if (slide.type === "closing") return <TabReelsClosingSlide slide={slide} />;
  return <TabReelsSlideComp slide={slide} />;
};

const TabReelsMusic: React.FC = () => {
  const frame = useCurrentFrame();

  const volume = interpolate(
    frame,
    [0, 45, 3420, 3425],
    [0, 0.07, 0.07, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return <Audio src={staticFile("audio/background_music.mp3")} volume={volume} loop />;
};

export const TabernaculosReels: React.FC = () => {
  const frame = useCurrentFrame();

  const slideStarts: number[] = [];
  let cumulative = 0;
  for (let i = 0; i < tabSlides.length; i++) {
    slideStarts.push(cumulative);
    cumulative += TAB_SLIDE_DURATIONS[i] - TAB_TRANSITION;
  }

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <TabReelsMusic />

      {tabSlides.map((slide, i) => {
        const start      = slideStarts[i];
        const isLast     = i === tabSlides.length - 1;
        const slideDur   = TAB_SLIDE_DURATIONS[i];
        const seqDur     = isLast ? slideDur : slideDur + TAB_TRANSITION;
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
            <Sequence from={15}>
              <Audio src={staticFile(NARRATION_FILES[i])} volume={1.0} />
            </Sequence>
            <AbsoluteFill style={{ opacity: 1 - fadeProgress }}>
              <TabReelsSlideRenderer index={i} />
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* Marca d'água */}
      <Img
        src={staticFile("xdreams_logo.png")}
        style={{
          position: "absolute",
          bottom: 90,
          left: 48,
          width: 100,
          opacity: 0.20,
          pointerEvents: "none",
          filter: "drop-shadow(0 0 4px rgba(0,0,0,0.9))",
        }}
      />
    </AbsoluteFill>
  );
};
