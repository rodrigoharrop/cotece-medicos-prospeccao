import React from "react";
import { Audio, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { TRANSITION_DURATION } from "./data";

interface SlideAudioProps {
  index: number;       // índice do slide 00–10
  startFrame?: number; // frame em que a narração começa (dentro da sequência)
}

export const SlideAudio: React.FC<SlideAudioProps> = ({ index, startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const filename = `narration_${String(index).padStart(2, "0")}.mp3`;

  // Sem fade-in: áudio começa em volume pleno no frame 0 para a primeira palavra ser audível.
  // Fade-out apenas no final, antes do próximo slide começar.
  const hardStop = durationInFrames - 2 * TRANSITION_DURATION + 4;
  const fadeOutStart = hardStop - 20;

  const volume = interpolate(
    frame,
    [fadeOutStart, hardStop],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (frame > hardStop) return null;

  return (
    <Audio
      src={staticFile(`audio/${filename}`)}
      startFrom={0}
      volume={volume}
    />
  );
};
