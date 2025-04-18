
import { FormInput } from "@/components/form/FormInput";

const CopilotHelmetSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Casque (Copilote)</h3>
      <FormInput
        name="copilot_helmet_brand"
        label="Marque"
        placeholder="Entrez la marque du casque"
      />
      <FormInput
        name="copilot_helmet_model"
        label="Modèle"
        placeholder="Entrez le modèle du casque"
      />
      <FormInput
        name="copilot_helmet_homologation"
        label="Numéro d'homologation"
        placeholder="Entrez le numéro d'homologation"
      />
      <FormInput
        name="copilot_helmet_expiry_date"
        label="Date d'expiration"
        type="date"
      />
    </div>
  );
};

export default CopilotHelmetSection;
