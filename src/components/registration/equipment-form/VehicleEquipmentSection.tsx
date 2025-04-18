
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import SeatsSection from "./SeatsSection";
import HarnessSection from "./HarnessSection";

const VehicleEquipmentSection = () => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Équipements Véhicule</h4>
      
      <FormField
        name="arceau"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <label>Arceau de sécurité</label>
            </div>
          </FormItem>
        )}
      />

      <SeatsSection />
      <HarnessSection />
    </div>
  );
};

export default VehicleEquipmentSection;
