
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

const Statistics = () => {
  const { toast } = useToast();

  const { data: rallyStats } = useQuery({
    queryKey: ["rallyStats"],
    queryFn: async () => {
      const { data: rallies, error } = await supabase
        .from("rallies")
        .select("status, id");

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les statistiques des rallyes",
          variant: "destructive",
        });
        throw error;
      }

      // Calculer les stats des rallyes
      const stats = rallies.reduce((acc, rally) => {
        acc[rally.status] = (acc[rally.status] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(stats).map(([name, value]) => ({
        name,
        value
      }));
    }
  });

  const { data: registrationStats } = useQuery({
    queryKey: ["registrationStats"],
    queryFn: async () => {
      const { data: registrations, error } = await supabase
        .from("registrations")
        .select("status, created_at");

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les statistiques des inscriptions",
          variant: "destructive",
        });
        throw error;
      }

      // Grouper par mois
      const monthlyStats = registrations.reduce((acc, reg) => {
        const month = new Date(reg.created_at).toLocaleDateString('fr-FR', { month: 'long' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(monthlyStats).map(([month, count]) => ({
        month,
        inscriptions: count
      }));
    }
  });

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/organizer" 
            className="flex items-center text-red-500 hover:text-red-400 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Retour
          </Link>
          <h1 className="text-3xl font-bold text-red-500">Statistiques</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Graphique des statuts des rallyes */}
          <Card className="bg-[#1a1a1a] border-red-900">
            <CardHeader>
              <CardTitle className="text-red-500">Statuts des Rallyes</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rallyStats}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {rallyStats?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Graphique des inscriptions par mois */}
          <Card className="bg-[#1a1a1a] border-red-900">
            <CardHeader>
              <CardTitle className="text-red-500">Inscriptions Mensuelles</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={registrationStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#fff"
                  />
                  <YAxis 
                    stroke="#fff"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #333',
                      color: '#fff'
                    }}
                  />
                  <Bar 
                    dataKey="inscriptions" 
                    fill="#FF6B6B"
                    name="Inscriptions"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
