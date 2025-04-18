
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PersonalInfoForm = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="lastName">Nom</Label>
        <Input type="text" id="lastName" placeholder="Nom" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="firstName">Prénom</Label>
        <Input type="text" id="firstName" placeholder="Prénom" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="licenseNumber">Numéro de Licence</Label>
        <Input type="text" id="licenseNumber" placeholder="Numéro de licence FFSA" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="asa">ASA</Label>
        <Input type="text" id="asa" placeholder="ASA" />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
