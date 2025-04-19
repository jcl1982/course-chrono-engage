
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/FormInput";
import { FormSelect } from "@/components/form/FormSelect";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { type Database } from "@/integrations/supabase/types";

type Competition = Database["public"]["Tables"]["competitions"]["Insert"];

interface CompetitionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  competition?: Competition;
  type: "hillclimb" | "slalom";
}

export const CompetitionFormDialog = ({ 
  open, 
  onOpenChange, 
  competition,
  type 
}: CompetitionFormDialogProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<Competition>({
    defaultValues: {
      name: competition?.name || "",
      date: competition?.date || "",
      location: competition?.location || "",
      description: competition?.description || "",
      status: competition?.status || "DRAFT",
      registration_deadline: competition?.registration_deadline || "",
      max_participants: competition?.max_participants || 0,
      registration_open: false,
      type: type,
    },
  });

  const onSubmit = async (data: Competition) => {
    try {
      if (competition?.id) {
        const { error } = await supabase
          .from("competitions")
          .update(data)
          .eq("id", competition.id);

        if (error) throw error;
        toast({ title: "La compétition a été modifiée avec succès" });
      } else {
        const { error } = await supabase
          .from("competitions")
          .insert([{ ...data, type }]);

        if (error) throw error;
        toast({ title: "La compétition a été créée avec succès" });
      }

      await queryClient.invalidateQueries({ queryKey: ["competitions", type] });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error saving competition:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1a1a1a] text-white border-red-900">
        <DialogHeader>
          <DialogTitle className="text-red-500">
            {competition ? "Modifier la compétition" : "Nouvelle compétition"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              name="name"
              label="Nom"
              className="bg-black border-red-900 text-white"
            />
            <FormInput
              name="location"
              label="Lieu"
              className="bg-black border-red-900 text-white"
            />
            <FormInput
              name="date"
              label="Date"
              type="date"
              className="bg-black border-red-900 text-white"
            />
            <FormInput
              name="description"
              label="Description"
              className="bg-black border-red-900 text-white"
            />
            <FormInput
              name="max_participants"
              label="Nombre maximum de participants"
              type="number"
              className="bg-black border-red-900 text-white"
            />
            <FormInput
              name="registration_deadline"
              label="Date limite d'inscription"
              type="date"
              className="bg-black border-red-900 text-white"
            />
            <FormSelect
              name="status"
              label="Statut"
              options={[
                { value: "DRAFT", label: "Brouillon" },
                { value: "PUBLISHED", label: "Publié" },
                { value: "FINISHED", label: "Terminé" },
                { value: "CANCELLED", label: "Annulé" },
              ]}
              className="bg-black border-red-900 text-white"
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-red-500 text-red-500 hover:bg-red-950"
              >
                Annuler
              </Button>
              <Button type="submit" className="bg-red-500 hover:bg-red-600">
                {competition ? "Modifier" : "Créer"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
