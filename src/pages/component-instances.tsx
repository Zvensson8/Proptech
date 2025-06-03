import React from "react";
import { 
  Card, 
  CardBody, 
  Button, 
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem
} from "@heroui/react";
import { Icon } from "@iconify/react";
import ExportButton from "../components/export-button";

// Sample data
const componentInstancesData = [
  { 
    id: 1, 
    name: "VA-01", 
    type: "Ventilationsaggregat",
    property: "Kontorsbyggnad A",
    manufacturer: "Systemair",
    model: "SAVE VTC 300",
    serialNumber: "SN12345678",
    installDate: "2020-05-15",
    lastService: "2023-03-10",
    status: "Aktiv",
    notes: "Filterbyten sker i mars och september"
  },
  { 
    id: 2, 
    name: "KA-01", 
    type: "Kylanläggning",
    property: "Kontorsbyggnad A",
    manufacturer: "Carrier",
    model: "AquaSnap 30RB",
    serialNumber: "CS78901234",
    installDate: "2019-08-22",
    lastService: "2023-02-15",
    status: "Aktiv",
    notes: "Årlig service i februari"
  },
  { 
    id: 3, 
    name: "VP-01", 
    type: "Värmepump",
    property: "Bostadshus C",
    manufacturer: "NIBE",
    model: "F1255",
    serialNumber: "NB56781234",
    installDate: "2021-11-05",
    lastService: "2023-04-20",
    status: "Aktiv",
    notes: "Kontrollera värmekurva vid säsongsövergångar"
  },
  { 
    id: 4, 
    name: "VA-02", 
    type: "Ventilationsaggregat",
    property: "Lagerlokal B",
    manufacturer: "Swegon",
    model: "GOLD RX",
    serialNumber: "SW98765432",
    installDate: "2018-03-30",
    lastService: "2023-01-25",
    status: "Inaktiv",
    notes: "Planerad utbyte Q3 2023"
  },
  { 
    id: 5, 
    name: "KA-02", 
    type: "Kylanläggning",
    property: "Butiksfastighet D",
    manufacturer: "Daikin",
    model: "EWAD-TZ",
    serialNumber: "DK45678901",
    installDate: "2022-04-12",
    lastService: "2023-04-12",
    status: "Aktiv",
    notes: ""
  }
];

const componentTypes = [
  { id: 1, name: "Ventilationsaggregat" },
  { id: 2, name: "Kylanläggning" },
  { id: 3, name: "Värmepump" }
];

const properties = [
  { id: 1, name: "Kontorsbyggnad A" },
  { id: 2, name: "Lagerlokal B" },
  { id: 3, name: "Bostadshus C" },
  { id: 4, name: "Butiksfastighet D" }
];

const ComponentInstancesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = React.useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);
  
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentComponent, setCurrentComponent] = React.useState<any | null>(null);
  
  const handleEdit = (component: any) => {
    setCurrentComponent({...component});
    onOpen();
  };
  
  const handleNew = () => {
    setCurrentComponent({
      id: Math.max(...componentInstancesData.map(c => c.id)) + 1,
      name: "",
      type: "",
      property: "",
      manufacturer: "",
      model: "",
      serialNumber: "",
      installDate: new Date().toISOString().split('T')[0],
      lastService: "",
      status: "Aktiv",
      notes: ""
    });
    onOpen();
  };
  
  const handleComponentChange = (field: string, value: any) => {
    setCurrentComponent({
      ...currentComponent,
      [field]: value
    });
  };
  
  const filteredComponents = componentInstancesData.filter(component => {
    const matchesSearch = 
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      component.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesType = !selectedType || component.type === selectedType;
    const matchesProperty = !selectedProperty || component.property === selectedProperty;
    const matchesStatus = !selectedStatus || component.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesProperty && matchesStatus;
  });

  const tableHeaders = ["NAMN", "TYP", "FASTIGHET", "TILLVERKARE", "MODELL", "STATUS", "ÅTGÄRDER"];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Komponenter</h1>
        <p className="text-default-500">Hantera tekniska komponenter i dina fastigheter</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between flex-wrap">
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <Input
            placeholder="Sök komponent..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            startContent={<Icon icon="lucide:search" className="text-default-400" />}
            className="w-full sm:w-64"
          />
          
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="flat" 
                endContent={<Icon icon="lucide:chevron-down" />}
              >
                {selectedType || "Komponenttyp"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Komponenttyper"
              selectionMode="single"
              selectedKeys={selectedType ? [selectedType] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setSelectedType(selected === selectedType ? null : selected);
              }}
            >
              {componentTypes.map((type) => (
                <DropdownItem key={type.name}>{type.name}</DropdownItem>
              ))}
              <DropdownItem key="clear" color="danger">
                Rensa filter
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="flat" 
                endContent={<Icon icon="lucide:chevron-down" />}
              >
                {selectedProperty || "Fastighet"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Fastigheter"
              selectionMode="single"
              selectedKeys={selectedProperty ? [selectedProperty] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setSelectedProperty(selected === selectedProperty ? null : selected);
              }}
            >
              {properties.map((property) => (
                <DropdownItem key={property.name}>{property.name}</DropdownItem>
              ))}
              <DropdownItem key="clear" color="danger">
                Rensa filter
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="flat" 
                endContent={<Icon icon="lucide:chevron-down" />}
              >
                {selectedStatus || "Status"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Status"
              selectionMode="single"
              selectedKeys={selectedStatus ? [selectedStatus] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setSelectedStatus(selected === selectedStatus ? null : selected);
              }}
            >
              <DropdownItem key="Aktiv">Aktiv</DropdownItem>
              <DropdownItem key="Inaktiv">Inaktiv</DropdownItem>
              <DropdownItem key="clear" color="danger">
                Rensa filter
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          
          <ExportButton 
            title="Komponenter"
            headers={tableHeaders}
            data={filteredComponents}
            filename="komponenter"
          />
        </div>

        <Button 
          color="primary"
          startContent={<Icon icon="lucide:plus" />}
          onPress={handleNew}
        >
          Ny komponent
        </Button>
      </div>

      <Card>
        <CardBody>
          <Table 
            removeWrapper 
            aria-label="Komponenter"
            classNames={{
              th: "bg-content2"
            }}
          >
            <TableHeader>
              <TableColumn>NAMN</TableColumn>
              <TableColumn>TYP</TableColumn>
              <TableColumn>FASTIGHET</TableColumn>
              <TableColumn>TILLVERKARE</TableColumn>
              <TableColumn>MODELL</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ÅTGÄRDER</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Inga komponenter hittades">
              {filteredComponents.map((component) => (
                <TableRow key={component.id}>
                  <TableCell>{component.name}</TableCell>
                  <TableCell>{component.type}</TableCell>
                  <TableCell>{component.property}</TableCell>
                  <TableCell>{component.manufacturer}</TableCell>
                  <TableCell>{component.model}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      component.status === "Aktiv" 
                        ? "bg-success-100 text-success-600" 
                        : "bg-danger-100 text-danger-600"
                    }`}>
                      {component.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="flat"
                        onPress={() => handleEdit(component)}
                      >
                        <Icon icon="lucide:eye" />
                      </Button>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="flat"
                        onPress={() => handleEdit(component)}
                      >
                        <Icon icon="lucide:edit" />
                      </Button>
                      <Button isIconOnly size="sm" variant="flat" color="danger">
                        <Icon icon="lucide:trash" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      
      {/* Component Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {currentComponent?.name ? `Redigera: ${currentComponent.name}` : "Ny komponent"}
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Namn"
                    placeholder="Ange namn på komponenten"
                    value={currentComponent?.name || ""}
                    onValueChange={(value) => handleComponentChange("name", value)}
                  />
                  
                  <Select
                    label="Komponenttyp"
                    placeholder="Välj komponenttyp"
                    defaultSelectedKeys={currentComponent?.type ? [currentComponent.type] : []}
                    onChange={(e) => handleComponentChange("type", e.target.value)}
                  >
                    {componentTypes.map((type) => (
                      <SelectItem key={type.name} value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </Select>
                  
                  <Select
                    label="Fastighet"
                    placeholder="Välj fastighet"
                    defaultSelectedKeys={currentComponent?.property ? [currentComponent.property] : []}
                    onChange={(e) => handleComponentChange("property", e.target.value)}
                  >
                    {properties.map((property) => (
                      <SelectItem key={property.name} value={property.name}>
                        {property.name}
                      </SelectItem>
                    ))}
                  </Select>
                  
                  <Input
                    label="Tillverkare"
                    placeholder="Ange tillverkare"
                    value={currentComponent?.manufacturer || ""}
                    onValueChange={(value) => handleComponentChange("manufacturer", value)}
                  />
                  
                  <Input
                    label="Modell"
                    placeholder="Ange modell"
                    value={currentComponent?.model || ""}
                    onValueChange={(value) => handleComponentChange("model", value)}
                  />
                  
                  <Input
                    label="Serienummer"
                    placeholder="Ange serienummer"
                    value={currentComponent?.serialNumber || ""}
                    onValueChange={(value) => handleComponentChange("serialNumber", value)}
                  />
                  
                  <Input
                    label="Installationsdatum"
                    placeholder="Välj datum"
                    type="date"
                    value={currentComponent?.installDate || ""}
                    onChange={(e) => handleComponentChange("installDate", e.target.value)}
                  />
                  
                  <Input
                    label="Senaste service"
                    placeholder="Välj datum"
                    type="date"
                    value={currentComponent?.lastService || ""}
                    onChange={(e) => handleComponentChange("lastService", e.target.value)}
                  />
                  
                  <Select
                    label="Status"
                    placeholder="Välj status"
                    defaultSelectedKeys={currentComponent?.status ? [currentComponent.status] : ["Aktiv"]}
                    onChange={(e) => handleComponentChange("status", e.target.value)}
                  >
                    <SelectItem key="Aktiv" value="Aktiv">Aktiv</SelectItem>
                    <SelectItem key="Inaktiv" value="Inaktiv">Inaktiv</SelectItem>
                  </Select>
                </div>
                
                <div className="mt-4">
                  <Input
                    label="Anteckningar"
                    placeholder="Lägg till anteckningar"
                    value={currentComponent?.notes || ""}
                    onValueChange={(value) => handleComponentChange("notes", value)}
                  />
                </div>
                
                {/* Dynamic fields based on component type */}
                <div className="mt-4 p-4 border border-divider rounded-md">
                  <h3 className="text-md font-medium mb-3">Typspecifika fält</h3>
                  
                  {currentComponent?.type === "Ventilationsaggregat" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Flöde (m³/h)"
                        placeholder="Ange flöde"
                        type="number"
                        onChange={(e) => handleComponentChange("flow", e.target.value)}
                      />
                      <Input
                        label="Filtertyp"
                        placeholder="Ange filtertyp"
                        onValueChange={(value) => handleComponentChange("filterType", value)}
                      />
                      <Input
                        label="Styrsystem"
                        placeholder="Ange styrsystem"
                        onValueChange={(value) => handleComponentChange("controlSystem", value)}
                      />
                    </div>
                  )}
                  
                  {currentComponent?.type === "Kylanläggning" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Köldmedium"
                        placeholder="Ange köldmedium"
                        onValueChange={(value) => handleComponentChange("refrigerant", value)}
                      />
                      <Input
                        label="GWP"
                        placeholder="Ange GWP"
                        type="number"
                        onChange={(e) => handleComponentChange("gwp", e.target.value)}
                      />
                      <Input
                        label="Kyleffekt (kW)"
                        placeholder="Ange kyleffekt"
                        type="number"
                        onChange={(e) => handleComponentChange("coolingPower", e.target.value)}
                      />
                    </div>
                  )}
                  
                  {currentComponent?.type === "Värmepump" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="Typ"
                        placeholder="Välj typ"
                        onChange={(e) => handleComponentChange("pumpType", e.target.value)}
                      >
                        <SelectItem key="Luft/luft" value="Luft/luft">Luft/luft</SelectItem>
                        <SelectItem key="Luft/vatten" value="Luft/vatten">Luft/vatten</SelectItem>
                        <SelectItem key="Vätska/vatten" value="Vätska/vatten">Vätska/vatten</SelectItem>
                      </Select>
                      <Input
                        label="Effekt (kW)"
                        placeholder="Ange effekt"
                        type="number"
                        onChange={(e) => handleComponentChange("power", e.target.value)}
                      />
                    </div>
                  )}
                  
                  {!currentComponent?.type && (
                    <p className="text-center text-default-500">
                      Välj en komponenttyp för att visa typspecifika fält
                    </p>
                  )}
                </div>
                
                <div className="mt-4">
                  <p className="text-sm mb-2">Dokument</p>
                  <div className="border border-dashed border-default-300 rounded-md p-6 text-center">
                    <Icon icon="lucide:upload" className="mx-auto mb-2 text-default-400" width={24} height={24} />
                    <p className="text-default-500">Dra och släpp filer här eller klicka för att ladda upp</p>
                    <Button variant="flat" size="sm" className="mt-2">
                      Välj filer
                    </Button>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Avbryt
                </Button>
                <Button color="primary" onPress={onClose}>
                  Spara
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ComponentInstancesPage;