
import { FormInput } from "@/components/form/FormInput";

const CopilotShoesSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Chaussures (Copilote)</h3>
      <FormInput
        name="copilot_shoes_brand"
        label="Marque"
        placeholder="Entrez la marque des chaussures"
      />
      <FormInput
        name="copilot_shoes_homologation"
        label="Numéro d'homologation FIA"
        placeholder="Entrez le numéro d'homologation"
      />
      <FormInput
        name="copilot_shoes_expiry_date"
        label="Date d'expiration"
        type="date"
      />
    </div>
  );
};

export default CopilotShoesSection;
