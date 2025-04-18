
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const VehicleForm = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="brand">Marque</Label>
        <Input type="text" id="brand" placeholder="Marque du véhicule" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="model">Modèle</Label>
        <Input type="text" id="model" placeholder="Modèle du véhicule" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="group">Groupe</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner le groupe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A">Groupe A</SelectItem>
            <SelectItem value="N">Groupe N</SelectItem>
            <SelectItem value="R">Groupe R</SelectItem>
            <SelectItem value="F2000">F2000</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="classe">Classe</Label>
        <Input type="text" id="classe" placeholder="Classe" />
      </div>
    </div>
  );
};

export default VehicleForm;
