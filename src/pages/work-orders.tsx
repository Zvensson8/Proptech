// src/pages/work-orders.tsx

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
// *** ÄNDRAT: Importera fetchDriftarenden och saveDriftarende ***
import { fetchDriftarenden, saveDriftarende, fetchFastigheter } from "../utils/airtableService";

const statuses = ["Ej påbörjad", "Pågående", "Klar", "Avbruten"];
const WorkOrdersPage: React.FC = () => {
  const [workOrders, setWorkOrders] = React.useState<any[]>([]);
  const [properties, setProperties] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = React.useState<string | null>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentOrder, setCurrentOrder] = React.useState<any | null>(null);

  React.useEffect(() => {
    fetchDriftarenden()
      .then(records => setWorkOrders(records.map(r => ({ id: r.id, ...r.fields }))))
      .catch(() => setWorkOrders([]));

    // Hämta listan av fastigheter för dropdown
    fetchFastigheter()
      .then(records => setProperties(records.map(r => r.fields.Fastighet)))
      .catch(() => setProperties([]));
  }, []);

  const handleEdit = (wo: any) => {
    setCurrentOrder({ ...wo });
    onOpen();
  };

  const handleNew = () => {
    setCurrentOrder({
      Åtgärd: "",
      Fastighet: "",
      Status: "Ej påbörjad",
      Datum: new Date().toISOString().split("T")[0],
      Entreprenör: "",
      Pris: 0,
      Kommentar: ""
    });
    onOpen();
  };

  const saveCurrent = async () => {
    const fields = { ...currentOrder };
    const recordId = currentOrder.id;
    delete fields.id;
    await saveDriftarende(fields, recordId);
    window.location.reload();
  };

  const filteredWorkOrders = workOrders.filter(workOrder => {
    const matchesSearch =
      workOrder.Åtgärd?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workOrder.Fastighet?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workOrder.Entreprenör?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = !selectedStatus || workOrder.Status === selectedStatus;
    const matchesProperty = !selectedProperty || workOrder.Fastighet === selectedProperty;

    return matchesSearch && matchesStatus && matchesProperty;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Driftbeställningar</h1>
        <p className="text-default-500">Hantera driftbeställningar för dina fastigheter</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between flex-wrap">
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <Input
            placeholder="Sök ärende..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            startContent={<Icon icon="lucide:search" className="text-default-400" />}
            className="w-full sm:w-64"
          />

          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat" endContent={<Icon icon="lucide:chevron-down" />}>
                {selectedStatus || "Status"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Status"
              selectionMode="single"
              selectedKeys={selectedStatus ? [selectedStatus] : []}
              onSelectionChange={(keys) => {
                const sel = Array.from(keys)[0] as string;
                setSelectedStatus(sel === selectedStatus ? null : sel);
              }}
            >
              {statuses.map(status => (
                <DropdownItem key={status}>{status}</DropdownItem>
              ))}
              <DropdownItem key="clear" color="danger">
                Rensa filter
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat" endContent={<Icon icon="lucide:chevron-down" />}>
                {selectedProperty || "Fastighet"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Fastigheter"
              selectionMode="single"
              selectedKeys={selectedProperty ? [selectedProperty] : []}
              onSelectionChange={(keys) => {
                const sel = Array.from(keys)[0] as string;
                setSelectedProperty(sel === selectedProperty ? null : sel);
              }}
            >
              {properties.map(propName => (
                <DropdownItem key={propName}>{propName}</DropdownItem>
              ))}
              <DropdownItem key="clear" color="danger">
                Rensa filter
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <Button color="primary" startContent={<Icon icon="lucide:plus" />} onPress={handleNew}>
          Ny beställning
        </Button>
      </div>

      <Card>
        <CardBody>
          <Table removeWrapper aria-label="Driftbeställningar">
            <TableHeader>
              <TableColumn>FASTIGHET</TableColumn>
              <TableColumn>ÅTGÄRD</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>DATUM</TableColumn>
              <TableColumn>ENTREPRENÖR</TableColumn>
              <TableColumn>KOSTNAD</TableColumn>
              <TableColumn>ÅTGÄRDER</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Inga ärenden hittades">
              {filteredWorkOrders.map(wo => (
                <TableRow key={wo.id}>
                  <TableCell>{wo.Fastighet}</TableCell>
                  <TableCell>{wo.Åtgärd}</TableCell>
                  <TableCell>{wo.Status}</TableCell>
                  <TableCell>{wo.Datum}</TableCell>
                  <TableCell>{wo.Entreprenör}</TableCell>
                  <TableCell>{wo.Pris}</TableCell>
                  <TableCell>
                    <Button variant="flat" size="sm" onPress={() => handleEdit(wo)} startContent={<Icon icon="lucide:edit" />} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          <ModalHeader>{currentOrder?.id ? "Redigera ärende" : "Nytt ärende"}</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Fastighet"
                defaultSelectedKeys={[currentOrder?.Fastighet]}
                onChange={e => setCurrentOrder({ ...currentOrder, Fastighet: e.target.value })}
              >
                {properties.map(propName => (
                  <SelectItem key={propName} value={propName}>
                    {propName}
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Åtgärd"
                value={currentOrder?.Åtgärd}
                onValueChange={v => setCurrentOrder({ ...currentOrder, Åtgärd: v })}
                isRequired
              />

              <Select
                label="Status"
                defaultSelectedKeys={[currentOrder?.Status]}
                onChange={e => setCurrentOrder({ ...currentOrder, Status: e.target.value })}
              >
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Datum"
                type="date"
                value={currentOrder?.Datum}
                onValueChange={v => setCurrentOrder({ ...currentOrder, Datum: v })}
                isRequired
              />

              <Select
                label="Entreprenör"
                defaultSelectedKeys={[currentOrder?.Entreprenör]}
                onChange={e => setCurrentOrder({ ...currentOrder, Entreprenör: e.target.value })}
              >
                {properties.map(propName => (
                  // Vi återanvänder fastighetslistan som entreprenör‐exempel om ingen separat lista finns
                  <SelectItem key={propName} value={propName}>
                    {propName}
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Pris"
                type="number"
                value={currentOrder?.Pris}
                onValueChange={v => setCurrentOrder({ ...currentOrder, Pris: v })}
              />

              <Textarea
                label="Kommentar"
                value={currentOrder?.Kommentar}
                onValueChange={v => setCurrentOrder({ ...currentOrder, Kommentar: v })}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={saveCurrent}>
              Spara
            </Button>
            <Button variant="flat" onPress={() => onOpenChange(false)}>
              Avbryt
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default WorkOrdersPage;
