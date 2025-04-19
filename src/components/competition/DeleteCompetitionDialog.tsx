
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteCompetitionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  competitionName?: string;
}

export const DeleteCompetitionDialog = ({
  open,
  onOpenChange,
  onConfirm,
  competitionName,
}: DeleteCompetitionDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#1a1a1a] border-red-900 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            Confirmer la suppression
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            Êtes-vous sûr de vouloir supprimer {competitionName || "cette compétition"} ?
            Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent border-red-900 text-red-500 hover:bg-red-950">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
