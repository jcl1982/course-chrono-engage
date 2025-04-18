
import { FormInput } from "@/components/form/FormInput";
import { FormSelect } from "@/components/form/FormSelect";

export const BasicVehicleInfo = () => {
  const groupOptions = [
    { value: "A", label: "Groupe A" },
    { value: "N", label: "Groupe N" },
    { value: "R", label: "Groupe R" },
    { value: "F2000", label: "F2000" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormInput
        name="brand"
        label="Marque"
        description="Marque du constructeur du véhicule"
        placeholder="Ex: Renault, Peugeot..."
        className="text-black"
      />

      <FormInput
        name="model"
        label="Modèle"
        description="Modèle spécifique du véhicule"
        placeholder="Ex: Clio, 208..."
        className="text-black"
      />

      <FormInput
        name="year"
        label="Année"
        description="Année de fabrication du véhicule (YYYY)"
        placeholder="Ex: 2024"
        className="text-black"
      />

      <FormSelect
        name="group"
        label="Groupe"
        description="Groupe de classification FIA du véhicule"
        placeholder="Sélectionner le groupe"
        options={groupOptions}
        className="text-black"
      />
    </div>
  );
};
