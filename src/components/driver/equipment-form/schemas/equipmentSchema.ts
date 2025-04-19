
import { z } from "zod";

export const equipmentSchema = z.object({
  helmet_brand: z.string().min(1, "La marque du casque est requise"),
  helmet_model: z.string().min(1, "Le modèle du casque est requis"),
  helmet_homologation: z.string().min(1, "Le numéro d'homologation est requis"),
  helmet_expiry_date: z.string().min(1, "La date d'expiration est requise"),
  
  suit_brand: z.string().min(1, "La marque de la combinaison est requise"),
  suit_homologation: z.string().min(1, "Le numéro d'homologation est requis"),
  suit_expiry_date: z.string().min(1, "La date d'expiration est requise"),
  
  underwear_brand: z.string().min(1, "La marque des sous-vêtements est requise"),
  underwear_homologation: z.string().min(1, "Le numéro d'homologation est requis"),
  underwear_expiry_date: z.string().min(1, "La date d'expiration est requise"),
  
  shoes_brand: z.string().min(1, "La marque des chaussures est requise"),
  shoes_homologation: z.string().min(1, "Le numéro d'homologation est requis"),
  shoes_expiry_date: z.string().min(1, "La date d'expiration est requise"),
  
  gloves_brand: z.string().min(1, "La marque des gants est requise"),
  gloves_homologation: z.string().min(1, "Le numéro d'homologation est requis"),
  gloves_expiry_date: z.string().min(1, "La date d'expiration est requise"),
  
  hans_brand: z.string().min(1, "La marque du HANS est requise"),
  hans_homologation: z.string().min(1, "Le numéro d'homologation est requis"),
  hans_expiry_date: z.string().min(1, "La date d'expiration est requise"),
});

export type EquipmentFormData = z.infer<typeof equipmentSchema>;
