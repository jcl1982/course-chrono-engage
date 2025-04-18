
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy } from "lucide-react";

interface RallyResult {
  rally_name: string;
  stage_name: string;
  position: number;
  total_time: string;
  status: string;
}

const RallyResults = ({ userId }: { userId?: string }) => {
  const [results, setResults] = useState<RallyResult[]>([]);
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
        rally:rallies(name),
        status
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

    // For demo purposes, we'll generate some example results
    // In a real app, this would come from a results table in the database
    const demoResults = data.map((reg: any) => ({
      rally_name: reg.rally.name,
      stage_name: "Spéciale 1",
      position: Math.floor(Math.random() * 10) + 1,
      total_time: `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      status: reg.status
    }));

    setResults(demoResults);
  };

  if (!results.length) {
    return (
      <p className="text-gray-400">
        Vous n'avez pas encore de résultats disponibles.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rallye</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Temps</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={index}>
              <TableCell>{result.rally_name}</TableCell>
              <TableCell className="flex items-center gap-2">
                {result.position}
                {result.position <= 3 && (
                  <Trophy className={
                    result.position === 1 ? "text-yellow-500" :
                    result.position === 2 ? "text-gray-400" :
                    "text-amber-600"
                  } />
                )}
              </TableCell>
              <TableCell>{result.total_time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RallyResults;
