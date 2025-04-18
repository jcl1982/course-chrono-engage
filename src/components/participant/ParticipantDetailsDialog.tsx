
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ParticipantDetailsDialogProps {
  participantId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ParticipantDetailsDialog = ({
  participantId,
  open,
  onOpenChange,
}: ParticipantDetailsDialogProps) => {
  const { toast } = useToast();

  const { data: participant, isLoading } = useQuery({
    queryKey: ["participant", participantId],
    queryFn: async () => {
      if (!participantId) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select(`
          id,
          first_name,
          last_name,
          email,
          phone,
          blood_type,
          license_number,
          license_category
        `)
        .eq("id", participantId)
        .single();

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails du participant",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
    enabled: !!participantId,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1a1a1a] text-white border border-red-900">
        <DialogHeader>
          <DialogTitle className="text-red-500 text-xl">
            {isLoading ? "Chargement..." : `${participant?.first_name} ${participant?.last_name}`}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="text-gray-400">Chargement des détails...</div>
        ) : participant ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-red-500 font-medium mb-1">Contact</h3>
                <p className="text-gray-300">Email: {participant.email}</p>
                <p className="text-gray-300">Téléphone: {participant.phone || "Non renseigné"}</p>
              </div>
              <div>
                <h3 className="text-red-500 font-medium mb-1">Informations médicales</h3>
                <p className="text-gray-300">Groupe sanguin: {participant.blood_type || "Non renseigné"}</p>
              </div>
            </div>
            <div>
              <h3 className="text-red-500 font-medium mb-1">Licence</h3>
              <p className="text-gray-300">Numéro: {participant.license_number || "Non renseigné"}</p>
              <p className="text-gray-300">Catégorie: {participant.license_category || "Non renseigné"}</p>
            </div>
          </div>
        ) : (
          <div className="text-gray-400">Aucune donnée disponible</div>
        )}
      </DialogContent>
    </Dialog>
  );
};
