import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Flame, Heart, BarChart2, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTracker } from '../context/TrackerContext';
import { ARC_DEFINITIONS } from '../data/arcs';
import { ALL_EPISODES } from '../data/episodes';
import StatCard from '../components/StatCard';

const PIRATE_QUOTES = [
  { text: "\"A man's dream will never die!\"", attr: "— Whitebeard" },
  { text: "\"I don't want to conquer anything. I just think that the guy with the most freedom in this whole ocean... that's the Pirate King!\"", attr: "— Monkey D. Luffy" },
  { text: "\"Nothing happened.\"", attr: "— Roronoa Zoro" },
];

export default function StatsPage() {
  const { state, totalWatched } = useTracker();

  const totalEps = ALL_EPISODES.length;
  const hoursWatched = Math.round((totalWatched * 24) / 60);
  const canonWatched = ALL_EPISODES.filter(e => !e.isFiller && state.watchedEpisodes[e.number]?.isWatched).length;
  const fillerWatched = ALL_EPISODES.filter(e => e.isFiller && state.watchedEpisodes[e.number]?.isWatched).length;

  const favoriteEps = useMemo(() =>
    ALL_EPISODES
      .filter(e => state.watchedEpisodes[e.number]?.isFavorite)
      .slice(0, 5),
    [state.watchedEpisodes]
  );

  const ratedEps = useMemo(() =>
    ALL_EPISODES
      .filter(e => (state.watchedEpisodes[e.number]?.rating ?? 0) >= 4)
      .sort((a, b) => (state.watchedEpisodes[b.number]?.rating ?? 0) - (state.watchedEpisodes[a.number]?.rating ?? 0))
      .slice(0, 5),
    [state.watchedEpisodes]
  );

  // Arc progress chart data (top 10 arcs by watched count)
  const arcChartData = useMemo(() => {
    return ARC_DEFINITIONS
      .map(arc => {
        const arcEps = ALL_EPISODES.filter(e => e.arcId === arc.id);
        const watched = arcEps.filter(e => state.watchedEpisodes[e.number]?.isWatched).length;
        return { name: arc.name.length > 12 ? arc.name.slice(0, 12) + '…' : arc.name, watched, total: arcEps.length, color: arc.color };
      })
      .filter(d => d.watched > 0)
      .slice(0, 10);
  }, [state.watchedEpisodes]);

  // Rating distribution
  const ratingDist = useMemo(() => {
    const dist = [0, 0, 0, 0, 0];
    Object.values(state.watchedEpisodes).forEach(d => {
      if (d?.rating && d.rating >= 1 && d.rating <= 5) dist[d.rating - 1]++;
    });
    return dist.map((count, i) => ({ stars: i + 1, count })).reverse();
  }, [state.watchedEpisodes]);

  const avgRating = useMemo(() => {
    const rated = Object.values(state.watchedEpisodes).filter(d => d?.rating);
    if (!rated.length) return 0;
    return (rated.reduce((s, d) => s + (d!.rating!), 0) / rated.length).toFixed(1);
  }, [state.watchedEpisodes]);

  const quote = PIRATE_QUOTES[Math.floor(Math.random() * PIRATE_QUOTES.length)];

  const watchedByDay = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.values(state.watchedEpisodes).forEach(d => {
      if (d?.watchedAt) {
        const day = d.watchedAt.split('T')[0];
        counts[day] = (counts[day] ?? 0) + 1;
      }
    });
    return Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-14)
      .map(([date, count]) => ({ date: date.slice(5), count }));
  }, [state.watchedEpisodes]);

  if (totalWatched === 0) {
    return (
      <div className="pb-28 px-4 pt-16 flex flex-col items-center text-center">
        <p className="text-6xl mb-4">📊</p>
        <h2 className="text-white font-bold text-xl mb-2">No Stats Yet</h2>
        <p className="text-white/50 text-sm max-w-xs">
          Start watching episodes to see your pirate journey statistics!
        </p>
        <div className="mt-8 p-4 glass-light rounded-2xl max-w-xs">
          <p className="text-white/70 text-sm italic">{quote.text}</p>
          <p className="text-yellow-400/70 text-xs mt-2">{quote.attr}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-28">
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-white font-bold text-lg mb-4">Your Stats</h1>

        {/* Key stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <StatCard label="Hours Watched" value={`${hoursWatched}h`} sub={`~${Math.round(hoursWatched / 24)} days`}
            icon={<Clock size={18} />} color="#3498DB" index={0} />
          <StatCard label="Day Streak" value={state.streakData.currentStreak} sub={`Best: ${state.streakData.longestStreak}`}
            icon={<Flame size={18} />} color="#E67E22" index={1} />
          <StatCard label="Canon Episodes" value={canonWatched} sub={`${fillerWatched} filler`}
            icon={<BarChart2 size={18} />} color="#27AE60" index={2} />
          <StatCard label="Avg Rating" value={avgRating || '—'} sub={`${Object.values(state.watchedEpisodes).filter(d => d?.rating).length} rated`}
            icon={<Star size={18} />} color="#FFD700" index={3} />
        </div>

        {/* Progress bar — episodes by type */}
        <div className="glass-light rounded-2xl p-4 mb-5">
          <p className="text-white/60 text-xs font-semibold mb-3">Progress Breakdown</p>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/50">Canon</span>
                <span className="text-white/70">{canonWatched}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(canonWatched / totalEps) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/50">Filler</span>
                <span className="text-white/70">{fillerWatched}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gray-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(fillerWatched / totalEps) * 100}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Daily activity chart */}
        {watchedByDay.length > 1 && (
          <div className="glass-light rounded-2xl p-4 mb-5">
            <p className="text-white/60 text-xs font-semibold mb-3">Activity (Last 14 Days)</p>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={watchedByDay} barSize={12}>
                <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: '#0A2342', border: '1px solid rgba(255,215,0,0.2)', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: 'rgba(255,255,255,0.7)' }}
                  itemStyle={{ color: '#FFD700' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {watchedByDay.map((_, i) => (
                    <Cell key={i} fill="rgba(255,215,0,0.6)" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Arc progress chart */}
        {arcChartData.length > 0 && (
          <div className="glass-light rounded-2xl p-4 mb-5">
            <p className="text-white/60 text-xs font-semibold mb-3">Episodes Watched Per Arc</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={arcChartData} layout="vertical" barSize={10}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 9 }} width={90} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#0A2342', border: '1px solid rgba(255,215,0,0.2)', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: 'rgba(255,255,255,0.7)' }}
                  itemStyle={{ color: '#FFD700' }}
                  formatter={(v, _n, props) => [`${Number(v)} / ${props.payload.total}`, 'Watched']}
                />
                <Bar dataKey="watched" radius={[0, 4, 4, 0]}>
                  {arcChartData.map((d, i) => (
                    <Cell key={i} fill={d.color} fillOpacity={0.7} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Rating distribution */}
        {ratingDist.some(d => d.count > 0) && (
          <div className="glass-light rounded-2xl p-4 mb-5">
            <p className="text-white/60 text-xs font-semibold mb-3">Your Ratings</p>
            <div className="space-y-2">
              {ratingDist.map(({ stars, count }) => (
                <div key={stars} className="flex items-center gap-2">
                  <div className="flex gap-0.5 w-20 flex-shrink-0">
                    {Array.from({ length: stars }, (_, i) => (
                      <span key={i} className="text-yellow-400 text-xs">★</span>
                    ))}
                  </div>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-yellow-400/60 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(0, (count / Math.max(...ratingDist.map(d => d.count), 1)) * 100)}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <span className="text-white/40 text-xs w-6 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Favorites */}
        {favoriteEps.length > 0 && (
          <div className="glass-light rounded-2xl p-4 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Heart size={14} className="text-pink-400 fill-pink-400" />
              <p className="text-white/60 text-xs font-semibold">Favorite Episodes</p>
            </div>
            <div className="space-y-2">
              {favoriteEps.map(ep => (
                <div key={ep.number} className="flex items-center gap-2">
                  <span className="text-yellow-400 font-mono text-xs w-8">EP {ep.number}</span>
                  <span className="text-white/70 text-xs truncate">{ep.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top rated */}
        {ratedEps.length > 0 && (
          <div className="glass-light rounded-2xl p-4 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <p className="text-white/60 text-xs font-semibold">Top Rated Episodes</p>
            </div>
            <div className="space-y-2">
              {ratedEps.map(ep => (
                <div key={ep.number} className="flex items-center gap-2">
                  <span className="text-yellow-400 font-mono text-xs w-8">EP {ep.number}</span>
                  <span className="text-white/70 text-xs flex-1 truncate">{ep.title}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: state.watchedEpisodes[ep.number]?.rating ?? 0 }, (_, i) => (
                      <span key={i} className="text-yellow-400 text-xs">★</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quote */}
        <div className="p-4 glass-light rounded-2xl border border-yellow-400/10">
          <p className="text-white/70 text-sm italic leading-relaxed">{quote.text}</p>
          <p className="text-yellow-400/60 text-xs mt-2">{quote.attr}</p>
        </div>
      </div>
    </div>
  );
}
