
import { Form } from "@/components/ui/form";
import HelmetSection from "@/components/driver/safety-equipment/HelmetSection";
import SuitSection from "@/components/driver/safety-equipment/SuitSection";
import UnderwearSection from "@/components/driver/safety-equipment/UnderwearSection";
import ShoesSection from "@/components/driver/safety-equipment/ShoesSection";
import GlovesSection from "@/components/driver/safety-equipment/GlovesSection";
import HansSection from "@/components/driver/safety-equipment/HansSection";
import CopilotHelmetSection from "@/components/driver/safety-equipment/CopilotHelmetSection";
import CopilotSuitSection from "@/components/driver/safety-equipment/CopilotSuitSection";
import CopilotUnderwearSection from "@/components/driver/safety-equipment/CopilotUnderwearSection";
import CopilotShoesSection from "@/components/driver/safety-equipment/CopilotShoesSection";
import CopilotGlovesSection from "@/components/driver/safety-equipment/CopilotGlovesSection";
import CopilotHansSection from "@/components/driver/safety-equipment/CopilotHansSection";
import FormActions from "@/components/driver/safety-equipment/FormActions";
import LoadingState from "@/components/driver/safety-equipment/LoadingState";
import { useSafetyEquipmentForm } from "@/hooks/use-safety-equipment-form";

interface SafetyEquipmentFormProps {
  type: "driver" | "copilot";
}

const SafetyEquipmentForm = ({ type }: SafetyEquipmentFormProps) => {
  const { form, loading, submitting, onSubmit } = useSafetyEquipmentForm(type);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <h2 className="text-xl font-bold mb-4">
            {type === "driver" ? "Équipement Pilote" : "Équipement Copilote"}
          </h2>
          {type === "driver" ? (
            <>
              <HelmetSection />
              <SuitSection />
              <UnderwearSection />
              <ShoesSection />
              <GlovesSection />
              <HansSection />
            </>
          ) : (
            <>
              <CopilotHelmetSection />
              <CopilotSuitSection />
              <CopilotUnderwearSection />
              <CopilotShoesSection />
              <CopilotGlovesSection />
              <CopilotHansSection />
            </>
          )}
        </div>
        <FormActions submitting={submitting} />
      </form>
    </Form>
  );
};

export default SafetyEquipmentForm;
