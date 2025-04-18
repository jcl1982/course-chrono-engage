
import { Button } from "@/components/ui/button";
import { LogOut, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }

      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès",
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Erreur de déconnexion",
        description: error.message || "Une erreur est survenue lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        className="border-red-700 text-red-500 hover:bg-red-900/20"
        onClick={handleHome}
      >
        <Home className="mr-2 h-4 w-4" />
        Accueil
      </Button>
      <Button 
        variant="destructive" 
        className="bg-red-700 hover:bg-red-800"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Déconnexion
      </Button>
    </div>
  );
};
