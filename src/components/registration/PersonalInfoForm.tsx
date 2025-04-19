
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { personalInfoSchema, type PersonalInfoFormData } from "./schemas/personalInfoSchema";
import { DriverInfo } from "./components/DriverInfo";
import { CoPilotInfo } from "./components/CoPilotInfo";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";

interface PersonalInfoFormProps {
  defaultValues?: z.infer<typeof personalInfoSchema> | null;
  onSubmit: (data: z.infer<typeof personalInfoSchema>) => void;
}

const PersonalInfoForm = ({ defaultValues, onSubmit }: PersonalInfoFormProps) => {
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: defaultValues || {
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

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="driver" className="w-full space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="driver">Pilote</TabsTrigger>
            <TabsTrigger value="copilot">Co-Pilote</TabsTrigger>
          </TabsList>

          <TabsContent value="driver">
            <DriverInfo />
          </TabsContent>

          <TabsContent value="copilot">
            <CoPilotInfo />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button type="submit">Sauvegarder</Button>
        </div>
      </form>
    </Form>
  );
};

export default PersonalInfoForm;
