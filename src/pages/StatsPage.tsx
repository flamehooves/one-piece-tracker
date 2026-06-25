import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Flame, Heart, BarChart2, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTracker } from '../context/TrackerContext';
import StatCard from '../components/StatCard';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="text-xs font-bold uppercase tracking-widest mb-3 px-5" style={{ color: '#94A3B8' }}>{title}</p>
      {children}
    </div>
  );
}

export default function StatsPage() {
  const { totalWatched, effectiveStreak, watchedEpisodes, streakData, animeEpisodes, animeArcs } = useTracker();

  const totalEps = animeEpisodes.length;
  const hoursWatched = Math.round((totalWatched * 24) / 60);
  const canonWatched = animeEpisodes.filter(e => !e.isFiller && watchedEpisodes[e.number]?.isWatched).length;
  const fillerWatched = animeEpisodes.filter(e => e.isFiller && watchedEpisodes[e.number]?.isWatched).length;

  const favoriteEps = useMemo(() =>
    animeEpisodes.filter(e => watchedEpisodes[e.number]?.isFavorite).slice(0, 5),
    [animeEpisodes, watchedEpisodes]
  );

  const ratedEps = useMemo(() =>
    animeEpisodes
      .filter(e => (watchedEpisodes[e.number]?.rating ?? 0) >= 4)
      .sort((a, b) => (watchedEpisodes[b.number]?.rating ?? 0) - (watchedEpisodes[a.number]?.rating ?? 0))
      .slice(0, 5),
    [animeEpisodes, watchedEpisodes]
  );

  const arcChartData = useMemo(() =>
    animeArcs
      .map(arc => {
        const eps = animeEpisodes.filter(e => e.arcId === arc.id);
        const watched = eps.filter(e => watchedEpisodes[e.number]?.isWatched).length;
        return { name: arc.name.length > 11 ? arc.name.slice(0, 11) + '…' : arc.name, watched, total: eps.length, color: arc.color };
      })
      .filter(d => d.watched > 0)
      .slice(0, 10),
    [animeArcs, animeEpisodes, watchedEpisodes]
  );

  const watchedByDay = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.values(watchedEpisodes).forEach(d => {
      if (d?.watchedAt) { const day = d.watchedAt.split('T')[0]; counts[day] = (counts[day] ?? 0) + 1; }
    });
    return Object.entries(counts).sort(([a],[b]) => a.localeCompare(b)).slice(-14).map(([date, count]) => ({ date: date.slice(5), count }));
  }, [watchedEpisodes]);

  const ratingDist = useMemo(() => {
    const dist = [0,0,0,0,0];
    Object.values(watchedEpisodes).forEach(d => { if (d?.rating && d.rating >= 1 && d.rating <= 5) dist[d.rating-1]++; });
    return dist.map((count, i) => ({ stars: i+1, count })).reverse();
  }, [watchedEpisodes]);

  const avgRating = useMemo(() => {
    const rated = Object.values(watchedEpisodes).filter(d => d?.rating);
    if (!rated.length) return 0;
    return (rated.reduce((s, d) => s + d!.rating!, 0) / rated.length).toFixed(1);
  }, [watchedEpisodes]);

  const cardStyle = {
    background: 'rgba(255,255,255,0.82)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.95)',
    boxShadow: '0 4px 20px rgba(10,35,66,0.07)',
  };

  if (totalWatched === 0) {
    return (
      <div className="pb-32 px-5 pt-16 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-5"
          style={{ background: 'rgba(255,255,255,0.82)', boxShadow: '0 8px 32px rgba(10,35,66,0.10)' }}>
          📊
        </div>
        <h2 className="text-xl font-black mb-2" style={{ color: '#0A1628' }}>No Stats Yet</h2>
        <p className="text-sm max-w-xs" style={{ color: '#64748B' }}>
          Start watching episodes to unlock your stats!
        </p>
      </div>
    );
  }

  const tooltipStyle = {
    contentStyle: { background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(10,35,66,0.1)', borderRadius: 12, fontSize: 12, boxShadow: '0 8px 24px rgba(10,35,66,0.12)', color: '#0A1628' },
    labelStyle: { color: '#64748B', fontWeight: 600 },
    itemStyle: { color: '#E8A020', fontWeight: 700 },
  };

  return (
    <div className="pb-32">
      <div className="px-5 pt-8 pb-2">
        <h1 className="text-2xl font-black mb-5" style={{ color: '#0A1628' }}>Your Stats</h1>
      </div>

      {/* Key stats */}
      <Section title="Overview">
        <div className="px-5 grid grid-cols-2 gap-3">
          <StatCard label="Hours Watched" value={`${hoursWatched}h`} sub={`≈ ${Math.round(hoursWatched/24)} days`}
            icon={<Clock size={17} style={{ color: '#3B82F6' }} />} iconBg="rgba(59,130,246,0.12)" index={0} />
          <StatCard label="Day Streak" value={effectiveStreak} sub={`Best: ${streakData.longestStreak}`}
            icon={<Flame size={17} style={{ color: '#F97316' }} />} iconBg="rgba(249,115,22,0.12)" index={1} />
          <StatCard label="Canon Episodes" value={canonWatched} sub={`+ ${fillerWatched} filler`}
            icon={<BarChart2 size={17} style={{ color: '#16A34A' }} />} iconBg="rgba(22,163,74,0.12)" index={2} />
          <StatCard label="Avg Rating" value={avgRating || '—'} sub={`${Object.values(watchedEpisodes).filter(d => d?.rating).length} rated`}
            icon={<Star size={17} style={{ color: '#E8A020' }} />} iconBg="rgba(232,160,32,0.12)" index={3} />
        </div>
      </Section>

      {/* Progress breakdown */}
      <Section title="Progress Breakdown">
        <div className="mx-5 rounded-2xl p-4" style={cardStyle}>
          {[
            { label: 'Canon', count: canonWatched, total: totalEps, color: '#16A34A' },
            { label: 'Filler', count: fillerWatched, total: totalEps, color: '#94A3B8' },
          ].map(({ label, count, total, color }) => (
            <div key={label} className="mb-3 last:mb-0">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold" style={{ color: '#64748B' }}>{label}</span>
                <span className="font-bold" style={{ color: '#0A1628' }}>{count}</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(10,35,66,0.07)' }}>
                <motion.div className="h-full rounded-full"
                  style={{ background: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(count / total) * 100}%` }}
                  transition={{ duration: 1, ease: [0.34,1.1,0.64,1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Activity chart */}
      {watchedByDay.length > 1 && (
        <Section title="Activity — Last 14 Days">
          <div className="mx-5 rounded-2xl p-4" style={cardStyle}>
            <ResponsiveContainer width="100%" height={110}>
              <BarChart data={watchedByDay} barSize={10}>
                <XAxis dataKey="date" tick={{ fill: '#94A3B8', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="count" radius={[6,6,0,0]}>
                  {watchedByDay.map((_,i) => <Cell key={i} fill="rgba(232,160,32,0.7)" />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
      )}

      {/* Per-arc chart */}
      {arcChartData.length > 0 && (
        <Section title="Episodes Per Arc">
          <div className="mx-5 rounded-2xl p-4" style={cardStyle}>
            <ResponsiveContainer width="100%" height={arcChartData.length * 28 + 20}>
              <BarChart data={arcChartData} layout="vertical" barSize={8}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" tick={{ fill: '#64748B', fontSize: 9 }} width={85} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} formatter={(v, _, props) => [`${Number(v)} / ${props.payload.total}`, 'Watched']} />
                <Bar dataKey="watched" radius={[0,6,6,0]}>
                  {arcChartData.map((d,i) => <Cell key={i} fill={d.color} fillOpacity={0.75} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
      )}

      {/* Rating distribution */}
      {ratingDist.some(d => d.count > 0) && (
        <Section title="Your Ratings">
          <div className="mx-5 rounded-2xl p-4" style={cardStyle}>
            {ratingDist.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-3 mb-2.5 last:mb-0">
                <div className="flex gap-0.5 w-16 flex-shrink-0">
                  {Array.from({ length: stars }, (_, i) => <span key={i} style={{ color: '#E8A020', fontSize: 11 }}>★</span>)}
                </div>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(10,35,66,0.07)' }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: 'rgba(232,160,32,0.65)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(0, (count / Math.max(...ratingDist.map(d => d.count), 1)) * 100)}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <span className="text-xs font-bold w-5 text-right" style={{ color: '#94A3B8' }}>{count}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Favorites */}
      {favoriteEps.length > 0 && (
        <Section title="Favorite Episodes">
          <div className="mx-5 rounded-2xl overflow-hidden" style={cardStyle}>
            {favoriteEps.map((ep, i) => (
              <div key={ep.number} className="flex items-center gap-3 px-4 py-3"
                style={{ borderBottom: i < favoriteEps.length - 1 ? '1px solid rgba(10,35,66,0.06)' : 'none' }}>
                <Heart size={13} style={{ color: '#F472B6', fill: '#F472B6' }} className="flex-shrink-0" />
                <span className="font-bold font-mono text-xs flex-shrink-0" style={{ color: '#E8A020' }}>EP {ep.number}</span>
                <span className="text-xs font-medium truncate" style={{ color: '#0A1628' }}>{ep.title}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Top rated */}
      {ratedEps.length > 0 && (
        <Section title="Top Rated">
          <div className="mx-5 rounded-2xl overflow-hidden" style={cardStyle}>
            {ratedEps.map((ep, i) => (
              <div key={ep.number} className="flex items-center gap-3 px-4 py-3"
                style={{ borderBottom: i < ratedEps.length - 1 ? '1px solid rgba(10,35,66,0.06)' : 'none' }}>
                <span className="font-bold font-mono text-xs flex-shrink-0" style={{ color: '#E8A020' }}>EP {ep.number}</span>
                <span className="text-xs font-medium flex-1 truncate" style={{ color: '#0A1628' }}>{ep.title}</span>
                <div className="flex gap-0.5 flex-shrink-0">
                  {Array.from({ length: watchedEpisodes[ep.number]?.rating ?? 0 }, (_, i) => (
                    <span key={i} style={{ color: '#E8A020', fontSize: 10 }}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
