
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const OrganizerSpace = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-[#222222] shadow-sm border-b border-red-800">
        <div className="container mx-auto py-4 px-4 md:px-6">
          <h1 className="text-3xl font-bold text-red-500">Espace Organisateur</h1>
          <p className="text-gray-300">Gestion des rallyes et épreuves</p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-[#1a1a1a] border-red-900 text-white hover:bg-[#222222] transition-colors">
            <CardHeader>
              <CardTitle className="text-red-500">Rallyes</CardTitle>
              <CardDescription className="text-gray-400">
                Gérez vos rallyes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Créez et modifiez vos rallyes, gérez les inscriptions et suivez le déroulement des épreuves.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-red-900 text-white hover:bg-[#222222] transition-colors">
            <CardHeader>
              <CardTitle className="text-red-500">Participants</CardTitle>
              <CardDescription className="text-gray-400">
                Liste des participants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Consultez la liste des participants, validez les inscriptions et gérez les dossiers.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-red-900 text-white hover:bg-[#222222] transition-colors">
            <CardHeader>
              <CardTitle className="text-red-500">Statistiques</CardTitle>
              <CardDescription className="text-gray-400">
                Statistiques des rallyes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Visualisez les statistiques de participation et les résultats des rallyes.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OrganizerSpace;
