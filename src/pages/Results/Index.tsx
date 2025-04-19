
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RallyResults } from "./components/RallyResults";
import { StageResults } from "./components/StageResults";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BackButton } from "@/components/navigation/BackButton";

const ResultsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-[#222222] shadow-sm border-b border-red-800">
        <div className="container mx-auto py-4 px-4 md:px-6">
          <div className="flex items-center gap-4 mb-2">
            <BackButton />
            <h1 className="text-3xl font-bold text-red-500">Résultats</h1>
          </div>
          <p className="text-gray-300">Consultez les résultats des rallyes</p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 md:px-6">
        <Card className="bg-[#1a1a1a] border-red-900">
          <CardHeader>
            <CardTitle className="text-red-500">Classements</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="rally" className="space-y-4">
              <TabsList className="bg-[#222222] border-red-900">
                <TabsTrigger value="rally" className="data-[state=active]:bg-red-900">
                  Par Rallye
                </TabsTrigger>
                <TabsTrigger value="stage" className="data-[state=active]:bg-red-900">
                  Par Étape
                </TabsTrigger>
              </TabsList>
              <TabsContent value="rally">
                <RallyResults />
              </TabsContent>
              <TabsContent value="stage">
                <StageResults />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ResultsPage;
