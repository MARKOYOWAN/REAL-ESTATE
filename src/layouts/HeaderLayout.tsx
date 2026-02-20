import { useState, useEffect, useCallback } from 'react';
import { HiChartBar, HiClock, HiMenu, HiX } from 'react-icons/hi';

/**
 * Interface pour la structure des liens de navigation.
 */
interface NavLink {
  label: string;
  href: string;
  icon: React.ElementType;
}

/**
 * Header Component
 * Design minimaliste "Tech-Focus" avec effet de flou (Glassmorphism) au scroll.
 */
const Header = () => {
  // --- ÉTATS (STATES) ---
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- LOGIQUE DE SCROLL OPTIMISÉE ---
  /**
   * handleScroll : Change l'état visuel du header selon la position du scroll.
   * Utilisation de useCallback pour stabiliser la référence de la fonction.
   */
  const handleScroll = useCallback(() => {
    const scrollThreshold = 20; // Seuil en pixels pour activer l'effet sticky
    setIsSticky(window.scrollY > scrollThreshold);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true }); // passive: true améliore les perfs de scroll
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // --- DONNÉES (DATA) ---
  const navLinks: NavLink[] = [
    { label: 'Analyseur', href: '#analyzer-section', icon: HiChartBar }, // ID correspondant
    { label: 'Historique', href: '#', icon: HiClock },
  ];
  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isSticky
          ? 'bg-white/80 backdrop-blur-md border-black/5 py-3 shadow-sm'
          : 'bg-transparent border-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* --- BLOC LOGO --- */}
        <div className="flex items-center group">
          <a href="/" className="flex items-center gap-3" aria-label="Retour à l'accueil">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
              <img
                src="/logo/logo.png"
                alt="Logo Analyse AI"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-black font-black tracking-tighter text-xl hidden sm:block">
              REAL<span className="opacity-30">.ESTATE</span>
            </span>
          </a>
        </div>

        {/* --- NAVIGATION DESKTOP --- */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="flex items-center gap-2 text-black/50 hover:text-black transition-all text-sm font-bold group"
                >
                  <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Badge de statut API (Real-time indicator) */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/[0.03] border border-black/[0.05] rounded-full select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] text-black font-black uppercase tracking-widest opacity-60">API Online</span>
          </div>
        </nav>

        {/* --- CTA BUTTON --- */}
        <div className="hidden md:block">
          <button className="bg-black text-white text-[11px] font-black uppercase tracking-widest px-7 py-3 rounded-full hover:bg-neutral-800 transition-all active:scale-95 shadow-xl shadow-black/5 border border-white/10">
            Démarrer
          </button>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button
          className="md:hidden text-black p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      {/* --- MENU MOBILE OVERLAY --- */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-black/10 p-8 flex flex-col gap-6 md:hidden shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <ul className="space-y-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-black flex items-center gap-4 text-xl font-black"
                >
                  <link.icon className="text-black/30" size={24} />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button className="bg-black text-white font-black py-4 rounded-2xl mt-4 uppercase tracking-widest text-xs">
            Démarrer l'analyse
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;