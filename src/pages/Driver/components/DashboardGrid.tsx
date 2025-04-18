import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DashboardCard from "./DashboardCard";
import VehicleList from "./VehicleList";
import RegistrationList from "./RegistrationList";
import RallyList from "./RallyList";

interface DashboardGridProps {
  userId?: string;
}

const DashboardGrid: FC<DashboardGridProps> = ({ userId }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard
        title="Rallyes à venir"
        description="Liste des rallyes ouverts aux inscriptions"
      >
        <RallyList userId={userId} />
      </DashboardCard>

      <DashboardCard
        title="Mes Inscriptions"
        description="Vos inscriptions aux rallyes"
      >
        <RegistrationList userId={userId} />
      </DashboardCard>

      <DashboardCard
        title="Mes Véhicules"
        description="Vos véhicules enregistrés"
      >
        <VehicleList userId={userId} />
        <Button 
          onClick={() => navigate("/driver/vehicle/new")}
          className="w-full mt-4 bg-red-600 hover:bg-red-700"
        >
          Ajouter un véhicule
        </Button>
      </DashboardCard>

      <DashboardCard
        title="Mes Résultats"
        description="Vos résultats aux rallyes"
      >
        <p className="text-gray-300">
          Consultez vos résultats et performances aux différentes épreuves.
        </p>
      </DashboardCard>
    </div>
  );
};

export default DashboardGrid;
