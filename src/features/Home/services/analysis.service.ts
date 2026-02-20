import { apiService } from "../../../api/axios";

/**
 * Interface représentant la structure de la réponse du moteur d'analyse.
 */
export interface AnalysisResponse {
  /** Score de conformité calculé (entre 0 et 100) */
  score: number;
  /** Statut de l'opération (ex: 'success', 'warning') */
  status: string;
}

/**
 * Service de communication avec l'API d'analyse sémantique.
 * * @param text - Le contenu textuel à soumettre pour évaluation.
 * @returns Une promesse contenant l'objet AnalysisResponse.
 * * Note : Les notifications (Toasts) et le chargement (Loader) sont 
 * gérés de manière centralisée par les intercepteurs du apiService.
 */
export const analyzeText = async (text: string): Promise<AnalysisResponse> => {
  
  // Appel POST vers le endpoint /analyze
  const response = await apiService.post<AnalysisResponse>(
    "/analyze", 
    { 
      text 
    }, 
    { 
      /** * Configuration personnalisée traitée par l'intercepteur Axios 
       * @see src/api/axios.ts 
       */
      successMessage: "Analyse terminée avec succès !",
      errorMessage: "Échec de l'analyse : Vérifiez votre connexion au serveur.",
      showToast: true 
    }
  );

  // On retourne uniquement les données utiles de la réponse
  return response.data;
};