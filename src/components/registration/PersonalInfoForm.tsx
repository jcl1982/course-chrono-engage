
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { personalInfoSchema, type PersonalInfoFormData } from "./schemas/personalInfoSchema";
import { DriverInfo } from "./components/DriverInfo";
import { CoPilotInfo } from "./components/CoPilotInfo";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { EventType } from "@/pages/Registration/RegistrationForm";

interface PersonalInfoFormProps {
  defaultValues?: z.infer<typeof personalInfoSchema> | null;
  onSubmit: (data: z.infer<typeof personalInfoSchema>) => void;
  eventType: EventType;
}

const PersonalInfoForm = ({ defaultValues, onSubmit, eventType }: PersonalInfoFormProps) => {
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
      ...(eventType === 'rally' ? {
        coPilote: {
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
        }
      } : {}),
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    // Remove copilot data for non-rally events before submission
    if (eventType !== 'rally') {
      delete data.coPilote;
    }
    onSubmit(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs 
          defaultValue="driver" 
          className="w-full space-y-6"
          style={{ 
            display: eventType === 'rally' ? 'block' : 'none' 
          }}
        >
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

        {/* For non-rally events, show only driver info */}
        {eventType !== 'rally' && (
          <div>
            <DriverInfo />
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit">Sauvegarder</Button>
        </div>
      </form>
    </Form>
  );
};

export default PersonalInfoForm;
