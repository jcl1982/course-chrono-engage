
import { z } from "zod";

export const equipmentSchema = z.object({
  // Casque (Helmet)
  helmet_brand: z.string().min(1, "La marque du casque est requise"),
  helmet_model: z.string().min(1, "Le modèle du casque est requis"),
  helmet_homologation: z.string().min(1, "Le numéro d'homologation FIA est requis"),
  helmet_expiry_date: z.string().min(1, "La date d'expiration est requise"),
  
  // Combinaison (Racing Suit)
  suit_brand: z.string().min(1, "La marque de la combinaison est requise"),
  suit_homologation: z.string().min(1, "Le numéro d'homologation FIA est requis"),
  suit_expiry_date: z.string().min(1, "La date d'expiration est requise"),
  
  // Sous-vêtements ignifugés (Fireproof Underwear)
  underwear_brand: z.string().min(1, "La marque des sous-vêtements ignifugés est requise"),
  underwear_homologation: z.string().min(1, "Le numéro d'homologation FIA est requis"),
  underwear_expiry_date: z.string().min(1, "La date d'expiration est requise"),
  
  // Chaussures (Racing Shoes)
  shoes_brand: z.string().min(1, "La marque des chaussures est requise"),
  shoes_homologation: z.string().min(1, "Le numéro d'homologation FIA est requis"),
  shoes_expiry_date: z.string().min(1, "La date d'expiration est requise"),
  
  // Gants (Racing Gloves)
  gloves_brand: z.string().min(1, "La marque des gants est requise"),
  gloves_homologation: z.string().min(1, "Le numéro d'homologation FIA est requis"),
  gloves_expiry_date: z.string().min(1, "La date d'expiration est requise"),

  // Système RFT/HANS (Frontal Head Restraint)
  hans_brand: z.string().min(1, "La marque du système RFT/HANS est requise"),
  hans_homologation: z.string().min(1, "Le numéro d'homologation FIA est requis"),
  hans_expiry_date: z.string().min(1, "La date d'expiration est requise"),
});

export type EquipmentFormData = z.infer<typeof equipmentSchema>;
