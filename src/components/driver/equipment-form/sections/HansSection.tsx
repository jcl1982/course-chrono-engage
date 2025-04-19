
import { FormInput } from "@/components/form/FormInput";

const HansSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Système RFT/HANS</h3>
      <FormInput
        name="hans_brand"
        label="Marque"
        placeholder="Entrez la marque du système RFT/HANS"
      />
      <FormInput
        name="hans_homologation"
        label="Numéro d'homologation"
        placeholder="Entrez le numéro d'homologation"
      />
      <FormInput
        name="hans_expiry_date"
        label="Date d'expiration"
        type="date"
      />
    </div>
  );
};

export default HansSection;
