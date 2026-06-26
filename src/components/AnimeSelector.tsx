import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Plus, Search, ArrowLeft, Check, Trash2 } from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { ANIME_CATALOG, CATALOG_GENRES } from '../data/animeCatalog';
import type { CustomAnimeEntry } from '../types';

// Builtin entries to show in catalog (not in the external ANIME_CATALOG)
const BUILTIN_CATALOG = [
  { id: 'one-piece', name: 'One Piece',         icon: '🏴‍☠️', episodes: 1122, color: '#E8A020', genre: 'Action' },
  { id: 'dbz',       name: 'Dragon Ball Z',      icon: '⚡',   episodes: 291,  color: '#F97316', genre: 'Action' },
  { id: 'dbgt',      name: 'Dragon Ball GT',     icon: '🐉',   episodes: 64,   color: '#8B5CF6', genre: 'Action' },
  { id: 'dbs',       name: 'Dragon Ball Super',  icon: '🌟',   episodes: 131,  color: '#3B82F6', genre: 'Action' },
];

const ICON_OPTIONS = ['🎌','⚔️','🔥','💫','🌸','🏆','👊','🐉','⚡','🌟','💎','🎭','🗡️','🌊','🌙','⭐','🦊','🐯','🦋','🎪','🏴','🔮','💥','🧬','🌀'];
const COLOR_OPTIONS = ['#E8A020','#F97316','#EF4444','#EC4899','#8B5CF6','#3B82F6','#10B981','#22C55E','#06B6D4','#64748B','#1E293B','#DC2626'];

type Sheet = 'none' | 'manage' | 'add' | 'custom';

export default function AnimeSelector() {
  const { activeAnime, setActiveAnime, userAnimeIds, addAnime, removeAnime, getAnimeEntry, state } = useTracker();
  const [sheet, setSheet] = useState<Sheet>('none');
  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState('All');
  const [customName, setCustomName] = useState('');
  const [customEps, setCustomEps] = useState('');
  const [customIcon, setCustomIcon] = useState('🎌');
  const [customColor, setCustomColor] = useState('#3B82F6');
  const searchRef = useRef<HTMLInputElement>(null);

  const activeEntry = getAnimeEntry(activeAnime);

  function openManage() { setSheet('manage'); setSearch(''); }
  function openAdd() { setSheet('add'); setSearch(''); setTimeout(() => searchRef.current?.focus(), 150); }
  function closeAll() { setSheet('none'); setSearch(''); setGenreFilter('All'); }

  function handleSwitch(id: string) {
    setActiveAnime(id);
    closeAll();
  }

  function handleRemove(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (userAnimeIds.length === 1) return; // can't remove last
    removeAnime(id);
  }

  function handleAddFromCatalog(id: string) {
    const isCatalog = ANIME_CATALOG.find(e => e.id === id);
    if (isCatalog) {
      addAnime(id, { id, name: isCatalog.name, icon: isCatalog.icon, totalEpisodes: isCatalog.episodes, color: isCatalog.color });
    } else {
      addAnime(id); // builtin
    }
    setActiveAnime(id);
    closeAll();
  }

  function handleAddCustom() {
    const n = parseInt(customEps);
    if (!customName.trim() || isNaN(n) || n < 1) return;
    const id = customName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const entry: CustomAnimeEntry = { id, name: customName.trim(), icon: customIcon, totalEpisodes: n, color: customColor };
    addAnime(id, entry);
    setActiveAnime(id);
    setCustomName(''); setCustomEps(''); setCustomIcon('🎌'); setCustomColor('#3B82F6');
    closeAll();
  }

  // All catalog entries (builtins + external) for search
  const allCatalogEntries = useMemo(() => [...BUILTIN_CATALOG, ...ANIME_CATALOG], []);

  const catalogFiltered = useMemo(() => {
    const q = search.toLowerCase();
    return allCatalogEntries.filter(e => {
      const notAdded = !userAnimeIds.includes(e.id);
      const matchSearch = !q || e.name.toLowerCase().includes(q);
      const matchGenre = genreFilter === 'All' || e.genre === genreFilter;
      return notAdded && matchSearch && matchGenre;
    });
  }, [search, genreFilter, allCatalogEntries, userAnimeIds]);

  const catalogByGenre = useMemo(() => {
    if (search.trim() || genreFilter !== 'All') return { 'Results': catalogFiltered };
    const groups: Record<string, typeof catalogFiltered> = {};
    for (const e of catalogFiltered) {
      if (!groups[e.genre]) groups[e.genre] = [];
      groups[e.genre].push(e);
    }
    return groups;
  }, [catalogFiltered, search, genreFilter]);

  // Progress indicator per anime
  function getProgress(id: string) {
    const entry = getAnimeEntry(id);
    const progress = state.animeProgress[id];
    if (!entry || !progress) return { pct: 0, watched: 0, total: entry?.total ?? 0 };
    const watched = Object.values(progress.watchedEpisodes).filter(d => d?.isWatched).length;
    return { pct: Math.round((watched / entry.total) * 100), watched, total: entry.total };
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const sheetVariants = {
    hidden: { y: '100%' },
    visible: { y: 0 },
    exit: { y: '100%' },
  };

  return (
    <>
      {/* ── Trigger button ── */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={openManage}
        className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold"
        style={{
          background: 'rgba(255,255,255,0.88)',
          border: '1.5px solid rgba(255,255,255,1)',
          boxShadow: '0 4px 16px rgba(10,35,66,0.10)',
          color: '#0A1628',
        }}
      >
        <span className="text-base leading-none">{activeEntry?.icon ?? '🎌'}</span>
        <span className="max-w-[140px] truncate">{activeEntry?.name ?? activeAnime}</span>
        <ChevronDown size={14} style={{ color: '#94A3B8', flexShrink: 0 }} />
      </motion.button>

      <AnimatePresence>
        {sheet !== 'none' && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              variants={overlayVariants}
              initial="hidden" animate="visible" exit="exit"
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(10,22,40,0.5)', backdropFilter: 'blur(4px)' }}
              onClick={closeAll}
            />

            {/* ── Manage sheet ── */}
            {sheet === 'manage' && (
              <motion.div
                key="manage"
                variants={sheetVariants}
                initial="hidden" animate="visible" exit="exit"
                transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto rounded-t-3xl overflow-hidden"
                style={{ background: 'rgba(246,248,252,0.98)', backdropFilter: 'blur(24px)', boxShadow: '0 -8px 48px rgba(10,35,66,0.16)' }}
              >
                {/* Drag handle */}
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(10,35,66,0.12)' }} />
                </div>

                <div className="px-5 pt-1 pb-3 flex items-center justify-between">
                  <h2 className="text-base font-black" style={{ color: '#0A1628' }}>My Anime</h2>
                  <button onClick={closeAll} className="w-8 h-8 flex items-center justify-center rounded-full" style={{ background: 'rgba(10,35,66,0.07)' }}>
                    <X size={14} style={{ color: '#64748B' }} />
                  </button>
                </div>

                <div className="px-4 pb-2 space-y-1.5 max-h-[60vh] overflow-y-auto">
                  {userAnimeIds.map(id => {
                    const entry = getAnimeEntry(id);
                    if (!entry) return null;
                    const { pct, watched, total } = getProgress(id);
                    const isActive = id === activeAnime;
                    return (
                      <motion.div
                        key={id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSwitch(id)}
                        className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer"
                        style={{
                          background: isActive ? 'rgba(10,35,66,0.06)' : 'rgba(255,255,255,0.82)',
                          border: isActive ? '1.5px solid rgba(10,35,66,0.12)' : '1px solid rgba(255,255,255,0.95)',
                          boxShadow: '0 2px 8px rgba(10,35,66,0.05)',
                        }}
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                          style={{ background: `${entry.icon ? 'transparent' : '#F1F5F9'}` }}>
                          {entry.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate" style={{ color: '#0A1628' }}>{entry.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(10,35,66,0.08)' }}>
                              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#E8A020', transition: 'width 0.6s ease' }} />
                            </div>
                            <span className="text-[10px] font-semibold" style={{ color: '#94A3B8' }}>{watched}/{total}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {isActive
                            ? <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#0A1628' }}>
                                <Check size={12} style={{ color: '#fff' }} />
                              </div>
                            : userAnimeIds.length > 1
                              ? <button
                                  onClick={e => handleRemove(id, e)}
                                  className="w-7 h-7 flex items-center justify-center rounded-full transition-colors"
                                  style={{ background: 'rgba(239,68,68,0.08)' }}
                                >
                                  <Trash2 size={13} style={{ color: '#EF4444' }} />
                                </button>
                              : null
                          }
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Add button */}
                <div className="px-4 pt-2 pb-6">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={openAdd}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm"
                    style={{ background: 'linear-gradient(135deg, #0A1628, #1E3A5F)', color: '#fff', boxShadow: '0 4px 16px rgba(10,35,66,0.25)' }}
                  >
                    <Plus size={16} /> Add Anime
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ── Add Anime sheet ── */}
            {sheet === 'add' && (
              <motion.div
                key="add"
                variants={sheetVariants}
                initial="hidden" animate="visible" exit="exit"
                transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                className="fixed inset-0 z-50 max-w-lg mx-auto flex flex-col"
                style={{ background: 'rgba(246,248,252,0.99)', backdropFilter: 'blur(24px)' }}
              >
                {/* Header */}
                <div className="px-5 pt-12 pb-3 flex items-center gap-3 flex-shrink-0">
                  <button onClick={openManage} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: 'rgba(10,35,66,0.07)' }}>
                    <ArrowLeft size={17} style={{ color: '#0A1628' }} />
                  </button>
                  <h2 className="text-lg font-black" style={{ color: '#0A1628' }}>Add Anime</h2>
                </div>

                {/* Search */}
                <div className="px-5 pb-3 flex-shrink-0">
                  <div className="relative">
                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                    <input
                      ref={searchRef}
                      type="text" value={search} onChange={e => setSearch(e.target.value)}
                      placeholder="Search 120+ anime…"
                      className="w-full rounded-2xl pl-10 pr-4 py-2.5 text-sm font-medium focus:outline-none"
                      style={{ background: 'rgba(255,255,255,0.9)', border: '1.5px solid rgba(255,255,255,1)', boxShadow: '0 2px 8px rgba(10,35,66,0.06)', color: '#0A1628' }}
                    />
                  </div>
                </div>

                {/* Genre filter */}
                {!search.trim() && (
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5 pb-3 flex-shrink-0">
                    {['All', ...CATALOG_GENRES].map(g => (
                      <motion.button key={g} whileTap={{ scale: 0.93 }}
                        onClick={() => setGenreFilter(g)}
                        className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold"
                        style={genreFilter === g
                          ? { background: '#0A1628', color: '#fff', boxShadow: '0 4px 12px rgba(10,35,66,0.25)' }
                          : { background: 'rgba(255,255,255,0.82)', color: '#64748B', border: '1px solid rgba(255,255,255,0.95)' }
                        }
                      >
                        {g}
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Catalog list */}
                <div className="flex-1 overflow-y-auto px-4 pb-2">
                  {Object.entries(catalogByGenre).map(([genre, entries]) => (
                    <div key={genre} className="mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-2 px-1" style={{ color: '#94A3B8' }}>{genre}</p>
                      <div className="space-y-1.5">
                        {entries.map(entry => (
                          <motion.button
                            key={entry.id}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleAddFromCatalog(entry.id)}
                            className="w-full flex items-center gap-3 p-3 rounded-2xl text-left"
                            style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 2px 8px rgba(10,35,66,0.04)' }}
                          >
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                              style={{ background: `${entry.color}15`, border: `1px solid ${entry.color}25` }}>
                              {entry.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold truncate" style={{ color: '#0A1628' }}>{entry.name}</p>
                              <p className="text-xs" style={{ color: '#94A3B8' }}>{entry.episodes} episodes</p>
                            </div>
                            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${entry.color}20` }}>
                              <Plus size={14} style={{ color: entry.color }} />
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {catalogFiltered.length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-4xl mb-2">🔍</p>
                      <p className="text-sm font-semibold" style={{ color: '#94A3B8' }}>No results</p>
                      <p className="text-xs mt-1" style={{ color: '#CBD5E1' }}>Try adding it manually below</p>
                    </div>
                  )}
                </div>

                {/* Custom add footer */}
                <div className="px-4 pt-2 pb-8 flex-shrink-0">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSheet('custom')}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm"
                    style={{ background: 'rgba(10,35,66,0.06)', color: '#0A1628', border: '1px solid rgba(10,35,66,0.1)' }}
                  >
                    <Plus size={15} /> Add Custom Anime
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ── Custom Anime sheet ── */}
            {sheet === 'custom' && (
              <motion.div
                key="custom"
                variants={sheetVariants}
                initial="hidden" animate="visible" exit="exit"
                transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                className="fixed inset-0 z-50 max-w-lg mx-auto flex flex-col"
                style={{ background: 'rgba(246,248,252,0.99)', backdropFilter: 'blur(24px)' }}
              >
                <div className="px-5 pt-12 pb-4 flex items-center gap-3 flex-shrink-0">
                  <button onClick={() => setSheet('add')} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: 'rgba(10,35,66,0.07)' }}>
                    <ArrowLeft size={17} style={{ color: '#0A1628' }} />
                  </button>
                  <h2 className="text-lg font-black" style={{ color: '#0A1628' }}>Custom Anime</h2>
                </div>

                <div className="flex-1 overflow-y-auto px-5 space-y-5">
                  {/* Preview */}
                  <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.95)' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${customColor}18`, border: `1.5px solid ${customColor}30` }}>
                      {customIcon}
                    </div>
                    <div>
                      <p className="font-bold text-sm" style={{ color: '#0A1628' }}>{customName || 'Anime Name'}</p>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>{customEps || '?'} episodes</p>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#94A3B8' }}>Anime Name</p>
                    <input
                      type="text" value={customName} onChange={e => setCustomName(e.target.value)}
                      placeholder="e.g. Hunter x Hunter"
                      className="w-full rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none"
                      style={{ background: 'rgba(255,255,255,0.9)', border: '1.5px solid rgba(255,255,255,1)', color: '#0A1628' }}
                    />
                  </div>

                  {/* Episode count */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#94A3B8' }}>Episode Count</p>
                    <input
                      type="number" value={customEps} onChange={e => setCustomEps(e.target.value)}
                      placeholder="e.g. 148"
                      min={1}
                      className="w-full rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none"
                      style={{ background: 'rgba(255,255,255,0.9)', border: '1.5px solid rgba(255,255,255,1)', color: '#0A1628' }}
                    />
                  </div>

                  {/* Icon picker */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#94A3B8' }}>Icon</p>
                    <div className="flex flex-wrap gap-2">
                      {ICON_OPTIONS.map(emoji => (
                        <button key={emoji} onClick={() => setCustomIcon(emoji)}
                          className="w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all"
                          style={customIcon === emoji
                            ? { background: '#0A1628', boxShadow: '0 4px 12px rgba(10,35,66,0.25)' }
                            : { background: 'rgba(255,255,255,0.82)', border: '1px solid rgba(255,255,255,0.95)' }
                          }
                        >{emoji}</button>
                      ))}
                    </div>
                  </div>

                  {/* Color picker */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#94A3B8' }}>Color</p>
                    <div className="flex flex-wrap gap-2">
                      {COLOR_OPTIONS.map(c => (
                        <button key={c} onClick={() => setCustomColor(c)}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                          style={{ background: c, boxShadow: customColor === c ? `0 0 0 3px #fff, 0 0 0 5px ${c}` : 'none' }}
                        >
                          {customColor === c && <Check size={14} style={{ color: '#fff' }} />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-5 pt-3 pb-8 flex-shrink-0">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddCustom}
                    disabled={!customName.trim() || !customEps || parseInt(customEps) < 1}
                    className="w-full py-3.5 rounded-2xl font-bold text-sm"
                    style={{
                      background: customName.trim() && customEps && parseInt(customEps) >= 1
                        ? 'linear-gradient(135deg, #0A1628, #1E3A5F)'
                        : 'rgba(10,35,66,0.08)',
                      color: customName.trim() && customEps ? '#fff' : '#94A3B8',
                      boxShadow: customName.trim() && customEps ? '0 4px 16px rgba(10,35,66,0.25)' : 'none',
                    }}
                  >
                    Add to My List
                  </motion.button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
