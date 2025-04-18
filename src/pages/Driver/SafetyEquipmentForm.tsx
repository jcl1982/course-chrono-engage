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
import { useLocation, useNavigate } from "react-router-dom";
import { EquipmentType } from "@/types/equipment";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SafetyEquipmentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const returnUrl = searchParams.get("returnUrl");

  // Determine equipment type based on the URL path
  const getEquipmentType = (): EquipmentType => {
    if (location.pathname.includes("/copilot")) {
      return "copilot";
    }
    return "driver";
  };
  
  const equipmentType = getEquipmentType();
  const { form, loading, submitting, onSubmit } = useSafetyEquipmentForm(equipmentType);

  if (loading) {
    return <LoadingState />;
  }

  const onSubmit = async (data: any) => {
    try {
      setSubmitting(true);
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error("Utilisateur non authentifié");
      }

      const equipmentData = {
        ...data,
        driver_id: user.data.user.id,
      };
      
      let result;
      
      if (id) {
        result = await supabase
          .from("driver_safety_equipment")
          .update(equipmentData)
          .eq("id", id);
      } else {
        result = await supabase
          .from("driver_safety_equipment")
          .insert(equipmentData);
      }

      if (result.error) throw result.error;

      toast({
        title: "Succès",
        description: "Équipement enregistré avec succès",
      });
      
      // Navigate back to the return URL if provided, otherwise go to the driver dashboard
      if (returnUrl) {
        navigate(returnUrl);
      } else {
        navigate('/driver');
      }
    } catch (error) {
      console.error("Error saving equipment:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer l'équipement",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <h2 className="text-xl font-bold mb-4">
            {equipmentType === "driver" ? "Équipement Pilote" : "Équipement Copilote"}
          </h2>
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
