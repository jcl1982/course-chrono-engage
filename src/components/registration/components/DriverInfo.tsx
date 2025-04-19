
import { BasicInfo } from "./driver/BasicInfo";
import { ContactInfo } from "./driver/ContactInfo";
import { LicenseInfo } from "./driver/LicenseInfo";
import { EmergencyContact } from "./driver/EmergencyContact";
import { useFormContext } from "react-hook-form";

export const DriverInfo = () => {
  return (
    <div className="space-y-6">
      <BasicInfo />
      <ContactInfo />
      <LicenseInfo />
      <EmergencyContact />
    </div>
  );
};
