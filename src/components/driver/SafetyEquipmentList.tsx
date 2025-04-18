
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface SafetyEquipment {
  id: string;
  helmet_brand: string;
  helmet_model: string;
  helmet_homologation: string;
  helmet_expiry_date: string;
  suit_brand: string;
  suit_homologation: string;
  suit_expiry_date: string;
}

const SafetyEquipmentList = ({ userId }: { userId?: string }) => {
  const [equipment, setEquipment] = useState<SafetyEquipment[]>([]);
  const [loading, setLoading] = useState(true);
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

  const handleAddNew = () => {
    navigate('/driver/equipment/new');
  };

  if (loading) {
    return <div className="text-center py-4">Chargement de vos équipements...</div>;
  }

  if (equipment.length === 0) {
    return (
      <div className="text-center space-y-4 py-6">
        <p className="text-gray-400">Vous n'avez pas encore enregistré d'équipement.</p>
        <Button onClick={handleAddNew}>
          Ajouter un équipement
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {equipment.map((item) => (
        <Card key={item.id} className="hover:bg-gray-50 transition-colors">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Casque</h3>
                <p className="text-sm text-gray-600">Marque: {item.helmet_brand}</p>
                <p className="text-sm text-gray-600">Modèle: {item.helmet_model}</p>
                <p className="text-sm text-gray-600">Homologation: {item.helmet_homologation}</p>
                <p className="text-sm text-gray-600">Expiration: {new Date(item.helmet_expiry_date).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-medium">Combinaison</h3>
                <p className="text-sm text-gray-600">Marque: {item.suit_brand}</p>
                <p className="text-sm text-gray-600">Homologation: {item.suit_homologation}</p>
                <p className="text-sm text-gray-600">Expiration: {new Date(item.suit_expiry_date).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="flex justify-center">
        <Button onClick={handleAddNew} variant="outline">
          Ajouter un nouvel équipement
        </Button>
      </div>
    </div>
  );
};

export default SafetyEquipmentList;
