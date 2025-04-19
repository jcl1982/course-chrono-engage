
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { EventType } from "@/pages/Registration/RegistrationForm";
import { validateRegistrationData } from "./utils/validation";
import { RegistrationData } from "./types/registration";

export const useRegistrationSubmit = () => {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (
    currentUserId: string | null,
    eventId: string | null,
    eventDetails: any,
    selectedVehicle: string | null,
    formData: any,
    selectedDriverEquipment: any,
    selectedCopilotEquipment: any,
    eventType: EventType
  ) => {
    if (submitting) return;
    
    console.log("Traitement de l'inscription en cours...");
    console.log("Event type:", eventType);
    console.log("Event ID:", eventId);
    console.log("Event details:", eventDetails);
    console.log("Selected vehicle:", selectedVehicle);
    console.log("Form data:", formData);
    console.log("Driver equipment:", selectedDriverEquipment);
    console.log("Copilot equipment:", selectedCopilotEquipment);
    
    if (!validateRegistrationData({
      currentUserId,
      eventId,
      eventDetails,
      selectedVehicle,
      formData,
      selectedDriverEquipment,
      eventType
    })) {
      console.log("Validation échouée");
      return;
    }

    try {
      setSubmitting(true);
      
      // Debug: Récupérer le schéma de la table registrations
      const { data: tableInfo, error: tableError } = await supabase
        .from('registrations')
        .select('*')
        .limit(1);
      
      if (tableInfo && tableInfo.length > 0) {
        console.log("Schéma de la table registrations:", Object.keys(tableInfo[0] || {}));
      } else {
        console.log("Aucune donnée dans la table registrations");
      }
      
      if (tableError) {
        console.error("Erreur lors de la récupération du schéma:", tableError);
      }
      
      // Initialize the registration data
      const registrationData: RegistrationData = {
        driver_id: currentUserId!,
        vehicle_id: selectedVehicle!,
        driver_equipment_id: selectedDriverEquipment?.id,
        status: 'pending',
        rally_id: null
      };
      
      // Assign the correct ID based on event type
      if (eventType === "rally") {
        registrationData.rally_id = eventId || (eventDetails?.id ?? null);
      } else if (eventType === "hillclimb" || eventType === "slalom") {
        registrationData.competition_id = eventId || (eventDetails?.id ?? null);
        registrationData.event_type = eventType;
      }
      
      console.log("Données d'inscription prêtes à envoyer:", registrationData);
      
      if (!registrationData.rally_id && !registrationData.competition_id) {
        throw new Error("Identifiant d'événement invalide");
      }
      
      if (!registrationData.vehicle_id) {
        throw new Error("Identifiant de véhicule invalide");
      }
      
      const { data, error } = await supabase
        .from('registrations')
        .insert(registrationData)
        .select();

      if (error) {
        console.error("Erreur Supabase détaillée:", error);
        throw error;
      }

      console.log("Réponse d'inscription Supabase:", data);
      
      toast({
        title: "Inscription réussie",
        description: `Votre inscription à l'événement a été enregistrée`
      });
      
      navigate("/driver");
    } catch (error: any) {
      console.error("Error registering for event:", error);
      toast({
        title: "Erreur",
        description: `Une erreur est survenue lors de l'inscription: ${error.message || "Erreur inconnue"}`,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitting,
    handleSubmit,
  };
};
