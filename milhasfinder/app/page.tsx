'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { searchAirports, type Airport } from '@/lib/airports';
import { getStrategiesForRoute, type SweetSpot } from '@/lib/partnerships';

// ─── Types ───────────────────────────────────────────────────────────────────

interface AwardResult {
  id: string;
  date: string;
  origin: string;
  dest: string;
  source: string;
  sourceLabel: string;
  miles: number;
  seats: number;
  direct: boolean;
  airlines: string;
  milePrice: number | null;
  totalBRL: number | null;
  lastSeen: string;
}

interface MilePrice {
  label: string;
  price: number;
  negotiated: boolean;
  note?: string;
  updatedAt: string;
}

interface SearchResponse {
  awards: AwardResult[];
  milePrices: Record<string, MilePrice>;
  searchedAt: string;
  params: SearchFormData;
}

interface SearchFormData {
  origin: string;
  destinations: string[];
  dateOut: string;
  dateEnd: string;
  pax: number;
  cabin: string;
  nonstopOnly: boolean;
  wantMiles: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmtDate = (d: string) => {
  if (!d) return '';
  const [y, m, day] = d.split('-');
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  return `${day} ${months[parseInt(m) - 1]} ${y}`;
};

const fmtBRL = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

const fmtMiles = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(0)}k` : n.toString();

// Booking links per loyalty program
const BOOKING_LINKS: Record<string, { label: string; url: string }> = {
  alaska:       { label: 'Alaska Mileage Plan',       url: 'https://www.alaskaair.com/awardtravel' },
  flyingblue:   { label: 'Flying Blue (AF/KLM)',       url: 'https://www.flyingblue.com/en/spend/flights/search' },
  american:     { label: 'American AAdvantage',        url: 'https://www.aa.com/awardBooking/searchFlights' },
  united:       { label: 'United MileagePlus',         url: 'https://www.united.com/en/us/flights/awards' },
  smiles:       { label: 'Smiles (GOL)',               url: 'https://www.smiles.com.br/passagem-de-aviao' },
  aeroplan:     { label: 'Air Canada Aeroplan',        url: 'https://www.aircanada.com/ca/en/aco/home/book.html' },
  turkish:      { label: 'Turkish Miles&Smiles',       url: 'https://www.turkishairlines.com/en-us/miles-and-smiles/award-ticket/' },
  emirates:     { label: 'Emirates Skywards',          url: 'https://www.emirates.com/english/book/' },
  connectmiles: { label: 'Copa ConnectMiles',          url: 'https://www.copaair.com/en/web/gs/award-redemption' },
  azul:         { label: 'Azul TudoAzul',             url: 'https://www.tudoazul.com.br/voos' },
  latam:        { label: 'LATAM Pass',                 url: 'https://latampass.latam.com/pt_BR/use-seus-pontos/voos' },
  singapore:    { label: 'Singapore KrisFlyer',        url: 'https://www.singaporeair.com/en_UK/us/ppsclub-krisflyer/redeem-miles/' },
  virginatlantic:{ label: 'Virgin Atlantic Flying Club',url: 'https://flywith.virginatlantic.com/gb/en/book-flights/flying-club-award-flights.html' },
  qantas:       { label: 'Qantas Frequent Flyer',      url: 'https://www.qantas.com/au/en/frequent-flyer/redeem/flight-rewards.html' },
  etihad:       { label: 'Etihad Guest',               url: 'https://www.etihad.com/en/etihad-guest/miles/redeem' },
  delta:        { label: 'Delta SkyMiles',             url: 'https://www.delta.com/us/en/skymiles/redeem-miles/book-award-travel' },
  eurobonus:    { label: 'SAS EuroBonus',              url: 'https://www.flysas.com/en/eurobonus/' },
  jetblue:      { label: 'JetBlue TrueBlue',           url: 'https://www.jetblue.com/trueblue/redeem-points' },
  qatar:        { label: 'Qatar Privilege Club',        url: 'https://www.qatarairways.com/en/privilege-club/redeem.html' },
  lufthansa:    { label: 'Lufthansa Miles&More',        url: 'https://www.miles-and-more.com/global/en/spend/flights.html' },
  finnair:      { label: 'Finnair Plus',               url: 'https://www.finnair.com/en/finnair-plus/spend' },
  aeromexico:   { label: 'Aeroméxico Club Premier',    url: 'https://www.aeromexico.com/es-mx/club-premier' },
  velocity:     { label: 'Virgin Australia Velocity',  url: 'https://experience.virginaustralia.com/au/velocity/' },
  ethiopian:    { label: 'Ethiopian ShebaMiles',       url: 'https://www.ethiopianairlines.com/aa/shebamiles' },
  saudia:       { label: 'Saudi AlFursan',             url: 'https://www.saudia.com/en/alfursan' },
};

// ─── Airport Autocomplete ─────────────────────────────────────────────────────

function AirportInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (iata: string) => void;
  placeholder?: string;
}) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<Airport[]>([]);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const airport = searchAirports(value).find(a => a.iata === value);
      setQuery(airport ? `${airport.iata} — ${airport.city}` : value);
    } else {
      setQuery('');
    }
  }, [value]);

  useEffect(() => {
    // Remove o sufixo " — Cidade" caso o aeroporto já esteja selecionado
    const cleanQuery = query.includes(' — ') ? query.split(' — ')[0].trim() : query;
    const hits = searchAirports(cleanQuery);
    setResults(hits);
    setOpen(focused && hits.length > 0 && cleanQuery.length > 0);
  }, [query, focused]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
        // Se não selecionou nada do dropdown, reverte para o valor atual
        if (value) {
          const airport = searchAirports(value).find(a => a.iata === value);
          setQuery(airport ? `${airport.iata} — ${airport.city}` : value);
        } else {
          setQuery('');
        }
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [query, value]);

  const select = (a: Airport) => {
    setQuery(`${a.iata} — ${a.city}`);
    onChange(a.iata);
    setOpen(false);
    setFocused(false);
  };

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <input
        style={styles.input}
        value={query}
        placeholder={placeholder || 'IATA...'}
        onChange={e => {
          const v = e.target.value;
          // Só força maiúsculas se parece ser um código IATA (sem espaços, curto)
          const upper = v.length <= 3 && !v.includes(' ') ? v.toUpperCase() : v;
          setQuery(upper);
          // Se digitou exatamente 3 letras e é um IATA conhecido, já seleciona
          if (upper.length === 3 && !upper.includes(' ')) {
            const match = results.find(a => a.iata === upper);
            if (match) onChange(upper);
          }
        }}
        onFocus={() => setFocused(true)}
        maxLength={40}
        autoComplete="off"
        spellCheck={false}
      />
      {open && (
        <div style={styles.dropdown}>
          {results.map(a => (
            <button
              key={a.iata}
              type="button"
              style={styles.dropdownItem}
              onMouseDown={() => select(a)}
            >
              <span style={styles.dropdownIata}>{a.iata}</span>
              <span style={styles.dropdownCity}>{a.city}</span>
              <span style={styles.dropdownName}>{a.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Strategy Panel ──────────────────────────────────────────────────────────

function SweetSpotCard({ spot }: { spot: SweetSpot }) {
  const cabinLabel = spot.cabin === 'Y' ? 'Econômica' : spot.cabin === 'J' ? 'Executiva' : spot.cabin === 'F' ? 'Primeira' : spot.cabin === 'Y+J' ? 'Eco / Exec' : 'Todas';
  return (
    <div style={strat.spotCard}>
      <div style={strat.spotHeader}>
        <div>
          <div style={strat.spotTitle}>{spot.title}</div>
          <div style={strat.spotMeta}>
            <span style={strat.tagInline}>{spot.carrier}</span>
            <span style={strat.tagGoldInline}>{cabinLabel}</span>
            <span style={{ color: 'var(--gold)', fontSize: 13, fontWeight: 600 }}>
              {spot.milesFrom.toLocaleString('pt-BR')}{spot.milesTo ? `–${spot.milesTo.toLocaleString('pt-BR')}` : '+'} mi
            </span>
          </div>
        </div>
        {spot.bookingUrl && (
          <a href={spot.bookingUrl} target="_blank" rel="noopener noreferrer" style={strat.bookBtn}>
            Emitir →
          </a>
        )}
      </div>
      <p style={strat.spotDesc}>{spot.description}</p>
      {spot.tip && (
        <div style={strat.tipBox}>
          <span style={{ color: 'var(--gold)' }}>💡</span> {spot.tip}
          {spot.bookingWindow && <span style={strat.windowTag}> {spot.bookingWindow}</span>}
        </div>
      )}
      {spot.warning && (
        <div style={strat.warnBox}>
          <span>⚠️</span> {spot.warning}
        </div>
      )}
    </div>
  );
}

function StrategyPanel({ origin, destinations }: { origin: string; destinations: string[] }) {
  const { sweetSpots, connectionHubs, region, tips } = getStrategiesForRoute(origin, destinations);
  const dest = destinations[0] || '';
  const regionLabel: Record<string, string> = {
    'domestic-br': '🇧🇷 Voo Doméstico Brasil',
    'br-europe': '🇪🇺 Brasil → Europa',
    'br-usa': '🇺🇸 Brasil → EUA',
    'br-middleeast': '🕌 Brasil → Oriente Médio',
    'br-asia': '🌏 Brasil → Ásia',
    'br-africa': '🌍 Brasil → África',
    'general': '🌐 Rota Internacional',
  };

  if (!origin || !dest) {
    return (
      <div style={strat.empty}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Preencha origem e destino para ver estratégias de emissão recomendadas.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Region header */}
      <div style={strat.regionHeader}>
        <span style={strat.regionLabel}>{regionLabel[region] || '🌐 Rota Internacional'}</span>
        <span style={strat.routeText}>{origin} → {dest}</span>
      </div>

      {/* Tips */}
      {tips.length > 0 && (
        <div style={strat.tipsBox}>
          <div style={strat.tipsTitle}>📋 Estratégia recomendada</div>
          <ul style={strat.tipsList}>
            {tips.map((t, i) => <li key={i} style={strat.tipsItem}>{t}</li>)}
          </ul>
        </div>
      )}

      {/* Sweet Spots */}
      {sweetSpots.length > 0 && (
        <div>
          <h3 style={{ ...styles.sectionTitle, marginBottom: 16 }}>
            Melhores parcerias para emissão
            <span style={styles.badge}>{sweetSpots.length} opções</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sweetSpots.map(s => <SweetSpotCard key={s.id} spot={s} />)}
          </div>
        </div>
      )}

      {/* Connection Hubs */}
      {connectionHubs.length > 0 && (
        <div>
          <h3 style={{ ...styles.sectionTitle, marginBottom: 16 }}>Hubs de conexão úteis</h3>
          <div style={strat.hubGrid}>
            {connectionHubs.map(h => (
              <div key={h.iata} style={strat.hubCard}>
                <span style={strat.hubIata}>{h.iata}</span>
                <span style={strat.hubCity}>{h.city}</span>
                <p style={strat.hubNote}>{h.note}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
                  {h.programs.map(p => <span key={p} style={strat.tagInline}>{p}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {sweetSpots.length === 0 && (
        <div style={strat.empty}>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Nenhuma parceria catalogada para essa rota ainda. Use a aba Buscar para verificar disponibilidade diretamente.</p>
        </div>
      )}
    </div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (pw: string) => void; authErr?: string }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pw) { setErr('Digite a senha'); return; }
    onLogin(pw);
    setErr('');
  };

  return (
    <div style={styles.loginWrap}>
      <div style={styles.loginBox}>
        <div style={styles.loginLogo}>✈</div>
        <h1 style={styles.loginTitle}>MilhasFinder</h1>
        <p style={styles.loginSub}>Buscador de passagens com milhas</p>
        <form onSubmit={submit} style={styles.loginForm}>
          <input
            type="email"
            defaultValue="rodrigo.harrop@gmail.com"
            readOnly
            style={{ ...styles.input, background: '#0D0D0D', color: '#555', cursor: 'default' }}
          />
          <input
            type="password"
            placeholder="Senha"
            value={pw}
            onChange={e => setPw(e.target.value)}
            style={styles.input}
            autoFocus
          />
          {err && <p style={styles.errText}>{err}</p>}
          <button type="submit" style={styles.btnPrimary}>Entrar</button>
        </form>
      </div>
    </div>
  );
}

// ─── Search Form ─────────────────────────────────────────────────────────────

function SearchForm({ onSearch, loading }: { onSearch: (f: SearchFormData) => void; loading: boolean }) {
  const [form, setForm] = useState<SearchFormData>({
    origin: 'FOR',
    destinations: ['CDG'],
    dateOut: '',
    dateEnd: '',
    pax: 1,
    cabin: 'business',
    nonstopOnly: false,
    wantMiles: true,
  });

  const addDest = () => setForm(f => ({ ...f, destinations: [...f.destinations, ''] }));
  const removeDest = (i: number) =>
    setForm(f => ({ ...f, destinations: f.destinations.filter((_, idx) => idx !== i) }));
  const setDest = (i: number, v: string) =>
    setForm(f => ({
      ...f,
      destinations: f.destinations.map((d, idx) => (idx === i ? v : d)),
    }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(form);
  };

  return (
    <form onSubmit={submit} style={styles.searchForm}>
      <h2 style={styles.sectionTitle}>Nova busca</h2>

      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Origem</label>
          <AirportInput
            value={form.origin}
            onChange={v => setForm(f => ({ ...f, origin: v }))}
            placeholder="FOR — Fortaleza"
          />
        </div>
        <div style={{ ...styles.field, flex: 2 }}>
          <label style={styles.label}>Destino(s)</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {form.destinations.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <AirportInput
                    value={d}
                    onChange={v => setDest(i, v)}
                    placeholder="CDG — Paris"
                  />
                </div>
                {form.destinations.length > 1 && (
                  <button type="button" onClick={() => removeDest(i)} style={styles.btnIcon}>✕</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addDest} style={styles.btnAdd}>+ Adicionar destino</button>
          </div>
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Data de ida</label>
          <input type="date" style={styles.input} value={form.dateOut}
            onChange={e => setForm(f => ({ ...f, dateOut: e.target.value }))} required />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Buscar até (opcional)</label>
          <input type="date" style={styles.input} value={form.dateEnd}
            onChange={e => setForm(f => ({ ...f, dateEnd: e.target.value }))} />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Passageiros</label>
          <input type="number" min={1} max={9} style={styles.input} value={form.pax}
            onChange={e => setForm(f => ({ ...f, pax: parseInt(e.target.value) || 1 }))} />
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Cabine</label>
          <div style={styles.chipRow}>
            {['economy', 'business', 'first'].map(c => (
              <button key={c} type="button"
                style={form.cabin === c ? styles.chipActive : styles.chip}
                onClick={() => setForm(f => ({ ...f, cabin: c }))}>
                {c === 'economy' ? 'Econômica' : c === 'business' ? 'Executiva' : 'Primeira'}
              </button>
            ))}
          </div>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Opções</label>
          <div style={styles.chipRow}>
            <button type="button"
              style={form.nonstopOnly ? styles.chipActive : styles.chip}
              onClick={() => setForm(f => ({ ...f, nonstopOnly: !f.nonstopOnly }))}>
              Só direto
            </button>
            <button type="button"
              style={form.wantMiles ? styles.chipActive : styles.chip}
              onClick={() => setForm(f => ({ ...f, wantMiles: !f.wantMiles }))}>
              Milhas
            </button>
          </div>
        </div>
      </div>

      <button type="submit" style={styles.btnPrimary} disabled={loading}>
        {loading ? '🔍 Buscando...' : '🔍 Buscar passagens'}
      </button>
    </form>
  );
}

// ─── Results ──────────────────────────────────────────────────────────────────

function Results({ data }: { data: SearchResponse }) {
  const { awards, milePrices } = data;
  const [selected, setSelected] = useState<AwardResult | null>(null);

  if (awards.length === 0) {
    return (
      <div style={styles.emptyBox}>
        <p style={{ fontSize: 32 }}>✈</p>
        <p style={{ color: 'var(--text-muted)', marginTop: 12 }}>Nenhuma disponibilidade encontrada para esses parâmetros.</p>
        <p style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 8 }}>
          Tente ampliar o intervalo de datas ou remover o filtro &quot;Só direto&quot;.
        </p>
      </div>
    );
  }

  const top5 = awards.slice(0, 5);
  const best = top5[0];
  const milePricesList = Object.entries(milePrices);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* Summary banner */}
      <div style={styles.banner}>
        <span style={styles.bannerLabel}>Melhor opção encontrada</span>
        <div style={styles.bannerMain}>
          <span style={{ color: 'var(--gold)', fontSize: 20, fontWeight: 700 }}>
            {best.origin} → {best.dest}
          </span>
          <span style={styles.bannerSep}>·</span>
          <span>{fmtDate(best.date)}</span>
          <span style={styles.bannerSep}>·</span>
          <span style={{ color: 'var(--gold)' }}>{fmtMiles(best.miles)} milhas</span>
          {best.totalBRL && (
            <>
              <span style={styles.bannerSep}>·</span>
              <span style={{ color: 'var(--success)', fontWeight: 600 }}>{fmtBRL(best.totalBRL)}</span>
            </>
          )}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          {best.sourceLabel} · {best.direct ? '✈ Direto' : `${best.airlines}`} · {best.seats} assento(s)
        </div>
      </div>

      {/* Award cards */}
      <div>
        <h3 style={styles.sectionTitle}>
          Top resultados com milhas
          <span style={styles.badge}>{awards.length} encontrados</span>
        </h3>
        <div style={styles.cardGrid}>
          {top5.map((a, i) => (
            <AwardCard key={a.id + i} award={a} rank={i + 1} onClick={() => setSelected(a)} />
          ))}
        </div>
        {selected && (
          <BookingModal
            award={selected}
            cabin={data.params.cabin}
            onClose={() => setSelected(null)}
          />
        )}
        {awards.length > 5 && (
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 16, textAlign: 'center' }}>
            + {awards.length - 5} opções adicionais disponíveis
          </p>
        )}
      </div>

      {/* Mile prices table */}
      <div>
        <h3 style={styles.sectionTitle}>Cotação de milhas no mercado</h3>
        <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Programa</th>
                <th style={styles.th}>R$/1.000 mi</th>
                <th style={styles.th}>Tipo</th>
                <th style={styles.th}>Observação</th>
              </tr>
            </thead>
            <tbody>
              {milePricesList.map(([key, mp]) => (
                <tr key={key} style={styles.tr}>
                  <td style={styles.td}>{mp.label}</td>
                  <td style={{ ...styles.td, color: 'var(--gold)', fontWeight: 600 }}>
                    R$ {mp.price.toFixed(2)}
                  </td>
                  <td style={styles.td}>
                    <span style={mp.negotiated ? styles.tagGreen : styles.tagGold}>
                      {mp.negotiated ? 'Negociado' : 'Pedido'}
                    </span>
                  </td>
                  <td style={{ ...styles.td, color: 'var(--text-muted)', fontSize: 12 }}>{mp.note || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ color: 'var(--text-dim)', fontSize: 12, marginTop: 10 }}>
          Preços atualizados em {milePricesList[0]?.[1]?.updatedAt}. &quot;Negociado&quot; = valor real aceito no grupo Telegram.
        </p>
      </div>

      <div style={styles.bookingNote}>
        <strong style={{ color: 'var(--gold)' }}>Como emitir:</strong>
        <ol style={{ marginTop: 10, paddingLeft: 20, color: 'var(--text-muted)', lineHeight: 2 }}>
          <li>Compre milhas do parceiro indicado no grupo Telegram</li>
          <li>Acesse o site do programa de fidelidade correspondente</li>
          <li>Busque o voo pela data exata mostrada acima</li>
          <li>Confirme a disponibilidade antes de transferir pontos</li>
        </ol>
      </div>

    </div>
  );
}

function AwardCard({ award, rank, onClick }: { award: AwardResult; rank: number; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={rank === 1
        ? { ...styles.card, ...styles.cardBest, cursor: 'pointer' }
        : { ...styles.card, cursor: 'pointer' }}
    >
      {rank === 1 && <div style={styles.bestTag}>⭐ Melhor custo-benefício</div>}
      <div style={styles.cardHeader}>
        <div>
          <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--gold)' }}>
            {award.origin} → {award.dest}
          </span>
          <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>
            {fmtDate(award.date)}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: award.totalBRL ? 'var(--success)' : 'var(--text)' }}>
            {award.totalBRL ? fmtBRL(award.totalBRL) : '—'}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {fmtMiles(award.miles)} milhas
          </div>
        </div>
      </div>

      <div style={styles.cardMeta}>
        <span style={styles.metaItem}>🏷 {award.sourceLabel}</span>
        <span style={styles.metaItem}>{award.direct ? '✈ Direto' : `🔁 ${award.airlines}`}</span>
        <span style={styles.metaItem}>💺 {award.seats || '?'} assento(s)</span>
        {award.milePrice && (
          <span style={styles.metaItem}>R$ {award.milePrice.toFixed(2)}/1k mi</span>
        )}
      </div>
    </div>
  );
}

// ─── Booking Modal ───────────────────────────────────────────────────────────

function BookingModal({ award, cabin, onClose }: { award: AwardResult; cabin: string; onClose: () => void }) {
  const booking = BOOKING_LINKS[award.source];
  const seatsUrl = `https://seats.aero/search?origin=${award.origin}&destination=${award.dest}&date=${award.date}&source=${award.source}&cabin=${cabin}`;

  const cabinLabel: Record<string, string> = {
    economy: 'Econômica', business: 'Executiva', first: 'Primeira',
  };

  const lastSeenText = award.lastSeen
    ? new Date(award.lastSeen).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
    : '—';

  return (
    <div style={modal.overlay} onClick={onClose}>
      <div style={modal.box} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={modal.header}>
          <div>
            <div style={modal.route}>{award.origin} → {award.dest}</div>
            <div style={modal.date}>{fmtDate(award.date)} · {cabinLabel[cabin] || cabin}</div>
          </div>
          <button style={modal.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Stats */}
        <div style={modal.statsRow}>
          <div style={modal.stat}>
            <div style={modal.statVal}>{fmtMiles(award.miles)}</div>
            <div style={modal.statLbl}>milhas</div>
          </div>
          {award.totalBRL && (
            <div style={modal.stat}>
              <div style={{ ...modal.statVal, color: 'var(--success)' }}>{fmtBRL(award.totalBRL)}</div>
              <div style={modal.statLbl}>estimado BRL</div>
            </div>
          )}
          <div style={modal.stat}>
            <div style={modal.statVal}>{award.seats || '?'}</div>
            <div style={modal.statLbl}>assento(s)</div>
          </div>
          <div style={modal.stat}>
            <div style={modal.statVal}>{award.direct ? '✈' : '🔁'}</div>
            <div style={modal.statLbl}>{award.direct ? 'Direto' : 'Conexão'}</div>
          </div>
        </div>

        {/* Meta */}
        <div style={modal.metaBox}>
          <div style={modal.metaRow}><span style={modal.metaKey}>Programa</span><span>{award.sourceLabel}</span></div>
          <div style={modal.metaRow}><span style={modal.metaKey}>Cias. operadoras</span><span>{award.airlines || '—'}</span></div>
          {award.milePrice && (
            <div style={modal.metaRow}><span style={modal.metaKey}>Preço milha</span><span>R$ {award.milePrice.toFixed(2)}/1k mi</span></div>
          )}
          <div style={modal.metaRow}><span style={modal.metaKey}>Última verificação</span><span style={{ color: 'var(--text-dim)', fontSize: 12 }}>{lastSeenText}</span></div>
        </div>

        {/* Warning */}
        <p style={modal.warning}>
          ⚠️ Confirme disponibilidade antes de transferir pontos — assentos podem mudar em tempo real.
        </p>

        {/* Buttons */}
        <div style={modal.btnRow}>
          <a href={seatsUrl} target="_blank" rel="noopener noreferrer" style={modal.btnSeats}>
            🔍 Ver no Seats.aero
          </a>
          {booking && (
            <a href={booking.url} target="_blank" rel="noopener noreferrer" style={modal.btnProgram}>
              ✈ Emitir no {booking.label}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [token, setToken] = useState('');
  const [authErr, setAuthErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [searchErr, setSearchErr] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'strategy'>('search');
  const [stratOrigin, setStratOrigin] = useState('FOR');
  const [stratDests, setStratDests] = useState(['CDG']);

  const handleLogin = useCallback(async (pw: string) => {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-app-token': pw },
      body: JSON.stringify({ origin: 'TEST', destinations: ['TEST'], dateOut: '2026-01-01', pax: 1, cabin: 'business', nonstopOnly: false, wantMiles: true }),
    });
    if (res.status === 401) {
      setAuthErr('Senha incorreta');
    } else {
      setToken(pw);
      setAuthErr('');
    }
  }, []);

  const handleSearch = useCallback(async (form: SearchFormData) => {
    setLoading(true);
    setSearchErr('');
    setResults(null);
    // Sync strategy panel with search params
    setStratOrigin(form.origin);
    setStratDests(form.destinations);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-app-token': token },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro desconhecido');
      setResults(data);
    } catch (err: unknown) {
      setSearchErr(err instanceof Error ? err.message : 'Erro na busca');
    } finally {
      setLoading(false);
    }
  }, [token]);

  if (!token) {
    return (
      <>
        <LoginScreen onLogin={handleLogin} />
        {authErr && (
          <p style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: '#3B1010', color: 'var(--danger)', padding: '10px 20px', borderRadius: 8, fontSize: 14 }}>
            {authErr}
          </p>
        )}
      </>
    );
  }

  return (
    <div style={styles.appWrap}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <span style={styles.headerLogo}>✈ MilhasFinder</span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              style={activeTab === 'search' ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab('search')}>
              🔍 Buscar
            </button>
            <button
              style={activeTab === 'strategy' ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab('strategy')}>
              🧭 Estratégia
            </button>
            <button style={{ ...styles.btnSmall, marginLeft: 8 }} onClick={() => setToken('')}>Sair</button>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        {activeTab === 'search' && (
          <>
            <SearchForm onSearch={handleSearch} loading={loading} />
            {loading && (
              <div style={styles.loadingBox}>
                <div style={styles.spinner} />
                <p style={{ marginTop: 16, color: 'var(--text-muted)' }}>Buscando disponibilidade no Seats.aero...</p>
              </div>
            )}
            {searchErr && (
              <div style={styles.errorBox}>
                <strong>Erro:</strong> {searchErr}
              </div>
            )}
            {results && !loading && (
              <div style={styles.resultsWrap}>
                <Results data={results} />
              </div>
            )}
          </>
        )}

        {activeTab === 'strategy' && (
          <div style={styles.resultsWrap}>
            <div style={strat.routeBar}>
              <div style={styles.field}>
                <label style={styles.label}>Origem</label>
                <AirportInput value={stratOrigin} onChange={setStratOrigin} placeholder="FOR — Fortaleza" />
              </div>
              <div style={{ ...styles.field, flex: 2 }}>
                <label style={styles.label}>Destino</label>
                <AirportInput value={stratDests[0] || ''} onChange={v => setStratDests([v])} placeholder="CDG — Paris" />
              </div>
            </div>
            <StrategyPanel origin={stratOrigin} destinations={stratDests} />
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  loginWrap: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'radial-gradient(ellipse at top, #1A1500 0%, #0A0A0A 60%)' },
  loginBox: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '48px 40px', width: '100%', maxWidth: 400, textAlign: 'center' },
  loginLogo: { fontSize: 48, marginBottom: 16 },
  loginTitle: { fontSize: 28, fontWeight: 700, color: 'var(--gold)', letterSpacing: -0.5 },
  loginSub: { color: 'var(--text-muted)', marginTop: 6, marginBottom: 32, fontSize: 14 },
  loginForm: { display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' },

  appWrap: { minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  header: { background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center' },
  headerInner: { maxWidth: 960, margin: '0 auto', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  headerLogo: { color: 'var(--gold)', fontWeight: 700, fontSize: 17, letterSpacing: -0.3 },
  main: { flex: 1, padding: '32px 24px', maxWidth: 960, margin: '0 auto', width: '100%' },

  searchForm: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 28, display: 'flex', flexDirection: 'column', gap: 20 },
  row: { display: 'flex', gap: 16, flexWrap: 'wrap' },
  field: { display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 140 },
  label: { fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'var(--text)', fontSize: 15, outline: 'none', width: '100%' },

  dropdown: { position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100, background: '#1A1A1A', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', marginTop: 4, boxShadow: '0 8px 24px rgba(0,0,0,0.6)', maxHeight: 320, overflowY: 'auto' },
  dropdownItem: { display: 'flex', alignItems: 'baseline', gap: 8, width: '100%', padding: '10px 14px', background: 'transparent', border: 'none', borderBottom: '1px solid #222', cursor: 'pointer', textAlign: 'left' },
  dropdownIata: { color: 'var(--gold)', fontWeight: 700, fontSize: 14, minWidth: 36 },
  dropdownCity: { color: 'var(--text)', fontSize: 14, minWidth: 90 },
  dropdownName: { color: 'var(--text-muted)', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },

  chipRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  chip: { background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 20, padding: '6px 14px', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 13 },
  chipActive: { background: '#1C1500', border: '1px solid var(--gold)', borderRadius: 20, padding: '6px 14px', cursor: 'pointer', color: 'var(--gold)', fontSize: 13, fontWeight: 600 },
  btnPrimary: { background: 'var(--gold)', color: '#0A0A0A', border: 'none', borderRadius: 'var(--radius-sm)', padding: '13px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' },
  btnSmall: { background: 'transparent', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 14px', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer' },
  btnIcon: { background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 13 },
  btnAdd: { background: 'transparent', border: '1px dashed var(--border)', borderRadius: 6, padding: '8px 14px', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 13 },
  errText: { color: 'var(--danger)', fontSize: 13 },

  sectionTitle: { fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', gap: 10, alignItems: 'center' },
  badge: { background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 20, padding: '2px 10px', fontSize: 12, color: 'var(--text-muted)', fontWeight: 400 },

  loadingBox: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 64 },
  spinner: { width: 40, height: 40, border: '3px solid var(--border)', borderTop: '3px solid var(--gold)', borderRadius: '50%', animation: 'spin 1s linear infinite' },
  errorBox: { background: '#1A0A0A', border: '1px solid var(--danger)', borderRadius: 'var(--radius)', padding: '16px 20px', color: 'var(--danger)', marginTop: 24 },
  resultsWrap: { marginTop: 32 },

  banner: { background: 'linear-gradient(135deg, #1C1500 0%, #0E0E0E 100%)', border: '1px solid var(--gold)', borderRadius: 'var(--radius)', padding: 24 },
  bannerLabel: { fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--gold)', opacity: 0.7 },
  bannerMain: { display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', fontSize: 16, fontWeight: 600, marginTop: 10, marginBottom: 8 },
  bannerSep: { color: 'var(--border)' },

  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 },
  card: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, position: 'relative' },
  cardBest: { borderColor: 'var(--gold)', background: '#0F0D00' },
  bestTag: { position: 'absolute', top: -12, left: 16, background: '#C8A96E', color: '#0A0A0A', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardMeta: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 },
  metaItem: { background: 'var(--surface2)', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: 'var(--text-muted)' },

  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' },
  tr: { borderBottom: '1px solid #1A1A1A' },
  td: { padding: '12px 16px', fontSize: 14 },
  tagGreen: { background: '#0D2010', border: '1px solid #22C55E44', color: 'var(--success)', borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 600 },
  tagGold: { background: '#1C1500', border: '1px solid var(--gold)', color: 'var(--gold)', borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 600 },

  emptyBox: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 64, textAlign: 'center' },
  bookingNote: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, fontSize: 14 },
  tab: { background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 500 },
  tabActive: { background: 'var(--gold)', border: '1px solid var(--gold)', color: '#000', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 700 },
};

const modal: Record<string, React.CSSProperties> = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 },
  box: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 28, width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 20 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  route: { fontSize: 22, fontWeight: 700, color: 'var(--gold)' },
  date: { fontSize: 14, color: 'var(--text-muted)', marginTop: 4 },
  closeBtn: { background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 14, flexShrink: 0 },
  statsRow: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  stat: { background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px', flex: 1, minWidth: 80, textAlign: 'center' as const },
  statVal: { fontSize: 20, fontWeight: 700, color: 'var(--text)' },
  statLbl: { fontSize: 11, color: 'var(--text-muted)', marginTop: 4, textTransform: 'uppercase' as const, letterSpacing: 0.5 },
  metaBox: { background: '#0D0D0D', borderRadius: 10, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 },
  metaRow: { display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text)' },
  metaKey: { color: 'var(--text-muted)', fontWeight: 500 },
  warning: { fontSize: 12, color: 'var(--text-dim)', background: 'rgba(255,200,0,0.06)', border: '1px solid rgba(255,200,0,0.15)', borderRadius: 8, padding: '10px 14px', margin: 0 },
  btnRow: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  btnSeats: { flex: 1, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px', color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none', textAlign: 'center' as const, cursor: 'pointer' },
  btnProgram: { flex: 1, background: 'var(--gold)', border: 'none', borderRadius: 10, padding: '12px 16px', color: '#000', fontSize: 13, fontWeight: 700, textDecoration: 'none', textAlign: 'center' as const, cursor: 'pointer' },
};

const strat: Record<string, React.CSSProperties> = {
  routeBar: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 24px', display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' },
  regionHeader: { display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  regionLabel: { fontSize: 18, fontWeight: 700, color: 'var(--text)' },
  routeText: { fontSize: 14, color: 'var(--gold)', fontWeight: 600, background: 'rgba(212,175,55,0.1)', padding: '3px 10px', borderRadius: 20 },
  tipsBox: { background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 10, padding: '16px 20px' },
  tipsTitle: { fontWeight: 700, color: 'var(--gold)', marginBottom: 10, fontSize: 14 },
  tipsList: { margin: 0, paddingLeft: 20 },
  tipsItem: { color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.5 },
  spotCard: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 20px' },
  spotHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap', marginBottom: 8 },
  spotTitle: { fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 6 },
  spotMeta: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' },
  spotDesc: { color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.5, margin: '0 0 10px' },
  tipBox: { background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, marginTop: 8 },
  warnBox: { background: 'rgba(234,179,8,0.07)', border: '1px solid rgba(234,179,8,0.25)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#ca8a04', lineHeight: 1.5, marginTop: 6 },
  windowTag: { display: 'inline-block', background: 'rgba(212,175,55,0.15)', color: 'var(--gold)', fontSize: 11, fontWeight: 600, padding: '1px 7px', borderRadius: 10, marginLeft: 6 },
  bookBtn: { background: 'var(--gold)', color: '#000', fontSize: 12, fontWeight: 700, padding: '6px 14px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 },
  tagInline: { background: 'var(--border)', color: 'var(--text-muted)', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 10, letterSpacing: 0.3 },
  tagGoldInline: { background: 'rgba(212,175,55,0.15)', color: 'var(--gold)', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 10 },
  hubGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 },
  hubCard: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' },
  hubIata: { fontSize: 20, fontWeight: 800, color: 'var(--gold)', letterSpacing: 1, display: 'block' },
  hubCity: { fontSize: 13, fontWeight: 600, color: 'var(--text)', display: 'block' },
  hubNote: { fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4, margin: '4px 0 8px' },
  empty: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 32, textAlign: 'center' },
};
