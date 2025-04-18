
import { z } from "zod";

export const vehicleSchema = z.object({
  brand: z.string().min(2, "La marque doit contenir au moins 2 caractères"),
  model: z.string().min(2, "Le modèle doit contenir au moins 2 caractères"),
  group: z.string().min(1, "Veuillez sélectionner un groupe"),
  class: z.string().min(1, "Veuillez sélectionner une classe"),
  year: z.string().min(4, "Veuillez entrer l'année du véhicule"),
  category: z.string().default("default"),
  technicalPassport: z.string().min(2, "Numéro de passeport technique requis"),
  homologationNumber: z.string().default("N/A"),
  engineCapacity: z.string().min(1, "Cylindrée requise"),
  engineNumber: z.string().default("N/A"),
  chassisNumber: z.string().default("N/A"),
  registrationNumber: z.string().default("N/A"),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;
