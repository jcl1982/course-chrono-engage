
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const TechnicalDetails = () => {
  const form = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="technicalPassport"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Passeport Technique</FormLabel>
            <FormDescription>
              Numéro du passeport technique FFSA
            </FormDescription>
            <FormControl>
              <Input placeholder="Ex: PT123456" {...field} />
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
            <FormDescription>
              Cylindrée du moteur en cm³
            </FormDescription>
            <FormControl>
              <Input placeholder="Ex: 1600" {...field} />
            </FormControl>
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
            <FormDescription>
              Classe de cylindrée du véhicule
            </FormDescription>
            <FormControl>
              <Input placeholder="Ex: RC4" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
