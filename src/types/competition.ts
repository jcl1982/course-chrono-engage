
export type CompetitionStatus = "DRAFT" | "PUBLISHED" | "FINISHED" | "CANCELLED";

export interface Competition {
  id: string;
  name: string;
  description: string | null;
  location: string;
  date: string;
  status: CompetitionStatus;
  type: 'hillclimb' | 'slalom';
  max_participants: number | null;
  registration_deadline: string | null;
  registration_open: boolean | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}
