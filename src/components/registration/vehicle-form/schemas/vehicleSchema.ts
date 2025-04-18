
import { z } from "zod";

export const vehicleSchema = z.object({
  brand: z.string().min(2, "La marque doit contenir au moins 2 caractères"),
  model: z.string().min(2, "Le modèle doit contenir au moins 2 caractères"),
  group: z.string().min(1, "Le groupe est requis pour la classification du véhicule"),
  class: z.string().min(1, "La classe est requise pour la classification du véhicule"),
  year: z.string()
    .min(4, "L'année doit être au format YYYY")
    .max(4, "L'année doit être au format YYYY")
    .regex(/^\d+$/, "L'année doit être composée uniquement de chiffres"),
  category: z.string().default("default"),
  technicalPassport: z.string().min(2, "Le numéro de passeport technique est requis pour l'homologation"),
  homologationNumber: z.string().default("N/A"),
  engineCapacity: z.string()
    .min(1, "La cylindrée est requise")
    .regex(/^\d+$/, "La cylindrée doit être un nombre"),
  engineNumber: z.string().default("N/A"),
  chassisNumber: z.string().default("N/A"),
  registrationNumber: z.string().default("N/A"),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;
