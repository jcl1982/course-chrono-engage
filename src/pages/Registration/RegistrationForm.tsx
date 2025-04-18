
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type EventType = "rally" | "hillclimb" | "slalom";

const RegistrationForm = () => {
  const [eventType, setEventType] = useState<EventType>("rally");

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Formulaire d'Inscription FFSA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="personal">Informations Personnelles</TabsTrigger>
              <TabsTrigger value="vehicle">Véhicule</TabsTrigger>
              <TabsTrigger value="equipment">Équipements</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Informations du Pilote</h3>
                {/* Les champs seront ajoutés dans la prochaine itération */}
              </div>
            </TabsContent>

            <TabsContent value="vehicle">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Informations du Véhicule</h3>
                {/* Les champs seront ajoutés dans la prochaine itération */}
              </div>
            </TabsContent>

            <TabsContent value="equipment">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Équipements de Sécurité</h3>
                {/* Les champs seront ajoutés dans la prochaine itération */}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-6">
            <Button variant="outline">Précédent</Button>
            <Button>Suivant</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
