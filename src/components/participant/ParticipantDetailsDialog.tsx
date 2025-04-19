
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PrintRegistrationButton from "../registration/PrintRegistrationButton";

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

  const { data: participant, isLoading: isLoadingParticipant } = useQuery({
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

  const { data: equipmentData, isLoading: isLoadingEquipment } = useQuery({
    queryKey: ["equipment", participantId],
    queryFn: async () => {
      if (!participantId) return null;
      
      const { data, error } = await supabase
        .from("driver_safety_equipment")
        .select(`*`)
        .eq("driver_id", participantId)
        .maybeSingle();

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les données d'équipement",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
    enabled: !!participantId,
  });

  const isLoading = isLoadingParticipant || isLoadingEquipment;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Détails du Participant
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Informations d'Engagement</h3>
            <PrintRegistrationButton 
              registrationData={participant} 
              type="registration" 
            />
          </div>
          {isLoadingParticipant ? (
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

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Équipements de Sécurité</h3>
            <PrintRegistrationButton 
              registrationData={equipmentData} 
              type="equipment" 
            />
          </div>
          
          {isLoadingEquipment ? (
            <div className="text-gray-400">Chargement des équipements...</div>
          ) : equipmentData ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-red-500 font-medium mb-1">Équipement Pilote</h3>
                  <p className="text-gray-300">Casque: {equipmentData.helmet_brand || "Non renseigné"}</p>
                  <p className="text-gray-300">Combinaison: {equipmentData.suit_brand || "Non renseigné"}</p>
                </div>
                <div>
                  <h3 className="text-red-500 font-medium mb-1">Équipement Copilote</h3>
                  <p className="text-gray-300">Casque: {equipmentData.copilot_helmet_brand || "Non renseigné"}</p>
                  <p className="text-gray-300">Combinaison: {equipmentData.copilot_suit_brand || "Non renseigné"}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-400">Aucun équipement enregistré</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
