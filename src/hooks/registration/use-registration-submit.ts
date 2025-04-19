
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { EventType } from "@/pages/Registration/RegistrationForm";

export const useRegistrationSubmit = () => {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateSubmission = (
    currentUserId: string | null,
    rallyId: string | null,
    rallyDetails: any,
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
    
    // Only validate rally for rally type events
    if (eventType === "rally") {
      if (!rallyId && !rallyDetails) {
        toast({
          title: "Rallye non spécifié",
          description: "Aucun rallye sélectionné pour l'inscription",
          variant: "destructive",
        });
        return false;
      }
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
    rallyId: string | null,
    rallyDetails: any,
    selectedVehicle: string | null,
    formData: any,
    selectedDriverEquipment: any,
    selectedCopilotEquipment: any,
    eventType: EventType
  ) => {
    if (submitting) return;
    
    if (!validateSubmission(currentUserId, rallyId, rallyDetails, selectedVehicle, formData, selectedDriverEquipment, eventType)) {
      return;
    }

    try {
      setSubmitting(true);
      
      const registrationData = {
        driver_id: currentUserId,
        rally_id: eventType === "rally" ? rallyId || rallyDetails?.id : null,
        vehicle_id: selectedVehicle,
        driver_info: formData,
        driver_equipment_id: selectedDriverEquipment?.id,
        co_driver_equipment_id: selectedCopilotEquipment?.id || null,
        status: 'pending',
        event_type: eventType
      };
      
      const { error } = await supabase
        .from('registrations')
        .insert([registrationData])
        .select();

      if (error) throw error;

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
