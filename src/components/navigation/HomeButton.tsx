
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <Button 
      variant="outline" 
      className="border-red-700 text-red-500 hover:bg-red-900/20"
      onClick={() => navigate("/")}
    >
      <Home className="mr-2 h-4 w-4" />
      Accueil
    </Button>
  );
};
