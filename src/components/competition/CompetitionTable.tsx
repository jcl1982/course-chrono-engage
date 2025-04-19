
import { Competition } from "@/types/competition";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface CompetitionTableProps {
  competitions: Competition[];
  onEdit: (competition: Competition) => void;
  onDelete: (competition: Competition) => void;
  onToggleRegistration: (competition: Competition, open: boolean) => void;
  isLoading?: boolean;
}

export const CompetitionTable = ({
  competitions,
  onEdit,
  onDelete,
  onToggleRegistration,
  isLoading,
}: CompetitionTableProps) => {
  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!competitions.length) {
    return <div className="text-center text-gray-400">Aucun événement trouvé</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Lieu</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Inscriptions</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {competitions.map((competition) => (
          <TableRow key={competition.id}>
            <TableCell>{competition.name}</TableCell>
            <TableCell>{new Date(competition.date).toLocaleDateString('fr-FR')}</TableCell>
            <TableCell>{competition.location}</TableCell>
            <TableCell>
              <span className="capitalize">{competition.status.toLowerCase()}</span>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Switch
                  checked={competition.registration_open}
                  onCheckedChange={(checked) => onToggleRegistration(competition, checked)}
                  disabled={competition.status === 'FINISHED' || competition.status === 'CANCELLED'}
                />
                <span className="text-sm text-gray-500">
                  {competition.registration_open ? 'Ouvertes' : 'Fermées'}
                </span>
              </div>
            </TableCell>
            <TableCell className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onEdit(competition)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDelete(competition)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
