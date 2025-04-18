import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import HelmetSection from "@/components/driver/safety-equipment/HelmetSection";
import SuitSection from "@/components/driver/safety-equipment/SuitSection";
import CoPilotSection from "@/components/driver/safety-equipment/CoPilotSection";
import FormActions from "@/components/driver/safety-equipment/FormActions";
import { equipmentSchema, type EquipmentFormData } from "@/components/driver/safety-equipment/schemas/equipmentSchema";

const SafetyEquipmentForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<EquipmentFormData>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      helmet_brand: "",
      helmet_model: "",
      helmet_homologation: "",
      helmet_expiry_date: "",
      suit_brand: "",
      suit_homologation: "",
      suit_expiry_date: "",
    },
  });

  const onSubmit = async (data: EquipmentFormData) => {
    try {
      const user = await supabase.auth.getUser();
      
      const equipmentData = {
        helmet_brand: data.helmet_brand,
        helmet_model: data.helmet_model,
        helmet_homologation: data.helmet_homologation,
        helmet_expiry_date: data.helmet_expiry_date,
        suit_brand: data.suit_brand,
        suit_homologation: data.suit_homologation,
        suit_expiry_date: data.suit_expiry_date,
        co_pilot_first_name: data.co_pilot_first_name || null,
        co_pilot_last_name: data.co_pilot_last_name || null,
        co_pilot_email: data.co_pilot_email || null,
        co_pilot_phone: data.co_pilot_phone || null,
        co_pilot_license_number: data.co_pilot_license_number || null,
        co_pilot_blood_type: data.co_pilot_blood_type || null,
        driver_id: user.data.user?.id,
      };
      
      const { error } = await supabase
        .from('driver_safety_equipment')
        .insert(equipmentData);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Équipement enregistré avec succès",
      });
      
      navigate('/driver');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer l'équipement",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <HelmetSection />
        <SuitSection />
        <CoPilotSection />
        <FormActions />
      </form>
    </Form>
  );
};

export default SafetyEquipmentForm;
