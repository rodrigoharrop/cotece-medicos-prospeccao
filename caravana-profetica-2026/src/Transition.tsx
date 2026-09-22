import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const CrossFade: React.FC<{
  from: React.ReactNode;
  to: React.ReactNode;
  progress: number;
}> = ({ from, to, progress }) => {
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: 1 - progress }}>{from}</AbsoluteFill>
      <AbsoluteFill style={{ opacity: progress }}>{to}</AbsoluteFill>
    </AbsoluteFill>
  );
};
