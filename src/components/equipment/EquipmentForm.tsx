
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const EquipmentForm = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium">Équipements Pilote</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="helmet" />
              <Label htmlFor="helmet">Casque homologué</Label>
            </div>
            <Input placeholder="Numéro d'homologation casque" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="suit" />
              <Label htmlFor="suit">Combinaison homologuée</Label>
            </div>
            <Input placeholder="Numéro d'homologation combinaison" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Équipements Véhicule</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="rollcage" />
              <Label htmlFor="rollcage">Arceau de sécurité</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="seats" />
              <Label htmlFor="seats">Sièges baquets homologués</Label>
            </div>
            <Input placeholder="Numéro d'homologation sièges" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="harness" />
              <Label htmlFor="harness">Harnais homologué</Label>
            </div>
            <Input placeholder="Numéro d'homologation harnais" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentForm;
