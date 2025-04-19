
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useRallyDetails = () => {
  const [rallyDetails, setRallyDetails] = useState<any>(null);
  const { rallyId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRally = async () => {
      if (rallyId) {
        const { data, error } = await supabase
          .from('rallies')
          .select('*')
          .eq('id', rallyId)
          .single();

        if (error) {
          console.error('Error fetching rally:', error);
          toast({
            title: "Erreur",
            description: "Impossible de charger les informations du rallye",
            variant: "destructive",
          });
          return;
        }

        if (data) {
          setRallyDetails(data);
        } else {
          toast({
            title: "Rallye non trouvé",
            description: "Le rallye spécifié n'existe pas",
            variant: "destructive",
          });
          navigate("/");
        }
      }
    };

    fetchRally();
  }, [rallyId, toast, navigate]);

  const setSelectedRally = async (id: string) => {
    const { data, error } = await supabase
      .from('rallies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les informations du rallye",
        variant: "destructive",
      });
      return;
    }

    if (data) {
      setRallyDetails(data);
    }
  };

  return {
    rallyDetails,
    setSelectedRally,
  };
};
