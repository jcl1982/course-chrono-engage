
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
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
    </div>
  );
};
