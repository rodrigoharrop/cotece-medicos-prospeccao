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
import { slides, SLIDE_DURATIONS, TRANSITION_DURATION } from "./data";
import { IntroSlide } from "./IntroSlide";
import { DaySlideComp } from "./DaySlideComp";
import { ClosingSlide } from "./ClosingSlide";

const SlideRenderer: React.FC<{ slideIndex: number }> = ({ slideIndex }) => {
  const slide = slides[slideIndex];
  if (slide.country === "intro") return <IntroSlide slide={slide} />;
  if (slide.country === "closing") return <ClosingSlide slide={slide} />;
  return <DaySlideComp slide={slide} />;
};

const BackgroundMusic: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Volume normal → crescendo dramático nos últimos ~13s → fade out final
  const volume = interpolate(
    frame,
    [
      0,
      45,
      durationInFrames - 400, // começa a crescer ~13s antes do fim
      durationInFrames - 65,  // pico no clímax "É uma virada"
      durationInFrames - 5,   // silêncio total
    ],
    [0, 0.22, 0.22, 0.44, 0],
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

export const CaravanaVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Calcula posição de início de cada slide com base nas durações individuais
  const slideStarts: number[] = [];
  let cumulative = 0;
  for (let i = 0; i < slides.length; i++) {
    slideStarts.push(cumulative);
    cumulative += SLIDE_DURATIONS[i] - TRANSITION_DURATION;
  }

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <BackgroundMusic />

      {slides.map((slide, i) => {
        const start = slideStarts[i];
        const isLast = i === slides.length - 1;
        const slideDur = SLIDE_DURATIONS[i];

        // Sequência visual estende pelo TRANSITION_DURATION para o crossfade
        const seqDuration = isLast ? slideDur : slideDur + TRANSITION_DURATION;

        const localFrame = frame - start;

        const fadeProgress = isLast
          ? 0
          : interpolate(
              localFrame,
              [slideDur - TRANSITION_DURATION, slideDur],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

        return (
          <Sequence
            key={slide.day}
            from={start}
            durationInFrames={seqDuration}
          >
            <AbsoluteFill style={{ opacity: 1 - fadeProgress }}>
              <SlideRenderer slideIndex={i} />
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* Marca d'água XDreams Travel — renderizada POR CIMA dos slides */}
      <Img
        src={staticFile("xdreams_logo.png")}
        style={{
          position: "absolute",
          bottom: 22,
          left: 52,
          width: 130,
          opacity: 0.28,
          pointerEvents: "none",
          filter: "drop-shadow(0 0 6px rgba(0,0,0,0.8))",
        }}
      />
    </AbsoluteFill>
  );
};
