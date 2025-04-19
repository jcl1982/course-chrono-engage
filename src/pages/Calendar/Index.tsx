
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data: rallies, isLoading } = useQuery({
    queryKey: ["rallies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rallies')
        .select('*')
        .order('start_date', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const upcomingRallies = rallies?.filter(rally => new Date(rally.start_date) >= new Date()) || [];

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-[#222222] shadow-sm border-b border-red-800">
        <div className="container mx-auto py-4 px-4 md:px-6">
          <h1 className="text-3xl font-bold text-red-500">Calendrier des Rallyes</h1>
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
                className="text-white rounded-md border border-red-900"
                locale={fr}
              />
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-red-900 text-white">
            <CardHeader>
              <CardTitle className="text-red-500">Prochains Rallyes</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-gray-400">Chargement des rallyes...</p>
              ) : upcomingRallies.length > 0 ? (
                <div className="space-y-4">
                  {upcomingRallies.map((rally) => (
                    <div 
                      key={rally.id}
                      className="p-4 rounded-lg bg-[#2a2a2a] border border-red-900/50 hover:bg-[#333333] transition-colors"
                    >
                      <h3 className="font-medium text-red-400">{rally.name}</h3>
                      <p className="text-sm text-gray-400">
                        Date: {format(new Date(rally.start_date), 'PPP', { locale: fr })}
                      </p>
                      <p className="text-sm text-gray-400">
                        Lieu: {rally.location}
                      </p>
                      <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                        rally.registration_open 
                          ? 'bg-green-900/50 text-green-400' 
                          : 'bg-red-900/50 text-red-400'
                      }`}>
                        {rally.registration_open ? 'Inscriptions ouvertes' : 'Inscriptions fermées'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Aucun rallye à venir</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
