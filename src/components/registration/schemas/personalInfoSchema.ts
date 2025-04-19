
import { z } from "zod";

const emergencyContactSchema = z.object({
  name: z.string().min(2, "Le nom du contact d'urgence est requis"),
  phone: z.string().min(10, "Le numéro de téléphone du contact d'urgence est requis"),
  relationship: z.string().min(2, "Le lien de parenté est requis"),
});

const basePersonalInfoSchema = {
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  birthDate: z.string().min(1, "La date de naissance est requise"),
  nationality: z.string().min(2, "La nationalité est requise"),
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  city: z.string().min(2, "La ville est requise"),
  postalCode: z.string().min(4, "Le code postal est requis"),
  country: z.string().min(2, "Le pays est requis"),
  phone: z.string().min(10, "Le numéro de téléphone est requis"),
  email: z.string().email("Format d'email invalide"),
  licenseNumber: z.string().min(4, "Le numéro de licence doit contenir au moins 4 caractères"),
  bloodType: z.string().min(1, "Le groupe sanguin est requis"),
  licenseCategory: z.string().min(1, "La catégorie de licence est requise"),
  licenseExpiry: z.string().min(1, "La date d'expiration de la licence est requise"),
  emergencyContact: emergencyContactSchema,
};

export const personalInfoSchema = z.object({
  ...basePersonalInfoSchema,
  asa: z.string().min(2, "L'ASA doit contenir au moins 2 caractères"),
  coPilote: z.object({
    ...basePersonalInfoSchema,
    emergencyContact: emergencyContactSchema,
  }).optional(),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
