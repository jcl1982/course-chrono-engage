
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import VehicleList from "./components/VehicleList";
import RegistrationList from "./components/RegistrationList";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
      <header className="bg-[#222222] shadow-sm border-b border-red-800">
        <div className="container mx-auto py-4 px-4 md:px-6">
          <h1 className="text-3xl font-bold text-red-500">Espace Pilote</h1>
          <p className="text-gray-300">Bienvenue, {profile?.first_name}</p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-[#1a1a1a] border-red-900 text-white hover:bg-[#222222] transition-colors">
            <CardHeader>
              <CardTitle className="text-red-500">Mes Inscriptions</CardTitle>
              <CardDescription className="text-gray-400">
                Vos inscriptions aux rallyes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegistrationList userId={profile?.id} />
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-red-900 text-white hover:bg-[#222222] transition-colors">
            <CardHeader>
              <CardTitle className="text-red-500">Mes Véhicules</CardTitle>
              <CardDescription className="text-gray-400">
                Vos véhicules enregistrés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VehicleList userId={profile?.id} />
              <Button 
                onClick={() => navigate("/driver/vehicle/new")}
                className="w-full mt-4 bg-red-600 hover:bg-red-700"
              >
                Ajouter un véhicule
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-red-900 text-white hover:bg-[#222222] transition-colors">
            <CardHeader>
              <CardTitle className="text-red-500">Mes Résultats</CardTitle>
              <CardDescription className="text-gray-400">
                Vos résultats aux rallyes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Consultez vos résultats et performances aux différentes épreuves.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DriverSpace;
