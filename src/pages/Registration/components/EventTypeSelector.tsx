
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EventType } from "../RegistrationForm";

interface EventTypeSelectorProps {
  selectedType: EventType;
  onTypeSelect: (type: EventType) => void;
}

export const EventTypeSelector = ({ selectedType, onTypeSelect }: EventTypeSelectorProps) => {
  const eventTypes = [
    { id: "rally", name: "Rallye", description: "Course sur différentes étapes et terrains" },
    { id: "hillclimb", name: "Course de Côte", description: "Course en montée sur route fermée" },
    { id: "slalom", name: "Slalom", description: "Parcours technique avec obstacles" },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Type d'Événement</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {eventTypes.map((type) => (
          <Card 
            key={type.id}
            className={`cursor-pointer transition-colors ${
              selectedType === type.id ? "border-2 border-primary" : "border border-input"
            }`}
            onClick={() => onTypeSelect(type.id as EventType)}
          >
            <CardContent className="p-4">
              <h4 className="font-semibold">{type.name}</h4>
              <p className="text-sm text-muted-foreground">{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
