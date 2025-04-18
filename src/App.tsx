import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RegistrationForm from "./pages/Registration/RegistrationForm";
import OrganizerSpace from "./pages/Organizer/Index";
import DriverSpace from "./pages/Driver/Index";
import VehicleNew from "./pages/Driver/VehicleNew";
import RallyManager from "./pages/Organizer/RallyManager";
import ParticipantManager from "./pages/Organizer/ParticipantManager";
import Statistics from "./pages/Organizer/Statistics";
import Auth from "./pages/Auth";
import SafetyEquipmentForm from "./pages/Driver/SafetyEquipmentForm";
import CalendarPage from "./pages/Calendar/Index";
import ResultsPage from "./pages/Results/Index";
import HillclimbManager from "./pages/Organizer/HillclimbManager";
import SlalomManager from "./pages/Organizer/SlalomManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/organizer" element={<OrganizerSpace />} />
          <Route path="/driver" element={<DriverSpace />} />
          <Route path="/driver/vehicle/new" element={<VehicleNew />} />
          <Route path="/driver/equipment/new" element={<SafetyEquipmentForm />} />
          <Route path="/driver/equipment/copilot/new" element={<SafetyEquipmentForm />} />
          <Route path="/driver/equipment/:id" element={<SafetyEquipmentForm />} />
          <Route path="/driver/equipment/copilot/:id" element={<SafetyEquipmentForm />} />
          <Route path="/organizer/rallies" element={<RallyManager />} />
          <Route path="/organizer/hillclimbs" element={<HillclimbManager />} />
          <Route path="/organizer/slaloms" element={<SlalomManager />} />
          <Route path="/organizer/participants" element={<ParticipantManager />} />
          <Route path="/organizer/statistics" element={<Statistics />} />
          <Route path="/registration/:rallyId" element={<RegistrationForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
