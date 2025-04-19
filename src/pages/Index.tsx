import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1612894668435-54e7719596d1?q=80&w=2000")',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <header className="bg-[#222222]/90 shadow-sm border-b border-red-800">
          <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/2287430e-f1d1-4b1f-9d69-6eb49e27036f.png" 
                alt="Association Sportive Automobile de Guadeloupe" 
                className="h-12 w-12"
              />
              <div>
                <h1 className="text-3xl font-bold text-red-500">Chrono Engage</h1>
                <p className="text-gray-300">Plateforme de gestion des rallyes</p>
              </div>
            </div>
            <Link to="/auth">
              <Button variant="destructive" className="bg-red-700 hover:bg-red-800">
                Connexion
              </Button>
            </Link>
          </div>
        </header>

        <main className="container mx-auto py-8 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-[#1a1a1a] border-red-900 text-white hover:bg-[#222222] transition-colors">
              <CardHeader>
                <CardTitle className="text-red-500">Espace Organisateur</CardTitle>
                <CardDescription className="text-gray-400">
                  Gérez vos rallyes et épreuves
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Accédez à votre espace dédié pour gérer les rallyes, suivre les inscriptions, 
                  et organiser les épreuves.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/organizer">
                  <Button variant="destructive" className="bg-red-700 hover:bg-red-800">Accéder</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-[#1a1a1a] border-red-900 text-white hover:bg-[#222222] transition-colors">
              <CardHeader>
                <CardTitle className="text-red-500">Espace Pilote</CardTitle>
                <CardDescription className="text-gray-400">
                  Gérez vos participations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Accédez à votre espace personnel pour gérer vos inscriptions, 
                  consulter votre calendrier et vos résultats.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/driver">
                  <Button variant="destructive" className="bg-red-700 hover:bg-red-800">Accéder</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-[#1a1a1a] border-red-900 text-white hover:bg-[#222222] transition-colors">
              <CardHeader>
                <CardTitle className="text-red-500">Inscription</CardTitle>
                <CardDescription className="text-gray-400">
                  Inscrivez-vous pour les prochains rallyes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Remplissez le formulaire d'inscription pour participer aux prochains rallyes. 
                  Fournissez les informations sur votre véhicule et vos équipements.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/registration">
                  <Button variant="destructive" className="bg-red-700 hover:bg-red-800">S'inscrire</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-[#1a1a1a] border-red-900 text-white hover:bg-[#222222] transition-colors">
              <CardHeader>
                <CardTitle className="text-red-500">Calendrier</CardTitle>
                <CardDescription className="text-gray-400">
                  Calendrier des prochains événements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Consultez le calendrier des prochains rallyes et événements. 
                  Planifiez votre saison et ne manquez aucun événement.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/calendar">
                  <Button variant="outline" className="border-red-700 text-red-500 hover:bg-red-900/20">
                    Voir le calendrier
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-[#1a1a1a] border-red-900 text-white hover:bg-[#222222] transition-colors">
              <CardHeader>
                <CardTitle className="text-red-500">Résultats</CardTitle>
                <CardDescription className="text-gray-400">
                  Consultez les résultats des rallyes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Retrouvez les résultats des rallyes précédents. 
                  Classements, temps, et statistiques détaillées.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/results">
                  <Button variant="outline" className="border-red-700 text-red-500 hover:bg-red-900/20">
                    Voir les résultats
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </main>

        <footer className="bg-[#222222]/90 shadow-inner mt-8 border-t border-red-800">
          <div className="container mx-auto py-6 px-4 md:px-6">
            <p className="text-center text-gray-400">
              © {new Date().getFullYear()} Chrono Engage - Tous droits réservés
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
