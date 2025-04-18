import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { equipmentSchema, type EquipmentFormData } from "@/components/driver/safety-equipment/schemas/equipmentSchema";

export const useSafetyEquipmentForm = (type: "driver" | "copilot") => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(id ? true : false);
  
  const form = useForm<EquipmentFormData>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      // Driver Equipment
      helmet_brand: "",
      helmet_model: "",
      helmet_homologation: "",
      helmet_expiry_date: "",
      suit_brand: "",
      suit_homologation: "",
      suit_expiry_date: "",
      underwear_brand: "",
      underwear_homologation: "",
      underwear_expiry_date: "",
      shoes_brand: "",
      shoes_homologation: "",
      shoes_expiry_date: "",
      gloves_brand: "",
      gloves_homologation: "",
      gloves_expiry_date: "",
      hans_brand: "",
      hans_homologation: "",
      hans_expiry_date: "",
      
      // Copilot Equipment (optional)
      copilot_helmet_brand: "",
      copilot_helmet_model: "",
      copilot_helmet_homologation: "",
      copilot_helmet_expiry_date: "",
      copilot_suit_brand: "",
      copilot_suit_homologation: "",
      copilot_suit_expiry_date: "",
      copilot_underwear_brand: "",
      copilot_underwear_homologation: "",
      copilot_underwear_expiry_date: "",
      copilot_shoes_brand: "",
      copilot_shoes_homologation: "",
      copilot_shoes_expiry_date: "",
      copilot_gloves_brand: "",
      copilot_gloves_homologation: "",
      copilot_gloves_expiry_date: "",
      copilot_hans_brand: "",
      copilot_hans_homologation: "",
      copilot_hans_expiry_date: "",
    },
  });

  const fetchEquipment = async () => {
    if (!id) return;
    
    try {
      const { data, error } = await supabase
        .from('driver_safety_equipment')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data) {
        form.reset(data);
      }
    } catch (error) {
      console.error("Error fetching equipment:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données de l'équipement",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: EquipmentFormData) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        throw new Error("Utilisateur non connecté");
      }
      
      const equipmentData = {
        driver_id: userData.user.id,
        
        // Driver Equipment
        helmet_brand: data.helmet_brand,
        helmet_model: data.helmet_model,
        helmet_homologation: data.helmet_homologation,
        helmet_expiry_date: data.helmet_expiry_date,
        suit_brand: data.suit_brand,
        suit_homologation: data.suit_homologation,
        suit_expiry_date: data.suit_expiry_date,
        underwear_brand: data.underwear_brand,
        underwear_homologation: data.underwear_homologation,
        underwear_expiry_date: data.underwear_expiry_date,
        shoes_brand: data.shoes_brand,
        shoes_homologation: data.shoes_homologation,
        shoes_expiry_date: data.shoes_expiry_date,
        gloves_brand: data.gloves_brand,
        gloves_homologation: data.gloves_homologation,
        gloves_expiry_date: data.gloves_expiry_date,
        hans_brand: data.hans_brand,
        hans_homologation: data.hans_homologation,
        hans_expiry_date: data.hans_expiry_date,
        
        // Copilot Equipment
        copilot_helmet_brand: data.copilot_helmet_brand,
        copilot_helmet_model: data.copilot_helmet_model,
        copilot_helmet_homologation: data.copilot_helmet_homologation,
        copilot_helmet_expiry_date: data.copilot_helmet_expiry_date,
        copilot_suit_brand: data.copilot_suit_brand,
        copilot_suit_homologation: data.copilot_suit_homologation,
        copilot_suit_expiry_date: data.copilot_suit_expiry_date,
        copilot_underwear_brand: data.copilot_underwear_brand,
        copilot_underwear_homologation: data.copilot_underwear_homologation,
        copilot_underwear_expiry_date: data.copilot_underwear_expiry_date,
        copilot_shoes_brand: data.copilot_shoes_brand,
        copilot_shoes_homologation: data.copilot_shoes_homologation,
        copilot_shoes_expiry_date: data.copilot_shoes_expiry_date,
        copilot_gloves_brand: data.copilot_gloves_brand,
        copilot_gloves_homologation: data.copilot_gloves_homologation,
        copilot_gloves_expiry_date: data.copilot_gloves_expiry_date,
        copilot_hans_brand: data.copilot_hans_brand,
        copilot_hans_homologation: data.copilot_hans_homologation,
        copilot_hans_expiry_date: data.copilot_hans_expiry_date,
      };
      
      let error;
      
      if (id) {
        const response = await supabase
          .from('driver_safety_equipment')
          .update(equipmentData)
          .eq('id', id);
          
        error = response.error;
      } else {
        const response = await supabase
          .from('driver_safety_equipment')
          .insert(equipmentData);
          
        error = response.error;
      }

      if (error) throw error;

      toast({
        title: "Succès",
        description: id 
          ? "Équipement mis à jour avec succès" 
          : "Équipement enregistré avec succès",
      });
      
      navigate('/driver');
    } catch (error) {
      console.error("Error saving equipment:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer l'équipement",
        variant: "destructive",
      });
    }
  };

  return {
    form,
    loading,
    onSubmit,
    fetchEquipment,
  };
};
