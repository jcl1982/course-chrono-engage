
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationTabs } from "./components/RegistrationTabs";
import { NavigationButtons } from "./components/NavigationButtons";
import { useRegistration } from "@/hooks/use-registration";

export type EventType = "rally" | "hillclimb" | "slalom";

const RegistrationForm = () => {
  const {
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
  } = useRegistration();

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {rallyDetails ? `Inscription: ${rallyDetails.name}` : "Formulaire d'Inscription FFSA"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RegistrationTabs
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
            currentUserId={currentUserId}
            selectedVehicle={selectedVehicle}
            formData={formData}
            onSelectVehicle={setSelectedVehicle}
            showNewEquipmentForm={showNewEquipmentForm}
            onNewEquipment={() => setShowNewEquipmentForm(true)}
            onSelectEquipment={handleSelectEquipment}
            selectedDriverEquipment={selectedDriverEquipment}
            selectedCopilotEquipment={selectedCopilotEquipment}
            onPersonalInfoSubmit={handlePersonalInfoSubmit}
          />
          
          <NavigationButtons
            selectedTab={selectedTab}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
