
export type EquipmentType = "driver" | "copilot";

export interface BaseEquipmentFields {
  brand: string;
  model?: string;
  homologation: string;
  expiry_date: string;
}

export interface DriverEquipment {
  // Driver equipment fields
  helmet_brand: string;
  helmet_model: string;
  helmet_homologation: string;
  helmet_expiry_date: string;
  suit_brand: string;
  suit_homologation: string;
  suit_expiry_date: string;
  underwear_brand: string;
  underwear_homologation: string;
  underwear_expiry_date: string;
  shoes_brand: string;
  shoes_homologation: string;
  shoes_expiry_date: string;
  gloves_brand: string;
  gloves_homologation: string;
  gloves_expiry_date: string;
  hans_brand: string;
  hans_homologation: string;
  hans_expiry_date: string;
  // Co-pilot equipment fields
  copilot_helmet_brand: string;
  copilot_helmet_model: string;
  copilot_helmet_homologation: string;
  copilot_helmet_expiry_date: string;
  copilot_suit_brand: string;
  copilot_suit_homologation: string;
  copilot_suit_expiry_date: string;
  copilot_underwear_brand: string;
  copilot_underwear_homologation: string;
  copilot_underwear_expiry_date: string;
  copilot_shoes_brand: string;
  copilot_shoes_homologation: string;
  copilot_shoes_expiry_date: string;
  copilot_gloves_brand: string;
  copilot_gloves_homologation: string;
  copilot_gloves_expiry_date: string;
  copilot_hans_brand: string;
  copilot_hans_homologation: string;
  copilot_hans_expiry_date: string;
}

export type EquipmentFormData = DriverEquipment;
