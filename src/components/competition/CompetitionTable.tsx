
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { CompetitionStatus } from "@/types/competition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

interface Competition {
  id: string;
  name: string;
  date: string;
  location: string;
  status: CompetitionStatus;
}

interface CompetitionTableProps {
  competitions: Competition[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const CompetitionTable = ({ competitions, onEdit, onDelete }: CompetitionTableProps) => {
  const getStatusColor = (status: CompetitionStatus) => {
    switch (status) {
      case "DRAFT":
        return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30";
      case "PUBLISHED":
        return "bg-green-500/20 text-green-500 hover:bg-green-500/30";
      case "FINISHED":
        return "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30";
      case "CANCELLED":
        return "bg-red-500/20 text-red-500 hover:bg-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-500 hover:bg-gray-500/30";
    }
  };

  return (
    <div className="rounded-md border border-red-900">
      <Table>
        <TableHeader>
          <TableRow className="border-red-900">
            <TableHead>Nom</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Lieu</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {competitions.map((competition) => (
            <TableRow key={competition.id} className="border-red-900">
              <TableCell className="font-medium">{competition.name}</TableCell>
              <TableCell>{formatDate(new Date(competition.date))}</TableCell>
              <TableCell>{competition.location}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(competition.status)}>
                  {competition.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onEdit(competition.id)}
                  className="hover:bg-red-950"
                >
                  <PencilIcon className="h-4 w-4 text-red-500" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onDelete(competition.id)}
                  className="hover:bg-red-950"
                >
                  <TrashIcon className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {competitions.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                Aucune compétition trouvée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
