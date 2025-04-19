
import { FormInput } from "@/components/form/FormInput";

const HelmetSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Casque</h3>
      <FormInput
        name="helmet_brand"
        label="Marque"
        placeholder="Entrez la marque du casque"
      />
      <FormInput
        name="helmet_model"
        label="Modèle"
        placeholder="Entrez le modèle du casque"
      />
      <FormInput
        name="helmet_homologation"
        label="Numéro d'homologation"
        placeholder="Entrez le numéro d'homologation"
      />
      <FormInput
        name="helmet_expiry_date"
        label="Date d'expiration"
        type="date"
      />
    </div>
  );
};

export default HelmetSection;
