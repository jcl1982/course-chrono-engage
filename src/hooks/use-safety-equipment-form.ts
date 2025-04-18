import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { equipmentSchema } from "@/components/driver/safety-equipment/schemas/equipmentSchema";
import type { EquipmentFormData, EquipmentType } from "@/types/equipment";
import { fetchEquipmentById, saveEquipment, ApiError } from "@/api/equipment";

export const useSafetyEquipmentForm = (type: EquipmentType) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(id ? true : false);
  const [submitting, setSubmitting] = useState(false);

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
      
      // Copilot Equipment
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

  const fetchEquipment = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const data = await fetchEquipmentById(id);
      if (data) {
        form.reset(data);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast({
          title: "Erreur",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur inattendue s'est produite",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [id, form, toast]);

  useEffect(() => {
    if (id) {
      fetchEquipment();
    }
  }, [id, fetchEquipment]);

  const onSubmit = async (data: EquipmentFormData) => {
    try {
      setSubmitting(true);
      
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        throw new Error("Utilisateur non connecté");
      }
      
      const equipmentData = {
        ...data,
        driver_id: userData.user.id,
      };

      if (type === "copilot") {
        console.log("Submitting copilot equipment data:", equipmentData);
      }

      const result = await saveEquipment(equipmentData, id);
      console.log("Save result:", result);

      toast({
        title: "Succès",
        description: type === "driver" 
          ? "Équipement du pilote enregistré avec succès" 
          : "Équipement du copilote enregistré avec succès",
      });

      navigate('/driver');
    } catch (error) {
      console.error("Form submission error:", error);
      
      if (error instanceof ApiError) {
        toast({
          title: "Erreur",
          description: error.message,
          variant: "destructive",
        });
      } else if (error instanceof Error) {
        toast({
          title: "Erreur",
          description: error.message || "Une erreur inattendue s'est produite",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur inattendue s'est produite",
          variant: "destructive",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    loading,
    submitting,
    onSubmit,
  };
};
