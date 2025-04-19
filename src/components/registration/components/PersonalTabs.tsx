
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DriverInfo } from "./DriverInfo";
import { CoPilotInfo } from "./CoPilotInfo";
import { EventType } from "@/pages/Registration/RegistrationForm";

interface PersonalTabsProps {
  eventType: EventType;
}

export const PersonalTabs = ({ eventType }: PersonalTabsProps) => {
  if (eventType !== 'rally') {
    return <DriverInfo />;
  }

  return (
    <Tabs defaultValue="driver" className="w-full space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="driver">Pilote</TabsTrigger>
        <TabsTrigger value="copilot">Co-Pilote</TabsTrigger>
      </TabsList>

      <TabsContent value="driver">
        <DriverInfo />
      </TabsContent>

      <TabsContent value="copilot">
        <CoPilotInfo />
      </TabsContent>
    </Tabs>
  );
};
