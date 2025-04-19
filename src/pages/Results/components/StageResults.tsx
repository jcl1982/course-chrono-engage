
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Flag } from "lucide-react";

export const StageResults = () => {
  const { data: results, isLoading } = useQuery({
    queryKey: ["stage-results"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rally_results_complete')
        .select('*')
        .order('stage_name', { ascending: true })
        .order('position', { ascending: true });

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
    if (!acc[result.stage_id]) {
      acc[result.stage_id] = {
        name: result.stage_name,
        rallyName: result.rally_name,
        results: []
      };
    }
    acc[result.stage_id].results.push(result);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedResults).map(([stageId, stage]: [string, any]) => (
        <div key={stageId} className="space-y-2">
          <h3 className="text-xl font-semibold text-red-500 flex items-center gap-2">
            <Flag className="h-5 w-5" />
            {stage.name} - {stage.rallyName}
          </h3>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-red-950/50">
                <TableHead className="text-red-500">Position</TableHead>
                <TableHead className="text-red-500">Pilote</TableHead>
                <TableHead className="text-red-500">Temps</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stage.results.map((result) => (
                <TableRow key={result.id} className="hover:bg-red-950/50">
                  <TableCell className="font-medium">{result.position}</TableCell>
                  <TableCell>
                    {result.driver_first_name} {result.driver_last_name}
                  </TableCell>
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
