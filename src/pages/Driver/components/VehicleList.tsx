
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
}

const VehicleList = ({ userId }: { userId?: string }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (userId) {
      fetchVehicles();
    }
  }, [userId]);

  const fetchVehicles = async () => {
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

    setVehicles(data);
  };

  if (!vehicles.length) {
    return <p className="text-gray-400">Aucun véhicule enregistré</p>;
  }

  return (
    <div className="space-y-2">
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className="p-3 rounded-lg bg-[#2a2a2a] hover:bg-[#333333] transition-colors"
        >
          <h3 className="font-medium text-red-400">
            {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-sm text-gray-400">Année: {vehicle.year}</p>
        </div>
      ))}
    </div>
  );
};

export default VehicleList;
