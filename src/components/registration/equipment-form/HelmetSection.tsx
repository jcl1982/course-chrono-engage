
import { FormInput } from "@/components/form/FormInput";

const HelmetSection = () => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Équipements Pilote</h4>
      <div className="space-y-4">
        <FormInput
          name="driverHelmet.brand"
          label="Marque du casque"
          placeholder="Entrez la marque du casque"
        />
        <FormInput
          name="driverHelmet.homologation"
          label="Numéro d'homologation"
          placeholder="Entrez le numéro d'homologation"
        />
      </div>
    </div>
  );
};

export default HelmetSection;
