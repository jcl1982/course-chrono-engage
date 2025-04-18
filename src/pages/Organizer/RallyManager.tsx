
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { RallyTable } from "@/components/rally/RallyTable";

const RallyManager = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-red-500 mb-2">Gestion des Rallyes</h1>
          <p className="text-gray-400">Gérez vos rallyes, leurs étapes et les inscriptions</p>
        </div>
        <Button 
          onClick={() => toast({ title: "Bientôt disponible", description: "La création de rallye sera disponible prochainement" })}
          className="bg-red-500 hover:bg-red-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Rallye
        </Button>
      </div>

      <div className="grid gap-6">
        <RallyTable />
      </div>
    </div>
  );
};

export default RallyManager;
