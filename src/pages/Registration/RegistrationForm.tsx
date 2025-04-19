
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationTabs } from "./components/RegistrationTabs";
import { NavigationButtons } from "./components/NavigationButtons";
import { useRegistration } from "@/hooks/use-registration";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EventList } from "./components/EventList";

export type EventType = "rally" | "hillclimb" | "slalom";

const RegistrationForm = () => {
  const {
    selectedTab,
    eventDetails,
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
    setEventDetails,
  } = useRegistration();
  
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Formulaire d'Inscription FFSA
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Event Selection */}
          <div className="mb-6">
            <EventList 
              onEventSelect={setEventDetails} 
              selectedEvent={eventDetails}
            />
          </div>

          {eventDetails ? (
            <>
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
                eventType={eventDetails.type}
              />
              
              <NavigationButtons
                selectedTab={selectedTab}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={handleSubmit}
                submitting={submitting}
              />
            </>
          ) : (
            <Alert variant="destructive" className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Veuillez sélectionner une épreuve pour commencer l'inscription
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
