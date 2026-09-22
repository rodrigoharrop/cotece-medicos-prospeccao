/**
 * CaravanaReelsShort — 60 segundos verticais (1080×1920)
 * Destaques da Caravana Profética 2026 para Reels / TikTok / Shorts
 * Com narração em cada seção + música de fundo
 */
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ── Seções e durações ─────────────────────────────────────────────────────────
interface Section {
  key: string;
  flag: string;
  country: string;
  title: string;
  subtitle: string;
  highlights: string[];
  imageUrl: string;
  imageUrl2?: string;
  accentColor: string;
  bg: string;
  durationFrames: number;
}

const SECTIONS: Section[] = [
  {
    key: "intro",
    flag: "✡️",
    country: "",
    title: "CARAVANA PROFÉTICA",
    subtitle: "Uma jornada que vai além do turismo",
    highlights: ["10 Dias / 09 Noites", "3 Países", "Saída: 01/12/2026"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/fe/Panor%C3%A1mica_de_Jerusal%C3%A9n_desde_el_Monte_de_los_Olivos.jpg",
    accentColor: "#c9a84c",
    bg: "#03030f",
    durationFrames: 390, // 13s
  },
  {
    key: "italy",
    flag: "🇮🇹",
    country: "ITÁLIA",
    title: "Roma Eterna",
    subtitle: "Coliseu • Fontana di Trevi • Panteão",
    highlights: [
      "Coliseu de Roma — Anfiteatro Flávio",
      "Monte Palatino — berço de Roma",
      "Fontana di Trevi & Panteão",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1080&q=85",
    imageUrl2:
      "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=1080&q=85",
    accentColor: "#fb923c",
    bg: "#1f0e00",
    durationFrames: 270, // 9s
  },
  {
    key: "egypt",
    flag: "🇪🇬",
    country: "EGITO",
    title: "Pirâmides & Monte Sinai",
    subtitle: "Onde a Bíblia ganhou forma",
    highlights: [
      "Pirâmides de Gizé — 4.500 anos de história",
      "Grande Esfinge • Museu de Tutancâmon",
      "Subida noturna ao Monte Sinai",
    ],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg",
    imageUrl2:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/MtSinaiJune2006.JPG",
    accentColor: "#d4a017",
    bg: "#1a0f00",
    durationFrames: 300, // 10s
  },
  {
    key: "israel",
    flag: "🇮🇱",
    country: "ISRAEL",
    title: "Terra Santa",
    subtitle: "Galileia • Jordão • Jerusalém",
    highlights: [
      "Batismo no Rio Jordão — Yardenit",
      "Mar da Galileia • Cafarnaum",
      "Via Dolorosa • Muro das Lamentações",
    ],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/17/Westernwall2.jpg",
    imageUrl2:
      "https://upload.wikimedia.org/wikipedia/commons/7/76/Sea_of_Galilee_%28panoramic_view%2C_ca._2006%29.jpg",
    accentColor: "#38bdf8",
    bg: "#00122e",
    durationFrames: 360, // 12s
  },
  {
    key: "cta",
    flag: "🙏",
    country: "",
    title: "VAGAS LIMITADAS",
    subtitle: "Garanta já sua vaga",
    highlights: [
      "Saída: 01/12/2026 de São Paulo",
      "Liderança: Profeta Ricardo Strobel",
      "🌐 www.xdreamstravel.com.br",
    ],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8b/Jerusalem-2013%282%29-Temple_Mount-Dome_of_the_Rock_%28SE_exposure%29.jpg",
    accentColor: "#c9a84c",
    bg: "#08081a",
    durationFrames: 630, // 21s
  },
];

const SECTION_STARTS = SECTIONS.reduce<number[]>((acc, s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + SECTIONS[i - 1].durationFrames);
  return acc;
}, []);

export const REELS_SHORT_TOTAL = SECTIONS.reduce((acc, s) => acc + s.durationFrames, 0);


// ── Música de fundo ───────────────────────────────────────────────────────────
const ReelsMusic: React.FC = () => {
  const frame = useCurrentFrame();
  // Sobe nos últimos 5s (CTA final) e fecha no fim
  const volume = interpolate(
    frame,
    [0, 30, REELS_SHORT_TOTAL - 90, REELS_SHORT_TOTAL - 30, REELS_SHORT_TOTAL],
    [0, 0.14, 0.14, 0.28, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return <Audio src={staticFile("audio/background_music.mp3")} volume={volume} loop />;
};

// ── Slide genérico para seções de país ───────────────────────────────────────
const SectionSlide: React.FC<{ section: Section }> = ({ section }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dur = section.durationFrames;
  const bgScale = interpolate(frame, [0, dur], [1.0, 1.08]);
  const exit = interpolate(frame, [dur - 18, dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const flagScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, delay: 4 });
  const titleY = interpolate(
    spring({ frame, fps, config: { damping: 20, stiffness: 120 }, delay: 10 }),
    [0, 1],
    [30, 0]
  );
  const titleOpacity = spring({ frame, fps, config: { damping: 20, stiffness: 120 }, delay: 10 });
  const subOpacity   = spring({ frame, fps, config: { damping: 20, stiffness: 80  }, delay: 20 });
  const hlOpacity    = spring({ frame, fps, config: { damping: 20, stiffness: 60  }, delay: 32 });
  const lineW        = spring({ frame, fps, config: { damping: 20, stiffness: 80  }, delay: 8  });

  return (
    <AbsoluteFill style={{ background: section.bg, overflow: "hidden" }}>
      {/* Imagem de fundo com Ken Burns */}
      <AbsoluteFill
        style={{
          backgroundImage: `url(${section.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          transform: `scale(${bgScale})`,
          opacity: 0.6,
        }}
      />
      {/* Gradiente vertical */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg,
            ${section.bg}dd 0%,
            ${section.bg}44 28%,
            ${section.bg}22 55%,
            ${section.bg}ee 75%,
            ${section.bg}ff 100%)`,
        }}
      />
      {/* Barra de cor no topo */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, height: 5,
          background: `linear-gradient(90deg, ${section.accentColor}, ${section.accentColor}55, transparent)`,
          opacity: lineW,
        }}
      />

      {/* Flag + país — topo */}
      {section.country && (
        <div
          style={{
            position: "absolute",
            top: 80, left: 0, right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            opacity: flagScale,
            transform: `scale(${flagScale})`,
          }}
        >
          <div style={{ fontSize: 80 }}>{section.flag}</div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 9,
              color: section.accentColor,
              fontFamily: "Arial, sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {section.country}
          </div>
        </div>
      )}

      {/* Conteúdo inferior */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          padding: "0 56px 90px",
          opacity: 1 - exit * 2,
        }}
      >
        <div
          style={{
            width: interpolate(lineW, [0, 1], [0, 200]),
            height: 3,
            background: section.accentColor,
            borderRadius: 2,
            marginBottom: 18,
          }}
        />
        <div
          style={{
            fontSize: section.key === "intro" ? 72 : 62,
            fontWeight: 900,
            color: "#ffffff",
            fontFamily: "Georgia, serif",
            letterSpacing: -2,
            lineHeight: 1.0,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textShadow: "0 4px 40px rgba(0,0,0,0.85)",
            marginBottom: 12,
          }}
        >
          {section.title}
        </div>
        <div
          style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.72)",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            lineHeight: 1.5,
            opacity: subOpacity,
            marginBottom: 22,
          }}
        >
          {section.subtitle}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, opacity: hlOpacity }}>
          {section.highlights.map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 6, height: 6,
                  borderRadius: "50%",
                  background: section.accentColor,
                  flexShrink: 0,
                  boxShadow: `0 0 10px ${section.accentColor}`,
                }}
              />
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.82)", fontFamily: "Arial, sans-serif", lineHeight: 1.4 }}>
                {h}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── CTA final ────────────────────────────────────────────────────────────────
const CTASlide: React.FC<{ section: Section }> = ({ section }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgScale    = interpolate(frame, [0, section.durationFrames], [1.0, 1.06]);
  const iconScale  = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 5 });
  const titleOp    = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 14 });
  const cardsOp    = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 30 });
  const ctaOp      = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 50 });
  const ctaScale   = spring({ frame, fps, config: { damping: 12, stiffness: 70 }, delay: 50 });
  const lineW      = spring({ frame, fps, config: { damping: 20, stiffness: 80 }, delay: 20 });

  const glow = interpolate(
    frame,
    [section.durationFrames - 120, section.durationFrames - 30, section.durationFrames],
    [0, 0.85, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: "#030310", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          backgroundImage: `url(${section.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `scale(${bgScale})`,
          opacity: 0.28,
        }}
      />
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.08) 0%, rgba(3,3,16,0.96) 65%)",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 45%, rgba(201,168,76,${(glow * 0.5).toFixed(3)}) 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, height: 4,
          background: `linear-gradient(90deg, transparent, #c9a84c, transparent)`,
          opacity: lineW,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 60px",
        }}
      >
        {/* Logo */}
        <Img
          src={staticFile("xdreams_logo.png")}
          style={{
            width: 190,
            opacity: 0.92,
            marginBottom: 24,
            filter: "drop-shadow(0 0 6px rgba(0,0,0,0.8))",
          }}
        />

        <div
          style={{
            fontSize: 64,
            transform: `scale(${iconScale})`,
            marginBottom: 18,
            filter: "drop-shadow(0 0 30px rgba(201,168,76,0.8))",
          }}
        >
          🙏
        </div>

        <div
          style={{
            fontSize: 12,
            letterSpacing: 8,
            color: "#c9a84c",
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
            opacity: titleOp,
            marginBottom: 10,
          }}
        >
          NÃO PERCA ESTA OPORTUNIDADE
        </div>

        <div style={{ fontSize: 80, fontWeight: 900, color: "#ffffff", fontFamily: "Georgia, serif", letterSpacing: -3, lineHeight: 1, textAlign: "center", opacity: titleOp }}>
          VAGAS
        </div>
        <div style={{ fontSize: 80, fontWeight: 900, color: "#c9a84c", fontFamily: "Georgia, serif", letterSpacing: -3, lineHeight: 1, textAlign: "center", opacity: titleOp, marginBottom: 26 }}>
          LIMITADAS
        </div>

        <div
          style={{
            width: interpolate(lineW, [0, 1], [0, 320]),
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.7), transparent)",
            marginBottom: 26,
          }}
        />

        {/* Cards verticais */}
        <div style={{ display: "flex", flexDirection: "column", gap: 11, width: "100%", opacity: cardsOp, marginBottom: 32 }}>
          {[
            { emoji: "📅", label: "Saída", value: "01 de Dezembro de 2026" },
            { emoji: "🌍", label: "Países", value: "Itália • Egito • Israel" },
            { emoji: "🛏️", label: "Duração", value: "10 Dias / 09 Noites" },
            { emoji: "👤", label: "Liderança", value: "Profeta Ricardo Strobel" },
          ].map((c) => (
            <div
              key={c.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "14px 22px",
                border: "1px solid rgba(201,168,76,0.25)",
                borderRadius: 14,
                background: "rgba(201,168,76,0.06)",
              }}
            >
              <div style={{ fontSize: 24 }}>{c.emoji}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ fontSize: 10, color: "#c9a84c", letterSpacing: 4, fontFamily: "Arial, sans-serif", fontWeight: 700, textTransform: "uppercase" }}>
                  {c.label}
                </div>
                <div style={{ fontSize: 14, color: "#fff", fontFamily: "Georgia, serif", fontWeight: 600 }}>
                  {c.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ opacity: ctaOp, transform: `scale(${ctaScale})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div
            style={{
              padding: "20px 60px",
              background: "#c9a84c",
              borderRadius: 50,
              color: "#000",
              fontSize: 19,
              fontWeight: 900,
              letterSpacing: 2,
              fontFamily: "Arial, sans-serif",
              textTransform: "uppercase",
              boxShadow: "0 0 60px rgba(201,168,76,0.5)",
            }}
          >
            www.xdreamstravel.com.br
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: 4, fontFamily: "Arial, sans-serif", textTransform: "uppercase" }}>
            🇮🇹 Roma &nbsp;•&nbsp; 🇪🇬 Egito &nbsp;•&nbsp; 🇮🇱 Israel
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Composição principal ──────────────────────────────────────────────────────
export const CaravanaReelsShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* Música de fundo — volume baixo para não abafar a narração */}
      <ReelsMusic />

      {SECTIONS.map((section, i) => {
        const start = SECTION_STARTS[i];
        const isLast = i === SECTIONS.length - 1;

        return (
          <Sequence key={section.key} from={start} durationInFrames={section.durationFrames}>
            {isLast ? (
              <CTASlide section={section} />
            ) : (
              <SectionSlide section={section} />
            )}
          </Sequence>
        );
      })}

      {/* Marca d'água — por cima de tudo */}
      <Img
        src={staticFile("xdreams_logo.png")}
        style={{
          position: "absolute",
          bottom: 28,
          right: 44,
          width: 100,
          opacity: 0.25,
          pointerEvents: "none",
          filter: "drop-shadow(0 0 6px rgba(0,0,0,0.8))",
        }}
      />
    </AbsoluteFill>
  );
};
