
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useEventType } from "./registration/use-event-type";
import { useRallyDetails } from "./registration/use-rally-details";
import { useRegistrationForm } from "./registration/use-registration-form";
import { useRegistrationSubmit } from "./registration/use-registration-submit";

export const useRegistration = () => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const { eventType, setEventType } = useEventType();
  const { rallyDetails, setSelectedRally } = useRallyDetails();
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
    handleSubmit: () => handleSubmit(
      currentUserId,
      rallyDetails?.id,
      rallyDetails,
      selectedVehicle,
      formData,
      selectedDriverEquipment,
      selectedCopilotEquipment,
      eventType
    ),
    handlePersonalInfoSubmit,
    setSelectedVehicle,
    handleSelectEquipment,
    setShowNewEquipmentForm,
    setSelectedRally,
    setEventType,
  };
};
