
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
    if (id) {
      const { error } = await supabase
        .from('driver_safety_equipment')
        .update(equipmentData)
        .eq('id', id);

      if (error) throw error;
      return { message: "Équipement mis à jour avec succès" };
    } else {
      const { error } = await supabase
        .from('driver_safety_equipment')
        .insert(equipmentData);

      if (error) throw error;
      return { message: "Équipement enregistré avec succès" };
    }
  } catch (error) {
    console.error("Error saving equipment:", error);
    throw new ApiError("Impossible d'enregistrer l'équipement");
  }
};
