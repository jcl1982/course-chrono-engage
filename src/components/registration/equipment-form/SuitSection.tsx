
import { FormInput } from "@/components/form/FormInput";

const SuitSection = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <FormInput
          name="driverSuit.brand"
          label="Marque de la combinaison"
          placeholder="Entrez la marque de la combinaison"
        />
        <FormInput
          name="driverSuit.homologation"
          label="Numéro d'homologation"
          placeholder="Entrez le numéro d'homologation"
        />
      </div>
    </div>
  );
};

export default SuitSection;
