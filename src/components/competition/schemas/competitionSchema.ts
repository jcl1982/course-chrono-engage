
import { z } from "zod";

export const competitionFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  description: z.string(),
  location: z.string().min(2, "Le lieu doit être spécifié"),
  date: z.string().min(1, "La date est requise"),
  maxParticipants: z.string().optional(),
  registrationDeadline: z.string().optional(),
});

export type CompetitionFormData = z.infer<typeof competitionFormSchema>;
