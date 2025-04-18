
import { z } from "zod";

export const equipmentSchema = z.object({
  driverHelmet: z.object({
    brand: z.string(),
    homologation: z.string(),
  }),
  driverSuit: z.object({
    brand: z.string(),
    homologation: z.string(),
  }),
  arceau: z.boolean(),
  sieges: z.object({
    brand: z.string(),
    homologation: z.string(),
  }),
  harnais: z.object({
    brand: z.string(),
    homologation: z.string(),
  }),
});

export type EquipmentFormData = z.infer<typeof equipmentSchema>;
