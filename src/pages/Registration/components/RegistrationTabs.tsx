
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfoForm from "@/components/registration/PersonalInfoForm";
import VehicleSelector from "./VehicleSelector";
import { SavedEquipmentSelector } from "@/components/driver/safety-equipment/SavedEquipmentSelector";

interface RegistrationTabsProps {
  selectedTab: string;
  onTabChange: (value: string) => void;
  currentUserId: string | null;
  selectedVehicle: string | null;
  onSelectVehicle: (vehicleId: string) => void;
  showNewEquipmentForm: boolean;
  onNewEquipment: () => void;
  onSelectEquipment: (equipment: any, role: "driver" | "copilot") => void;
  selectedDriverEquipment: any;
  selectedCopilotEquipment: any;
}

export const RegistrationTabs = ({
  selectedTab,
  onTabChange,
  currentUserId,
  selectedVehicle,
  onSelectVehicle,
  showNewEquipmentForm,
  onNewEquipment,
  onSelectEquipment,
  selectedDriverEquipment,
  selectedCopilotEquipment,
}: RegistrationTabsProps) => {
  return (
    <Tabs value={selectedTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="personal">Informations Personnelles</TabsTrigger>
        <TabsTrigger value="vehicle">Véhicule</TabsTrigger>
        <TabsTrigger value="equipment">Équipements</TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Informations du Pilote</h3>
          <PersonalInfoForm />
        </div>
      </TabsContent>

      <TabsContent value="vehicle">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Sélection du Véhicule</h3>
          {currentUserId && (
            <VehicleSelector 
              userId={currentUserId} 
              onSelectVehicle={onSelectVehicle}
              selectedVehicle={selectedVehicle}
            />
          )}
        </div>
      </TabsContent>

      <TabsContent value="equipment">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Équipement du Pilote</h3>
            <SavedEquipmentSelector
              onSelectEquipment={(equipment) => onSelectEquipment(equipment, "driver")}
              onNewEquipment={onNewEquipment}
              equipmentType="driver"
            />
          </div>

          {selectedDriverEquipment && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Équipement du Copilote</h3>
              <SavedEquipmentSelector
                onSelectEquipment={(equipment) => onSelectEquipment(equipment, "copilot")}
                onNewEquipment={onNewEquipment}
                equipmentType="copilot"
              />
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};
