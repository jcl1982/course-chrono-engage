
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { EventType } from "@/pages/Registration/RegistrationForm";

// Define an interface for the registration data to ensure type safety
interface RegistrationData {
  driver_id: string;
  vehicle_id: string;
  driver_info: any;
  driver_equipment_id?: string;
  co_driver_equipment_id?: string | null;
  status: string;
  rally_id: string | null;
  competition_id?: string;
  event_type?: EventType;
}

export const useRegistrationSubmit = () => {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateSubmission = (
    currentUserId: string | null,
    eventId: string | null,
    eventDetails: any,
    selectedVehicle: string | null,
    formData: any,
    selectedDriverEquipment: any,
    eventType: EventType
  ) => {
    console.log("Validation des données d'inscription...");
    
    if (!currentUserId) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour vous inscrire",
        variant: "destructive",
      });
      return false;
    }
    
    if (!eventId && !eventDetails) {
      toast({
        title: "Événement non spécifié",
        description: "Aucun événement sélectionné pour l'inscription",
        variant: "destructive",
      });
      return false;
    }
    
    if (!selectedVehicle) {
      toast({
        title: "Véhicule requis",
        description: "Veuillez sélectionner un véhicule",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData) {
      toast({
        title: "Informations personnelles requises",
        description: "Veuillez compléter les informations personnelles",
        variant: "destructive",
      });
      return false;
    }
    
    if (!selectedDriverEquipment) {
      toast({
        title: "Équipement pilote requis",
        description: "Veuillez sélectionner l'équipement du pilote",
        variant: "destructive",
      });
      return false;
    }
    
    // Pour les rallyes, vérifier l'équipement du copilote
    if (eventType === "rally" && !formData.coPilote) {
      toast({
        title: "Informations copilote requises",
        description: "Veuillez compléter les informations du copilote pour les rallyes",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

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
    
    if (!validateSubmission(currentUserId, eventId, eventDetails, selectedVehicle, formData, selectedDriverEquipment, eventType)) {
      console.log("Validation échouée");
      return;
    }

    try {
      setSubmitting(true);
      
      // Initialize the registration data with mandatory fields
      const registrationData: RegistrationData = {
        driver_id: currentUserId!,
        vehicle_id: selectedVehicle!,
        driver_info: formData,
        driver_equipment_id: selectedDriverEquipment?.id,
        co_driver_equipment_id: eventType === "rally" ? selectedCopilotEquipment?.id : null,
        status: 'pending',
        rally_id: null
      };
      
      // Assign the correct ID based on event type
      if (eventType === "rally") {
        registrationData.rally_id = eventId || (eventDetails?.id ?? null);
      } else if (eventType === "hillclimb" || eventType === "slalom") {
        // Pour les courses de côte ou slaloms, rally_id reste null et on définit competition_id
        registrationData.competition_id = eventId || (eventDetails?.id ?? null);
        registrationData.event_type = eventType;
      }
      
      console.log("Données d'inscription prêtes à envoyer:", registrationData);
      
      // Vérification supplémentaire des valeurs nulles
      if (!registrationData.rally_id && !registrationData.competition_id) {
        console.error("ID d'événement manquant");
        throw new Error("Identifiant d'événement invalide");
      }
      
      if (!registrationData.vehicle_id) {
        console.error("ID de véhicule manquant");
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
