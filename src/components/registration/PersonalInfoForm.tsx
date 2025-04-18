
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { personalInfoSchema, type PersonalInfoFormData } from "./schemas/personalInfoSchema";
import { DriverInfo } from "./components/DriverInfo";
import { CoPilotInfo } from "./components/CoPilotInfo";
import { DriverRegistrationForm } from "./driver/DriverRegistrationForm";
import { CopilotRegistrationForm } from "./copilot/CopilotRegistrationForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  return (
    <Tabs defaultValue="driver" className="w-full space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="driver">Pilote</TabsTrigger>
        <TabsTrigger value="copilot">Co-Pilote</TabsTrigger>
      </TabsList>

      <TabsContent value="driver">
        <DriverRegistrationForm />
      </TabsContent>

      <TabsContent value="copilot">
        <CopilotRegistrationForm />
      </TabsContent>
    </Tabs>
  );
};

export default PersonalInfoForm;
