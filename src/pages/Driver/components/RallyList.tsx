
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const RallyList = ({ userId }: { userId?: string }) => {
  const [rallies, setRallies] = useState<any[]>([]);
  const [registeredRallies, setRegisteredRallies] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchRallies();
      fetchUserRegistrations();
    }
  }, [userId]);

  const fetchRallies = async () => {
    const { data, error } = await supabase
      .from('rallies')
      .select('*')
      .eq('registration_open', true)
      .order('start_date', { ascending: true });

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les rallyes",
        variant: "destructive",
      });
      return;
    }

    setRallies(data || []);
  };

  const fetchUserRegistrations = async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from('registrations')
      .select('rally_id')
      .eq('driver_id', userId);

    if (error) {
      console.error("Error fetching registrations:", error);
      return;
    }

    setRegisteredRallies(data.map(reg => reg.rally_id));
  };

  const handleRegister = async (rallyId: string) => {
    if (!userId) {
      toast({
        title: "Non authentifié",
        description: "Veuillez vous connecter pour vous inscrire à un rallye",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    try {
      const { error } = await supabase
        .from('registrations')
        .insert([{
          driver_id: userId,
          rally_id: rallyId,
          status: 'pending'
        }]);

      if (error) throw error;

      await fetchUserRegistrations();
      toast({
        title: "Inscription réussie",
        description: "Votre inscription au rallye a été enregistrée"
      });
    } catch (error) {
      console.error("Error registering for rally:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
    }
  };

  if (!rallies.length) {
    return <p className="text-gray-400">Aucun rallye ouvert aux inscriptions</p>;
  }

  return (
    <div className="space-y-2">
      {rallies.map((rally) => (
        <div
          key={rally.id}
          className="p-3 rounded-lg bg-[#2a2a2a] hover:bg-[#333333] transition-colors"
        >
          <h3 className="font-medium text-red-400">{rally.name}</h3>
          <p className="text-sm text-gray-400">
            Date: {new Date(rally.start_date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-400 mb-2">
            Lieu: {rally.location}
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-red-800 text-red-400 hover:bg-red-900/20"
            onClick={() => handleRegister(rally.id)}
            disabled={registeredRallies.includes(rally.id)}
          >
            {registeredRallies.includes(rally.id) ? 'Déjà inscrit' : 'S\'inscrire'}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default RallyList;
