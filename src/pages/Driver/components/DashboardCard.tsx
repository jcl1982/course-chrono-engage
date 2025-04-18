
import { FC, ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

const DashboardCard: FC<DashboardCardProps> = ({ title, description, children }) => {
  return (
    <Card className="bg-[#1a1a1a] border-red-900 text-white hover:bg-[#222222] transition-colors">
      <CardHeader>
        <CardTitle className="text-red-500">{title}</CardTitle>
        <CardDescription className="text-gray-400">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
