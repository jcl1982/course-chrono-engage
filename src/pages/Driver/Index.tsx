
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import DriverHeader from "./components/DriverHeader";
import DashboardGrid from "./components/DashboardGrid";

const DriverSpace = () => {
  const [profile, setProfile] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Non authentifié",
        description: "Veuillez vous connecter pour accéder à l'espace pilote",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger votre profil",
        variant: "destructive",
      });
      return;
    }

    setProfile(profile);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <DriverHeader firstName={profile?.first_name} />
      <main className="container mx-auto py-8 px-4 md:px-6">
        <DashboardGrid userId={profile?.id} />
      </main>
    </div>
  );
};

export default DriverSpace;
