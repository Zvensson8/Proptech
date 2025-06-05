// src/pages/component-types.tsx

import React from "react";
import {
  Card,
  CardBody,
  Button,
  Input,
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
// *** ÄNDRAT: Importera fetchKomponenttyper, saveKomponenttyp, fetchKomponentfält ***
import {
  fetchKomponenttyper,
  saveKomponenttyp,
  fetchKomponentfält
} from "../utils/airtableService";

const ComponentTypesPage: React.FC = () => {
  const [componentTypes, setComponentTypes] = React.useState<any[]>([]);
  const [componentFields, setComponentFields] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentComponentType, setCurrentComponentType] = React.useState<any>(null);
  const [selectedFields, setSelectedFields] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetchKomponenttyper()
      .then(records => {
        // records: { id, fields: { Komponent, Beskrivning, "Tillåtna fält": [recIDs] } }
        setComponentTypes(records.map(r => ({ id: r.id, ...r.fields })));
      })
      .catch(() => setComponentTypes([]));

    fetchKomponentfält()
      .then(records => {
        // records: { id, fields: { Fältnamn, "Komponenttyper": [recIDs] } }
        setComponentFields(records.map(r => ({ id: r.id, ...r.fields })));
      })
      .catch(() => setComponentFields([]));
  }, []);

  const handleEdit = (ct: any) => {
    setCurrentComponentType(ct);
    // ct["Tillåtna fält"] är en array med fältnamn (via relation)
    setSelectedFields(ct["Tillåtna fält"] || []);
    onOpen();
  };

  const handleNew = () => {
    setCurrentComponentType({ Komponent: "", Beskrivning: "", "Tillåtna fält": [] });
    setSelectedFields([]);
    onOpen();
  };

  const saveCurrent = async () => {
    const fields = {
      Komponent: currentComponentType.Komponent,
      Beskrivning: currentComponentType.Beskrivning,
      "Tillåtna fält": selectedFields
    };
    const recordId = currentComponentType.id;
    await saveKomponenttyp(fields, recordId);
    window.location.reload();
  };

  const filtered = componentTypes.filter(ct =>
    ct.Komponent.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (ct.Beskrivning || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Input
            placeholder="Sök komponenttyp..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            startContent={<Icon icon="lucide:search" className="text-default-400" />}
            className="w-full sm:w-64"
          />
        </div>
        <Button color="primary" startContent={<Icon icon="lucide:plus" />} onPress={handleNew}>
          Ny komponenttyp
        </Button>
      </div>

      <Card>
        <CardBody>
          <Table removeWrapper aria-label="Komponenttyper">
            <TableHeader>
              <TableColumn>NAMN</TableColumn>
              <TableColumn>BESKRIVNING</TableColumn>
              <TableColumn>FÄLT</TableColumn>
              <TableColumn>INSTANSER</TableColumn>
              <TableColumn>ÅTGÄRDER</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Inga komponenttyper hittades">
              {filtered.map(ct => (
                <TableRow key={ct.id}>
                  <TableCell>{ct.Komponent}</TableCell>
                  <TableCell>{ct.Beskrivning}</TableCell>
                  <TableCell>{(ct["Tillåtna fält"] || []).join(", ")}</TableCell>
                  <TableCell>{ct.Instanser || 0}</TableCell>
                  <TableCell>
                    <Button variant="flat" size="sm" onPress={() => handleEdit(ct)} startContent={<Icon icon="lucide:edit" />} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          <ModalHeader>{currentComponentType?.id ? "Redigera typ" : "Ny typ"}</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Komponent"
                value={currentComponentType?.Komponent}
                onValueChange={v => setCurrentComponentType({ ...currentComponentType, Komponent: v })}
                isRequired
              />
              <Textarea
                label="Beskrivning"
                value={currentComponentType?.Beskrivning}
                onValueChange={v => setCurrentComponentType({ ...currentComponentType, Beskrivning: v })}
              />
              <Select
                label="Tillåtna fält"
                placeholder="Välj fält"
                defaultSelectedKeys={selectedFields}
                onSelectionChange={(keys) => setSelectedFields(Array.from(keys) as string[])}
                multiple
              >
                {componentFields.map(f => (
                  <SelectItem key={f.Fältnamn} value={f.Fältnamn}>
                    {f.Fältnamn}
                  </SelectItem>
                ))}
              </Select>
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

export default ComponentTypesPage;
