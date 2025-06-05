// src/pages/new-property.tsx

import React from "react";
import { Link, useHistory } from "react-router-dom";
import { 
  Card, 
  CardBody, 
  Button, 
  Input,
  Textarea,
  Select,
  SelectItem
} from "@heroui/react";
import { Icon } from "@iconify/react";
// *** ÄNDRAT: Importera saveFastighet från airtableService ***
import { saveFastighet } from "../utils/airtableService";

const NewPropertyPage: React.FC = () => {
  const history = useHistory();
  const [property, setProperty] = React.useState({
    Fastighet: "",
    Adress: "",
    "Typ av fastighet": "",
    LOA: "",
    Byggår: "",
    Notes: ""
  });

  const handlePropertyChange = (field: string, value: any) => {
    setProperty({
      ...property,
      [field]: value
    });
  };

  const handleSubmit = async () => {
    // *** ÄNDRAT: Spara till Airtable med saveFastighet ***
    await saveFastighet({
      Fastighet: property.Fastighet,
      Adress: property.Adress,
      "Typ av fastighet": property["Typ av fastighet"],
      LOA: parseFloat(property.LOA),
      Byggår: parseInt(property.Byggår, 10),
      Notes: property.Notes
    });
    // När saveFastighet är klar, navigera tillbaka
    history.push("/properties");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/properties" className="text-primary hover:underline flex items-center">
              <Icon icon="lucide:chevron-left" className="mr-1" />
              Tillbaka
            </Link>
          </div>
          <h1 className="text-4xl font-bold mt-2">Ny fastighet</h1>
          <p className="text-default-500">Lägg till en ny fastighet i systemet</p>
        </div>
      </div>

      <Card>
        <CardBody className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Grundinformation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Namn"
                placeholder="Ange fastighetens namn"
                value={property.Fastighet}
                onValueChange={(value) => handlePropertyChange("Fastighet", value)}
                isRequired
              />

              <Input
                label="Adress"
                placeholder="Ange adress"
                value={property.Adress}
                onValueChange={(value) => handlePropertyChange("Adress", value)}
                isRequired
              />

              <Select
                label="Kategori"
                placeholder="Välj kategori"
                onChange={(e) => handlePropertyChange("Typ av fastighet", e.target.value)}
                isRequired
              >
                <SelectItem key="Kontor" value="Kontor">Kontor</SelectItem>
                <SelectItem key="Lager" value="Lager">Lager</SelectItem>
                <SelectItem key="Bostad" value="Bostad">Bostad</SelectItem>
                <SelectItem key="Handel" value="Handel">Handel</SelectItem>
              </Select>

              <Input
                label="Yta (m²)"
                placeholder="Ange yta"
                type="number"
                value={property.LOA}
                onChange={(e) => handlePropertyChange("LOA", e.target.value)}
                isRequired
              />

              <Input
                label="Byggår"
                placeholder="Ange byggår"
                type="number"
                value={property.Byggår}
                onChange={(e) => handlePropertyChange("Byggår", e.target.value)}
                isRequired
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Anteckningar</h2>
            <Textarea
              label="Anteckningar"
              placeholder="Valfria noteringar"
              value={property.Notes}
              onValueChange={(value) => handlePropertyChange("Notes", value)}
            />
          </div>

          <div className="flex justify-end">
            <Button color="primary" onPress={handleSubmit}>
              Spara
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default NewPropertyPage;
