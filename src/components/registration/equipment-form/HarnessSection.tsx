
import { FormInput } from "@/components/form/FormInput";

const HarnessSection = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <FormInput
          name="harnais.brand"
          label="Marque du harnais"
          placeholder="Entrez la marque du harnais"
        />
        <FormInput
          name="harnais.homologation"
          label="Numéro d'homologation"
          placeholder="Entrez le numéro d'homologation"
        />
      </div>
    </div>
  );
};

export default HarnessSection;
