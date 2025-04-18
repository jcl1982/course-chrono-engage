
import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { equipmentSchema } from "@/components/driver/safety-equipment/schemas/equipmentSchema";
import type { EquipmentFormData } from "@/types/equipment";
import { fetchEquipmentById, saveEquipment, ApiError } from "@/api/equipment";

export const useSafetyEquipmentForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(id ? true : false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<EquipmentFormData>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
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

      const result = await saveEquipment(equipmentData, id);

      toast({
        title: "Succès",
        description: "Équipement enregistré avec succès",
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
