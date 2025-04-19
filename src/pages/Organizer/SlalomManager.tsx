
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { OrganizerGuard } from "@/components/auth/OrganizerGuard";
import { BackButton } from "@/components/navigation/BackButton";
import { CompetitionTable } from "@/components/competition/CompetitionTable";
import { DeleteCompetitionDialog } from "@/components/competition/DeleteCompetitionDialog";
import { CompetitionFormDialog } from "@/components/competition/CompetitionFormDialog";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { type Database } from "@/integrations/supabase/types";
import { CompetitionTypeHeader } from "./components/CompetitionTypeHeader";
import { Competition, CompetitionStatus } from "@/types/competition";

type SupabaseCompetition = Database["public"]["Tables"]["competitions"]["Row"];

const SlalomManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | undefined>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: competitions, isLoading } = useQuery({
    queryKey: ["competitions", "slalom"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("competitions")
        .select("*")
        .eq("type", "slalom")
        .order("date", { ascending: true });

      if (error) throw error;
      
      // Transform the raw data to match the Competition type
      return data.map((item: SupabaseCompetition): Competition => ({
        id: item.id,
        name: item.name,
        description: item.description,
        location: item.location,
        date: item.date,
        status: item.status as CompetitionStatus,
        type: 'slalom',
        max_participants: item.max_participants,
        registration_deadline: item.registration_deadline,
        registration_open: item.registration_open,
        created_by: item.created_by,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));
    },
  });

  const handleEdit = (competition: Competition) => {
    setSelectedCompetition(competition);
    setIsFormOpen(true);
  };

  const handleDelete = (competition: Competition) => {
    setSelectedCompetition(competition);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCompetition) return;

    try {
      const { error } = await supabase
        .from("competitions")
        .delete()
        .eq("id", selectedCompetition.id);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ["competitions", "slalom"] });
      toast({ title: "Le slalom a été supprimé avec succès" });
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting competition:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression",
        variant: "destructive",
      });
    }
  };

  return (
    <OrganizerGuard>
      <div className="min-h-screen bg-black text-white p-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <BackButton />
            <CompetitionTypeHeader type="slalom" />
            <Button
              onClick={() => {
                setSelectedCompetition(undefined);
                setIsFormOpen(true);
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Slalom
            </Button>
          </div>
        </div>

        <CompetitionTable
          competitions={competitions || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />

        <CompetitionFormDialog
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          competition={selectedCompetition}
          type="slalom"
        />

        <DeleteCompetitionDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={confirmDelete}
          competitionName={selectedCompetition?.name}
        />
      </div>
    </OrganizerGuard>
  );
};

export default SlalomManager;
