
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/FormInput";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { competitionFormSchema, type CompetitionFormData } from "./schemas/competitionSchema";
import { useQueryClient } from "@tanstack/react-query";
import { type Database } from "@/integrations/supabase/types";

type Competition = Database["public"]["Tables"]["competitions"]["Row"];

interface CompetitionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  competition?: Competition;
  type: 'hillclimb' | 'slalom';
}

export const CompetitionFormDialog = ({ 
  open, 
  onOpenChange, 
  competition,
  type 
}: CompetitionFormDialogProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<CompetitionFormData>({
    resolver: zodResolver(competitionFormSchema),
    defaultValues: competition ? {
      name: competition.name,
      description: competition.description || "",
      location: competition.location,
      date: competition.date,
      maxParticipants: competition.max_participants?.toString() || "",
      registrationDeadline: competition.registration_deadline || undefined,
    } : {
      name: "",
      description: "",
      location: "",
      date: "",
      maxParticipants: "",
      registrationDeadline: undefined,
    },
  });

  const onSubmit = async (data: CompetitionFormData) => {
    try {
      const { error } = competition 
        ? await supabase
            .from('competitions')
            .update({
              name: data.name,
              description: data.description,
              location: data.location,
              date: data.date,
              max_participants: data.maxParticipants ? parseInt(data.maxParticipants) : null,
              registration_deadline: data.registrationDeadline,
            })
            .eq('id', competition.id)
        : await supabase
            .from('competitions')
            .insert({
              name: data.name,
              description: data.description,
              location: data.location,
              date: data.date,
              max_participants: data.maxParticipants ? parseInt(data.maxParticipants) : null,
              registration_deadline: data.registrationDeadline,
              type,
              status: 'DRAFT',
              created_by: (await supabase.auth.getUser()).data.user?.id,
            });

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ['competitions', type] });
      
      toast({ 
        title: competition 
          ? `${type === 'hillclimb' ? 'Course de côte' : 'Slalom'} modifié` 
          : `${type === 'hillclimb' ? 'Course de côte' : 'Slalom'} créé`,
        description: competition
          ? "Les modifications ont été enregistrées"
          : "Le nouvel événement a été créé avec succès"
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving competition:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {competition ? "Modifier" : "Ajouter"} {type === 'hillclimb' ? 'une course de côte' : 'un slalom'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              name="name"
              label="Nom"
              placeholder="Nom de l'événement"
            />
            <FormInput
              name="description"
              label="Description"
              placeholder="Description de l'événement"
            />
            <FormInput
              name="location"
              label="Lieu"
              placeholder="Lieu de l'événement"
            />
            <FormInput
              name="date"
              label="Date"
              type="date"
            />
            <FormInput
              name="maxParticipants"
              label="Nombre maximum de participants"
              type="number"
              placeholder="Laissez vide si pas de limite"
            />
            <FormInput
              name="registrationDeadline"
              label="Date limite d'inscription"
              type="date"
            />
            <Button type="submit" className="w-full">
              {competition ? "Enregistrer les modifications" : "Créer l'événement"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
