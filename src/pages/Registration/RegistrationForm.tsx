import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import VehicleSelector from "./components/VehicleSelector";
import PersonalInfoForm from "@/components/registration/PersonalInfoForm";
import EquipmentForm from "@/components/registration/EquipmentForm";
import { SavedEquipmentSelector } from "@/components/driver/safety-equipment/SavedEquipmentSelector";

export type EventType = "rally" | "hillclimb" | "slalom";

const RegistrationForm = () => {
  const [eventType, setEventType] = useState<EventType>("rally");
  const [selectedTab, setSelectedTab] = useState("personal");
  const [rallyDetails, setRallyDetails] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const { rallyId } = useParams();
  const { toast } = useToast();
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [showNewEquipmentForm, setShowNewEquipmentForm] = useState(false);

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

  const handleSelectVehicle = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
  };

  const handleNext = () => {
    if (selectedTab === "personal") {
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

  const handleSubmit = async () => {
    if (!currentUserId || !rallyId || !selectedVehicle) {
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

  const handleEquipmentSelect = (equipment: any) => {
    if (equipment) {
      // When equipment is selected, store its ID for registration
      setSelectedEquipment(equipment.id);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {rallyDetails ? `Inscription: ${rallyDetails.name}` : "Formulaire d'Inscription FFSA"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
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
                    onSelectVehicle={handleSelectVehicle}
                    selectedVehicle={selectedVehicle}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="equipment">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Équipements de Sécurité</h3>
                {!showNewEquipmentForm ? (
                  <SavedEquipmentSelector
                    onSelectEquipment={handleEquipmentSelect}
                    onNewEquipment={() => setShowNewEquipmentForm(true)}
                  />
                ) : (
                  <EquipmentForm />
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={selectedTab === "personal"}
            >
              Précédent
            </Button>
            
            {selectedTab === "equipment" ? (
              <Button onClick={handleSubmit}>Finaliser l'inscription</Button>
            ) : (
              <Button onClick={handleNext}>Suivant</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
