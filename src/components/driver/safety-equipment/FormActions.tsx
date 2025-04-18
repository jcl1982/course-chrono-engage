
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FormActions = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end space-x-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => navigate('/driver')}
      >
        Annuler
      </Button>
      <Button type="submit">
        Enregistrer
      </Button>
    </div>
  );
};

export default FormActions;
