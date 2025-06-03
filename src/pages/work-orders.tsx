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
  Textarea,
  Select,
  SelectItem
} from "@heroui/react";
import { Icon } from "@iconify/react";
import StatusBadge from "../components/status-badge";
import ExportButton from "../components/export-button";

// Sample data
const workOrdersData = [
  { 
    id: 1, 
    property: "Kontorsbyggnad A", 
    task: "Filterbyte ventilation", 
    status: "Pågående", 
    due_date: "2023-06-15", 
    contractor: "VentService AB",
    cost: 5000,
    comment: "Beställt filter, väntar på leverans"
  },
  { 
    id: 2, 
    property: "Bostadshus C", 
    task: "Reparation av värmepump", 
    status: "Ej påbörjad", 
    due_date: "2023-06-20", 
    contractor: "Värme & Kyla AB",
    cost: 12000,
    comment: "Kontakta entreprenör för tidsbokning"
  },
  { 
    id: 3, 
    property: "Lagerlokal B", 
    task: "Kontroll av brandlarm", 
    status: "Klar", 
    due_date: "2023-06-10", 
    contractor: "Säkerhetstjänst AB",
    cost: 3500,
    comment: "Utfört enligt plan, protokoll mottaget"
  },
  { 
    id: 4, 
    property: "Kontorsbyggnad A", 
    task: "Byte av belysning", 
    status: "Pågående", 
    due_date: "2023-06-18", 
    contractor: "El-Service AB",
    cost: 8500,
    comment: "Påbörjat arbete, material beställt"
  },
  { 
    id: 5, 
    property: "Butiksfastighet D", 
    task: "Service av kylanläggning", 
    status: "Ej påbörjad", 
    due_date: "2023-06-25", 
    contractor: "Kylspecialisten AB",
    cost: 7200,
    comment: ""
  },
  { 
    id: 6, 
    property: "Lagerlokal B", 
    task: "Reparation av portar", 
    status: "Avbruten", 
    due_date: "2023-06-05", 
    contractor: "Portbolaget AB",
    cost: 0,
    comment: "Avbrutet pga ändrade förutsättningar"
  },
  { 
    id: 7, 
    property: "Bostadshus C", 
    task: "Byte av låssystem", 
    status: "Klar", 
    due_date: "2023-05-30", 
    contractor: "Säkerhetsbolaget AB",
    cost: 15000,
    comment: "Installerat och testat, nycklar utdelade"
  },
];

const properties = [
  { id: 1, name: "Kontorsbyggnad A" },
  { id: 2, name: "Lagerlokal B" },
  { id: 3, name: "Bostadshus C" },
  { id: 4, name: "Butiksfastighet D" },
];

const contractors = [
  "VentService AB",
  "Värme & Kyla AB",
  "Säkerhetstjänst AB",
  "El-Service AB",
  "Kylspecialisten AB",
  "Portbolaget AB",
  "Säkerhetsbolaget AB",
];

const statuses = ["Ej påbörjad", "Pågående", "Klar", "Avbruten"];

const WorkOrdersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = React.useState<string | null>(null);
  
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentWorkOrder, setCurrentWorkOrder] = React.useState<any | null>(null);
  
  const handleEdit = (workOrder: any) => {
    setCurrentWorkOrder({...workOrder});
    onOpen();
  };
  
  const handleNew = () => {
    setCurrentWorkOrder({
      id: Math.max(...workOrdersData.map(wo => wo.id)) + 1,
      property: "",
      task: "",
      status: "Ej påbörjad",
      due_date: new Date().toISOString().split('T')[0],
      contractor: "",
      cost: 0,
      comment: ""
    });
    onOpen();
  };
  
  const handleWorkOrderChange = (field: string, value: any) => {
    setCurrentWorkOrder({
      ...currentWorkOrder,
      [field]: value
    });
  };
  
  const filteredWorkOrders = workOrdersData.filter(workOrder => {
    const matchesSearch = 
      workOrder.task.toLowerCase().includes(searchQuery.toLowerCase()) || 
      workOrder.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workOrder.contractor.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = !selectedStatus || workOrder.status === selectedStatus;
    const matchesProperty = !selectedProperty || workOrder.property === selectedProperty;
    
    return matchesSearch && matchesStatus && matchesProperty;
  });

  const tableHeaders = ["FASTIGHET", "ÅTGÄRD", "STATUS", "DATUM", "ENTREPRENÖR", "KOSTNAD", "ÅTGÄRDER"];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Driftbeställningar</h1>
        <p className="text-default-500">Hantera driftbeställningar för dina fastigheter</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between flex-wrap">
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <Input
            placeholder="Sök driftbeställning..."
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
                {selectedStatus || "Status"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Status filter"
              selectionMode="single"
              selectedKeys={selectedStatus ? [selectedStatus] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setSelectedStatus(selected === selectedStatus ? null : selected);
              }}
            >
              {statuses.map((status) => (
                <DropdownItem key={status}>{status}</DropdownItem>
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
              aria-label="Property filter"
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
          
          <ExportButton 
            title="Driftbeställningar"
            headers={tableHeaders}
            data={filteredWorkOrders}
            filename="driftbeställningar"
          />
        </div>

        <Button 
          color="primary"
          startContent={<Icon icon="lucide:plus" />}
          onPress={handleNew}
        >
          Ny driftbeställning
        </Button>
      </div>

      <Card>
        <CardBody>
          <Table 
            removeWrapper 
            aria-label="Driftbeställningar"
            classNames={{
              th: "bg-content2"
            }}
          >
            <TableHeader>
              <TableColumn>FASTIGHET</TableColumn>
              <TableColumn>ÅTGÄRD</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>DATUM</TableColumn>
              <TableColumn>ENTREPRENÖR</TableColumn>
              <TableColumn>KOSTNAD</TableColumn>
              <TableColumn>ÅTGÄRDER</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Inga driftbeställningar hittades">
              {filteredWorkOrders.map((workOrder) => (
                <TableRow key={workOrder.id}>
                  <TableCell>{workOrder.property}</TableCell>
                  <TableCell>{workOrder.task}</TableCell>
                  <TableCell>
                    <StatusBadge status={workOrder.status} />
                  </TableCell>
                  <TableCell>{workOrder.due_date}</TableCell>
                  <TableCell>{workOrder.contractor}</TableCell>
                  <TableCell>{workOrder.cost.toLocaleString()} kr</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="flat"
                        onPress={() => handleEdit(workOrder)}
                      >
                        <Icon icon="lucide:eye" />
                      </Button>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="flat"
                        onPress={() => handleEdit(workOrder)}
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
      
      {/* Work Order Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {currentWorkOrder?.id ? (
                  currentWorkOrder.task ? `Redigera: ${currentWorkOrder.task}` : "Ny driftbeställning"
                ) : "Ny driftbeställning"}
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Fastighet"
                    placeholder="Välj fastighet"
                    defaultSelectedKeys={currentWorkOrder?.property ? [currentWorkOrder.property] : []}
                    onChange={(e) => handleWorkOrderChange("property", e.target.value)}
                  >
                    {properties.map((property) => (
                      <SelectItem key={property.name} value={property.name}>
                        {property.name}
                      </SelectItem>
                    ))}
                  </Select>
                  
                  <Input
                    label="Åtgärd"
                    placeholder="Beskriv åtgärden"
                    value={currentWorkOrder?.task || ""}
                    onValueChange={(value) => handleWorkOrderChange("task", value)}
                  />
                  
                  <Select
                    label="Status"
                    placeholder="Välj status"
                    defaultSelectedKeys={currentWorkOrder?.status ? [currentWorkOrder.status] : []}
                    onChange={(e) => handleWorkOrderChange("status", e.target.value)}
                  >
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </Select>
                  
                  <Input
                    label="Datum"
                    placeholder="Välj datum"
                    type="date"
                    value={currentWorkOrder?.due_date || ""}
                    onChange={(e) => handleWorkOrderChange("due_date", e.target.value)}
                  />
                  
                  <Select
                    label="Entreprenör"
                    placeholder="Välj entreprenör"
                    defaultSelectedKeys={currentWorkOrder?.contractor ? [currentWorkOrder.contractor] : []}
                    onChange={(e) => handleWorkOrderChange("contractor", e.target.value)}
                  >
                    {contractors.map((contractor) => (
                      <SelectItem key={contractor} value={contractor}>
                        {contractor}
                      </SelectItem>
                    ))}
                  </Select>
                  
                  <Input
                    label="Kostnad (kr)"
                    placeholder="Ange kostnad"
                    type="number"
                    value={currentWorkOrder?.cost?.toString() || "0"}
                    onChange={(e) => handleWorkOrderChange("cost", Number(e.target.value))}
                  />
                </div>
                
                <Textarea
                  label="Kommentar"
                  placeholder="Lägg till kommentar eller anteckningar"
                  value={currentWorkOrder?.comment || ""}
                  onValueChange={(value) => handleWorkOrderChange("comment", value)}
                  className="mt-4"
                />
                
                <div className="mt-4">
                  <p className="text-sm mb-2">Bifogade filer</p>
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

export default WorkOrdersPage;