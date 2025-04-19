
import { BasicInfo } from "./co-pilot/BasicInfo";
import { ContactInfo } from "./co-pilot/ContactInfo";
import { LicenseInfo } from "./co-pilot/LicenseInfo";
import { EmergencyContact } from "./co-pilot/EmergencyContact";

export const CoPilotInfo = () => {
  return (
    <div className="space-y-6">
      <BasicInfo />
      <ContactInfo />
      <LicenseInfo />
      <EmergencyContact />
    </div>
  );
};
