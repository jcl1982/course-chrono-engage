
import { useState, useEffect } from "react";
import { EventType } from "@/pages/Registration/RegistrationForm";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { personalInfoSchema } from "@/components/registration/schemas/personalInfoSchema";
import { useNavigate } from "react-router-dom";

export const useRegistration = () => {
  const [eventType, setEventType] = useState<EventType>("rally");
  const [selectedTab, setSelectedTab] = useState("personal");
  const [rallyDetails, setRallyDetails] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [showNewEquipmentForm, setShowNewEquipmentForm] = useState(false);
  const [selectedDriverEquipment, setSelectedDriverEquipment] = useState<any>(null);
  const [selectedCopilotEquipment, setSelectedCopilotEquipment] = useState<any>(null);
  const [formData, setFormData] = useState<z.infer<typeof personalInfoSchema> | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { rallyId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndRally = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setCurrentUserId(user.id);
      }

      if (rallyId) {
        const { data, error } = await supabase
          .from('rallies')
          .select('*')
          .eq('id', rallyId)
          .single();

        if (error) {
          toast({
            title: "Erreur",
            description: "Impossible de charger les informations du rallye",
            variant: "destructive",
          });
          return;
        }

        setRallyDetails(data);
      }
    };

    fetchUserAndRally();
  }, [rallyId, toast]);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const handleNext = () => {
    if (selectedTab === "personal" && formData) {
      setSelectedTab("vehicle");
    } else if (selectedTab === "vehicle" && selectedVehicle) {
      setSelectedTab("equipment");
    } else {
      toast({
        title: "Information requise",
        description: "Veuillez compléter cette étape avant de continuer",
        variant: "destructive",
      });
    }
  };

  const handlePrevious = () => {
    if (selectedTab === "equipment") {
      setSelectedTab("vehicle");
    } else if (selectedTab === "vehicle") {
      setSelectedTab("personal");
    }
  };

  const handlePersonalInfoSubmit = (data: z.infer<typeof personalInfoSchema>) => {
    setFormData(data);
    handleNext();
  };

  const validateSubmission = () => {
    if (!currentUserId) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour vous inscrire",
        variant: "destructive",
      });
      return false;
    }
    
    if (!rallyId) {
      toast({
        title: "Rallye non spécifié",
        description: "Aucun rallye sélectionné pour l'inscription",
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

  const handleSubmit = async () => {
    if (submitting) return;
    
    if (!validateSubmission()) {
      return;
    }

    try {
      setSubmitting(true);
      
      // Prepare the registration data
      const registrationData = {
        driver_id: currentUserId,
        rally_id: rallyId,
        vehicle_id: selectedVehicle,
        driver_info: formData,
        driver_equipment_id: selectedDriverEquipment?.id,
        co_driver_equipment_id: selectedCopilotEquipment?.id || null,
        status: 'pending'
      };
      
      // Insert registration
      const { error, data } = await supabase
        .from('registrations')
        .insert([registrationData])
        .select();

      if (error) throw error;

      toast({
        title: "Inscription réussie",
        description: "Votre inscription au rallye a été enregistrée"
      });
      
      // Navigate to driver dashboard
      navigate("/driver");
    } catch (error) {
      console.error("Error registering for rally:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelectEquipment = (equipment: any, role: "driver" | "copilot") => {
    if (role === "driver") {
      setSelectedDriverEquipment(equipment);
    } else {
      setSelectedCopilotEquipment(equipment);
    }
  };

  return {
    eventType,
    selectedTab,
    rallyDetails,
    currentUserId,
    selectedVehicle,
    formData,
    showNewEquipmentForm,
    selectedDriverEquipment,
    selectedCopilotEquipment,
    submitting,
    handleTabChange,
    handleNext,
    handlePrevious,
    handleSubmit,
    handlePersonalInfoSubmit,
    setSelectedVehicle,
    handleSelectEquipment,
    setShowNewEquipmentForm,
  };
};
