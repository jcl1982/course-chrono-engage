
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema, type PersonalInfoFormData } from "@/components/registration/schemas/personalInfoSchema";
import { EventType } from "@/pages/Registration/RegistrationForm";

interface UsePersonalInfoFormProps {
  defaultValues?: PersonalInfoFormData | null;
  eventType: EventType;
  onSubmit: (data: PersonalInfoFormData) => void;
}

export const usePersonalInfoForm = ({ defaultValues, eventType, onSubmit }: UsePersonalInfoFormProps) => {
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
    if (eventType !== 'rally') {
      delete data.coPilote;
    }
    onSubmit(data);
  });

  return {
    form,
    handleSubmit,
  };
};
