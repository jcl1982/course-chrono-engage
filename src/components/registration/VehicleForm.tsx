
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { BasicVehicleInfo } from "./vehicle-form/BasicVehicleInfo";
import { TechnicalDetails } from "./vehicle-form/TechnicalDetails";
import { vehicleSchema, type VehicleFormData } from "./vehicle-form/schema";

const VehicleForm = () => {
  const form = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      brand: "",
      model: "",
      group: "",
      class: "",
      year: "",
      category: "default",
      technicalPassport: "",
      homologationNumber: "N/A",
      engineCapacity: "",
      engineNumber: "N/A",
      chassisNumber: "N/A",
      registrationNumber: "N/A",
    },
  });

  const onSubmit = async (data: VehicleFormData) => {
    try {
      const userId = (await supabase.auth.getUser()).data.user?.id;
      if (!userId) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour enregistrer un véhicule",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("vehicles").insert({
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
        owner_id: userId,
      });

      if (error) {
        console.error("Error creating vehicle:", error);
        toast({
          title: "Erreur",
          description: "Erreur lors de l'enregistrement du véhicule",
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Succès",
        description: "Véhicule enregistré avec succès",
      });
    } catch (error) {
      console.error("Error creating vehicle:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BasicVehicleInfo />
        <TechnicalDetails />
        <div className="md:col-span-2">
          <Button type="submit" className="w-full">Enregistrer le véhicule</Button>
        </div>
      </form>
    </Form>
  );
};

export default VehicleForm;
