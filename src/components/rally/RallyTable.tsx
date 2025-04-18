
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, MapPin, Users, Pencil, Trash2 } from "lucide-react";
import { type Database } from "@/integrations/supabase/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { RallyFormDialog } from "./RallyFormDialog";
import { DeleteRallyDialog } from "./DeleteRallyDialog";
import { useToast } from "@/hooks/use-toast";

type Rally = Database["public"]["Tables"]["rallies"]["Row"];

export const RallyTable = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedRally, setSelectedRally] = useState<Rally | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data: rallies, isLoading } = useQuery({
    queryKey: ["rallies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rallies")
        .select("*")
        .order("start_date", { ascending: true });

      if (error) throw error;
      return data as Rally[];
    },
  });

  const handleDelete = async () => {
    if (!selectedRally) return;

    try {
      const { error } = await supabase
        .from("rallies")
        .delete()
        .eq("id", selectedRally.id);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ["rallies"] });
      toast({ title: "Rallye supprimé avec succès" });
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting rally:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du rallye",
        variant: "destructive",
      });
    }
  };

  const handleRegistrationToggle = async (rally: Rally) => {
    try {
      const { error } = await supabase
        .from("rallies")
        .update({ registration_open: !rally.registration_open })
        .eq("id", rally.id);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ["rallies"] });
      toast({ 
        title: "Statut des inscriptions mis à jour",
        description: `Les inscriptions sont maintenant ${!rally.registration_open ? 'ouvertes' : 'fermées'} pour ${rally.name}` 
      });
    } catch (error) {
      console.error("Error updating rally registration status:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du statut des inscriptions",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <p className="text-gray-400">Chargement des rallyes...</p>;
  }

  return (
    <>
      <div className="rounded-md border border-red-900 bg-[#1a1a1a]">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-red-950/50">
              <TableHead className="text-red-500">Nom</TableHead>
              <TableHead className="text-red-500">Localisation</TableHead>
              <TableHead className="text-red-500">Date</TableHead>
              <TableHead className="text-red-500">Status</TableHead>
              <TableHead className="text-red-500">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rallies?.map((rally) => (
              <TableRow key={rally.id} className="hover:bg-red-950/50">
                <TableCell className="font-medium text-white">{rally.name}</TableCell>
                <TableCell className="text-gray-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    {rally.location}
                  </div>
                </TableCell>
                <TableCell className="text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-red-500" />
                    {formatDistance(new Date(rally.start_date), new Date(), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Users className="h-4 w-4 text-red-500" />
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={rally.registration_open}
                        onCheckedChange={() => handleRegistrationToggle(rally)}
                        className="data-[state=checked]:bg-red-500"
                      />
                      <span className={`text-sm ${
                        rally.registration_open 
                          ? "text-green-500" 
                          : "text-red-500"
                      }`}>
                        {rally.registration_open ? "Inscriptions ouvertes" : "Inscriptions fermées"}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedRally(rally);
                        setIsFormOpen(true);
                      }}
                      className="h-8 w-8 text-red-500 hover:bg-red-950/50"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Modifier le rallye</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedRally(rally);
                        setIsDeleteOpen(true);
                      }}
                      className="h-8 w-8 text-red-500 hover:bg-red-950/50"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Supprimer le rallye</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <RallyFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        rally={selectedRally}
      />

      <DeleteRallyDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
      />
    </>
  );
};
