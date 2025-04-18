
import { z } from "zod";

export const personalInfoSchema = z.object({
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

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
