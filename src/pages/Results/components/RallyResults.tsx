
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy } from "lucide-react";

export const RallyResults = () => {
  const { data: results, isLoading } = useQuery({
    queryKey: ["rally-results"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rally_results_complete')
        .select('*')
        .order('rally_date', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <p className="text-gray-400">Chargement des résultats...</p>;
  }

  if (!results?.length) {
    return <p className="text-gray-400">Aucun résultat disponible</p>;
  }

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.rally_id]) {
      acc[result.rally_id] = {
        name: result.rally_name,
        date: result.rally_date,
        results: []
      };
    }
    acc[result.rally_id].results.push(result);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedResults).map(([rallyId, rally]: [string, any]) => (
        <div key={rallyId} className="space-y-2">
          <h3 className="text-xl font-semibold text-red-500 flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            {rally.name} - {format(new Date(rally.date), 'PPP', { locale: fr })}
          </h3>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-red-950/50">
                <TableHead className="text-red-500">Position</TableHead>
                <TableHead className="text-red-500">Pilote</TableHead>
                <TableHead className="text-red-500">Étape</TableHead>
                <TableHead className="text-red-500">Temps</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rally.results.map((result) => (
                <TableRow key={result.id} className="hover:bg-red-950/50">
                  <TableCell className="font-medium">{result.position}</TableCell>
                  <TableCell>
                    {result.driver_first_name} {result.driver_last_name}
                  </TableCell>
                  <TableCell>{result.stage_name}</TableCell>
                  <TableCell>{result.time_seconds}s</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};
