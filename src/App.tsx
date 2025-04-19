
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DriverDashboard from "./pages/Driver/Index";
import RegistrationForm from "./pages/Registration/RegistrationForm";
import ResultsPage from "./pages/Results/Index";
import SafetyEquipmentForm from "./pages/Driver/SafetyEquipmentForm";
import EquipmentForm from "./components/driver/equipment-form/EquipmentForm";
import Index from "./pages/Index";
import VehicleNew from "./pages/Driver/VehicleNew";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/driver" element={<DriverDashboard />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/driver/equipment/new" element={<EquipmentForm />} />
        <Route path="/driver/equipment/:id" element={<SafetyEquipmentForm />} />
        <Route path="/driver/equipment/copilot/new" element={<SafetyEquipmentForm />} />
        <Route path="/driver/vehicle/new" element={<VehicleNew />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
