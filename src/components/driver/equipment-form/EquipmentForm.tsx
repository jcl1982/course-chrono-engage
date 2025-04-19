
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import HelmetSection from "./sections/HelmetSection";
import SuitSection from "./sections/SuitSection";
import UnderwearSection from "./sections/UnderwearSection";
import ShoesSection from "./sections/ShoesSection";
import GlovesSection from "./sections/GlovesSection";
import HansSection from "./sections/HansSection";
import { equipmentSchema } from "./schemas/equipmentSchema";
import type { EquipmentFormData } from "./schemas/equipmentSchema";

const EquipmentForm = () => {
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
    }
  });

  const onSubmit = async (data: EquipmentFormData) => {
    try {
      const user = await supabase.auth.getUser();
      
      if (!user.data.user) {
        throw new Error("Utilisateur non authentifié");
      }

      const equipmentData = {
        ...data,
        driver_id: user.data.user.id,
      };

      const { error } = await supabase
        .from("driver_safety_equipment")
        .insert(equipmentData);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Équipement enregistré avec succès",
      });
      
      navigate("/driver");
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
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Équipement de Sécurité Pilote</h2>
          <HelmetSection />
          <SuitSection />
          <UnderwearSection />
          <ShoesSection />
          <GlovesSection />
          <HansSection />
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/driver")}
          >
            Annuler
          </Button>
          <Button type="submit">
            Enregistrer
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EquipmentForm;
