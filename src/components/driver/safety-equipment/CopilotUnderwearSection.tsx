
import { FormInput } from "@/components/form/FormInput";

const CopilotUnderwearSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Sous-vêtements Ignifugés (Copilote)</h3>
      <FormInput
        name="copilot_underwear_brand"
        label="Marque"
        placeholder="Entrez la marque des sous-vêtements"
      />
      <FormInput
        name="copilot_underwear_homologation"
        label="Numéro d'homologation FIA"
        placeholder="Entrez le numéro d'homologation"
      />
      <FormInput
        name="copilot_underwear_expiry_date"
        label="Date d'expiration"
        type="date"
      />
    </div>
  );
};

export default CopilotUnderwearSection;
