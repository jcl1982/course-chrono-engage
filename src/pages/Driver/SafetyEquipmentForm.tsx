
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import HelmetSection from "@/components/driver/safety-equipment/HelmetSection";
import SuitSection from "@/components/driver/safety-equipment/SuitSection";
import UnderwearSection from "@/components/driver/safety-equipment/UnderwearSection";
import ShoesSection from "@/components/driver/safety-equipment/ShoesSection";
import GlovesSection from "@/components/driver/safety-equipment/GlovesSection";
import HansSection from "@/components/driver/safety-equipment/HansSection";
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
      underwear_brand: "",
      underwear_homologation: "",
      underwear_expiry_date: "",
      shoes_brand: "",
      shoes_homologation: "",
      shoes_expiry_date: "",
      gloves_brand: "",
      gloves_homologation: "",
      gloves_expiry_date: "",
      hans_brand: "",
      hans_homologation: "",
      hans_expiry_date: "",
    },
  });

  const onSubmit = async (data: EquipmentFormData) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        throw new Error("Utilisateur non connecté");
      }
      
      // Make sure all form data is correctly typed for insert
      const equipmentData = {
        driver_id: userData.user.id,
        helmet_brand: data.helmet_brand,
        helmet_model: data.helmet_model,
        helmet_homologation: data.helmet_homologation,
        helmet_expiry_date: data.helmet_expiry_date,
        suit_brand: data.suit_brand,
        suit_homologation: data.suit_homologation,
        suit_expiry_date: data.suit_expiry_date,
        underwear_brand: data.underwear_brand,
        underwear_homologation: data.underwear_homologation,
        underwear_expiry_date: data.underwear_expiry_date,
        shoes_brand: data.shoes_brand,
        shoes_homologation: data.shoes_homologation,
        shoes_expiry_date: data.shoes_expiry_date,
        gloves_brand: data.gloves_brand,
        gloves_homologation: data.gloves_homologation,
        gloves_expiry_date: data.gloves_expiry_date,
        hans_brand: data.hans_brand,
        hans_homologation: data.hans_homologation,
        hans_expiry_date: data.hans_expiry_date
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
      console.error("Error saving equipment:", error);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <HelmetSection />
            <UnderwearSection />
            <GlovesSection />
          </div>
          <div className="space-y-6">
            <SuitSection />
            <ShoesSection />
            <HansSection />
          </div>
        </div>
        <FormActions />
      </form>
    </Form>
  );
};

export default SafetyEquipmentForm;
