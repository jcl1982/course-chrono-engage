
import { useState } from "react";
import { z } from "zod";
import { personalInfoSchema } from "@/components/registration/schemas/personalInfoSchema";

export const useRegistrationForm = () => {
  const [selectedTab, setSelectedTab] = useState("personal");
  const [formData, setFormData] = useState<z.infer<typeof personalInfoSchema> | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedDriverEquipment, setSelectedDriverEquipment] = useState<any>(null);
  const [selectedCopilotEquipment, setSelectedCopilotEquipment] = useState<any>(null);
  const [showNewEquipmentForm, setShowNewEquipmentForm] = useState(false);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const handlePersonalInfoSubmit = (data: z.infer<typeof personalInfoSchema>) => {
    setFormData(data);
    handleNext();
  };

  const handleNext = () => {
    if (selectedTab === "personal" && formData) {
      setSelectedTab("vehicle");
    } else if (selectedTab === "vehicle" && selectedVehicle) {
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

  const handleSelectEquipment = (equipment: any, role: "driver" | "copilot") => {
    if (role === "driver") {
      setSelectedDriverEquipment(equipment);
    } else {
      setSelectedCopilotEquipment(equipment);
    }
  };

  return {
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
  };
};
