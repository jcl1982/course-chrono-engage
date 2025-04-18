
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const RallyResults = ({ userId }: { userId?: string }) => {
  const [results, setResults] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (userId) {
      fetchResults();
    }
  }, [userId]);

  const fetchResults = async () => {
    const { data, error } = await supabase
      .from('registrations')
      .select(`
        *,
        rally:rallies(name, start_date)
      `)
      .eq('driver_id', userId)
      .eq('status', 'completed');

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger vos résultats",
        variant: "destructive",
      });
      return;
    }

    setResults(data || []);
  };

  if (!results.length) {
    return <p className="text-gray-400">Aucun résultat disponible</p>;
  }

  return (
    <div className="space-y-2">
      {results.map((result) => (
        <div
          key={result.id}
          className="p-3 rounded-lg bg-[#2a2a2a] hover:bg-[#333333] transition-colors"
        >
          <h3 className="font-medium text-red-400">
            {result.rally.name}
          </h3>
          <p className="text-sm text-gray-400">
            Date: {new Date(result.rally.start_date).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RallyResults;
