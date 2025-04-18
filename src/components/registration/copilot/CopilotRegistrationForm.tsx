
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { copilotRegistrationSchema, type CopilotRegistrationFormData } from "../schemas/registrationSchema";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const CopilotRegistrationForm = () => {
  const { toast } = useToast();
  const form = useForm<CopilotRegistrationFormData>({
    resolver: zodResolver(copilotRegistrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      nationality: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      phone: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      licenseNumber: "",
      licenseExpiry: "",
    },
  });

  const onSubmit = async (data: CopilotRegistrationFormData) => {
    try {
      const { error } = await supabase.from("copilot_registrations").insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        first_name: data.firstName,
        last_name: data.lastName,
        birth_date: data.birthDate,
        nationality: data.nationality,
        address: data.address,
        city: data.city,
        postal_code: data.postalCode,
        country: data.country,
        phone: data.phone,
        emergency_contact_name: data.emergencyContactName,
        emergency_contact_phone: data.emergencyContactPhone,
        license_number: data.licenseNumber,
        license_expiry: data.licenseExpiry,
      });

      if (error) throw error;

      toast({
        title: "Inscription réussie",
        description: "Les informations du copilote ont été enregistrées avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            name="firstName"
            label="Prénom"
            placeholder="Entrez le prénom du copilote"
          />
          <FormInput
            name="lastName"
            label="Nom"
            placeholder="Entrez le nom du copilote"
          />
          <FormInput
            name="birthDate"
            label="Date de naissance"
            type="date"
          />
          <FormInput
            name="nationality"
            label="Nationalité"
            placeholder="Entrez la nationalité du copilote"
          />
          <FormInput
            name="address"
            label="Adresse"
            placeholder="Entrez l'adresse du copilote"
          />
          <FormInput
            name="city"
            label="Ville"
            placeholder="Entrez la ville du copilote"
          />
          <FormInput
            name="postalCode"
            label="Code postal"
            placeholder="Entrez le code postal du copilote"
          />
          <FormInput
            name="country"
            label="Pays"
            placeholder="Entrez le pays du copilote"
          />
          <FormInput
            name="phone"
            label="Téléphone"
            placeholder="Entrez le numéro de téléphone du copilote"
          />
          <FormInput
            name="emergencyContactName"
            label="Contact d'urgence (nom)"
            placeholder="Nom du contact d'urgence"
          />
          <FormInput
            name="emergencyContactPhone"
            label="Contact d'urgence (téléphone)"
            placeholder="Téléphone du contact d'urgence"
          />
          <FormInput
            name="licenseNumber"
            label="Numéro de licence"
            placeholder="Entrez le numéro de licence du copilote"
          />
          <FormInput
            name="licenseExpiry"
            label="Date d'expiration de la licence"
            type="date"
          />
        </div>
        <Button type="submit" className="w-full">
          Enregistrer
        </Button>
      </form>
    </Form>
  );
};
