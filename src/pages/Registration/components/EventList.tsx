
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EventTypeSelector } from "./EventTypeSelector";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  name: string;
  type: 'rally' | 'hillclimb' | 'slalom';
  date: string;
  location: string;
  status: string;
}

interface EventListProps {
  onEventSelect: (event: Event) => void;
  selectedEvent?: Event;
}

export const EventList = ({ onEventSelect, selectedEvent }: EventListProps) => {
  const { toast } = useToast();
  
  const { data: events = [] } = useQuery({
    queryKey: ["upcoming-events-registration"],
    queryFn: async () => {
      try {
        const today = new Date().toISOString().split('T')[0];

        // Fetch rallies that are open for registration
        const { data: rallies, error: rallyError } = await supabase
          .from('rallies')
          .select('id, name, start_date, location, status')
          .gte('start_date', today)
          .eq('registration_open', true)
          .order('start_date');

        if (rallyError) throw rallyError;

        // Fetch competitions that are open for registration
        const { data: competitions, error: compError } = await supabase
          .from('competitions')
          .select('id, name, type, date, location, status')
          .gte('date', today)
          .eq('registration_open', true)
          .order('date');

        if (compError) throw compError;

        // Format rallies
        const formattedRallies = (rallies || []).map((rally: any) => ({
          id: rally.id,
          name: rally.name,
          date: rally.start_date,
          location: rally.location,
          status: rally.status,
          type: 'rally' as const
        }));

        // Format competitions
        const formattedCompetitions = (competitions || []).map((comp: any) => ({
          id: comp.id,
          name: comp.name,
          date: comp.date,
          location: comp.location,
          status: comp.status,
          type: (comp.type === 'hillclimb' || comp.type === 'slalom') 
            ? comp.type as 'hillclimb' | 'slalom'
            : 'hillclimb' as const
        }));

        return [...formattedRallies, ...formattedCompetitions];
      } catch (error) {
        console.error("Error fetching events:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les épreuves disponibles",
          variant: "destructive",
        });
        return [];
      }
    },
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Sélection de l'épreuve</h3>
      <EventTypeSelector 
        events={events} 
        onEventSelect={onEventSelect}
        selectedEvent={selectedEvent}
      />
    </div>
  );
};
