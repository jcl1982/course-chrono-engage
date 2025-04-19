import { useState, useEffect } from "react";
import { EventType } from "@/pages/Registration/RegistrationForm";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { personalInfoSchema } from "@/components/registration/schemas/personalInfoSchema";

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

  const { rallyId } = useParams();
  const { toast } = useToast();

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
    } else if (selectedTab === "vehicle") {
      setSelectedTab("equipment");
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

  const handleSubmit = async () => {
    if (!currentUserId || !rallyId || !selectedVehicle || !formData) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir toutes les informations requises",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('registrations')
        .insert([{
          driver_id: currentUserId,
          rally_id: rallyId,
          vehicle_id: selectedVehicle,
          driver_info: formData,
          status: 'pending'
        }]);

      if (error) throw error;

      toast({
        title: "Inscription réussie",
        description: "Votre inscription au rallye a été enregistrée"
      });
    } catch (error) {
      console.error("Error registering for rally:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
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
