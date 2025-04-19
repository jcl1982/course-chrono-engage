
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button 
      variant="outline" 
      size="icon"
      onClick={() => navigate(-1)}
      className="border-red-500 text-red-500 hover:bg-red-950"
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
};
