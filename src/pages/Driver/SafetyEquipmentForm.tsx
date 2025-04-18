
import { Form } from "@/components/ui/form";
import HelmetSection from "@/components/driver/safety-equipment/HelmetSection";
import SuitSection from "@/components/driver/safety-equipment/SuitSection";
import UnderwearSection from "@/components/driver/safety-equipment/UnderwearSection";
import ShoesSection from "@/components/driver/safety-equipment/ShoesSection";
import GlovesSection from "@/components/driver/safety-equipment/GlovesSection";
import HansSection from "@/components/driver/safety-equipment/HansSection";
import FormActions from "@/components/driver/safety-equipment/FormActions";
import LoadingState from "@/components/driver/safety-equipment/LoadingState";
import { useSafetyEquipmentForm } from "@/hooks/use-safety-equipment-form";

const SafetyEquipmentForm = () => {
  const { form, loading, submitting, onSubmit } = useSafetyEquipmentForm();

  if (loading) {
    return <LoadingState />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <h2 className="text-xl font-bold mb-4">Équipement Pilote</h2>
          <HelmetSection />
          <SuitSection />
          <UnderwearSection />
          <ShoesSection />
          <GlovesSection />
          <HansSection />
        </div>
        <FormActions submitting={submitting} />
      </form>
    </Form>
  );
};

export default SafetyEquipmentForm;
