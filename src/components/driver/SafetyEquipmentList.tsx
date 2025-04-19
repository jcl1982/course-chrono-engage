
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EquipmentActions from "./safety-equipment/EquipmentActions";
import DeleteEquipmentDialog from "./safety-equipment/DeleteEquipmentDialog";

interface SafetyEquipment {
  id: string;
  helmet_brand: string;
  helmet_model: string;
  helmet_homologation: string;
  helmet_expiry_date: string;
  suit_brand: string;
  suit_homologation: string;
  suit_expiry_date: string;
  copilot_helmet_brand?: string;
}

const SafetyEquipmentList = ({ userId }: { userId?: string }) => {
  const [equipment, setEquipment] = useState<SafetyEquipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [equipmentToDelete, setEquipmentToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchEquipment();
    }
  }, [userId]);

  const fetchEquipment = async () => {
    try {
      const { data, error } = await supabase
        .from('driver_safety_equipment')
        .select('*')
        .eq('driver_id', userId);

      if (error) throw error;
      setEquipment(data || []);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger vos équipements",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!equipmentToDelete) return;

    try {
      const { error } = await supabase
        .from('driver_safety_equipment')
        .delete()
        .eq('id', equipmentToDelete);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "L'équipement a été supprimé",
      });

      setEquipment(equipment.filter(item => item.id !== equipmentToDelete));
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'équipement",
        variant: "destructive",
      });
    } finally {
      setEquipmentToDelete(null);
    }
  };

  const handleAddNew = (type: "driver" | "copilot") => {
    navigate(type === "driver" ? '/driver/equipment/new' : '/driver/equipment/copilot/new');
  };

  if (loading) {
    return <div className="text-center py-4">Chargement de vos équipements...</div>;
  }

  if (equipment.length === 0) {
    return (
      <div className="text-center space-y-4 py-6">
        <p className="text-gray-400">Vous n'avez pas encore enregistré d'équipement.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-2">
          <Button 
            onClick={() => handleAddNew("driver")} 
            className="bg-[#ea384c] text-white hover:bg-[#c32c3f] w-full sm:w-auto"
            size="sm"
          >
            Équipement pilote
          </Button>
          <Button 
            onClick={() => handleAddNew("copilot")} 
            className="bg-[#ea384c] text-white hover:bg-[#c32c3f] w-full sm:w-auto"
            size="sm"
          >
            Équipement copilote
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {equipment.map((item) => (
        <Card key={item.id} className="hover:bg-gray-50 transition-colors">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">Casque</h3>
                    <Badge variant={item.copilot_helmet_brand ? "secondary" : "default"} className="text-xs">
                      {item.copilot_helmet_brand ? "Copilote" : "Pilote"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Marque: {item.helmet_brand}</p>
                  <p className="text-sm text-gray-600">Modèle: {item.helmet_model}</p>
                  <p className="text-sm text-gray-600">Homologation: {item.helmet_homologation}</p>
                  <p className="text-sm text-gray-600">Expiration: {new Date(item.helmet_expiry_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">Combinaison</h3>
                    <Badge variant={item.copilot_helmet_brand ? "secondary" : "default"} className="text-xs">
                      {item.copilot_helmet_brand ? "Copilote" : "Pilote"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Marque: {item.suit_brand}</p>
                  <p className="text-sm text-gray-600">Homologation: {item.suit_homologation}</p>
                  <p className="text-sm text-gray-600">Expiration: {new Date(item.suit_expiry_date).toLocaleDateString()}</p>
                </div>
              </div>
              <EquipmentActions
                equipmentId={item.id}
                type={item.copilot_helmet_brand ? "copilot" : "driver"}
                onDeleteClick={() => setEquipmentToDelete(item.id)}
              />
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="flex flex-col sm:flex-row justify-center gap-2">
        <Button 
          onClick={() => handleAddNew("driver")} 
          className="bg-[#ea384c] text-white hover:bg-[#c32c3f] w-full sm:w-auto"
          size="sm"
        >
          Équipement pilote
        </Button>
        <Button 
          onClick={() => handleAddNew("copilot")} 
          className="bg-[#ea384c] text-white hover:bg-[#c32c3f] w-full sm:w-auto"
          size="sm"
        >
          Équipement copilote
        </Button>
      </div>

      <DeleteEquipmentDialog
        isOpen={!!equipmentToDelete}
        onClose={() => setEquipmentToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default SafetyEquipmentList;
