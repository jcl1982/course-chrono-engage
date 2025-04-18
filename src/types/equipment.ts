
export type EquipmentType = "driver" | "copilot";

export interface BaseEquipmentFields {
  brand: string;
  model?: string;
  homologation: string;
  expiry_date: string;
}

export interface DriverEquipment {
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
}

export type EquipmentFormData = DriverEquipment;
