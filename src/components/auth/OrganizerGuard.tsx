
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const OrganizerGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const { data: isOrganizer } = useQuery({
    queryKey: ["isOrganizer", session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('is_organizer', {
        user_id: session?.user?.id
      });
      
      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de vérifier vos permissions",
          variant: "destructive",
        });
        return false;
      }
      
      return data;
    },
  });

  useEffect(() => {
    if (!session) {
      navigate("/auth");
    } else if (isOrganizer === false) {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les permissions nécessaires pour accéder à l'espace organisateur",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [session, isOrganizer, navigate]);

  if (!session || !isOrganizer) {
    return null;
  }

  return <>{children}</>;
};
