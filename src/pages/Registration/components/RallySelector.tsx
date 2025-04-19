
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RallySelectorProps {
  onRallySelect: (rallyId: string) => void;
  selectedRallyId?: string;
}

export const RallySelector = ({ onRallySelect, selectedRallyId }: RallySelectorProps) => {
  const [rallies, setRallies] = useState<any[]>([]);

  useEffect(() => {
    const fetchRallies = async () => {
      const { data, error } = await supabase
        .from('rallies')
        .select('*')
        .eq('registration_open', true)
        .order('start_date', { ascending: true });

      if (!error && data) {
        setRallies(data);
      }
    };

    fetchRallies();
  }, []);

  if (rallies.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Aucun rallye n'est actuellement ouvert aux inscriptions
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <Select value={selectedRallyId} onValueChange={onRallySelect}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner un rallye" />
        </SelectTrigger>
        <SelectContent>
          {rallies.map((rally) => (
            <SelectItem key={rally.id} value={rally.id}>
              {rally.name} - {new Date(rally.start_date).toLocaleDateString()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
