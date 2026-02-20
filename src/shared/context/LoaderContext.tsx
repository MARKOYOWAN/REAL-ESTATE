import React, { createContext, useContext, useState, useMemo } from 'react';

/**
 * Interface définissant les méthodes et l'état du Loader.
 */
interface LoaderContextType {
    /** Incrémente le compteur de requêtes actives */
    showLoader: () => void;
    /** Décrémente le compteur de requêtes actives */
    hideLoader: () => void;
    /** Indique si au moins une requête est en cours */
    isLoading: boolean;
}

// Création du contexte avec une valeur initiale indéfinie
const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

/**
 * LoaderProvider : Composant enveloppe (Wrapper)
 * Il gère un compteur de requêtes pour éviter que le loader ne disparaisse 
 * si plusieurs appels API sont lancés simultanément.
 */
export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Nombre de requêtes HTTP actuellement en attente
    const [activeRequests, setActiveRequests] = useState(0);

    /**
     * Mémorisation des actions pour optimiser les performances.
     * On ne recrée l'objet que si le nombre de requêtes change.
     */
    const loaderActions = useMemo(() => ({
        // On ajoute une requête
        showLoader: () => setActiveRequests((prev) => prev + 1),
        
        // On retire une requête (sans jamais descendre en dessous de zéro)
        hideLoader: () => setActiveRequests((prev) => Math.max(0, prev - 1)),
        
        // État booléen dérivé du compteur
        isLoading: activeRequests > 0
    }), [activeRequests]);

    return (
        <LoaderContext.Provider value={loaderActions}>
            {children}
        </LoaderContext.Provider>
    );
};

/**
 * Hook personnalisé useLoader
 * Permet aux composants enfants d'accéder facilement aux fonctions du loader.
 * @throws Erreur si utilisé en dehors du LoaderProvider.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) {
        throw new Error("useLoader must be used within a LoaderProvider");
    }
    return context;
};