
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PrintRegistrationButtonProps {
  registrationData?: any;
  type: "registration" | "equipment";
}

const PrintRegistrationButton = ({ registrationData, type }: PrintRegistrationButtonProps) => {
  const { toast } = useToast();

  const handlePrint = () => {
    if (!registrationData) {
      toast({
        title: "Erreur",
        description: "Aucune donnée disponible à imprimer",
        variant: "destructive",
      });
      return;
    }

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({
        title: "Erreur",
        description: "Impossible d'ouvrir la fenêtre d'impression",
        variant: "destructive",
      });
      return;
    }

    // Generate HTML content based on type
    const content = type === "registration" ? generateRegistrationHTML(registrationData) : generateEquipmentHTML(registrationData);

    // Write content to the new window
    printWindow.document.write(`
      <html>
        <head>
          <title>Impression ${type === "registration" ? "Fiche d'Engagement" : "Fiche d'Équipement"}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; text-align: center; }
            .section { margin-bottom: 20px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .field { margin-bottom: 10px; }
            .label { font-weight: bold; }
            @media print {
              body { padding: 0; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          ${content}
          <button onclick="window.print();" style="margin: 20px 0; padding: 10px 20px;">Imprimer</button>
        </body>
      </html>
    `);
  };

  const generateRegistrationHTML = (data: any) => `
    <h1>Fiche d'Engagement FFSA</h1>
    <div class="section">
      <h2>Pilote</h2>
      <div class="grid">
        <div class="field">
          <div class="label">Nom</div>
          <div>${data.lastName || ''}</div>
        </div>
        <div class="field">
          <div class="label">Prénom</div>
          <div>${data.firstName || ''}</div>
        </div>
        <div class="field">
          <div class="label">Date de naissance</div>
          <div>${data.birthDate || ''}</div>
        </div>
        <div class="field">
          <div class="label">Nationalité</div>
          <div>${data.nationality || ''}</div>
        </div>
        <div class="field">
          <div class="label">Adresse</div>
          <div>${data.address || ''}</div>
        </div>
        <div class="field">
          <div class="label">License</div>
          <div>${data.licenseNumber || ''}</div>
        </div>
      </div>
    </div>
  `;

  const generateEquipmentHTML = (data: any) => `
    <h1>Fiche d'Équipement de Sécurité</h1>
    <div class="section">
      <h2>Équipement Pilote</h2>
      <div class="grid">
        <div class="field">
          <div class="label">Casque</div>
          <div>Marque: ${data.helmet_brand || ''}</div>
          <div>Modèle: ${data.helmet_model || ''}</div>
          <div>Homologation: ${data.helmet_homologation || ''}</div>
        </div>
        <div class="field">
          <div class="label">Combinaison</div>
          <div>Marque: ${data.suit_brand || ''}</div>
          <div>Homologation: ${data.suit_homologation || ''}</div>
        </div>
      </div>
    </div>
  `;

  return (
    <Button 
      onClick={handlePrint}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <Printer className="w-4 h-4" />
      Imprimer
    </Button>
  );
};

export default PrintRegistrationButton;
