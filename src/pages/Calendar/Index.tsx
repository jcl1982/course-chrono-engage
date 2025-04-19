
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { BackButton } from "@/components/navigation/BackButton";
import { Mountain, Trophy, Flag } from "lucide-react";

interface Event {
  id: string;
  name: string;
  type: 'rally' | 'hillclimb' | 'slalom';
  date: string;
  location: string;
  status: string;
}

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["upcoming-events"],
    queryFn: async () => {
      try {
        const today = new Date().toISOString().split('T')[0];

        // Fetch rallies
        const { data: rallies, error: rallyError } = await supabase
          .from('rallies')
          .select('id, name, start_date, location, status')
          .gte('start_date', today)
          .order('start_date');

        if (rallyError) throw rallyError;

        // Fetch competitions
        const { data: competitions, error: compError } = await supabase
          .from('competitions')
          .select('id, name, type, date, location, status')
          .gte('date', today)
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
        return [];
      }
    },
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

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-[#222222] shadow-sm border-b border-red-800">
        <div className="container mx-auto py-4 px-4 md:px-6">
          <div className="flex items-center gap-4 mb-2">
            <BackButton />
            <h1 className="text-3xl font-bold text-red-500">Calendrier des Épreuves</h1>
          </div>
          <p className="text-gray-300">Consultez les dates des prochains événements</p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[#1a1a1a] border-red-900 text-white">
            <CardHeader>
              <CardTitle className="text-red-500">Calendrier</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="text-white rounded-md border border-red-900 pointer-events-auto"
                locale={fr}
              />
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-red-900 text-white">
            <CardHeader>
              <CardTitle className="text-red-500">Prochains Événements</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-gray-400">Chargement des événements...</p>
              ) : events.length > 0 ? (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div 
                      key={event.id}
                      className="p-4 rounded-lg bg-[#2a2a2a] border border-red-900/50 hover:bg-[#333333] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {getEventIcon(event.type)}
                        <h3 className="font-medium text-red-400">{event.name}</h3>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        Type: {getEventType(event.type)}
                      </p>
                      <p className="text-sm text-gray-400">
                        Date: {format(new Date(event.date), 'PPP', { locale: fr })}
                      </p>
                      <p className="text-sm text-gray-400">
                        Lieu: {event.location}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Aucun événement à venir</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
