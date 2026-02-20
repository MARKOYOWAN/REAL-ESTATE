/* eslint-disable react-hooks/rules-of-hooks */
import axios, { 
  AxiosError, 
  type InternalAxiosRequestConfig, 
  type AxiosResponse 
} from "axios";
import toast from "react-hot-toast";

/**
 * MODULE AUGMENTATION
 * Extension de l'interface de configuration d'Axios pour supporter 
 * nos propriétés personnalisées de notification de manière typée.
 */
declare module "axios" {
  export interface AxiosRequestConfig {
    successMessage?: string; // Message à afficher en cas de réussite
    errorMessage?: string;   // Message à afficher en cas d'échec
    showToast?: boolean;      // Contrôle l'affichage automatique des notifications
  }
}

/**
 * LOADER BUS (Event Bus)
 * Système de messagerie natif permettant de piloter le GlobalLoader
 * depuis ce fichier qui n'est pas un composant React.
 */
export const loaderBus = {
  show: () => window.dispatchEvent(new CustomEvent('SHOW_LOADER')),
  hide: () => window.dispatchEvent(new CustomEvent('HIDE_LOADER')),
};

/**
 * Usine de création du service API.
 * Centralise la configuration, le timeout et les intercepteurs.
 */
export const createApiService = (customBaseURL?: string) => {
  const apiService = axios.create({
    baseURL: customBaseURL || "http://localhost:3000/api",
    timeout: 15000, // Sécurité : annule la requête après 15s sans réponse
  });

  // --- INTERCEPTEUR DE REQUÊTE (Avant l'envoi) ---
  apiService.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      // Déclenche l'affichage visuel du chargement
      loaderBus.show();
      return config;
    },
    (error: AxiosError): Promise<never> => {
      loaderBus.hide();
      return Promise.reject(error);
    }
  );

  // --- INTERCEPTEUR DE RÉPONSE (Après réception) ---
  apiService.interceptors.response.use(
    // CAS SUCCÈS (2xx)
    (response: AxiosResponse): AxiosResponse => {
      loaderBus.hide();
      
      const config = response.config;
      // Notification automatique de succès si paramétrée dans l'appel
      if (config.showToast !== false && config.successMessage) {
        toast.success(config.successMessage);
      }
      
      return response;
    },
    // CAS ERREUR (4xx, 5xx, Réseau)
    async (error: AxiosError): Promise<never> => {
      loaderBus.hide();

      const config = error.config;
      const response = error.response;
      let finalErrorMessage = "";

      // Gestion des erreurs sans réponse serveur (ex: Serveur éteint)
      if (!response) {
        finalErrorMessage = config?.errorMessage || "Le serveur est injoignable (Port 3000).";
      } 
      // Gestion des erreurs renvoyées par l'API (ex: 422 Validation)
      else {
        const serverMessage = (response.data as { message?: string })?.message;
        finalErrorMessage = config?.errorMessage || serverMessage || "Une erreur est survenue.";
        
        // Logique spécifique par code HTTP
        if (response.status === 401) console.warn("Session expirée (401)");
      }

      // Affichage de la notification d'erreur
      if (config?.showToast !== false) {
        toast.error(finalErrorMessage, {
          id: 'api-error', // Empêche l'empilement de toasts identiques
        });
      }

      return Promise.reject(error);
    }
  );

  return apiService;
};

/**
 * Instance par défaut utilisée dans toute l'application.
 */
export const apiService = createApiService();