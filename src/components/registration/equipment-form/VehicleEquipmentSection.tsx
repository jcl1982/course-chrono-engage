
import { FormInput } from "@/components/form/FormInput";
import { FormField, FormItem } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const VehicleEquipmentSection = () => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Équipements Véhicule</h4>
      
      <FormField
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
              <label>Arceau de sécurité</label>
            </div>
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <FormInput
          name="sieges.brand"
          label="Marque des sièges"
          placeholder="Entrez la marque des sièges"
        />
        <FormInput
          name="sieges.homologation"
          label="Numéro d'homologation"
          placeholder="Entrez le numéro d'homologation"
        />
      </div>

      <div className="space-y-4">
        <FormInput
          name="harnais.brand"
          label="Marque du harnais"
          placeholder="Entrez la marque du harnais"
        />
        <FormInput
          name="harnais.homologation"
          label="Numéro d'homologation"
          placeholder="Entrez le numéro d'homologation"
        />
      </div>
    </div>
  );
};

export default VehicleEquipmentSection;
