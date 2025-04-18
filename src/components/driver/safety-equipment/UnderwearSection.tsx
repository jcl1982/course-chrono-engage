
import { FormInput } from "@/components/form/FormInput";

const UnderwearSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Sous-vêtements Ignifugés</h3>
      <FormInput
        name="underwear_brand"
        label="Marque"
        placeholder="Entrez la marque des sous-vêtements"
      />
      <FormInput
        name="underwear_homologation"
        label="Numéro d'homologation FIA"
        placeholder="Entrez le numéro d'homologation"
      />
      <FormInput
        name="underwear_expiry_date"
        label="Date d'expiration"
        type="date"
      />
    </div>
  );
};

export default UnderwearSection;
