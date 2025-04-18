
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Registration {
  id: string;
  rally: {
    name: string;
    start_date: string;
  };
  status: string;
}

const RegistrationList = ({ userId }: { userId?: string }) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (userId) {
      fetchRegistrations();
    }
  }, [userId]);

  const fetchRegistrations = async () => {
    const { data, error } = await supabase
      .from('registrations')
      .select(`
        *,
        rally:rallies(name, start_date)
      `)
      .eq('driver_id', userId);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger vos inscriptions",
        variant: "destructive",
      });
      return;
    }

    setRegistrations(data);
  };

  if (!registrations.length) {
    return <p className="text-gray-400">Aucune inscription en cours</p>;
  }

  return (
    <div className="space-y-2">
      {registrations.map((registration) => (
        <div
          key={registration.id}
          className="p-3 rounded-lg bg-[#2a2a2a] hover:bg-[#333333] transition-colors"
        >
          <h3 className="font-medium text-red-400">
            {registration.rally.name}
          </h3>
          <p className="text-sm text-gray-400">
            Date: {new Date(registration.rally.start_date).toLocaleDateString()}
          </p>
          <span className={`text-xs px-2 py-1 rounded-full ${
            registration.status === 'pending' ? 'bg-yellow-800 text-yellow-200' :
            registration.status === 'accepted' ? 'bg-green-800 text-green-200' :
            'bg-red-800 text-red-200'
          }`}>
            {registration.status === 'pending' ? 'En attente' :
             registration.status === 'accepted' ? 'Acceptée' : 'Refusée'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RegistrationList;
