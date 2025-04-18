import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";

const personalInfoSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  licenseNumber: z.string().min(4, "Le numéro de licence doit contenir au moins 4 caractères"),
  asa: z.string().min(2, "L'ASA doit contenir au moins 2 caractères"),
  coPilote: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email("Format d'email invalide").optional().or(z.literal("")),
    phone: z.string().optional(),
    licenseNumber: z.string().optional(),
    bloodType: z.string().optional(),
  }),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

const PersonalInfoForm = () => {
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      licenseNumber: "",
      asa: "",
      coPilote: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        licenseNumber: "",
        bloodType: "",
      },
    },
  });

  const onSubmit = async (data: PersonalInfoFormData) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          license_number: data.licenseNumber,
        })
        .eq("id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Informations Pilote</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Prénom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de Licence</FormLabel>
                  <FormControl>
                    <Input placeholder="Numéro de licence FFSA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="asa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ASA</FormLabel>
                  <FormControl>
                    <Input placeholder="ASA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Informations Co-Pilote</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="coPilote.firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Entrez le prénom du co-pilote" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coPilote.lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Entrez le nom du co-pilote" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="coPilote.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="Entrez l'email du co-pilote" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="coPilote.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Entrez le numéro de téléphone du co-pilote" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="coPilote.licenseNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de licence</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Entrez le numéro de licence du co-pilote" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="coPilote.bloodType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Groupe sanguin</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Entrez le groupe sanguin du co-pilote" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default PersonalInfoForm;
