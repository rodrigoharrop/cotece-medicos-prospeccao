import React from "react";
import { registerRoot, Composition } from "remotion";
import { CaravanaVideo } from "./CaravanaVideo";
import { CaravanaVertical } from "./CaravanaVertical";
import { CaravanaReelsShort, REELS_SHORT_TOTAL } from "./CaravanaReelsShort";
import { TabernaculosVideo } from "./TabernaculosVideo";
import { slides, SLIDE_DURATIONS, TRANSITION_DURATION, VIDEO_FPS } from "./data";
import { tabSlides, TAB_SLIDE_DURATIONS, TAB_TRANSITION } from "./dataTab";

// Total de frames — Tabernáculos
const TAB_TOTAL_FRAMES =
  TAB_SLIDE_DURATIONS.reduce((acc, d) => acc + d, 0) -
  (tabSlides.length - 1) * TAB_TRANSITION;

// Soma de todas as durações individuais menos as transições sobrepostas
const TOTAL_FRAMES =
  SLIDE_DURATIONS.reduce((acc, d) => acc + d, 0) -
  (slides.length - 1) * TRANSITION_DURATION;

const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── Versão principal: 1920×1080 (YouTube / TV / projeção) ── */}
      <Composition
        id="CaravanaProfetica"
        component={CaravanaVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
      />

      {/* ── Versão vertical letterbox: 1080×1920 (vídeo completo para Reels) ── */}
      <Composition
        id="CaravanaProfeticaVertical"
        component={CaravanaVertical}
        durationInFrames={TOTAL_FRAMES}
        fps={VIDEO_FPS}
        width={1080}
        height={1920}
      />

      {/* ── Versão Reels curta: 1080×1920 — 60s com os melhores momentos ── */}
      <Composition
        id="CaravanaProfeticaReels"
        component={CaravanaReelsShort}
        durationInFrames={REELS_SHORT_TOTAL}
        fps={VIDEO_FPS}
        width={1080}
        height={1920}
      />

      {/* ════════════════════════════════════════════════════════════════
          CARAVANA TABERNÁCULOS 2026 — Turquia + Israel
          ════════════════════════════════════════════════════════════════ */}
      <Composition
        id="TabernaculosProfeticos"
        component={TabernaculosVideo}
        durationInFrames={TAB_TOTAL_FRAMES}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
