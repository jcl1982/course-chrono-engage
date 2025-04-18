
import { z } from "zod";

export const equipmentSchema = z.object({
  helmet_brand: z.string().min(1, "La marque du casque est requise"),
  helmet_model: z.string().min(1, "Le modèle du casque est requis"),
  helmet_homologation: z.string().min(1, "Le numéro d'homologation est requis"),
  helmet_expiry_date: z.string().min(1, "La date d'expiration est requise"),
  suit_brand: z.string().min(1, "La marque de la combinaison est requise"),
  suit_homologation: z.string().min(1, "Le numéro d'homologation est requis"),
  suit_expiry_date: z.string().min(1, "La date d'expiration est requise"),
  co_pilot_first_name: z.string().optional(),
  co_pilot_last_name: z.string().optional(),
  co_pilot_email: z.string().email("Format d'email invalide").optional().or(z.literal("")),
  co_pilot_phone: z.string().optional(),
  co_pilot_license_number: z.string().optional(),
  co_pilot_blood_type: z.string().optional(),
});

export type EquipmentFormData = z.infer<typeof equipmentSchema>;
