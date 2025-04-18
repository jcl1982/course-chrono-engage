
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FormActionsProps {
  submitting?: boolean;
}

const FormActions = ({ submitting = false }: FormActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end space-x-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => navigate('/driver')}
        disabled={submitting}
      >
        Annuler
      </Button>
      <Button type="submit" disabled={submitting}>
        {submitting ? "Enregistrement en cours..." : "Enregistrer"}
      </Button>
    </div>
  );
};

export default FormActions;
