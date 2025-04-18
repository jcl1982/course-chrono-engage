
import { FormInput } from "@/components/form/FormInput";

const CopilotSuitSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Combinaison (Copilote)</h3>
      <FormInput
        name="copilot_suit_brand"
        label="Marque"
        placeholder="Entrez la marque de la combinaison"
      />
      <FormInput
        name="copilot_suit_homologation"
        label="Numéro d'homologation"
        placeholder="Entrez le numéro d'homologation"
      />
      <FormInput
        name="copilot_suit_expiry_date"
        label="Date d'expiration"
        type="date"
      />
    </div>
  );
};

export default CopilotSuitSection;
