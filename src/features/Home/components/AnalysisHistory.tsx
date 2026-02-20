import React, { useState, useEffect, useCallback } from 'react';
import { 
  HiSearch, HiChevronLeft, HiChevronRight, 
  HiWifi, HiAdjustments, HiRefresh 
} from 'react-icons/hi';
import { getHistory, type HistoryItem, type PaginationInfo } from '../services/history.service';

/**
 * Composant AnalysisHistory
 * Affiche l'historique des analyses avec filtres, pagination et bouton de rafraîchissement manuel.
 */
const AnalysisHistory: React.FC = () => {
  // --- ÉTATS DES DONNÉES ---
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // --- ÉTATS DES FILTRES ---
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minScore, setMinScore] = useState<number>(1);
  const limit = 5;

  /**
   * Fonction de récupération des données depuis l'API.
   * Utilise useCallback pour éviter de recréer la fonction à chaque rendu.
   */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await getHistory(page, limit, searchTerm, minScore);
      setItems(response.data);
      setPagination(response.pagination);
    } catch (err) {
      console.error("Erreur lors de la récupération :", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, minScore]);

  /**
   * Effet de chargement automatique :
   * Se déclenche dès que la page ou un filtre est modifié.
   */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /**
   * Gère les changements de filtres et réinitialise la pagination à 1.
   */
  const handleFilterChange = (type: 'search' | 'score', value: string | number) => {
    if (type === 'search') setSearchTerm(value as string);
    if (type === 'score') setMinScore(value as number);
    setPage(1); 
  };

  // --- RENDU EN CAS D'ERREUR ---
  if (error) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
        <HiWifi size={40} className="text-red-500 mb-4" />
        <h3 className="text-xl font-black text-black uppercase">Erreur de chargement</h3>
        <button 
            onClick={fetchData} 
            className="mt-4 bg-black text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"
        >
          <HiRefresh className="inline mr-2" /> Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* --- EN-TÊTE : TITRE ET BOUTON ACTUALISER --- */}
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-black text-black tracking-tighter uppercase italic">Historique</h2>
        
        {/* BOUTON ACTUALISER : Fond noir pour visibilité maximale */}
        <button 
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-all active:scale-95 shadow-xl shadow-black/10 disabled:opacity-50"
        >
          <HiRefresh className={`text-lg ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Chargement...' : 'Actualiser'}
        </button>
      </div>

      {/* --- SECTION FILTRES --- */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Recherche par texte */}
        <div className="w-full md:w-80 bg-white p-2 rounded-2xl border border-black/5 shadow-sm">
          <div className="relative">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={18} />
            <input
              type="text"
              placeholder="Rechercher une analyse..."
              className="w-full pl-12 pr-4 py-2.5 bg-gray-50 rounded-xl focus:outline-none text-sm font-bold text-black placeholder:text-black/30"
              value={searchTerm}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
        </div>

        {/* Filtre par score (Range) */}
        <div className="w-full md:flex-1 bg-white p-4 rounded-2xl border border-black/5 shadow-sm flex items-center gap-6">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <HiAdjustments className="text-black/40" />
            <span className="text-[10px] font-black uppercase tracking-widest text-black/40">
              Score Min: <span className="text-black">{minScore}%</span>
            </span>
          </div>
          <input
            type="range" min="1" max="100" step="1"
            className="flex-1 h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-black"
            value={minScore}
            onChange={(e) => handleFilterChange('score', Number(e.target.value))}
          />
        </div>
      </div>

      {/* --- TABLEAU DES RÉSULTATS --- */}
      <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-2xl overflow-hidden relative min-h-[400px]">
        {/* Overlay de chargement */}
        {loading && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-black/10 border-t-black rounded-full animate-spin" />
          </div>
        )}

        <table className="w-full text-left table-fixed">
          <thead className="bg-black text-white">
            <tr>
              <th className="w-32 p-6 text-[10px] font-black uppercase tracking-widest opacity-60">Date</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-60">Analyse</th>
              <th className="w-28 p-6 text-[10px] font-black uppercase text-center opacity-60">Score</th>
              {/* <th className="w-28 p-6 text-[10px] font-black uppercase text-right opacity-60">Action</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="group hover:bg-gray-50/80 transition-colors">
                  <td className="p-6 text-[11px] font-bold text-black/40 italic">
                    {new Date(item.created_on).toLocaleDateString()}
                  </td>
                  <td className="p-6">
                    {/* Limite à 3 lignes pour garder une cohérence visuelle */}
                    <p className="text-sm font-bold text-black opacity-80 line-clamp-3 leading-relaxed">
                      {item.text}
                    </p>
                  </td>
                  <td className="p-6 text-center">
                    <span className={`text-xl font-black tracking-tighter ${item.score >= 70 ? 'text-green-600' : 'text-orange-600'}`}>
                      {item.score}%
                    </span>
                  </td>
                  {/* <td className="p-6 text-right">
                    <button className="px-5 py-2 bg-black text-white text-[10px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-105 active:scale-95 shadow-lg">
                      DÉTAILS
                    </button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-32 text-center text-black/20 font-black uppercase tracking-[0.4em] text-[10px]">
                  Aucune analyse trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* --- PAGINATION --- */}
        {pagination && pagination.totalPages > 1 && (
          <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="px-5 py-2.5 bg-black text-neutral-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-20"
            >
              <HiChevronLeft size={16} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  disabled={loading}
                  className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${
                    page === num 
                    ? 'bg-black text-white shadow-xl scale-110' 
                    : 'bg-white text-black/40 border border-black/5 hover:bg-black hover:text-white'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
              disabled={page === pagination.totalPages || loading}
              className="px-5 py-2.5 bg-black text-neutral-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-20"
            >
              <HiChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisHistory;