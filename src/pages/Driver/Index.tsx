
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DriverSpace = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-[#222222] shadow-sm border-b border-red-800">
        <div className="container mx-auto py-4 px-4 md:px-6">
          <h1 className="text-3xl font-bold text-red-500">Espace Pilote</h1>
          <p className="text-gray-300">Gestion de vos participations</p>
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
              <p className="text-gray-300">
                Consultez vos inscriptions en cours et l'historique de vos participations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-red-900 text-white hover:bg-[#222222] transition-colors">
            <CardHeader>
              <CardTitle className="text-red-500">Mon Véhicule</CardTitle>
              <CardDescription className="text-gray-400">
                Informations sur votre véhicule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Gérez les informations techniques et les documents de votre véhicule.
              </p>
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
