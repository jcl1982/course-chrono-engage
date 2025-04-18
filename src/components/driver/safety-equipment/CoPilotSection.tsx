
import { FormInput } from "@/components/form/FormInput";
import { FormSelect } from "@/components/form/FormSelect";

const CoPilotSection = () => {
  const bloodTypes = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Informations Co-Pilote</h3>
      <FormInput
        name="co_pilot_first_name"
        label="Prénom"
        placeholder="Prénom du co-pilote"
      />
      <FormInput
        name="co_pilot_last_name"
        label="Nom"
        placeholder="Nom du co-pilote"
      />
      <FormInput
        name="co_pilot_email"
        label="Email"
        type="email"
        placeholder="Email du co-pilote"
      />
      <FormInput
        name="co_pilot_phone"
        label="Téléphone"
        placeholder="Numéro de téléphone du co-pilote"
      />
      <FormInput
        name="co_pilot_license_number"
        label="Numéro de licence"
        placeholder="Numéro de licence FFSA"
      />
      <FormSelect
        name="co_pilot_blood_type"
        label="Groupe sanguin"
        placeholder="Sélectionnez le groupe sanguin"
        options={bloodTypes}
      />
    </div>
  );
};

export default CoPilotSection;
