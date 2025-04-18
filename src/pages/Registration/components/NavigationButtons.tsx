
import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  selectedTab: string;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const NavigationButtons = ({
  selectedTab,
  onPrevious,
  onNext,
  onSubmit,
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between mt-6">
      <Button 
        variant="outline" 
        onClick={onPrevious}
        disabled={selectedTab === "personal"}
      >
        Précédent
      </Button>
      
      {selectedTab === "equipment" ? (
        <Button onClick={onSubmit}>Finaliser l'inscription</Button>
      ) : (
        <Button onClick={onNext}>Suivant</Button>
      )}
    </div>
  );
};
