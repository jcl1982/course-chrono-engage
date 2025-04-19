
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import VehicleEditForm from "@/components/registration/VehicleEditForm";
import { Pencil, Trash2 } from "lucide-react";

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
}

const VehicleList = ({ userId }: { userId?: string }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [editingVehicle, setEditingVehicle] = useState<string | null>(null);
  const [deletingVehicle, setDeletingVehicle] = useState<Vehicle | null>(null);
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

  const handleDelete = async () => {
    if (!deletingVehicle) return;

    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', deletingVehicle.id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le véhicule",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Succès",
      description: "Véhicule supprimé avec succès",
    });

    setDeletingVehicle(null);
    fetchVehicles();
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
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditingVehicle(vehicle.id)}
                className="text-gray-400 hover:text-white"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDeletingVehicle(vehicle)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
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

      <AlertDialog open={!!deletingVehicle} onOpenChange={() => setDeletingVehicle(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce véhicule ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le véhicule {deletingVehicle?.make} {deletingVehicle?.model} sera définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default VehicleList;
