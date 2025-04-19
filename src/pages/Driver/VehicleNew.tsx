
import VehicleForm from "@/components/registration/VehicleForm";
import { BackButton } from "@/components/navigation/BackButton";
import { useLocation, useNavigate } from "react-router-dom";

const VehicleNew = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBack = () => {
    // Check if we came from the registration form
    if (location.state?.from === 'registration') {
      navigate(-1);
    } else {
      navigate("/driver");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-[#222222] shadow-sm border-b border-red-800">
        <div className="container mx-auto py-4 px-4 md:px-6">
          <div className="flex items-center gap-4 mb-2">
            <BackButton />
            <h1 className="text-3xl font-bold text-red-500">Ajouter un véhicule</h1>
          </div>
          <p className="text-gray-300">Renseignez les informations de votre véhicule</p>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <VehicleForm onSuccess={handleBack} />
        </div>
      </main>
    </div>
  );
};

export default VehicleNew;
