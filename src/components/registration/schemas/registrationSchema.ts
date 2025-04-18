
import { z } from "zod";

export const driverRegistrationSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  birthDate: z.string().min(1, "La date de naissance est requise"),
  nationality: z.string().min(2, "La nationalité est requise"),
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  city: z.string().min(2, "La ville est requise"),
  postalCode: z.string().min(4, "Le code postal est requis"),
  country: z.string().min(2, "Le pays est requis"),
  phone: z.string().min(10, "Le numéro de téléphone est requis"),
  emergencyContactName: z.string().min(2, "Le nom du contact d'urgence est requis"),
  emergencyContactPhone: z.string().min(10, "Le numéro du contact d'urgence est requis"),
  licenseNumber: z.string().min(4, "Le numéro de licence est requis"),
  licenseExpiry: z.string().min(1, "La date d'expiration de la licence est requise"),
  asa: z.string().min(2, "L'ASA est requise"),
});

export const copilotRegistrationSchema = driverRegistrationSchema.omit({ asa: true });

export type DriverRegistrationFormData = z.infer<typeof driverRegistrationSchema>;
export type CopilotRegistrationFormData = z.infer<typeof copilotRegistrationSchema>;
