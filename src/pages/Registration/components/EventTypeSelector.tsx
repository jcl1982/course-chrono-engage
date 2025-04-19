
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Flag, Mountain, Trophy } from "lucide-react";
import { EventType } from "../RegistrationForm";

interface EventTypeSelectorProps {
  onSelect: (type: EventType) => void;
  selected: EventType;
}

export const EventTypeSelector = ({ onSelect, selected }: EventTypeSelectorProps) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'rally':
        return <Trophy className="h-4 w-4 text-red-500" />;
      case 'hillclimb':
        return <Mountain className="h-4 w-4 text-red-500" />;
      case 'slalom':
        return <Flag className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getEventTypeName = (type: string) => {
    switch (type) {
      case 'rally':
        return 'Rallye';
      case 'hillclimb':
        return 'Course de côte';
      case 'slalom':
        return 'Slalom';
      default:
        return type;
    }
  };

  const eventTypes: EventType[] = ['rally', 'hillclimb', 'slalom'];

  return (
    <div className="w-full max-w-sm mx-auto">
      <Select 
        value={selected} 
        onValueChange={(value) => onSelect(value as EventType)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner un type d'épreuve" />
        </SelectTrigger>
        <SelectContent>
          {eventTypes.map((type) => (
            <SelectItem key={type} value={type}>
              <div className="flex items-center gap-2">
                {getEventIcon(type)}
                <span>{getEventTypeName(type)}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
