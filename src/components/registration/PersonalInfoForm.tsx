
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PersonalTabs } from "./components/PersonalTabs";
import { usePersonalInfoForm } from "@/hooks/registration/use-personal-info-form";
import { PersonalInfoFormData } from "./schemas/personalInfoSchema";
import { EventType } from "@/pages/Registration/RegistrationForm";

interface PersonalInfoFormProps {
  defaultValues?: PersonalInfoFormData | null;
  onSubmit: (data: PersonalInfoFormData) => void;
  eventType: EventType;
}

const PersonalInfoForm = ({ defaultValues, onSubmit, eventType }: PersonalInfoFormProps) => {
  const { form, handleSubmit } = usePersonalInfoForm({
    defaultValues,
    eventType,
    onSubmit,
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <PersonalTabs eventType={eventType} />
        <div className="flex justify-end">
          <Button type="submit">Sauvegarder</Button>
        </div>
      </form>
    </Form>
  );
};

export default PersonalInfoForm;
