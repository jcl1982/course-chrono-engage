import VehicleForm from "@/components/registration/VehicleForm";

const VehicleNew = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-[#222222] shadow-sm border-b border-red-800">
        <div className="container mx-auto py-4 px-4 md:px-6">
          <h1 className="text-3xl font-bold text-red-500">Ajouter un véhicule</h1>
          <p className="text-gray-300">Renseignez les informations de votre véhicule</p>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <VehicleForm />
        </div>
      </main>
    </div>
  );
};

export default VehicleNew;
