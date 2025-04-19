
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { EventType } from "@/pages/Registration/RegistrationForm";

interface SavedEquipment {
  id: string;
  helmet_brand: string;
  helmet_model: string;
  suit_brand: string;
  created_at: string;
}

interface SavedEquipmentSelectorProps {
  onSelectEquipment: (equipment: SavedEquipment | null) => void;
  onNewEquipment: () => void;
  equipmentType?: "driver" | "copilot";
  eventType?: EventType;
}

export const SavedEquipmentSelector = ({
  onSelectEquipment,
  onNewEquipment,
  equipmentType = "driver",
  eventType = "rally"
}: SavedEquipmentSelectorProps) => {
  const [savedEquipment, setSavedEquipment] = useState<SavedEquipment[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<"driver" | "copilot">("driver");
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

  const handleSelection = (value: string) => {
    setSelectedId(value);
    const selected = savedEquipment.find((eq) => eq.id === value) || null;
    onSelectEquipment(selected);
  };

  const handleNewEquipment = () => {
    const path = selectedRole === "driver" ? "/driver/equipment/new" : "/driver/equipment/copilot/new";
    const returnUrl = window.location.pathname;
    navigate(`${path}?returnUrl=${encodeURIComponent(returnUrl)}`);
  };

  if (savedEquipment.length === 0) {
    return (
      <div className="space-y-6">
        {eventType === "rally" && (
          <div className="flex justify-center mb-4">
            <Select value={selectedRole} onValueChange={(value: "driver" | "copilot") => setSelectedRole(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sélectionner le rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="driver">Équipement Pilote</SelectItem>
                <SelectItem value="copilot">Équipement Copilote</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="text-center">
          <p className="text-gray-500 mb-4">Aucun équipement enregistré</p>
          <Button onClick={handleNewEquipment}>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un nouvel équipement
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {eventType === "rally" && (
        <div className="flex justify-center mb-4">
          <Select value={selectedRole} onValueChange={(value: "driver" | "copilot") => setSelectedRole(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sélectionner le rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="driver">Équipement Pilote</SelectItem>
              <SelectItem value="copilot">Équipement Copilote</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

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
