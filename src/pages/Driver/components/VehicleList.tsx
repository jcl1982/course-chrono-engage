
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import VehicleEditForm from "@/components/registration/VehicleEditForm";
import { Pencil } from "lucide-react";

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
}

const VehicleList = ({ userId }: { userId?: string }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [editingVehicle, setEditingVehicle] = useState<string | null>(null);
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
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-red-400">
                {vehicle.make} {vehicle.model}
              </h3>
              <p className="text-sm text-gray-400">Année: {vehicle.year}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditingVehicle(vehicle.id)}
              className="text-gray-400 hover:text-white"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <Dialog open={!!editingVehicle} onOpenChange={() => setEditingVehicle(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le véhicule</DialogTitle>
          </DialogHeader>
          {editingVehicle && (
            <VehicleEditForm
              vehicleId={editingVehicle}
              onSuccess={() => {
                setEditingVehicle(null);
                fetchVehicles();
              }}
              onCancel={() => setEditingVehicle(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehicleList;
