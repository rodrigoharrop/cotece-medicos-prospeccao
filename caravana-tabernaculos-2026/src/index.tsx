import React from "react";
import { registerRoot, Composition } from "remotion";
import { TabernaculosVideo } from "./TabernaculosVideo";
import { TabernaculosReels } from "./TabernaculosReels";
import { tabSlides, TAB_SLIDE_DURATIONS, TAB_TRANSITION, TAB_VIDEO_FPS } from "./dataTab";

// Total de frames com crossfades descontados
const TAB_TOTAL_FRAMES =
  TAB_SLIDE_DURATIONS.reduce((acc, d) => acc + d, 0) -
  (tabSlides.length - 1) * TAB_TRANSITION;

const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 16:9 — para telão / YouTube / TV */}
      <Composition
        id="TabernaculosVideo"
        component={TabernaculosVideo}
        durationInFrames={TAB_TOTAL_FRAMES}
        fps={TAB_VIDEO_FPS}
        width={1920}
        height={1080}
      />

      {/* 9:16 — para Instagram Reels / Stories / TikTok */}
      <Composition
        id="TabernaculosReels"
        component={TabernaculosReels}
        durationInFrames={TAB_TOTAL_FRAMES}
        fps={TAB_VIDEO_FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};

registerRoot(RemotionRoot);
