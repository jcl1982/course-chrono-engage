
import { FormInput } from "@/components/form/FormInput";

const CoPilotSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Co-Pilote</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          name="co_pilot_first_name"
          label="Prénom"
          placeholder="Entrez le prénom du co-pilote"
        />
        <FormInput
          name="co_pilot_last_name"
          label="Nom"
          placeholder="Entrez le nom du co-pilote"
        />
      </div>
      <FormInput
        name="co_pilot_email"
        label="Email"
        type="email"
        placeholder="Entrez l'email du co-pilote"
      />
      <FormInput
        name="co_pilot_phone"
        label="Téléphone"
        placeholder="Entrez le numéro de téléphone du co-pilote"
      />
      <FormInput
        name="co_pilot_license_number"
        label="Numéro de licence"
        placeholder="Entrez le numéro de licence du co-pilote"
      />
      <FormInput
        name="co_pilot_blood_type"
        label="Groupe sanguin"
        placeholder="Entrez le groupe sanguin du co-pilote"
      />
    </div>
  );
};

export default CoPilotSection;
