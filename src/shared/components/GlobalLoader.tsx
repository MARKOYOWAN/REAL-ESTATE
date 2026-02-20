import { useState, useEffect } from 'react';

/**
 * Composant GlobalLoader
 * Affiche une superposition (overlay) de chargement sur toute l'application.
 * Il écoute des événements personnalisés (CustomEvents) déclenchés 
 * généralement par les intercepteurs Axios.
 */
const GlobalLoader = () => {
    // État gérant la visibilité du loader
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Fonctions de mise à jour de l'état
        const show = () => setVisible(true);
        const hide = () => setVisible(false);

        /**
         * Écouteurs d'événements globaux (Event Bus)
         * Permet de piloter le loader depuis n'importe quel fichier JS/TS
         * sans avoir recours à un Context ou un Store complexe.
         */
        window.addEventListener('SHOW_LOADER', show);
        window.addEventListener('HIDE_LOADER', hide);

        // Nettoyage des écouteurs lors de la destruction du composant
        return () => {
            window.removeEventListener('SHOW_LOADER', show);
            window.removeEventListener('HIDE_LOADER', hide);
        };
    }, []);

    // Si le loader n'est pas actif, on ne rend rien dans le DOM
    if (!visible) return null;

    return (
        /** * Overlay plein écran avec flou (backdrop-blur)
         * Le z-index est fixé à 100 pour être au-dessus du contenu mais 
         * potentiellement sous les Toasts (configurés à 9999).
         */
        <div className="fixed inset-0 z-[100] bg-white/60 backdrop-blur-md flex items-center justify-center transition-all duration-300">
            <div className="flex flex-col items-center gap-4">
                
                {/* Spinner animé en CSS pur */}
                <div className="w-12 h-12 border-4 border-black/10 border-t-black rounded-full animate-spin" />
                
                {/* Texte d'accompagnement avec effet de pulsation */}
                <p className="text-xs font-black uppercase tracking-[0.3em] text-black animate-pulse">
                    Analyse en cours
                </p>
                
            </div>
        </div>
    );
};

export default GlobalLoader;