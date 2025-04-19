
import { EventType } from "@/pages/Registration/RegistrationForm";

export interface RegistrationData {
  driver_id: string;
  vehicle_id: string;
  driver_equipment_id?: string;
  status: string;
  rally_id: string | null;
  competition_id?: string;
  event_type?: EventType;
}

export interface RegistrationValidationProps {
  currentUserId: string | null;
  eventId: string | null;
  eventDetails: any;
  selectedVehicle: string | null;
  formData: any;
  selectedDriverEquipment: any;
  eventType: EventType;
}

