
import { FormInput } from "@/components/form/FormInput";

export const TechnicalDetails = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormInput
        name="technicalPassport"
        label="Passeport Technique"
        description="Numéro du passeport technique FFSA"
        placeholder="Ex: PT123456"
        className="text-black"
      />

      <FormInput
        name="engineCapacity"
        label="Cylindrée"
        description="Cylindrée du moteur en cm³"
        placeholder="Ex: 1600"
        className="text-black"
      />

      <FormInput
        name="class"
        label="Classe"
        description="Classe de cylindrée du véhicule"
        placeholder="Ex: RC4"
        className="text-black"
      />

      <FormInput
        name="homologationNumber"
        label="Numéro d'homologation"
        description="Numéro d'homologation FIA/FFSA"
        placeholder="Ex: A-5731"
        className="text-black"
      />
    </div>
  );
};
