// src/pages/Home/services/analysis.service.ts

import { apiService } from "../../../api/axios";

// --- INTERFACES ---

export interface HistoryItem {
  id: number;
  text: string;
  score: number;
  created_on: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface HistoryResponse {
  success: boolean;
  data: HistoryItem[];
  pagination: PaginationInfo;
}

/**
 * Récupère l'historique des analyses avec filtres et pagination.
 */
export const getHistory = async (
  page: number = 1, 
  limit: number = 5,
  search: string = "",
  minScore?: number
): Promise<HistoryResponse> => {
  const response = await apiService.get<HistoryResponse>("/history", {
    params: { page, limit, search, minScore },
    showToast: false // Pas de toast pour un chargement silencieux
  });
  return response.data;
};