import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { OrganizerGuard } from "@/components/auth/OrganizerGuard";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Trophy, Users, BarChart, Mountain, Flag } from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";

const OrganizerSpace = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    {
      title: "Rallyes",
      description: "Gérez vos rallyes",
      icon: Trophy,
      href: "/organizer/rallies",
      content: "Créez et modifiez vos rallyes, gérez les inscriptions et suivez le déroulement des épreuves."
    },
    {
      title: "Courses de Côte",
      description: "Gérez vos courses de côte",
      icon: Mountain,
      href: "/organizer/hillclimbs",
      content: "Organisez et gérez vos courses de côte, suivez les inscriptions et les résultats."
    },
    {
      title: "Slaloms",
      description: "Gérez vos slaloms",
      icon: Flag,
      href: "/organizer/slaloms",
      content: "Créez et gérez vos épreuves de slalom, suivez les participants et leurs performances."
    },
    {
      title: "Participants",
      description: "Liste des participants",
      icon: Users,
      href: "/organizer/participants",
      content: "Consultez la liste des participants, validez les inscriptions et gérez les dossiers."
    },
    {
      title: "Statistiques",
      description: "Statistiques des épreuves",
      icon: BarChart,
      href: "/organizer/statistics",
      content: "Visualisez les statistiques de participation et les résultats de toutes les épreuves."
    }
  ];

  return (
    <OrganizerGuard>
      <div className="min-h-screen bg-black text-white">
        <header className="bg-[#222222] shadow-sm border-b border-red-800">
          <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-red-500">Espace Organisateur</h1>
              <p className="text-gray-300">Gestion des rallyes et épreuves</p>
            </div>
            <LogoutButton />
          </div>
        </header>

      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card 
              key={item.title}
              className="bg-[#1a1a1a] border-red-900 text-white hover:bg-[#222222] transition-colors cursor-pointer"
              onClick={() => navigate(item.href)}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <item.icon className="w-6 h-6 text-red-500" />
                  <div>
                    <CardTitle className="text-red-500">{item.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {item.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  {item.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </OrganizerGuard>
  );
};

export default OrganizerSpace;
