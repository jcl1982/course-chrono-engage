
import { EventType } from "@/pages/Registration/RegistrationForm";
import { RegistrationValidationProps } from "../types/registration";
import { toast } from "@/hooks/use-toast";

export const validateRegistrationData = ({
  currentUserId,
  eventId,
  eventDetails,
  selectedVehicle,
  formData,
  selectedDriverEquipment,
  eventType
}: RegistrationValidationProps): boolean => {
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
