
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface NavigationButtonsProps {
  selectedTab: string;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  submitting?: boolean;
}

export const NavigationButtons = ({
  selectedTab,
  onPrevious,
  onNext,
  onSubmit,
  submitting = false,
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between mt-6">
      <Button 
        variant="outline" 
        onClick={onPrevious}
        disabled={selectedTab === "personal" || submitting}
      >
        Précédent
      </Button>
      
      {selectedTab === "equipment" ? (
        <Button 
          onClick={onSubmit} 
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Traitement en cours...
            </>
          ) : (
            "Finaliser l'inscription"
          )}
        </Button>
      ) : (
        <Button 
          onClick={onNext} 
          disabled={submitting}
        >
          Suivant
        </Button>
      )}
    </div>
  );
};
