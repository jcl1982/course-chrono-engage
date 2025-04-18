
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, MapPin, Users } from "lucide-react";
import { type Database } from "@/integrations/supabase/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Rally = Database["public"]["Tables"]["rallies"]["Row"];

export const RallyTable = () => {
  const { data: rallies, isLoading } = useQuery({
    queryKey: ["rallies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rallies")
        .select("*")
        .order("start_date", { ascending: true });

      if (error) throw error;
      return data as Rally[];
    },
  });

  if (isLoading) {
    return <p className="text-gray-400">Chargement des rallyes...</p>;
  }

  return (
    <div className="rounded-md border border-red-900 bg-[#1a1a1a]">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-red-950/50">
            <TableHead className="text-red-500">Nom</TableHead>
            <TableHead className="text-red-500">Localisation</TableHead>
            <TableHead className="text-red-500">Date</TableHead>
            <TableHead className="text-red-500">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rallies?.map((rally) => (
            <TableRow key={rally.id} className="hover:bg-red-950/50">
              <TableCell className="font-medium text-white">{rally.name}</TableCell>
              <TableCell className="text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-500" />
                  {rally.location}
                </div>
              </TableCell>
              <TableCell className="text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-red-500" />
                  {formatDistance(new Date(rally.start_date), new Date(), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-red-500" />
                  <span 
                    className={`rounded-full px-2 py-1 text-xs ${
                      rally.registration_open 
                        ? "bg-green-500/20 text-green-500" 
                        : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {rally.registration_open ? "Inscriptions ouvertes" : "Inscriptions fermées"}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
