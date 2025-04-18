import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import HelmetSection from "./equipment-form/HelmetSection";
import SuitSection from "./equipment-form/SuitSection";
import VehicleEquipmentSection from "./equipment-form/VehicleEquipmentSection";
import { equipmentSchema } from "./schemas/equipmentSchema";
import type { EquipmentFormData } from "./schemas/equipmentSchema";

const EquipmentForm = () => {
  const form = useForm<EquipmentFormData>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      driverHelmet: { brand: "", homologation: "" },
      driverSuit: { brand: "", homologation: "" },
      arceau: false,
      sieges: { brand: "", homologation: "" },
      harnais: { brand: "", homologation: "" },
    },
  });

  const onSubmit = async (data: EquipmentFormData) => {
    // We'll implement this when we have a registration ID to associate with
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <HelmetSection />
            <SuitSection />
          </div>
          <VehicleEquipmentSection />
        </div>
      </form>
    </Form>
  );
};

export default EquipmentForm;
