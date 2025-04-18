
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";
import { equipmentSchema } from "@/components/driver/safety-equipment/schemas/equipmentSchema";
import { EquipmentType } from "@/types/equipment";

export const useSafetyEquipmentForm = (equipmentType: EquipmentType = "driver") => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(!!id);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
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
    }
  });

  useEffect(() => {
    const fetchEquipment = async () => {
      if (id) {
        try {
          setLoading(true);
          
          const tableName = equipmentType === "driver" 
            ? "driver_safety_equipment" 
            : "copilot_safety_equipment";
          
          console.log(`Fetching ${equipmentType} equipment with ID: ${id} from table: ${tableName}`);
          
          const { data, error } = await supabase
            .from(tableName)
            .select("*")
            .eq("id", id)
            .single();

          if (error) throw error;
          
          if (data) {
            console.log(`Found ${equipmentType} equipment:`, data);
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
  }, [id, form, toast, equipmentType]);

  const onSubmit = async (data: any) => {
    try {
      setSubmitting(true);
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error("Utilisateur non authentifié");
      }

      const tableName = equipmentType === "driver" 
        ? "driver_safety_equipment" 
        : "copilot_safety_equipment";
      
      console.log(`Saving ${equipmentType} equipment to table: ${tableName}`, data);
      
      // Create a properly typed object for insertion
      const equipmentData = {
        ...data,
        driver_id: user.data.user.id,
      };
      
      let result;
      
      if (id) {
        // Update existing record
        result = await supabase
          .from(tableName)
          .update(equipmentData)
          .eq("id", id);
      } else {
        // Insert new record
        result = await supabase
          .from(tableName)
          .insert(equipmentData);
      }

      if (result.error) throw result.error;

      toast({
        title: "Succès",
        description: "Équipement enregistré avec succès",
      });
      
      navigate('/driver');
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
