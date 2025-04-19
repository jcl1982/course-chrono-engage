
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { OrganizerGuard } from "@/components/auth/OrganizerGuard";
import { BackButton } from "@/components/navigation/BackButton";
import { CompetitionTable } from "@/components/competition/CompetitionTable";
import { DeleteCompetitionDialog } from "@/components/competition/DeleteCompetitionDialog";
import { useToast } from "@/hooks/use-toast";

const SlalomManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null);
  const { toast } = useToast();

  // Exemple de données pour la démo
  const competitions = [
    {
      id: "1",
      name: "Slalom de Baillif",
      date: "2024-05-10",
      location: "Baillif",
      status: "PUBLISHED" as const,
    },
    {
      id: "2",
      name: "Slalom de Deshaies",
      date: "2024-08-05",
      location: "Deshaies",
      status: "DRAFT" as const,
    },
  ];

  const handleEdit = (id: string) => {
    // À implémenter avec le formulaire d'édition
    toast({
      title: "Modification",
      description: "Fonctionnalité en cours de développement",
    });
  };

  const handleDelete = (id: string) => {
    setSelectedCompetition(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // À implémenter avec la suppression en base de données
    toast({
      title: "Suppression",
      description: "Le slalom a été supprimé avec succès",
    });
    setDeleteDialogOpen(false);
  };

  return (
    <OrganizerGuard>
      <div className="min-h-screen bg-black text-white p-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <BackButton />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-red-500">Gestion des Slaloms</h1>
              <p className="text-gray-400">Gérez vos épreuves de slalom et les inscriptions</p>
            </div>
            <Button 
              onClick={() => setIsFormOpen(true)}
              className="bg-red-500 hover:bg-red-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Slalom
            </Button>
          </div>
        </div>

        <CompetitionTable 
          competitions={competitions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <DeleteCompetitionDialog 
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={confirmDelete}
          competitionName={competitions.find(c => c.id === selectedCompetition)?.name}
        />
      </div>
    </OrganizerGuard>
  );
};

export default SlalomManager;
