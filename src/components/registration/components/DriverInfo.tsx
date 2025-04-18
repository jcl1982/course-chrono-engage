
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { UserRound } from "lucide-react";
import type { PersonalInfoFormData } from "../schemas/personalInfoSchema";

export const DriverInfo = () => {
  const form = useFormContext<PersonalInfoFormData>();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <UserRound className="h-5 w-5" />
        <h4 className="font-medium">Informations Pilote</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="Prénom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="licenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de Licence</FormLabel>
              <FormControl>
                <Input placeholder="Numéro de licence FFSA" {...field} />
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
                <Input placeholder="ASA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
