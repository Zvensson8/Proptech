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

const NewPropertyPage: React.FC = () => {
  const history = useHistory();
  const [property, setProperty] = React.useState({
    name: "",
    address: "",
    category: "",
    area: "",
    yearBuilt: "",
    notes: "",
    hasComfortCooling: false,
    hasFireAlarm: false,
    hasSprinklers: false
  });
  
  const [contractors, setContractors] = React.useState([
    { name: "", service: "" }
  ]);
  
  const handlePropertyChange = (field: string, value: any) => {
    setProperty({
      ...property,
      [field]: value
    });
  };
  
  const addContractor = () => {
    setContractors([...contractors, { name: "", service: "" }]);
  };
  
  const updateContractor = (index: number, field: string, value: string) => {
    const newContractors = [...contractors];
    newContractors[index] = { ...newContractors[index], [field]: value };
    setContractors(newContractors);
  };
  
  const removeContractor = (index: number) => {
    const newContractors = [...contractors];
    newContractors.splice(index, 1);
    setContractors(newContractors);
  };
  
  const handleSubmit = () => {
    // In a real app, this would save to the database
    console.log("Saving property:", property);
    console.log("With contractors:", contractors);
    
    // Redirect to properties list
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
                value={property.name}
                onValueChange={(value) => handlePropertyChange("name", value)}
              />
              
              <Input
                label="Adress"
                placeholder="Ange adress"
                value={property.address}
                onValueChange={(value) => handlePropertyChange("address", value)}
              />
              
              <Select
                label="Kategori"
                placeholder="Välj kategori"
                onChange={(e) => handlePropertyChange("category", e.target.value)}
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
                value={property.area}
                onChange={(e) => handlePropertyChange("area", e.target.value)}
              />
              
              <Input
                label="Byggår"
                placeholder="Ange byggår"
                type="number"
                value={property.yearBuilt}
                onChange={(e) => handlePropertyChange("yearBuilt", e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Tekniska system</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasComfortCooling"
                  checked={property.hasComfortCooling}
                  onChange={(e) => handlePropertyChange("hasComfortCooling", e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="hasComfortCooling">Komfortkyla</label>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasFireAlarm"
                  checked={property.hasFireAlarm}
                  onChange={(e) => handlePropertyChange("hasFireAlarm", e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="hasFireAlarm">Brandlarm</label>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasSprinklers"
                  checked={property.hasSprinklers}
                  onChange={(e) => handlePropertyChange("hasSprinklers", e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="hasSprinklers">Sprinkler</label>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Entreprenörer</h2>
            {contractors.map((contractor, index) => (
              <div key={index} className="flex gap-4 mb-3 items-end">
                <Input
                  label="Entreprenör"
                  placeholder="Företagsnamn"
                  value={contractor.name}
                  onValueChange={(value) => updateContractor(index, "name", value)}
                  className="flex-1"
                />
                
                <Input
                  label="Tjänst"
                  placeholder="T.ex. Brandservice, Ventilation"
                  value={contractor.service}
                  onValueChange={(value) => updateContractor(index, "service", value)}
                  className="flex-1"
                />
                
                <Button
                  isIconOnly
                  color="danger"
                  variant="flat"
                  onPress={() => removeContractor(index)}
                >
                  <Icon icon="lucide:trash" />
                </Button>
              </div>
            ))}
            
            <Button
              variant="flat"
              startContent={<Icon icon="lucide:plus" />}
              onPress={addContractor}
              className="mt-2"
            >
              Lägg till entreprenör
            </Button>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Anteckningar</h2>
            <Textarea
              placeholder="Lägg till anteckningar om fastigheten"
              value={property.notes}
              onValueChange={(value) => handlePropertyChange("notes", value)}
              minRows={4}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button
              variant="flat"
              onPress={() => history.push("/properties")}
            >
              Avbryt
            </Button>
            <Button
              color="primary"
              onPress={handleSubmit}
            >
              Spara fastighet
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default NewPropertyPage;