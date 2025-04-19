
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const LicenseInfo = () => {
  const form = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="coPilote.licenseNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro de licence</FormLabel>
            <FormControl>
              <Input placeholder="Numéro de licence du copilote" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="coPilote.licenseCategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Catégorie de licence</FormLabel>
            <FormControl>
              <Input placeholder="Catégorie de licence du copilote" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="coPilote.licenseExpiry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date d'expiration de la licence</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="coPilote.bloodType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Groupe sanguin</FormLabel>
            <FormControl>
              <Input placeholder="Groupe sanguin du copilote" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
