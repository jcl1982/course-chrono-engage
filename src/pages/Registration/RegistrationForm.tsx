
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationTabs } from "./components/RegistrationTabs";
import { NavigationButtons } from "./components/NavigationButtons";
import { useRegistration } from "@/hooks/use-registration";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RallySelector } from "./components/RallySelector";

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
    setSelectedRally,
  } = useRegistration();
  
  const navigate = useNavigate();
  const { rallyId } = useParams();

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Formulaire d'Inscription FFSA
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!rallyId && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Sélection du Rallye</h3>
              <RallySelector 
                onRallySelect={setSelectedRally} 
                selectedRallyId={rallyDetails?.id}
              />
            </div>
          )}

          {rallyDetails ? (
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
              />
              
              <NavigationButtons
                selectedTab={selectedTab}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={handleSubmit}
                submitting={submitting}
              />
            </>
          ) : !rallyId && (
            <Alert variant="destructive" className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Veuillez sélectionner un rallye pour commencer l'inscription
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
