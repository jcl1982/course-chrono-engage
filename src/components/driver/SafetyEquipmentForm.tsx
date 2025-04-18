
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/FormInput";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const equipmentSchema = z.object({
  helmet_brand: z.string().min(1, "La marque du casque est requise"),
  helmet_model: z.string().min(1, "Le modèle du casque est requis"),
  helmet_homologation: z.string().min(1, "Le numéro d'homologation est requis"),
  helmet_expiry_date: z.string().min(1, "La date d'expiration est requise"),
  suit_brand: z.string().min(1, "La marque de la combinaison est requise"),
  suit_homologation: z.string().min(1, "Le numéro d'homologation est requis"),
  suit_expiry_date: z.string().min(1, "La date d'expiration est requise"),
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
      const { error } = await supabase
        .from('driver_safety_equipment')
        .insert({
          ...data,
          driver_id: (await supabase.auth.getUser()).data.user?.id,
        });

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
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Casque</h3>
          <FormInput
            name="helmet_brand"
            label="Marque"
            placeholder="Entrez la marque du casque"
          />
          <FormInput
            name="helmet_model"
            label="Modèle"
            placeholder="Entrez le modèle du casque"
          />
          <FormInput
            name="helmet_homologation"
            label="Numéro d'homologation"
            placeholder="Entrez le numéro d'homologation"
          />
          <FormInput
            name="helmet_expiry_date"
            label="Date d'expiration"
            type="date"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Combinaison</h3>
          <FormInput
            name="suit_brand"
            label="Marque"
            placeholder="Entrez la marque de la combinaison"
          />
          <FormInput
            name="suit_homologation"
            label="Numéro d'homologation"
            placeholder="Entrez le numéro d'homologation"
          />
          <FormInput
            name="suit_expiry_date"
            label="Date d'expiration"
            type="date"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/driver')}
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

export default SafetyEquipmentForm;
