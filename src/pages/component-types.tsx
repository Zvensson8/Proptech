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
  Textarea
} from "@heroui/react";
import { Icon } from "@iconify/react";
import ExportButton from "../components/export-button";

// Sample data
const componentTypesData = [
  { 
    id: 1, 
    name: "Ventilationsaggregat", 
    description: "Luftbehandlingsaggregat för ventilation",
    fields: [
      { name: "Tillverkare", type: "text", required: true },
      { name: "Modell", type: "text", required: true },
      { name: "Flöde (m³/h)", type: "number", required: true },
      { name: "Filtertyp", type: "text", required: false },
      { name: "Styrsystem", type: "text", required: false }
    ],
    instances: 5
  },
  { 
    id: 2, 
    name: "Kylanläggning", 
    description: "Kylsystem för fastighet",
    fields: [
      { name: "Tillverkare", type: "text", required: true },
      { name: "Modell", type: "text", required: true },
      { name: "Köldmedium", type: "text", required: true },
      { name: "GWP", type: "number", required: true },
      { name: "Kyleffekt (kW)", type: "number", required: true }
    ],
    instances: 3
  },
  { 
    id: 3, 
    name: "Värmepump", 
    description: "Värmepump för uppvärmning",
    fields: [
      { name: "Tillverkare", type: "text", required: true },
      { name: "Modell", type: "text", required: true },
      { name: "Typ", type: "select", options: ["Luft/luft", "Luft/vatten", "Vätska/vatten"], required: true },
      { name: "Effekt (kW)", type: "number", required: true },
      { name: "Serienummer", type: "text", required: true }
    ],
    instances: 4
  }
];

const ComponentTypesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentComponentType, setCurrentComponentType] = React.useState<any | null>(null);
  const [fields, setFields] = React.useState<any[]>([]);
  
  const handleEdit = (componentType: any) => {
    setCurrentComponentType({...componentType});
    setFields([...componentType.fields]);
    onOpen();
  };
  
  const handleNew = () => {
    setCurrentComponentType({
      id: Math.max(...componentTypesData.map(ct => ct.id)) + 1,
      name: "",
      description: "",
      fields: [],
      instances: 0
    });
    setFields([]);
    onOpen();
  };
  
  const addField = () => {
    setFields([...fields, { name: "", type: "text", required: false }]);
  };
  
  const removeField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };
  
  const updateField = (index: number, field: any) => {
    const newFields = [...fields];
    newFields[index] = field;
    setFields(newFields);
  };
  
  const filteredComponentTypes = componentTypesData.filter(componentType => {
    return componentType.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           componentType.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const tableHeaders = ["NAMN", "BESKRIVNING", "FÄLT", "INSTANSER", "ÅTGÄRDER"];
  
  // Add onChange handlers for input fields
  const handleComponentTypeChange = (field: string, value: string) => {
    setCurrentComponentType({
      ...currentComponentType,
      [field]: value
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Komponenttyper</h1>
        <p className="text-default-500">Hantera tekniska komponenttyper</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Sök komponenttyp..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            startContent={<Icon icon="lucide:search" className="text-default-400" />}
            className="w-full sm:w-64"
          />
          
          <ExportButton 
            title="Komponenttyper"
            headers={tableHeaders}
            data={filteredComponentTypes}
            filename="komponenttyper"
          />
        </div>

        <Button 
          color="primary"
          startContent={<Icon icon="lucide:plus" />}
          onPress={handleNew}
        >
          Ny komponenttyp
        </Button>
      </div>

      <Card>
        <CardBody>
          <Table 
            removeWrapper 
            aria-label="Komponenttyper"
            classNames={{
              th: "bg-content2"
            }}
          >
            <TableHeader>
              <TableColumn>NAMN</TableColumn>
              <TableColumn>BESKRIVNING</TableColumn>
              <TableColumn>FÄLT</TableColumn>
              <TableColumn>INSTANSER</TableColumn>
              <TableColumn>ÅTGÄRDER</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Inga komponenttyper hittades">
              {filteredComponentTypes.map((componentType) => (
                <TableRow key={componentType.id}>
                  <TableCell>{componentType.name}</TableCell>
                  <TableCell>{componentType.description}</TableCell>
                  <TableCell>{componentType.fields.length}</TableCell>
                  <TableCell>{componentType.instances}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="flat"
                        onPress={() => handleEdit(componentType)}
                      >
                        <Icon icon="lucide:eye" />
                      </Button>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="flat"
                        onPress={() => handleEdit(componentType)}
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
      
      {/* Component Type Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {currentComponentType?.name ? `Redigera: ${currentComponentType.name}` : "Ny komponenttyp"}
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    label="Namn"
                    placeholder="Ange namn på komponenttyp"
                    value={currentComponentType?.name || ""}
                    onValueChange={(value) => handleComponentTypeChange("name", value)}
                  />
                  
                  <Textarea
                    label="Beskrivning"
                    placeholder="Beskriv komponenttypen"
                    value={currentComponentType?.description || ""}
                    onValueChange={(value) => handleComponentTypeChange("description", value)}
                  />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Fält</h3>
                      <Button 
                        size="sm" 
                        color="primary" 
                        variant="flat"
                        startContent={<Icon icon="lucide:plus" />}
                        onPress={addField}
                      >
                        Lägg till fält
                      </Button>
                    </div>
                    
                    {fields.length === 0 && (
                      <div className="text-center p-4 border border-dashed border-default-300 rounded-md">
                        <p className="text-default-500">Inga fält tillagda. Klicka på "Lägg till fält" för att börja.</p>
                      </div>
                    )}
                    
                    {fields.map((field, index) => (
                      <Card key={index} className="p-3">
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between">
                            <h4 className="font-medium">Fält {index + 1}</h4>
                            <Button 
                              isIconOnly 
                              size="sm" 
                              variant="flat" 
                              color="danger"
                              onPress={() => removeField(index)}
                            >
                              <Icon icon="lucide:trash" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Input
                              label="Namn"
                              placeholder="Fältnamn"
                              value={field.name}
                              onChange={(e) => updateField(index, { ...field, name: e.target.value })}
                            />
                            
                            <div className="flex gap-3">
                              <select 
                                className="flex-1 bg-content2 rounded-md px-3 py-2 border border-divider"
                                value={field.type}
                                onChange={(e) => updateField(index, { ...field, type: e.target.value })}
                              >
                                <option value="text">Text</option>
                                <option value="number">Nummer</option>
                                <option value="select">Urval</option>
                                <option value="date">Datum</option>
                              </select>
                              
                              <div className="flex items-center gap-2">
                                <input 
                                  type="checkbox" 
                                  checked={field.required} 
                                  onChange={(e) => updateField(index, { ...field, required: e.target.checked })}
                                  className="w-4 h-4"
                                />
                                <label>Obligatoriskt</label>
                              </div>
                            </div>
                          </div>
                          
                          {field.type === "select" && (
                            <Input
                              label="Alternativ"
                              placeholder="Kommaseparerade alternativ"
                              value={field.options ? field.options.join(", ") : ""}
                              onChange={(e) => updateField(index, { 
                                ...field, 
                                options: e.target.value.split(",").map((opt: string) => opt.trim()) 
                              })}
                            />
                          )}
                        </div>
                      </Card>
                    ))}
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

export default ComponentTypesPage;