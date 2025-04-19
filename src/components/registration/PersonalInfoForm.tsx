
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
  eventType?: "rally" | "hillclimb" | "slalom";
}

const PersonalInfoForm = ({ defaultValues, onSubmit, eventType = "rally" }: PersonalInfoFormProps) => {
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: defaultValues || {
      firstName: "",
      lastName: "",
      birthDate: "",
      nationality: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      phone: "",
      email: "",
      licenseNumber: "",
      licenseCategory: "",
      licenseExpiry: "",
      asa: "",
      bloodType: "",
      emergencyContact: {
        name: "",
        phone: "",
        relationship: "",
      },
      coPilote: eventType === "rally" ? {
        firstName: "",
        lastName: "",
        birthDate: "",
        nationality: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
        email: "",
        licenseNumber: "",
        licenseCategory: "",
        licenseExpiry: "",
        bloodType: "",
        emergencyContact: {
          name: "",
          phone: "",
          relationship: "",
        },
      } : undefined,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {eventType === "rally" ? (
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
        ) : (
          <DriverInfo />
        )}

        <div className="flex justify-end">
          <Button type="submit">Sauvegarder</Button>
        </div>
      </form>
    </Form>
  );
};

export default PersonalInfoForm;
