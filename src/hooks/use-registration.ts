
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useRegistrationForm } from "./registration/use-registration-form";
import { useRegistrationSubmit } from "./registration/use-registration-submit";

export const useRegistration = () => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [eventDetails, setEventDetails] = useState<any>(null);

  const {
    selectedTab,
    formData,
    selectedVehicle,
    selectedDriverEquipment,
    selectedCopilotEquipment,
    showNewEquipmentForm,
    handleTabChange,
    handlePersonalInfoSubmit,
    handleNext,
    handlePrevious,
    setSelectedVehicle,
    handleSelectEquipment,
    setShowNewEquipmentForm,
  } = useRegistrationForm();

  const { submitting, handleSubmit } = useRegistrationSubmit();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
      }
    };

    fetchUser();
  }, []);

  return {
    eventDetails,
    selectedTab,
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
    handleSubmit: () => handleSubmit(
      currentUserId,
      eventDetails?.id,
      eventDetails,
      selectedVehicle,
      formData,
      selectedDriverEquipment,
      selectedCopilotEquipment,
      eventDetails?.type
    ),
    handlePersonalInfoSubmit,
    setSelectedVehicle,
    handleSelectEquipment,
    setShowNewEquipmentForm,
    setEventDetails,
  };
};
