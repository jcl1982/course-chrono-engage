
import { z } from "zod";

export const equipmentSchema = z.object({
  // Driver Equipment
  helmet_brand: z.string().min(1, "La marque du casque est requise"),
  helmet_model: z.string().min(1, "Le modèle du casque est requis"),
  helmet_homologation: z.string().min(1, "Le numéro d'homologation FIA est requis"),
  helmet_expiry_date: z.string().min(1, "La date d'expiration est requise"),
  
  suit_brand: z.string().min(1, "La marque de la combinaison est requise"),
  suit_homologation: z.string().min(1, "Le numéro d'homologation FIA est requis"),
  suit_expiry_date: z.string().min(1, "La date d'expiration est requise"),
  
  underwear_brand: z.string().min(1, "La marque des sous-vêtements ignifugés est requise"),
  underwear_homologation: z.string().min(1, "Le numéro d'homologation FIA est requis"),
  underwear_expiry_date: z.string().min(1, "La date d'expiration est requise"),
  
  shoes_brand: z.string().min(1, "La marque des chaussures est requise"),
  shoes_homologation: z.string().min(1, "Le numéro d'homologation FIA est requis"),
  shoes_expiry_date: z.string().min(1, "La date d'expiration est requise"),
  
  gloves_brand: z.string().min(1, "La marque des gants est requise"),
  gloves_homologation: z.string().min(1, "Le numéro d'homologation FIA est requis"),
  gloves_expiry_date: z.string().min(1, "La date d'expiration est requise"),

  hans_brand: z.string().min(1, "La marque du système RFT/HANS est requise"),
  hans_homologation: z.string().min(1, "Le numéro d'homologation FIA est requis"),
  hans_expiry_date: z.string().min(1, "La date d'expiration est requise"),

  // Copilot Equipment - All fields are optional for copilot equipment
  copilot_helmet_brand: z.string().optional(),
  copilot_helmet_model: z.string().optional(),
  copilot_helmet_homologation: z.string().optional(),
  copilot_helmet_expiry_date: z.string().optional(),
  
  copilot_suit_brand: z.string().optional(),
  copilot_suit_homologation: z.string().optional(),
  copilot_suit_expiry_date: z.string().optional(),
  
  copilot_underwear_brand: z.string().optional(),
  copilot_underwear_homologation: z.string().optional(),
  copilot_underwear_expiry_date: z.string().optional(),
  
  copilot_shoes_brand: z.string().optional(),
  copilot_shoes_homologation: z.string().optional(),
  copilot_shoes_expiry_date: z.string().optional(),
  
  copilot_gloves_brand: z.string().optional(),
  copilot_gloves_homologation: z.string().optional(),
  copilot_gloves_expiry_date: z.string().optional(),

  copilot_hans_brand: z.string().optional(),
  copilot_hans_homologation: z.string().optional(),
  copilot_hans_expiry_date: z.string().optional(),
});

export type EquipmentFormData = z.infer<typeof equipmentSchema>;
