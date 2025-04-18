
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const BasicVehicleInfo = () => {
  const form = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="brand"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Marque</FormLabel>
            <FormDescription>
              Marque du constructeur du véhicule
            </FormDescription>
            <FormControl>
              <Input placeholder="Ex: Renault, Peugeot..." {...field} />
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
            <FormDescription>
              Modèle spécifique du véhicule
            </FormDescription>
            <FormControl>
              <Input placeholder="Ex: Clio, 208..." {...field} />
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
            <FormDescription>
              Année de fabrication du véhicule (YYYY)
            </FormDescription>
            <FormControl>
              <Input placeholder="Ex: 2024" {...field} />
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
            <FormDescription>
              Groupe de classification FIA du véhicule
            </FormDescription>
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
    </div>
  );
};
