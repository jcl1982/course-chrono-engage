
import { useEffect, useState } from "react";
import { EventTypeSelector } from "./EventTypeSelector";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EventType } from "../RegistrationForm";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string | null;
  type: EventType;
}

interface EventListProps {
  onEventSelect: (event: Event | null) => void;
  selectedEvent: Event | null;
}

export const EventList = ({ onEventSelect, selectedEvent }: EventListProps) => {
  const [eventType, setEventType] = useState<EventType>("rally");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents(eventType);
  }, [eventType]);

  const fetchEvents = async (type: EventType) => {
    setLoading(true);
    try {
      console.log(`Recherche des événements de type: ${type}`);
      
      let query;
      if (type === "rally") {
        query = supabase
          .from("rallies")
          .select("id, name, start_date, location, description, registration_open")
          .eq("registration_open", true)
          .eq("status", "upcoming");
      } else {
        query = supabase
          .from("competitions")
          .select("id, name, date, location, description, registration_open, type")
          .eq("registration_open", true)
          .eq("type", type);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Erreur lors de la récupération des événements:", error);
        throw error;
      }

      const formattedEvents: Event[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        date: item.start_date || item.date,
        location: item.location,
        description: item.description,
        type: type
      }));

      console.log("Événements récupérés:", formattedEvents);
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventTypeChange = (type: EventType) => {
    console.log("Changement de type d'événement:", type);
    setEventType(type);
    onEventSelect(null);
  };

  const handleSelectEvent = (event: Event) => {
    console.log("Événement sélectionné:", event);
    onEventSelect(event);
  };

  return (
    <div className="space-y-4">
      <EventTypeSelector onSelect={handleEventTypeChange} selected={eventType} />

      <Tabs value={eventType} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rally" onClick={() => handleEventTypeChange("rally")}>
            Rallye
          </TabsTrigger>
          <TabsTrigger value="hillclimb" onClick={() => handleEventTypeChange("hillclimb")}>
            Course de Côte
          </TabsTrigger>
          <TabsTrigger value="slalom" onClick={() => handleEventTypeChange("slalom")}>
            Slalom
          </TabsTrigger>
        </TabsList>

        {["rally", "hillclimb", "slalom"].map((type) => (
          <TabsContent key={type} value={type} className="mt-4">
            {loading ? (
              <div className="text-center">Chargement des épreuves...</div>
            ) : events.length === 0 ? (
              <div className="text-center">Aucune épreuve disponible pour le moment</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((event) => (
                  <Card
                    key={event.id}
                    className={`cursor-pointer transition-all ${
                      selectedEvent?.id === event.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleSelectEvent(event)}
                  >
                    <CardHeader>
                      <CardTitle>{event.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p><strong>Date:</strong> {event.date}</p>
                      <p><strong>Lieu:</strong> {event.location}</p>
                      {event.description && <p className="text-sm mt-2">{event.description}</p>}
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={selectedEvent?.id === event.id ? "default" : "outline"}
                        className="w-full"
                      >
                        {selectedEvent?.id === event.id ? "Sélectionné" : "Sélectionner"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
