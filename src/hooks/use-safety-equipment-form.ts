
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";
import { equipmentSchema } from "@/components/driver/safety-equipment/schemas/equipmentSchema";
import { EquipmentType } from "@/types/equipment";

export const useSafetyEquipmentForm = (equipmentType: EquipmentType = "driver") => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const returnUrl = searchParams.get("returnUrl");
  const { toast } = useToast();
  const [loading, setLoading] = useState(!!id);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      // Driver equipment fields
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
      // Co-pilot equipment fields (prefixed with copilot_)
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
    }
  });

  useEffect(() => {
    const fetchEquipment = async () => {
      if (id) {
        try {
          setLoading(true);
          
          const { data, error } = await supabase
            .from("driver_safety_equipment")
            .select("*")
            .eq("id", id)
            .single();

          if (error) throw error;
          
          if (data) {
            console.log(`Found equipment:`, data);
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
      }
    };

    fetchEquipment();
  }, [id, form, toast]);

  const onSubmit = async (data: any) => {
    try {
      setSubmitting(true);
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error("Utilisateur non authentifié");
      }

      const equipmentData = {
        ...data,
        driver_id: user.data.user.id,
      };
      
      let result;
      
      if (id) {
        result = await supabase
          .from("driver_safety_equipment")
          .update(equipmentData)
          .eq("id", id);
      } else {
        result = await supabase
          .from("driver_safety_equipment")
          .insert(equipmentData);
      }

      if (result.error) throw result.error;

      toast({
        title: "Succès",
        description: "Équipement enregistré avec succès",
      });
      
      // Navigate back to the return URL if provided, otherwise go to the driver dashboard
      if (returnUrl) {
        navigate(returnUrl);
      } else {
        navigate('/driver');
      }
    } catch (error) {
      console.error("Error saving equipment:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer l'équipement",
        variant: "destructive",
      });
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
