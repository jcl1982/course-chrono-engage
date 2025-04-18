
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BasicVehicleInfo } from "./vehicle-form/BasicVehicleInfo";
import { TechnicalDetails } from "./vehicle-form/TechnicalDetails";
import { vehicleSchema, type VehicleFormData } from "./vehicle-form/schemas/vehicleSchema";
import { useEffect } from "react";

interface VehicleEditFormProps {
  vehicleId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const VehicleEditForm = ({ vehicleId, onSuccess, onCancel }: VehicleEditFormProps) => {
  const form = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
  });

  const { toast } = useToast();

  useEffect(() => {
    const fetchVehicle = async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", vehicleId)
        .single();

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les informations du véhicule",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        form.reset({
          brand: data.make,
          model: data.model,
          group: data.group_class,
          class: data.class,
          year: data.year,
          category: data.category,
          technicalPassport: data.technical_passport_number,
          homologationNumber: data.homologation_number,
          engineCapacity: data.engine_capacity,
          engineNumber: data.engine_number,
          chassisNumber: data.chassis_number,
          registrationNumber: data.registration_number,
        });
      }
    };

    fetchVehicle();
  }, [vehicleId, form, toast]);

  const onSubmit = async (data: VehicleFormData) => {
    try {
      const { error } = await supabase
        .from("vehicles")
        .update({
          make: data.brand,
          model: data.model,
          group_class: data.group,
          class: data.class,
          year: data.year,
          category: data.category,
          technical_passport_number: data.technicalPassport,
          homologation_number: data.homologationNumber,
          engine_capacity: data.engineCapacity,
          engine_number: data.engineNumber,
          chassis_number: data.chassisNumber,
          registration_number: data.registrationNumber,
        })
        .eq("id", vehicleId);

      if (error) {
        console.error("Error updating vehicle:", error);
        toast({
          title: "Erreur",
          description: "Erreur lors de la mise à jour du véhicule",
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Succès",
        description: "Véhicule mis à jour avec succès",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BasicVehicleInfo />
        <TechnicalDetails />
        <div className="flex justify-between gap-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} className="w-full">
              Annuler
            </Button>
          )}
          <Button type="submit" className="w-full">
            Mettre à jour
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VehicleEditForm;
