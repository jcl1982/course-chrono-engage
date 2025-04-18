
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { driverRegistrationSchema, type DriverRegistrationFormData } from "../schemas/registrationSchema";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const DriverRegistrationForm = () => {
  const { toast } = useToast();
  const form = useForm<DriverRegistrationFormData>({
    resolver: zodResolver(driverRegistrationSchema),
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
      asa: "",
    },
  });

  const onSubmit = async (data: DriverRegistrationFormData) => {
    try {
      const { error } = await supabase.from("driver_registrations").insert({
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
        asa: data.asa,
      });

      if (error) throw error;

      toast({
        title: "Inscription réussie",
        description: "Vos informations ont été enregistrées avec succès",
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
            placeholder="Entrez votre prénom"
          />
          <FormInput
            name="lastName"
            label="Nom"
            placeholder="Entrez votre nom"
          />
          <FormInput
            name="birthDate"
            label="Date de naissance"
            type="date"
          />
          <FormInput
            name="nationality"
            label="Nationalité"
            placeholder="Entrez votre nationalité"
          />
          <FormInput
            name="address"
            label="Adresse"
            placeholder="Entrez votre adresse"
          />
          <FormInput
            name="city"
            label="Ville"
            placeholder="Entrez votre ville"
          />
          <FormInput
            name="postalCode"
            label="Code postal"
            placeholder="Entrez votre code postal"
          />
          <FormInput
            name="country"
            label="Pays"
            placeholder="Entrez votre pays"
          />
          <FormInput
            name="phone"
            label="Téléphone"
            placeholder="Entrez votre numéro de téléphone"
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
            placeholder="Entrez votre numéro de licence"
          />
          <FormInput
            name="licenseExpiry"
            label="Date d'expiration de la licence"
            type="date"
          />
          <FormInput
            name="asa"
            label="ASA"
            placeholder="Entrez votre ASA"
          />
        </div>
        <Button type="submit" className="w-full">
          Enregistrer
        </Button>
      </form>
    </Form>
  );
};
