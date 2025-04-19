
import { useQuery } from "@tanstack/react-query";
import { Flag, Mountain, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import DashboardCard from "./DashboardCard";
import { CompetitionStatus } from "@/types/competition";

interface Event {
  id: string;
  name: string;
  type: 'rally' | 'hillclimb' | 'slalom';
  date: string;
  location: string;
  status: CompetitionStatus;
}

interface RallyListProps {
  userId?: string;
}

const RallyList = ({ userId }: RallyListProps) => {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      // Fetch rallies
      const { data: rallies, error: rallyError } = await supabase
        .from('rallies')
        .select('id, name, start_date as date, location, status')
        .eq('is_upcoming', true)
        .order('start_date');

      if (rallyError) throw rallyError;

      // Fetch competitions (hillclimb and slalom)
      const { data: competitions, error: compError } = await supabase
        .from('competitions')
        .select('id, name, type, date, location, status')
        .in('status', ['DRAFT', 'PUBLISHED'])
        .gte('date', new Date().toISOString())
        .order('date');

      if (compError) throw compError;

      const formattedRallies = (rallies || []).map(rally => ({
        ...rally,
        type: 'rally' as const
      }));

      return [...formattedRallies, ...(competitions || [])];
    }
  });

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

  const getEventType = (type: string) => {
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

  if (isLoading) {
    return <p className="text-gray-400">Chargement des épreuves...</p>;
  }

  return (
    <div className="space-y-4">
      {events.length === 0 ? (
        <p className="text-gray-400">Aucune épreuve à venir</p>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-3 p-2 rounded-lg bg-black/20 border border-red-900/20 hover:bg-black/30 transition-colors"
          >
            {getEventIcon(event.type)}
            <div className="flex-1">
              <h3 className="font-medium text-white">{event.name}</h3>
              <p className="text-sm text-gray-400">
                {getEventType(event.type)} - {event.location} - {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RallyList;
