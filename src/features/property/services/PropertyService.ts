import { supabase } from "../../../api/supabase";
import type { Property } from "../models/Property.interface";

export const getProperties = async (): Promise<Property[]> => {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur lors de la récupération des propriétés:", error.message);
    return [];
  }

  // Filtrer uniquement les biens publiés
  const publishedProperties = data?.filter((p) => p.is_published) ?? [];

  return publishedProperties;
};