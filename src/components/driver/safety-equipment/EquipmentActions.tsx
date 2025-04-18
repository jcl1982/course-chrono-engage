
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EquipmentActionsProps {
  equipmentId: string;
  onDeleteClick: () => void;
}

const EquipmentActions = ({ equipmentId, onDeleteClick }: EquipmentActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate(`/driver/equipment/${equipmentId}`)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onDeleteClick}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default EquipmentActions;
