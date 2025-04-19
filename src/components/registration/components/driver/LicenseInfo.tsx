
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const LicenseInfo = () => {
  const form = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="licenseNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro de licence</FormLabel>
            <FormControl>
              <Input placeholder="Votre numéro de licence" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="licenseCategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Catégorie de licence</FormLabel>
            <FormControl>
              <Input placeholder="Votre catégorie de licence" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="licenseExpiry"
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
        name="asa"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ASA</FormLabel>
            <FormControl>
              <Input placeholder="Votre ASA" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bloodType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Groupe sanguin</FormLabel>
            <FormControl>
              <Input placeholder="Votre groupe sanguin" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
