
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/organizer" element={<OrganizerSpace />} />
          <Route path="/driver" element={<DriverSpace />} />
          <Route path="/driver/vehicle/new" element={<VehicleNew />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
