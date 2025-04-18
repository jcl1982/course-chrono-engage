
import { FormInput } from "@/components/form/FormInput";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const SeatsSection = () => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default SeatsSection;
