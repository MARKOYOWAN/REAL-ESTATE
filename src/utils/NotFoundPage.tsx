import { HiArrowNarrowLeft, HiExclamation } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

/**
 * Composant NotFoundPage (Erreur 404)
 * Design minimaliste et immersif respectant l'identité visuelle ANALYSE.AI.
 * * Fonctionnalités :
 * - Navigation programmatique vers l'accueil.
 * - Animations séquentielles via Tailwind CSS.
 * - Mise en page centrée verticalement (80vh).
 */
const NotFoundPage = () => {
    // Hook React Router pour la navigation sans rechargement de page
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">

            {/* --- SECTION ICONOGRAPHIQUE --- */}
            <div className="relative mb-8">
                {/* Glow discret en arrière-plan pour créer de la profondeur */}
                <div className="absolute inset-0 bg-black/5 blur-3xl rounded-full" />

                {/* Carré noir stylisé (Squircle) avec une rotation dynamique */}
                <div className="relative w-24 h-24 bg-black flex items-center justify-center rounded-3xl rotate-12 animate-in zoom-in duration-700">
                    <HiExclamation className="text-white text-5xl -rotate-12" />
                </div>
            </div>

            {/* --- SECTION TEXTUELLE --- 
                Utilisation de délais d'animation (delay-200) pour un effet de cascade.
            */}
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                {/* Code d'erreur massif pour un impact visuel fort */}
                <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-black">
                    404<span className="text-black/10">.</span>
                </h1>

                {/* Titre secondaire en majuscules avec espacement large (style Tech) */}
                <h2 className="text-2xl md:text-3xl font-bold text-black uppercase tracking-widest">
                    Page Introuvable
                </h2>

                {/* Message informatif avec opacité réduite pour la hiérarchie visuelle */}
                <p className="max-w-md mx-auto text-black/40 font-medium text-lg leading-relaxed">
                    Le document ou la route que vous recherchez semble avoir été déplacé ou n'existe plus dans notre système.
                </p>
            </div>

            {/* --- SECTION ACTIONS --- 
                Le bouton apparaît en dernier dans la séquence d'animation (delay-500).
            */}
            <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all active:scale-95 shadow-2xl shadow-black/10"
                >
                    {/* Icône de flèche avec micro-interaction au survol du bouton */}
                    <HiArrowNarrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
                    <span>Retour à l'analyse</span>
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;