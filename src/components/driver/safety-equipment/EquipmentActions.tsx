
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EquipmentActionsProps {
  equipmentId: string;
  type: "driver" | "copilot";
  onDeleteClick: () => void;
}

const EquipmentActions = ({ equipmentId, type, onDeleteClick }: EquipmentActionsProps) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    const basePath = type === "driver" ? "/driver/equipment/" : "/driver/equipment/copilot/";
    navigate(`${basePath}${equipmentId}`);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handleEditClick}
        title="Modifier"
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onDeleteClick}
        title="Supprimer"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default EquipmentActions;
