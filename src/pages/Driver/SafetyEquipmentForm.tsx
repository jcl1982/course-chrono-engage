
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import HelmetSection from "@/components/driver/safety-equipment/HelmetSection";
import SuitSection from "@/components/driver/safety-equipment/SuitSection";
import CoPilotSection from "@/components/driver/safety-equipment/CoPilotSection";
import FormActions from "@/components/driver/safety-equipment/FormActions";

const equipmentSchema = z.object({
  helmet_brand: z.string().min(1, "La marque du casque est requise"),
  helmet_model: z.string().min(1, "Le modèle du casque est requis"),
  helmet_homologation: z.string().min(1, "Le numéro d'homologation est requis"),
  helmet_expiry_date: z.string().min(1, "La date d'expiration est requise"),
  suit_brand: z.string().min(1, "La marque de la combinaison est requise"),
  suit_homologation: z.string().min(1, "Le numéro d'homologation est requis"),
  suit_expiry_date: z.string().min(1, "La date d'expiration est requise"),
  co_pilot_first_name: z.string().optional(),
  co_pilot_last_name: z.string().optional(),
  co_pilot_email: z.string().email("Format d'email invalide").optional().or(z.literal("")),
  co_pilot_phone: z.string().optional(),
  co_pilot_license_number: z.string().optional(),
  co_pilot_blood_type: z.string().optional(),
});

type EquipmentFormData = z.infer<typeof equipmentSchema>;

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
