
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const OrganizerGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Current session:", session);
      return session;
    },
  });

  const { data: isOrganizer, isLoading: organizerCheckLoading } = useQuery({
    queryKey: ["isOrganizer", session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      console.log("Checking if user is organizer:", session?.user?.id);
      
      // Première méthode: vérifier directement via le profil
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session?.user?.id)
        .single();
      
      if (profileError) {
        console.error("Error fetching profile:", profileError);
      } else {
        console.log("User profile data:", profileData);
        if (profileData?.role === 'organizer') {
          return true;
        }
      }
      
      // Seconde méthode: utiliser la fonction RPC is_organizer (backup)
      const { data, error } = await supabase.rpc('is_organizer', {
        user_id: session?.user?.id
      });
      
      if (error) {
        console.error("Error checking organizer status:", error);
        toast({
          title: "Erreur",
          description: "Impossible de vérifier vos permissions",
          variant: "destructive",
        });
        return false;
      }
      
      console.log("is_organizer RPC result:", data);
      return data;
    },
  });

  useEffect(() => {
    if (sessionLoading || organizerCheckLoading) {
      // Attendre que les vérifications soient terminées
      return;
    }
    
    if (!session) {
      console.log("No session, redirecting to auth");
      navigate("/auth");
    } else if (isOrganizer === false) {
      console.log("User is not an organizer, redirecting to home");
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les permissions nécessaires pour accéder à l'espace organisateur",
        variant: "destructive",
      });
      navigate("/");
    } else {
      console.log("User confirmed as organizer, granting access");
    }
  }, [session, isOrganizer, sessionLoading, organizerCheckLoading, navigate]);

  if (sessionLoading || organizerCheckLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto"></div>
        <p className="mt-4 text-red-500">Vérification des permissions...</p>
      </div>
    </div>;
  }

  if (!session || isOrganizer === false) {
    return null;
  }

  return <>{children}</>;
};
