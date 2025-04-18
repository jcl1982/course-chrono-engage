
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { type Database } from "@/integrations/supabase/types";
import { useQueryClient } from "@tanstack/react-query";

type Rally = Database["public"]["Tables"]["rallies"]["Row"];

interface RallyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rally?: Rally;
}

export const RallyFormDialog = ({ open, onOpenChange, rally }: RallyFormDialogProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!rally;

  const [formData, setFormData] = useState({
    name: rally?.name ?? "",
    location: rally?.location ?? "",
    description: rally?.description ?? "",
    start_date: rally?.start_date ?? "",
    end_date: rally?.end_date ?? "",
    registration_deadline: rally?.registration_deadline ?? "",
    registration_open: rally?.registration_open ?? false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const { error } = await supabase
          .from("rallies")
          .update(formData)
          .eq("id", rally.id);
        
        if (error) throw error;
        toast({ title: "Rallye modifié avec succès" });
      } else {
        const { error } = await supabase
          .from("rallies")
          .insert([formData]);
        
        if (error) throw error;
        toast({ title: "Rallye créé avec succès" });
      }
      
      queryClient.invalidateQueries({ queryKey: ["rallies"] });
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving rally:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement du rallye",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1a1a1a] text-white border-red-900">
        <DialogHeader>
          <DialogTitle className="text-red-500">
            {isEditing ? "Modifier le rallye" : "Nouveau rallye"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-black border-red-900 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="location">Localisation</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="bg-black border-red-900 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="start_date">Date de début</Label>
            <Input
              id="start_date"
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              className="bg-black border-red-900 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="end_date">Date de fin</Label>
            <Input
              id="end_date"
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              className="bg-black border-red-900 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="registration_deadline">Date limite d'inscription</Label>
            <Input
              id="registration_deadline"
              type="date"
              value={formData.registration_deadline}
              onChange={(e) => setFormData({ ...formData, registration_deadline: e.target.value })}
              className="bg-black border-red-900 text-white"
            />
          </div>
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
              {isEditing ? "Modifier" : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
