import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const BasicVehicleInfo = () => {
  const form = useFormContext();

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="brand"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-black">Marque</FormLabel>
            <FormControl>
              <Input 
                placeholder="ex: Renault" 
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
        name="model"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-black">Modèle</FormLabel>
            <FormControl>
              <Input 
                placeholder="ex: Clio" 
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
        name="year"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-black">Année</FormLabel>
            <FormControl>
              <Input 
                type="text" 
                placeholder="ex: 2020" 
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
        name="group"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-black">Groupe</FormLabel>
            <FormControl>
              <Input 
                placeholder="ex: A" 
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
        name="class"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-black">Classe</FormLabel>
            <FormControl>
              <Input 
                placeholder="ex: A6" 
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
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-black">Catégorie</FormLabel>
            <FormControl>
              <Input 
                placeholder="ex: Production" 
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
