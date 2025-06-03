import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Card, 
  CardBody, 
  Button, 
  Tabs, 
  Tab,
  Textarea,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@heroui/react";
import { Icon } from "@iconify/react";
import StatusBadge from "../components/status-badge";

// Sample data
const propertiesData = [
  { 
    id: "1", 
    name: "Kontorsbyggnad A", 
    address: "Storgatan 1, Stockholm", 
    category: "Kontor", 
    area: 2500,
    yearBuilt: 2010,
    notes: "Modern kontorsbyggnad med 4 våningar. Renoverad 2019 med nya ventilationssystem och energieffektiva fönster.",
    components: [
      { id: 1, name: "VA-01", type: "Ventilationsaggregat", status: "Aktiv" },
      { id: 2, name: "KA-01", type: "Kylanläggning", status: "Aktiv" }
    ],
    workOrders: [
      { id: 1, task: "Filterbyte ventilation", status: "Pågående", dueDate: "2023-06-15" },
      { id: 4, task: "Byte av belysning", status: "Pågående", dueDate: "2023-06-18" }
    ],
    documents: [
      { id: 1, name: "Ritning våning 1", type: "pdf", size: "2.4 MB", date: "2020-03-15" },
      { id: 2, name: "Ventilationsprotokoll", type: "pdf", size: "1.8 MB", date: "2022-09-10" },
      { id: 3, name: "Energideklaration", type: "pdf", size: "3.2 MB", date: "2021-05-22" }
    ]
  },
  { 
    id: "2", 
    name: "Lagerlokal B", 
    address: "Industrivägen 12, Göteborg", 
    category: "Lager", 
    area: 4200,
    yearBuilt: 2005,
    notes: "Lagerlokal med tillhörande kontorsdel. God takhöjd och flera lastportar.",
    components: [
      { id: 4, name: "VA-02", type: "Ventilationsaggregat", status: "Inaktiv" }
    ],
    workOrders: [
      { id: 3, task: "Kontroll av brandlarm", status: "Klar", dueDate: "2023-06-10" },
      { id: 6, task: "Reparation av portar", status: "Avbruten", dueDate: "2023-06-05" }
    ],
    documents: [
      { id: 4, name: "Ritning lageryta", type: "dwg", size: "5.1 MB", date: "2005-08-30" },
      { id: 5, name: "Brandskyddsdokumentation", type: "pdf", size: "4.3 MB", date: "2022-02-15" }
    ]
  },
  { 
    id: "3", 
    name: "Bostadshus C", 
    address: "Parkgatan 45, Malmö", 
    category: "Bostad", 
    area: 1800,
    yearBuilt: 2015,
    notes: "Flerbostadshus med 12 lägenheter. Miljöcertifierat enligt Miljöbyggnad Silver.",
    components: [
      { id: 3, name: "VP-01", type: "Värmepump", status: "Aktiv" }
    ],
    workOrders: [
      { id: 2, task: "Reparation av värmepump", status: "Ej påbörjad", dueDate: "2023-06-20" },
      { id: 7, task: "Byte av låssystem", status: "Klar", dueDate: "2023-05-30" }
    ],
    documents: [
      { id: 6, name: "Ritning lägenheter", type: "pdf", size: "3.7 MB", date: "2015-02-10" },
      { id: 7, name: "Miljöcertifiering", type: "pdf", size: "2.2 MB", date: "2015-06-18" }
    ]
  }
];

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [notes, setNotes] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  
  // Find property data first - move this up before any references to property
  const property = propertiesData.find(p => p.id === id);
  
  // Now initialize state using the property variable that's already defined
  const [isEditingInfo, setIsEditingInfo] = React.useState(false);
  const [propertyInfo, setPropertyInfo] = React.useState({
    category: property?.category || "",
    area: property?.area || 0,
    yearBuilt: property?.yearBuilt || 0,
    hasComfortCooling: false,
    hasFireAlarm: false,
    hasSprinklers: false
  });
  
  const [contractors, setContractors] = React.useState([
    { name: "Stockholms Brandservice", service: "Brandskydd" },
    { name: "Ventilationsexperten AB", service: "Ventilationsservice" }
  ]);
  
  // Financial items state
  const [financialItems, setFinancialItems] = React.useState([
    { 
      id: 1, 
      supplier: "Telia", 
      account: "6210 - Telefoni & Internet", 
      amount: 1200, 
      frequency: "monthly",
      category: "Avtal",
      notes: "Fiber och telefoni" 
    },
    { 
      id: 2, 
      supplier: "Vattenfall", 
      account: "5020 - El", 
      amount: 8500, 
      frequency: "quarterly",
      category: "Avtal",
      notes: "Elförbrukning" 
    },
    { 
      id: 3, 
      supplier: "Trygg-Hansa", 
      account: "6310 - Försäkringar", 
      amount: 24000, 
      frequency: "annually",
      category: "Avtal",
      notes: "Fastighetsförsäkring" 
    }
  ]);
  
  const [showFinancialModal, setShowFinancialModal] = React.useState(false);
  const [currentFinancialItem, setCurrentFinancialItem] = React.useState<any>(null);
  
  // Custom fields state
  const [customFields, setCustomFields] = React.useState<Array<{id: string, name: string, value: string}>>([
    { id: "field1", name: "Fastighetsbeteckning", value: "Stockholm 1:234" },
    { id: "field2", name: "Byggnadsår", value: "1985" }
  ]);
  
  const [newFieldName, setNewFieldName] = React.useState("");
  const [showAddFieldPopover, setShowAddFieldPopover] = React.useState(false);
  
  // Helper function to calculate yearly amount based on frequency
  const calculateYearlyAmount = (item: any) => {
    switch (item.frequency) {
      case "monthly":
        return item.amount * 12;
      case "quarterly":
        return item.amount * 4;
      case "biannually":
        return item.amount * 2;
      case "annually":
        return item.amount;
      default:
        return item.amount * 12;
    }
  };
  
  // Helper function to get frequency text
  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case "monthly":
        return "Månadsvis";
      case "quarterly":
        return "Kvartalsvis";
      case "biannually":
        return "Halvårsvis";
      case "annually":
        return "Årsvis";
      default:
        return frequency;
    }
  };
  
  const [showContractorModal, setShowContractorModal] = React.useState(false);
  const [currentContractor, setCurrentContractor] = React.useState<any>({ name: "", service: "" });
  const [contractorIndex, setContractorIndex] = React.useState<number | null>(null);
  
  React.useEffect(() => {
    if (property) {
      setNotes(property.notes);
    }
  }, [property]);
  
  if (!property) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Fastighet hittades inte</h2>
        <Link to="/properties">
          <Button color="primary">
            Tillbaka till fastigheter
          </Button>
        </Link>
      </div>
    );
  }

  const handlePropertyInfoChange = (field: string, value: any) => {
    setPropertyInfo({
      ...propertyInfo,
      [field]: value
    });
  };
  
  const addContractor = () => {
    setCurrentContractor({ name: "", service: "" });
    setContractorIndex(null);
    setShowContractorModal(true);
  };
  
  const editContractor = (index: number) => {
    setCurrentContractor(contractors[index]);
    setContractorIndex(index);
    setShowContractorModal(true);
  };
  
  const saveContractor = () => {
    if (contractorIndex !== null) {
      // Edit existing
      const newContractors = [...contractors];
      newContractors[contractorIndex] = currentContractor;
      setContractors(newContractors);
    } else {
      // Add new
      setContractors([...contractors, currentContractor]);
    }
    setShowContractorModal(false);
  };
  
  const removeContractor = (index: number) => {
    const newContractors = [...contractors];
    newContractors.splice(index, 1);
    setContractors(newContractors);
  };
  
  const handleContractorChange = (field: string, value: string) => {
    setCurrentContractor({
      ...currentContractor,
      [field]: value
    });
  };
  
  const addCustomField = () => {
    if (newFieldName.trim()) {
      setCustomFields([
        ...customFields,
        { id: `field${Date.now()}`, name: newFieldName, value: "" }
      ]);
      setNewFieldName("");
      setShowAddFieldPopover(false);
    }
  };
  
  const updateCustomField = (id: string, value: string) => {
    setCustomFields(
      customFields.map(field => 
        field.id === id ? { ...field, value } : field
      )
    );
  };
  
  const removeCustomField = (id: string) => {
    setCustomFields(customFields.filter(field => field.id !== id));
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
          <h1 className="text-4xl font-bold mt-2">{property.name}</h1>
          <p className="text-default-500">{property.address}</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="flat" 
            startContent={<Icon icon="lucide:edit" />}
          >
            Redigera
          </Button>
          <Button 
            color="danger" 
            variant="flat"
            startContent={<Icon icon="lucide:trash" />}
          >
            Ta bort
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Information</h2>
              <Button 
                size="sm" 
                variant="flat" 
                onPress={() => setIsEditingInfo(!isEditingInfo)}
              >
                {isEditingInfo ? "Spara" : "Redigera"}
              </Button>
            </div>
            
            {isEditingInfo ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Kategori"
                    placeholder="Välj kategori"
                    defaultSelectedKeys={[propertyInfo.category]}
                    onChange={(e) => handlePropertyInfoChange("category", e.target.value)}
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
                    value={propertyInfo.area.toString()}
                    onChange={(e) => handlePropertyInfoChange("area", Number(e.target.value))}
                  />
                  
                  <Input
                    label="Byggår"
                    placeholder="Ange byggår"
                    type="number"
                    value={propertyInfo.yearBuilt.toString()}
                    onChange={(e) => handlePropertyInfoChange("yearBuilt", Number(e.target.value))}
                  />
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2">Tekniska system</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="hasComfortCooling"
                        checked={propertyInfo.hasComfortCooling}
                        onChange={(e) => handlePropertyInfoChange("hasComfortCooling", e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor="hasComfortCooling">Komfortkyla</label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="hasFireAlarm"
                        checked={propertyInfo.hasFireAlarm}
                        onChange={(e) => handlePropertyInfoChange("hasFireAlarm", e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor="hasFireAlarm">Brandlarm</label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="hasSprinklers"
                        checked={propertyInfo.hasSprinklers}
                        onChange={(e) => handlePropertyInfoChange("hasSprinklers", e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor="hasSprinklers">Sprinkler</label>
                    </div>
                  </div>
                </div>
                
                {/* Custom Fields - Edit Mode */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-md font-medium">Anpassade fält</h3>
                    <Popover 
                      isOpen={showAddFieldPopover} 
                      onOpenChange={setShowAddFieldPopover}
                      placement="bottom"
                    >
                      <PopoverTrigger>
                        <Button 
                          size="sm" 
                          variant="flat"
                          isIconOnly
                        >
                          <Icon icon="lucide:plus" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="p-2 w-72">
                          <h4 className="text-sm font-medium mb-2">Lägg till nytt fält</h4>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Fältnamn"
                              value={newFieldName}
                              onValueChange={setNewFieldName}
                              size="sm"
                            />
                            <Button 
                              color="primary" 
                              size="sm"
                              onPress={addCustomField}
                            >
                              Lägg till
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-3">
                    {customFields.map(field => (
                      <div key={field.id} className="flex items-center gap-2">
                        <div className="flex-grow grid grid-cols-2 gap-2">
                          <Input
                            label="Namn"
                            size="sm"
                            value={field.name}
                            onValueChange={(value) => {
                              setCustomFields(
                                customFields.map(f => 
                                  f.id === field.id ? { ...f, name: value } : f
                                )
                              );
                            }}
                          />
                          <Input
                            label="Värde"
                            size="sm"
                            value={field.value}
                            onValueChange={(value) => updateCustomField(field.id, value)}
                          />
                        </div>
                        <Button 
                          isIconOnly 
                          size="sm" 
                          variant="flat" 
                          color="danger"
                          className="mt-6"
                          onPress={() => removeCustomField(field.id)}
                        >
                          <Icon icon="lucide:trash" />
                        </Button>
                      </div>
                    ))}
                    
                    {customFields.length === 0 && (
                      <div className="text-center py-3 text-default-500 bg-content2/50 rounded-md">
                        <p>Inga anpassade fält. Klicka på + för att lägga till.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-default-500 text-sm">Kategori</p>
                    <p>{propertyInfo.category}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Yta</p>
                    <p>{propertyInfo.area} m²</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Byggår</p>
                    <p>{propertyInfo.yearBuilt}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Komponenter</p>
                    <p>{property?.components.length}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Tekniska system</h3>
                  <div className="flex flex-wrap gap-2">
                    {propertyInfo.hasComfortCooling && (
                      <span className="px-2 py-1 bg-content2 rounded-full text-xs">Komfortkyla</span>
                    )}
                    {propertyInfo.hasFireAlarm && (
                      <span className="px-2 py-1 bg-content2 rounded-full text-xs">Brandlarm</span>
                    )}
                    {propertyInfo.hasSprinklers && (
                      <span className="px-2 py-1 bg-content2 rounded-full text-xs">Sprinkler</span>
                    )}
                    {!propertyInfo.hasComfortCooling && !propertyInfo.hasFireAlarm && !propertyInfo.hasSprinklers && (
                      <span className="text-default-500">Inga system registrerade</span>
                    )}
                  </div>
                </div>
                
                {/* Custom Fields - View Mode */}
                {customFields.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Anpassade fält</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {customFields.map(field => (
                        <div key={field.id}>
                          <p className="text-default-500 text-sm">{field.name}</p>
                          <p>{field.value || "-"}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Contractors section */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Entreprenörer</h3>
                <Button 
                  size="sm" 
                  variant="flat" 
                  isIconOnly
                  onPress={addContractor}
                >
                  <Icon icon="lucide:plus" />
                </Button>
              </div>
              
              {contractors.length === 0 ? (
                <div className="text-center py-8 text-default-500">
                  <Icon icon="lucide:users" className="mx-auto mb-2" width={32} height={32} />
                  <p>Inga entreprenörer har lagts till för denna fastighet</p>
                  <Button 
                    color="primary" 
                    variant="flat" 
                    size="sm"
                    className="mt-2"
                    startContent={<Icon icon="lucide:plus" />}
                    onPress={addContractor}
                  >
                    Lägg till entreprenör
                  </Button>
                </div>
              ) : (
                <Table 
                  removeWrapper 
                  aria-label="Entreprenörer"
                  classNames={{
                    th: "bg-content2"
                  }}
                >
                  <TableHeader>
                    <TableColumn>NAMN</TableColumn>
                    <TableColumn>TJÄNST</TableColumn>
                    <TableColumn>ÅTGÄRDER</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {contractors.map((contractor, index) => (
                      <TableRow key={index}>
                        <TableCell>{contractor.name}</TableCell>
                        <TableCell>{contractor.service}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              isIconOnly 
                              size="sm" 
                              variant="flat"
                              onPress={() => editContractor(index)}
                            >
                              <Icon icon="lucide:edit" />
                            </Button>
                            <Button 
                              isIconOnly 
                              size="sm" 
                              variant="flat" 
                              color="danger"
                              onPress={() => removeContractor(index)}
                            >
                              <Icon icon="lucide:trash" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Anteckningar</h3>
                <Button 
                  size="sm" 
                  variant="flat" 
                  isIconOnly
                  onPress={() => setIsEditing(!isEditing)}
                >
                  <Icon icon={isEditing ? "lucide:save" : "lucide:edit"} />
                </Button>
              </div>
              {isEditing ? (
                <Textarea
                  value={notes}
                  onValueChange={setNotes}
                  placeholder="Lägg till anteckningar om fastigheten"
                  minRows={4}
                />
              ) : (
                <p className="p-3 bg-content2 rounded-md min-h-[100px]">{notes}</p>
              )}
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <h2 className="text-xl font-semibold mb-4">Snabbåtgärder</h2>
            <div className="space-y-3">
              <Button 
                fullWidth 
                color="primary"
                variant="flat"
                startContent={<Icon icon="lucide:plus" />}
                onPress={() => {
                  // Fixed: Direct action instead of custom event
                  // Navigate to component creation with property pre-selected
                  window.location.href = `/components/new?property=${encodeURIComponent(property?.name || "")}`;
                }}
              >
                Lägg till komponent
              </Button>
              <Button 
                fullWidth 
                color="primary"
                variant="flat"
                startContent={<Icon icon="lucide:plus" />}
                onPress={() => {
                  // Fixed: Direct action instead of custom event
                  // Navigate to work order creation with property pre-selected
                  window.location.href = `/work-orders/new?property=${encodeURIComponent(property?.name || "")}`;
                }}
              >
                Skapa driftbeställning
              </Button>
              <Button 
                fullWidth 
                color="primary"
                variant="flat"
                startContent={<Icon icon="lucide:upload" />}
                onPress={() => {
                  // Fixed: Open document upload modal directly
                  const modal = document.getElementById("document-upload-modal");
                  if (modal) {
                    // @ts-ignore
                    modal.showModal();
                  }
                }}
              >
                Ladda upp dokument
              </Button>
              <Button 
                fullWidth 
                color="primary"
                variant="flat"
                startContent={<Icon icon="lucide:printer" />}
                onPress={() => {
                  // Fixed: Navigate to reports page with property filter
                  window.location.href = `/reports?property=${encodeURIComponent(property?.name || "")}`;
                }}
              >
                Skapa rapport
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      <Tabs aria-label="Fastighetsdetaljer">
        <Tab key="components" title="Komponenter">
          <Card>
            <CardBody>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Komponenter</h2>
                <Button 
                  color="primary" 
                  size="sm"
                  startContent={<Icon icon="lucide:plus" />}
                >
                  Lägg till
                </Button>
              </div>
              
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
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>ÅTGÄRDER</TableColumn>
                </TableHeader>
                <TableBody emptyContent="Inga komponenter hittades">
                  {property.components.map((component) => (
                    <TableRow key={component.id}>
                      <TableCell>{component.name}</TableCell>
                      <TableCell>{component.type}</TableCell>
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
                          <Button isIconOnly size="sm" variant="flat">
                            <Icon icon="lucide:eye" />
                          </Button>
                          <Button isIconOnly size="sm" variant="flat">
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
        </Tab>
        
        <Tab key="work-orders" title="Driftbeställningar">
          <Card>
            <CardBody>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Driftbeställningar</h2>
                <Button 
                  color="primary" 
                  size="sm"
                  startContent={<Icon icon="lucide:plus" />}
                >
                  Skapa ny
                </Button>
              </div>
              
              <Table 
                removeWrapper 
                aria-label="Driftbeställningar"
                classNames={{
                  th: "bg-content2"
                }}
              >
                <TableHeader>
                  <TableColumn>ÅTGÄRD</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>DATUM</TableColumn>
                  <TableColumn>ÅTGÄRDER</TableColumn>
                </TableHeader>
                <TableBody emptyContent="Inga driftbeställningar hittades">
                  {property.workOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.task}</TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell>{order.dueDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button isIconOnly size="sm" variant="flat">
                            <Icon icon="lucide:eye" />
                          </Button>
                          <Button isIconOnly size="sm" variant="flat">
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
        </Tab>
        
        <Tab key="documents" title="Dokument">
          <Card>
            <CardBody>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Dokument</h2>
                <Button 
                  color="primary" 
                  size="sm"
                  startContent={<Icon icon="lucide:upload" />}
                >
                  Ladda upp
                </Button>
              </div>
              
              <Table 
                removeWrapper 
                aria-label="Dokument"
                classNames={{
                  th: "bg-content2"
                }}
              >
                <TableHeader>
                  <TableColumn>NAMN</TableColumn>
                  <TableColumn>TYP</TableColumn>
                  <TableColumn>STORLEK</TableColumn>
                  <TableColumn>DATUM</TableColumn>
                  <TableColumn>ÅTGÄRDER</TableColumn>
                </TableHeader>
                <TableBody emptyContent="Inga dokument hittades">
                  {property.documents.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell>{document.name}</TableCell>
                      <TableCell>
                        <span className="uppercase">{document.type}</span>
                      </TableCell>
                      <TableCell>{document.size}</TableCell>
                      <TableCell>{document.date}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button isIconOnly size="sm" variant="flat">
                            <Icon icon="lucide:download" />
                          </Button>
                          <Button isIconOnly size="sm" variant="flat">
                            <Icon icon="lucide:eye" />
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
        </Tab>
        
        <Tab key="contractors" title="Entreprenörer">
          <Card>
            <CardBody>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Entreprenörer</h2>
                <Button 
                  color="primary" 
                  size="sm"
                  startContent={<Icon icon="lucide:plus" />}
                  onPress={addContractor}
                >
                  Lägg till
                </Button>
              </div>
              
              {contractors.length === 0 ? (
                <div className="text-center py-8 text-default-500">
                  <Icon icon="lucide:users" className="mx-auto mb-2" width={32} height={32} />
                  <p>Inga entreprenörer har lagts till för denna fastighet</p>
                  <Button 
                    color="primary" 
                    variant="flat" 
                    size="sm"
                    className="mt-2"
                    startContent={<Icon icon="lucide:plus" />}
                    onPress={addContractor}
                  >
                    Lägg till entreprenör
                  </Button>
                </div>
              ) : (
                <Table 
                  removeWrapper 
                  aria-label="Entreprenörer"
                  classNames={{
                    th: "bg-content2"
                  }}
                >
                  <TableHeader>
                    <TableColumn>NAMN</TableColumn>
                    <TableColumn>TJÄNST</TableColumn>
                    <TableColumn>ÅTGÄRDER</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {contractors.map((contractor, index) => (
                      <TableRow key={index}>
                        <TableCell>{contractor.name}</TableCell>
                        <TableCell>{contractor.service}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              isIconOnly 
                              size="sm" 
                              variant="flat"
                              onPress={() => editContractor(index)}
                            >
                              <Icon icon="lucide:edit" />
                            </Button>
                            <Button 
                              isIconOnly 
                              size="sm" 
                              variant="flat" 
                              color="danger"
                              onPress={() => removeContractor(index)}
                            >
                              <Icon icon="lucide:trash" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="financial" title="Ekonomi">
          <Card>
            <CardBody>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Ekonomiska poster</h2>
                <Button 
                  color="primary" 
                  size="sm"
                  startContent={<Icon icon="lucide:plus" />}
                  onPress={() => {
                    setCurrentFinancialItem({
                      id: Date.now(),
                      supplier: "",
                      account: "",
                      category: "Avtal",
                      amount: 0,
                      frequency: "monthly",
                      notes: ""
                    });
                    setShowFinancialModal(true);
                  }}
                >
                  Lägg till
                </Button>
              </div>
              
              <Table 
                removeWrapper 
                aria-label="Ekonomiska poster"
                classNames={{
                  th: "bg-content2"
                }}
              >
                <TableHeader>
                  <TableColumn>LEVERANTÖR</TableColumn>
                  <TableColumn>KONTO</TableColumn>
                  <TableColumn>KATEGORI</TableColumn>
                  <TableColumn>BELOPP</TableColumn>
                  <TableColumn>FREKVENS</TableColumn>
                  <TableColumn>ÅRSBELOPP</TableColumn>
                  <TableColumn>ÅTGÄRDER</TableColumn>
                </TableHeader>
                <TableBody emptyContent="Inga ekonomiska poster har lagts till">
                  {financialItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{item.account}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.category === "Avtal" 
                            ? "bg-primary-100 text-primary-600" 
                            : "bg-secondary-100 text-secondary-600"
                        }`}>
                          {item.category}
                        </span>
                      </TableCell>
                      <TableCell>{item.amount.toLocaleString()} kr</TableCell>
                      <TableCell>{getFrequencyText(item.frequency)}</TableCell>
                      <TableCell>{calculateYearlyAmount(item).toLocaleString()} kr</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            isIconOnly 
                            size="sm" 
                            variant="flat"
                            onPress={() => {
                              setCurrentFinancialItem(item);
                              setShowFinancialModal(true);
                            }}
                          >
                            <Icon icon="lucide:edit" />
                          </Button>
                          <Button 
                            isIconOnly 
                            size="sm" 
                            variant="flat" 
                            color="danger"
                            onPress={() => {
                              setFinancialItems(financialItems.filter(i => i.id !== item.id));
                            }}
                          >
                            <Icon icon="lucide:trash" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {financialItems.length > 0 && (
                <div className="mt-4 p-4 bg-content2 rounded-md">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Total årskostnad:</h3>
                    <p className="font-bold text-xl">
                      {financialItems.reduce((sum, item) => sum + calculateYearlyAmount(item), 0).toLocaleString()} kr
                    </p>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Fördelning per kategori:</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-content1 rounded-md">
                        <p className="text-sm text-default-500">Avtal</p>
                        <p className="font-bold">
                          {financialItems
                            .filter(item => item.category === "Avtal")
                            .reduce((sum, item) => sum + calculateYearlyAmount(item), 0)
                            .toLocaleString()} kr
                        </p>
                      </div>
                      <div className="p-3 bg-content1 rounded-md">
                        <p className="text-sm text-default-500">Underhåll</p>
                        <p className="font-bold">
                          {financialItems
                            .filter(item => item.category === "Underhåll")
                            .reduce((sum, item) => sum + calculateYearlyAmount(item), 0)
                            .toLocaleString()} kr
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
      
      {/* Financial Item Modal */}
      <Modal isOpen={showFinancialModal} onOpenChange={setShowFinancialModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {currentFinancialItem?.supplier ? `Redigera: ${currentFinancialItem.supplier}` : "Lägg till ekonomisk post"}
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Leverantör"
                  placeholder="T.ex. Telia, Vattenfall"
                  value={currentFinancialItem?.supplier || ""}
                  onValueChange={(value) => setCurrentFinancialItem({...currentFinancialItem, supplier: value})}
                />
                
                <Select
                  label="Konto"
                  placeholder="Välj konto"
                  selectedKeys={currentFinancialItem?.account ? [currentFinancialItem.account] : []}
                  onChange={(e) => setCurrentFinancialItem({...currentFinancialItem, account: e.target.value})}
                >
                  <SelectItem key="5010 - Lokalhyra">5010 - Lokalhyra</SelectItem>
                  <SelectItem key="5020 - El">5020 - El</SelectItem>
                  <SelectItem key="5060 - Städning">5060 - Städning</SelectItem>
                  <SelectItem key="5070 - Reparation">5070 - Reparation</SelectItem>
                  <SelectItem key="5410 - Förbrukningsinventarier">5410 - Förbrukningsinventarier</SelectItem>
                  <SelectItem key="6210 - Telefoni & Internet">6210 - Telefoni & Internet</SelectItem>
                  <SelectItem key="6310 - Försäkringar">6310 - Försäkringar</SelectItem>
                  <SelectItem key="6950 - Tillsynsavgifter">6950 - Tillsynsavgifter</SelectItem>
                </Select>
                
                <Select
                  label="Kategori"
                  placeholder="Välj kategori"
                  selectedKeys={currentFinancialItem?.category ? [currentFinancialItem.category] : []}
                  onChange={(e) => setCurrentFinancialItem({...currentFinancialItem, category: e.target.value})}
                >
                  <SelectItem key="Avtal">Avtal</SelectItem>
                  <SelectItem key="Underhåll">Underhåll</SelectItem>
                </Select>
                
                <Input
                  type="number"
                  label="Belopp per månad (kr)"
                  placeholder="Ange belopp"
                  value={currentFinancialItem?.amount?.toString() || ""}
                  onChange={(e) => setCurrentFinancialItem({...currentFinancialItem, amount: Number(e.target.value)})}
                />
                
                <Select
                  label="Fakturafrekvens"
                  placeholder="Välj frekvens"
                  selectedKeys={currentFinancialItem?.frequency ? [currentFinancialItem.frequency] : []}
                  onChange={(e) => setCurrentFinancialItem({...currentFinancialItem, frequency: e.target.value})}
                >
                  <SelectItem key="monthly">Månadsvis</SelectItem>
                  <SelectItem key="quarterly">Kvartalsvis</SelectItem>
                  <SelectItem key="biannually">Halvårsvis</SelectItem>
                  <SelectItem key="annually">Årsvis</SelectItem>
                </Select>
                
                <Textarea
                  label="Anteckningar"
                  placeholder="Valfria anteckningar"
                  value={currentFinancialItem?.notes || ""}
                  onValueChange={(value) => setCurrentFinancialItem({...currentFinancialItem, notes: value})}
                />
                
                {currentFinancialItem && (
                  <div className="p-3 bg-content2 rounded-md">
                    <p className="text-sm text-default-500">Årsbelopp:</p>
                    <p className="font-bold">{calculateYearlyAmount(currentFinancialItem).toLocaleString()} kr</p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Avbryt
                </Button>
                <Button 
                  color="primary" 
                  onPress={() => {
                    if (currentFinancialItem) {
                      const existingIndex = financialItems.findIndex(item => item.id === currentFinancialItem.id);
                      if (existingIndex >= 0) {
                        // Update existing
                        const updatedItems = [...financialItems];
                        updatedItems[existingIndex] = currentFinancialItem;
                        setFinancialItems(updatedItems);
                      } else {
                        // Add new
                        setFinancialItems([...financialItems, currentFinancialItem]);
                      }
                      setShowFinancialModal(false);
                    }
                  }}
                >
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

export default PropertyDetailPage;