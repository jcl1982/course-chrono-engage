
import { useToast } from "@/hooks/use-toast";

const RallyManager = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-red-500 mb-6">Gestion des Rallyes</h1>
      <div className="grid gap-6">
        {/* Rally management features will be added here */}
        <p className="text-gray-300">Fonctionnalité en cours de développement</p>
      </div>
    </div>
  );
};

export default RallyManager;
