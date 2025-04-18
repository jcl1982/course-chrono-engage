
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  technical_passport_number: string;
  engine_capacity: string;
  group_class: string;
  class: string;
}

interface VehicleSelectorProps {
  userId: string;
  onSelectVehicle: (vehicleId: string) => void;
  selectedVehicle: string | null;
}

const VehicleSelector = ({ userId, onSelectVehicle, selectedVehicle }: VehicleSelectorProps) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
  }, [userId]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('owner_id', userId);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger vos véhicules",
          variant: "destructive",
        });
        return;
      }

      setVehicles(data || []);
      
      // Auto-select the first vehicle if one exists and none is selected
      if (data && data.length > 0 && !selectedVehicle) {
        onSelectVehicle(data[0].id);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewVehicle = () => {
    navigate('/driver/vehicle/new');
  };

  if (loading) {
    return <div className="text-center py-4">Chargement de vos véhicules...</div>;
  }

  if (vehicles.length === 0) {
    return (
      <div className="text-center space-y-4 py-6">
        <p className="text-gray-400">Vous n'avez pas encore enregistré de véhicule.</p>
        <Button onClick={handleAddNewVehicle}>
          Ajouter un véhicule
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <RadioGroup 
        value={selectedVehicle || ''} 
        onValueChange={onSelectVehicle}
        className="space-y-3"
      >
        {vehicles.map((vehicle) => (
          <div 
            key={vehicle.id} 
            className={`p-4 rounded-lg border ${
              selectedVehicle === vehicle.id 
                ? 'border-red-500 bg-red-900/10' 
                : 'border-gray-700 bg-gray-800/50'
            } hover:bg-gray-800 transition-colors`}
          >
            <div className="flex items-start space-x-3">
              <RadioGroupItem value={vehicle.id} id={`vehicle-${vehicle.id}`} className="mt-1" />
              <div className="flex-1">
                <Label 
                  htmlFor={`vehicle-${vehicle.id}`} 
                  className="text-lg font-medium flex justify-between"
                >
                  <span>{vehicle.make} {vehicle.model} ({vehicle.year})</span>
                </Label>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div>
                    <span className="text-gray-400">Passeport technique:</span>
                    <span className="ml-2">{vehicle.technical_passport_number}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Cylindrée:</span>
                    <span className="ml-2">{vehicle.engine_capacity} cm³</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Groupe:</span>
                    <span className="ml-2">{vehicle.group_class}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Classe:</span>
                    <span className="ml-2">{vehicle.class}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>
      
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={handleAddNewVehicle}
          className="mt-2"
        >
          Ajouter un nouveau véhicule
        </Button>
      </div>
    </div>
  );
};

export default VehicleSelector;
