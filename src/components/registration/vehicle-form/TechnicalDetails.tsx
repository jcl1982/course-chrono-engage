import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const TechnicalDetails = () => {
  const form = useFormContext();

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="engineCapacity"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-black">Cylindrée</FormLabel>
            <FormControl>
              <Input 
                placeholder="ex: 2000" 
                {...field} 
                className="text-black focus:text-black"
              />
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
            <FormLabel className="text-black">Numéro de passeport technique</FormLabel>
            <FormControl>
              <Input 
                placeholder="ex: 1234567890" 
                {...field} 
                className="text-black focus:text-black"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="homologationNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-black">Numéro d'homologation</FormLabel>
            <FormControl>
              <Input 
                placeholder="ex: ABC-1234" 
                {...field} 
                className="text-black focus:text-black"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="engineNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-black">Numéro de moteur</FormLabel>
            <FormControl>
              <Input 
                placeholder="ex: XYZ987654" 
                {...field} 
                className="text-black focus:text-black"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="chassisNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-black">Numéro de châssis</FormLabel>
            <FormControl>
              <Input 
                placeholder="ex: ABC123XYZ" 
                {...field} 
                className="text-black focus:text-black"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="registrationNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-black">Numéro d'immatriculation</FormLabel>
            <FormControl>
              <Input 
                placeholder="ex: AA-123-BB" 
                {...field} 
                className="text-black focus:text-black"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
