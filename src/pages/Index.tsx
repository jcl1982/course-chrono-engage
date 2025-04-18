
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4 md:px-6">
          <h1 className="text-3xl font-bold text-gray-900">Chrono Engage</h1>
          <p className="text-gray-600">Plateforme de gestion des rallyes</p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Inscription</CardTitle>
              <CardDescription>
                Inscrivez-vous pour les prochains rallyes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Remplissez le formulaire d'inscription pour participer aux prochains rallyes. 
                Fournissez les informations sur votre véhicule et vos équipements.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/registration">
                <Button>S'inscrire</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calendrier</CardTitle>
              <CardDescription>
                Calendrier des prochains événements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Consultez le calendrier des prochains rallyes et événements. 
                Planifiez votre saison et ne manquez aucun événement.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Voir le calendrier</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Résultats</CardTitle>
              <CardDescription>
                Consultez les résultats des rallyes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Retrouvez les résultats des rallyes précédents. 
                Classements, temps, et statistiques détaillées.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Voir les résultats</Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="bg-white shadow-inner mt-8">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Chrono Engage - Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
