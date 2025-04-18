import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";

const equipmentSchema = z.object({
  driverHelmet: z.object({
    brand: z.string().min(1, "La marque du casque est requise"),
    homologation: z.string().min(1, "Le numéro d'homologation est requis"),
  }),
  driverSuit: z.object({
    brand: z.string().min(1, "La marque de la combinaison est requise"),
    homologation: z.string().min(1, "Le numéro d'homologation est requis"),
  }),
  arceau: z.boolean(),
  sieges: z.object({
    brand: z.string().min(1, "La marque des sièges est requise"),
    homologation: z.string().min(1, "Le numéro d'homologation est requis"),
  }),
  harnais: z.object({
    brand: z.string().min(1, "La marque du harnais est requise"),
    homologation: z.string().min(1, "Le numéro d'homologation est requis"),
  }),
});

type EquipmentFormData = z.infer<typeof equipmentSchema>;

const EquipmentForm = () => {
  const form = useForm<EquipmentFormData>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      driverHelmet: { brand: "", homologation: "" },
      driverSuit: { brand: "", homologation: "" },
      arceau: false,
      sieges: { brand: "", homologation: "" },
      harnais: { brand: "", homologation: "" },
    },
  });

  const onSubmit = async (data: EquipmentFormData) => {
    // We'll implement this when we have a registration ID to associate with
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Équipements Pilote</h4>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="driverHelmet.brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marque du casque</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="driverHelmet.homologation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro d'homologation casque</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="driverSuit.brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marque de la combinaison</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="driverSuit.homologation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro d'homologation combinaison</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Équipements Véhicule</h4>
            
            <FormField
              control={form.control}
              name="arceau"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Arceau de sécurité</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="sieges.brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marque des sièges</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sieges.homologation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro d'homologation sièges</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="harnais.brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marque du harnais</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="harnais.homologation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro d'homologation harnais</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EquipmentForm;
