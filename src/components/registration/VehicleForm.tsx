
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// Update schema to match all required database fields
const vehicleSchema = z.object({
  brand: z.string().min(2, "La marque doit contenir au moins 2 caractères"),
  model: z.string().min(2, "Le modèle doit contenir au moins 2 caractères"),
  group: z.string().min(1, "Veuillez sélectionner un groupe"),
  class: z.string().min(1, "Veuillez sélectionner une classe"),
  year: z.string().min(4, "Veuillez entrer l'année du véhicule"),
  category: z.string().default("default"), // Default value to satisfy schema
  technicalPassport: z.string().min(2, "Numéro de passeport technique requis"),
  homologationNumber: z.string().default("N/A"),
  engineCapacity: z.string().min(1, "Cylindrée requise"),
  engineNumber: z.string().default("N/A"),
  chassisNumber: z.string().default("N/A"),
  registrationNumber: z.string().default("N/A"),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marque</FormLabel>
              <FormControl>
                <Input placeholder="Marque du véhicule" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modèle</FormLabel>
              <FormControl>
                <Input placeholder="Modèle du véhicule" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Année</FormLabel>
              <FormControl>
                <Input placeholder="Année du véhicule" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Groupe</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le groupe" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="A">Groupe A</SelectItem>
                  <SelectItem value="N">Groupe N</SelectItem>
                  <SelectItem value="R">Groupe R</SelectItem>
                  <SelectItem value="F2000">F2000</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="class"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classe</FormLabel>
              <FormControl>
                <Input placeholder="Classe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="technicalPassport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passeport Technique</FormLabel>
              <FormControl>
                <Input placeholder="Numéro de passeport technique" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="engineCapacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cylindrée</FormLabel>
              <FormControl>
                <Input placeholder="Cylindrée (cm³)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="md:col-span-2">
          <Button type="submit" className="w-full">Enregistrer le véhicule</Button>
        </div>
      </form>
    </Form>
  );
};

export default VehicleForm;
