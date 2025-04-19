
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Flag, Mountain, Trophy } from "lucide-react";

interface Event {
  id: string;
  name: string;
  type: 'rally' | 'hillclimb' | 'slalom';
  date: string;
  location: string;
  status: string;
}

interface EventTypeSelectorProps {
  onEventSelect: (event: Event) => void;
  selectedEvent?: Event;
  events: Event[];
}

export const EventTypeSelector = ({ onEventSelect, selectedEvent, events }: EventTypeSelectorProps) => {
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

  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Aucune épreuve n'est actuellement ouverte aux inscriptions
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <Select 
        value={selectedEvent?.id} 
        onValueChange={(eventId) => {
          const event = events.find(e => e.id === eventId);
          if (event) {
            onEventSelect(event);
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner une épreuve" />
        </SelectTrigger>
        <SelectContent>
          {events.map((event) => (
            <SelectItem key={event.id} value={event.id}>
              <div className="flex items-center gap-2">
                {getEventIcon(event.type)}
                <span>
                  {event.name} - {getEventTypeName(event.type)} - {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
