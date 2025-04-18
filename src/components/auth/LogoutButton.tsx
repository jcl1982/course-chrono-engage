
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { HomeButton } from "@/components/navigation/HomeButton";
import { useLogout } from "@/hooks/use-logout";

export const LogoutButton = () => {
  const { logout } = useLogout();

  return (
    <div className="flex gap-2">
      <HomeButton />
      <Button 
        variant="destructive" 
        className="bg-red-700 hover:bg-red-800"
        onClick={logout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Déconnexion
      </Button>
    </div>
  );
};
