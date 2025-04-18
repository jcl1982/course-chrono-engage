import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface SavedEquipment {
  id: string;
  helmet_brand: string;
  helmet_model: string;
  suit_brand: string;
  created_at: string;
}

export const SavedEquipmentSelector = ({
  onSelectEquipment,
  onNewEquipment,
  equipmentType = "driver"
}: {
  onSelectEquipment: (equipment: SavedEquipment | null) => void;
  onNewEquipment: () => void;
  equipmentType?: "driver" | "copilot";
}) => {
  const [savedEquipment, setSavedEquipment] = useState<SavedEquipment[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedEquipment = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from("driver_safety_equipment")
        .select("*")
        .eq("driver_id", user.user.id);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger vos équipements enregistrés",
          variant: "destructive",
        });
        return;
      }

      setSavedEquipment(data || []);
    };

    fetchSavedEquipment();
  }, [toast]);

  const handleNewEquipment = () => {
    const path = equipmentType === "driver" ? "/driver/equipment/new" : "/driver/equipment/copilot/new";
    const returnUrl = window.location.pathname;
    navigate(`${path}?returnUrl=${encodeURIComponent(returnUrl)}`);
  };

  if (savedEquipment.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 mb-4">Aucun équipement enregistré</p>
        <Button onClick={handleNewEquipment}>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un nouvel équipement
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <RadioGroup value={selectedId} onValueChange={handleSelection}>
        {savedEquipment.map((equipment) => (
          <div
            key={equipment.id}
            className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50"
          >
            <RadioGroupItem value={equipment.id} id={equipment.id} />
            <Label htmlFor={equipment.id} className="flex-grow cursor-pointer">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Casque</p>
                  <p className="text-sm text-gray-600">
                    {equipment.helmet_brand} - {equipment.helmet_model}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Combinaison</p>
                  <p className="text-sm text-gray-600">{equipment.suit_brand}</p>
                </div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="flex justify-center">
        <Button variant="outline" onClick={handleNewEquipment}>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un nouvel équipement
        </Button>
      </div>
    </div>
  );
};
