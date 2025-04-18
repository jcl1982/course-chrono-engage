
import { FormInput } from "@/components/form/FormInput";

const SuitSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Combinaison</h3>
      <FormInput
        name="suit_brand"
        label="Marque"
        placeholder="Entrez la marque de la combinaison"
      />
      <FormInput
        name="suit_homologation"
        label="Numéro d'homologation"
        placeholder="Entrez le numéro d'homologation"
      />
      <FormInput
        name="suit_expiry_date"
        label="Date d'expiration"
        type="date"
      />
    </div>
  );
};

export default SuitSection;
