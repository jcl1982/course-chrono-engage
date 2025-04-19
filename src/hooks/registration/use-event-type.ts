
import { useState } from "react";
import { EventType } from "@/pages/Registration/RegistrationForm";

export const useEventType = () => {
  const [eventType, setEventType] = useState<EventType>("rally");

  return {
    eventType,
    setEventType,
  };
};
