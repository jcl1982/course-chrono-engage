
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { personalInfoSchema, type PersonalInfoFormData } from "./schemas/personalInfoSchema";
import { DriverInfo } from "./components/DriverInfo";
import { CoPilotInfo } from "./components/CoPilotInfo";

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
        <DriverInfo />
        <CoPilotInfo />
      </form>
    </Form>
  );
};

export default PersonalInfoForm;
