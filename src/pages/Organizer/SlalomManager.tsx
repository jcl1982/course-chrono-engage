
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { OrganizerGuard } from "@/components/auth/OrganizerGuard";
import { BackButton } from "@/components/navigation/BackButton";

const SlalomManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <OrganizerGuard>
      <div className="min-h-screen bg-black text-white p-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <BackButton />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-red-500">Gestion des Slaloms</h1>
              <p className="text-gray-400">Gérez vos épreuves de slalom et les inscriptions</p>
            </div>
            <Button 
              onClick={() => setIsFormOpen(true)}
              className="bg-red-500 hover:bg-red-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Slalom
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Table component will be added later */}
          <p className="text-gray-400">Fonctionnalité en cours de développement</p>
        </div>
      </div>
    </OrganizerGuard>
  );
};

export default SlalomManager;
