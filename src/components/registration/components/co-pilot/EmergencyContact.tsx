
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const EmergencyContact = () => {
  const form = useFormContext();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Contact d'urgence du copilote</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="coPilote.emergencyContact.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du contact</FormLabel>
              <FormControl>
                <Input placeholder="Nom du contact d'urgence" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coPilote.emergencyContact.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone du contact</FormLabel>
              <FormControl>
                <Input placeholder="Téléphone du contact d'urgence" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coPilote.emergencyContact.relationship"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lien de parenté</FormLabel>
              <FormControl>
                <Input placeholder="Lien de parenté" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
