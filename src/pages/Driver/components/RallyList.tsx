
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Rally {
  id: string;
  name: string;
  location: string;
  start_date: string;
  registration_open: boolean;
  registration_deadline: string | null;
}

const RallyList = ({ userId }: { userId?: string }) => {
  const [rallies, setRallies] = useState<Rally[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRallies();
  }, []);

  const fetchRallies = async () => {
    const { data, error } = await supabase
      .from('rallies')
      .select('*')
      .eq('is_upcoming', true)
      .order('start_date', { ascending: true });

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste des rallyes",
        variant: "destructive",
      });
      return;
    }

    setRallies(data);
  };

  const handleRegistration = async (rallyId: string) => {
    if (!userId) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour vous inscrire",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('registrations')
      .insert({
        driver_id: userId,
        rally_id: rallyId,
      });

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de vous inscrire au rallye",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Succès",
      description: "Votre inscription a été enregistrée",
    });
    
    fetchRallies();
  };

  if (!rallies.length) {
    return <p className="text-gray-400">Aucun rallye à venir</p>;
  }

  return (
    <div className="space-y-4">
      {rallies.map((rally) => (
        <div
          key={rally.id}
          className="p-4 rounded-lg bg-[#2a2a2a] hover:bg-[#333333] transition-colors"
        >
          <h3 className="font-medium text-xl text-red-400">
            {rally.name}
          </h3>
          <p className="text-gray-300">
            Lieu: {rally.location}
          </p>
          <p className="text-gray-300">
            Date: {new Date(rally.start_date).toLocaleDateString()}
          </p>
          {rally.registration_deadline && (
            <p className="text-gray-400 text-sm">
              Date limite d'inscription: {new Date(rally.registration_deadline).toLocaleDateString()}
            </p>
          )}
          <div className="mt-4">
            {rally.registration_open ? (
              <Button 
                onClick={() => handleRegistration(rally.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                S'inscrire
              </Button>
            ) : (
              <span className="text-gray-400">Inscriptions fermées</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RallyList;
