
import { FormInput } from "@/components/form/FormInput";

const CopilotHansSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Système RFT/HANS (Copilote)</h3>
      <FormInput
        name="copilot_hans_brand"
        label="Marque"
        placeholder="Entrez la marque du système RFT/HANS"
      />
      <FormInput
        name="copilot_hans_homologation"
        label="Numéro d'homologation FIA"
        placeholder="Entrez le numéro d'homologation"
      />
      <FormInput
        name="copilot_hans_expiry_date"
        label="Date d'expiration"
        type="date"
      />
    </div>
  );
};

export default CopilotHansSection;
