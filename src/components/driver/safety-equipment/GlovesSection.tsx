
import { FormInput } from "@/components/form/FormInput";

const GlovesSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Gants</h3>
      <FormInput
        name="gloves_brand"
        label="Marque"
        placeholder="Entrez la marque des gants"
      />
      <FormInput
        name="gloves_homologation"
        label="Numéro d'homologation FIA"
        placeholder="Entrez le numéro d'homologation"
      />
      <FormInput
        name="gloves_expiry_date"
        label="Date d'expiration"
        type="date"
      />
    </div>
  );
};

export default GlovesSection;
