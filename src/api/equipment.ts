
import { supabase } from "@/integrations/supabase/client";
import type { EquipmentFormData } from "@/types/equipment";

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const fetchEquipmentById = async (id: string) => {
  const { data, error } = await supabase
    .from('driver_safety_equipment')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching equipment:", error);
    throw new ApiError("Impossible de charger les données de l'équipement");
  }

  return data;
};

export const saveEquipment = async (
  equipmentData: EquipmentFormData & { driver_id: string },
  id?: string
) => {
  try {
    console.log("Saving equipment data:", JSON.stringify(equipmentData, null, 2));
    console.log("Equipment ID:", id);
    
    // Préparer les données pour Supabase en supprimant les champs vides pour le copilote
    // si le type d'équipement est "driver" seulement
    const cleanedData = Object.fromEntries(
      Object.entries(equipmentData).filter(([key, value]) => {
        // Ne pas filtrer les champs du copilote si la valeur n'est pas vide
        return value !== "" && value !== null && value !== undefined;
      })
    );
    
    console.log("Cleaned data:", JSON.stringify(cleanedData, null, 2));

    if (id) {
      const { data, error } = await supabase
        .from('driver_safety_equipment')
        .update(cleanedData)
        .eq('id', id)
        .select();

      if (error) {
        console.error("Error updating equipment:", error);
        throw new ApiError("Impossible de mettre à jour l'équipement: " + error.message);
      }
      
      console.log("Update successful:", data);
      return { message: "Équipement mis à jour avec succès", data };
    } else {
      const { data, error } = await supabase
        .from('driver_safety_equipment')
        .insert(cleanedData)
        .select();

      if (error) {
        console.error("Error inserting equipment:", error);
        throw new ApiError("Impossible d'enregistrer l'équipement: " + error.message);
      }
      
      console.log("Insert successful:", data);
      return { message: "Équipement enregistré avec succès", data };
    }
  } catch (error) {
    console.error("Error saving equipment:", error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Impossible d'enregistrer l'équipement");
  }
};
