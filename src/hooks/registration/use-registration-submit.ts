
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
    
    if (!validateSubmission(currentUserId, eventId, eventDetails, selectedVehicle, formData, selectedDriverEquipment, eventType)) {
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
        co_driver_equipment_id: selectedCopilotEquipment?.id || null,
        status: 'pending',
        rally_id: null // Initialize with null
      };
      
      // Assign the correct ID based on event type
      if (eventType === "rally") {
        registrationData.rally_id = eventId || eventDetails?.id;
      } else if (eventType === "hillclimb" || eventType === "slalom") {
        // For hillclimb or slalom, we still need to provide a valid rally_id
        // but we'll store the competition ID in a separate field for later reference
        registrationData.rally_id = null; // This might need to be a valid placeholder or default value
        registrationData.competition_id = eventId || eventDetails?.id;
        registrationData.event_type = eventType;
      }
      
      console.log("Sending registration data:", registrationData);
      
      const { error } = await supabase
        .from('registrations')
        .insert([registrationData])
        .select();

      if (error) {
        console.error("Erreur détaillée:", error);
        throw error;
      }

      toast({
        title: "Inscription réussie",
        description: `Votre inscription à l'événement a été enregistrée`
      });
      
      navigate("/driver");
    } catch (error) {
      console.error("Error registering for event:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
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
