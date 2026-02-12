import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import { ProductConfigurator3D } from "@/components/product-configurator-3d";

const productTypes = [
  { type: "cup" as const, label: "Pappbecher", description: "Heiss- und Kaltgetraenke" },
  { type: "bag" as const, label: "Papiertuete", description: "Tragetaschen" },
  { type: "box" as const, label: "Lebensmittelbox", description: "Food-Container" },
];

export default function Configurator() {
  const [selectedType, setSelectedType] = useState<"cup" | "bag" | "box">("cup");

  useSEO({
    title: "3D Konfigurator",
    description: "Gestalten Sie Ihre Verpackung individuell mit unserem 3D-Konfigurator. Logo hochladen, Farbe waehlen und live in 3D ansehen.",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" data-testid="page-configurator">
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-4">
          <Box className="w-3 h-3 mr-1" />
          3D Live-Vorschau
        </Badge>
        <h1 className="text-3xl font-bold mb-3" data-testid="text-configurator-title">
          Verpackung individuell gestalten
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Waehlen Sie einen Verpackungstyp, laden Sie Ihr Logo hoch und sehen Sie das Ergebnis sofort in 3D. Drehen und zoomen Sie das Modell frei.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {productTypes.map((pt) => (
          <Card
            key={pt.type}
            className={`p-4 cursor-pointer transition-all ${
              selectedType === pt.type
                ? "ring-2 ring-primary"
                : "hover-elevate"
            }`}
            onClick={() => setSelectedType(pt.type)}
            data-testid={`card-type-${pt.type}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-md flex items-center justify-center ${
                selectedType === pt.type ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                <Box className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">{pt.label}</h3>
                <p className="text-sm text-muted-foreground">{pt.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="max-w-xl mx-auto">
        <ProductConfigurator3D
          productType={selectedType}
          productName={productTypes.find(p => p.type === selectedType)?.label || "Produkt"}
        />
      </div>

      <div className="text-center mt-8">
        <p className="text-muted-foreground mb-4">
          Gefaellt Ihnen das Design? Bestellen Sie direkt aus unserem Produktkatalog.
        </p>
        <Link href="/produkte">
          <Button size="lg" data-testid="button-to-products">
            Alle Produkte ansehen
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
