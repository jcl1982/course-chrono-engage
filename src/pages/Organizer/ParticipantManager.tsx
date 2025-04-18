import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { OrganizerGuard } from "@/components/auth/OrganizerGuard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { ParticipantDetailsDialog } from "@/components/participant/ParticipantDetailsDialog";

const ParticipantManager = () => {
  const { toast } = useToast();
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const { data: participants, isLoading } = useQuery({
    queryKey: ["participants"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, email, role")
        .eq("role", "driver");

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les participants",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

  return (
    <OrganizerGuard>
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto p-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/organizer">
              <Button variant="outline" size="icon" className="border-red-500 text-red-500 hover:bg-red-950">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-red-500 flex items-center gap-3">
              <Users className="h-8 w-8" />
              Gestion des Participants
            </h1>
          </div>

          {isLoading ? (
            <p className="text-gray-400">Chargement des participants...</p>
          ) : (
            <div className="bg-[#1a1a1a] rounded-lg border border-red-900 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-[#222] border-b border-red-900">
                    <TableHead className="text-red-500">Nom</TableHead>
                    <TableHead className="text-red-500">Prénom</TableHead>
                    <TableHead className="text-red-500">Email</TableHead>
                    <TableHead className="text-red-500">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participants?.map((participant) => (
                    <TableRow 
                      key={participant.id}
                      className="hover:bg-[#222] border-b border-red-900/50"
                    >
                      <TableCell className="text-gray-300">{participant.last_name}</TableCell>
                      <TableCell className="text-gray-300">{participant.first_name}</TableCell>
                      <TableCell className="text-gray-300">{participant.email}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline"
                          size="sm"
                          className="border-red-500 text-red-500 hover:bg-red-950"
                          onClick={() => {
                            setSelectedParticipant(participant.id);
                            setDetailsOpen(true);
                          }}
                        >
                          Voir détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <ParticipantDetailsDialog
          participantId={selectedParticipant}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
        />
      </div>
    </OrganizerGuard>
  );
};

export default ParticipantManager;
