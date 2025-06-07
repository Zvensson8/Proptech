// src/pages/component-instances.tsx

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
  SelectItem,
  Textarea
} from "@heroui/react";
import { Icon } from "@iconify/react";
// *** ÄNDRAT: Importera fetchKomponenter, fetchFastigheter, fetchKomponenttyper, saveKomponent ***
import { fetchKomponenter, fetchFastigheter, fetchKomponenttyper, saveKomponent } from "../utils/airtableService";

const ComponentInstancesPage: React.FC = () => {
  const [components, setComponents] = React.useState<any[]>([]);
  const [properties, setProperties] = React.useState<any[]>([]);
  const [types, setTypes] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = React.useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentComponent, setCurrentComponent] = React.useState<any>(null);

  React.useEffect(() => {
    fetchKomponenter()
      .then(records => setComponents(records.map(r => ({ id: r.id, ...r.fields }))))
      .catch(() => setComponents([]));

    fetchFastigheter()
      .then(records => setProperties(records.map(r => r.fields.Fastighet)))
      .catch(() => setProperties([]));

    fetchKomponenttyper()
      .then(records => setTypes(records.map(r => r.fields.Komponent)))
      .catch(() => setTypes([]));
  }, []);

  const handleEdit = (comp: any) => {
    setCurrentComponent(comp);
    onOpen();
  };

  const handleNew = () => {
    setCurrentComponent({
      Komponent: "",
      Fastighet: "",
      Komponenttyp: "",
      Installationsår: "",
      Tillverkare: "",
      Modell: "",
      "Serie/ID Nummer": "",
      Placering: "",
      Anteckningar: "",
      Filer: "",
      Status: "",
      // defaultvärden för specialfälten, om det behövs
      Område: "",
      Area: "",
      Kapacitet: "",
      Skyddsrumstyp: "",
      "Teknisk best.": "",
      Luftrening: "",
      Latitud: "",
      Longitud: "",
      Kod: "",
      "Fyllnadsmängd (kg)": "",
      Köldmedietyp: "",
      Hisstyp: "",
      Tillverkningsnr: "",
      Stannplan: "",
      Passagerare: "",
      "Maxlast (kg)": "",
      "Hastighet (m/s)": "",
      "Höjd (m)": "",
      Lyftorgan: "",
      "Antal parter": "",
      "Dimension (mm)": "",
      "Nödtel.modell": "",
      "Nödtel.linje": "",
      "Antal starter": ""
    });
    onOpen();
  };

  const saveCurrent = async () => {
    const fields = { ...currentComponent };
    const recordId = currentComponent.id;
    delete fields.id;
    await saveKomponent(fields, recordId);
    window.location.reload();
  };

  const filtered = components.filter(comp => {
    const matchesSearch =
      comp.Komponent?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.Tillverkare?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || comp.Komponenttyp === selectedType;
    const matchesProperty = !selectedProperty || comp.Fastighet === selectedProperty;
    const matchesStatus = !selectedStatus || comp.Status === selectedStatus;
    return matchesSearch && matchesType && matchesProperty && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Komponenter</h1>
        <Button color="primary" startContent={<Icon icon="lucide:plus" />} onPress={handleNew}>
          Ny komponent
        </Button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Input
          placeholder="Sök komponent..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          startContent={<Icon icon="lucide:search" className="text-default-400" />}
          className="w-full sm:w-64"
        />

        <Dropdown>
          <DropdownTrigger>
            <Button variant="flat" endContent={<Icon icon="lucide:chevron-down" />}>
              {selectedType || "Komponenttyp"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Komponenttyper"
            selectionMode="single"
            selectedKeys={selectedType ? [selectedType] : []}
            onSelectionChange={keys => {
              const sel = Array.from(keys)[0] as string;
              setSelectedType(sel === selectedType ? null : sel);
            }}
          >
            {types.map(typeName => (
              <DropdownItem key={typeName}>{typeName}</DropdownItem>
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
            onSelectionChange={keys => {
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
            onSelectionChange={keys => {
              const sel = Array.from(keys)[0] as string;
              setSelectedStatus(sel === selectedStatus ? null : sel);
            }}
          >
            <DropdownItem key="Aktiv">Aktiv</DropdownItem>
            <DropdownItem key="Inaktiv">Inaktiv</DropdownItem>
            <DropdownItem key="clear" color="danger">
              Rensa filter
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <Card>
        <CardBody>
          <Table removeWrapper aria-label="Komponenter">
            <TableHeader>
              <TableColumn>NAMN</TableColumn>
              <TableColumn>TYPE</TableColumn>
              <TableColumn>FASTIGHET</TableColumn>
              <TableColumn>TILLVERKARE</TableColumn>
              <TableColumn>MODELL</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ÅTGÄRDER</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Inga komponenter hittades">
              {filtered.map(comp => (
                <TableRow key={comp.id}>
                  <TableCell>{comp.Komponent}</TableCell>
                  <TableCell>{comp.Komponenttyp}</TableCell>
                  <TableCell>{comp.Fastighet}</TableCell>
                  <TableCell>{comp.Tillverkare}</TableCell>
                  <TableCell>{comp.Modell}</TableCell>
                  <TableCell>{comp.Status}</TableCell>
                  <TableCell>
                    <Button variant="flat" size="sm" onPress={() => handleEdit(comp)} startContent={<Icon icon="lucide:edit" />} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          <ModalHeader>{currentComponent?.id ? "Redigera komponent" : "Ny komponent"}</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Komponentnamn"
                value={currentComponent?.Komponent}
                onValueChange={v => setCurrentComponent({ ...currentComponent, Komponent: v })}
                isRequired
              />

              <Select
                label="Fastighet"
                defaultSelectedKeys={[currentComponent?.Fastighet]}
                onChange={e => setCurrentComponent({ ...currentComponent, Fastighet: e.target.value })}
              >
                {properties.map(propName => (
                  <SelectItem key={propName} value={propName}>
                    {propName}
                  </SelectItem>
                ))}
              </Select>

              <Select
                label="Komponenttyp"
                defaultSelectedKeys={[currentComponent?.Komponenttyp]}
                onChange={e => setCurrentComponent({ ...currentComponent, Komponenttyp: e.target.value })}
              >
                {types.map(typeName => (
                  <SelectItem key={typeName} value={typeName}>
                    {typeName}
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Installationsår"
                type="number"
                value={currentComponent?.Installationsår}
                onValueChange={v => setCurrentComponent({ ...currentComponent, Installationsår: v })}
              />

              <Input
                label="Tillverkare"
                value={currentComponent?.Tillverkare}
                onValueChange={v => setCurrentComponent({ ...currentComponent, Tillverkare: v })}
              />

              <Input
                label="Modell"
                value={currentComponent?.Modell}
                onValueChange={v => setCurrentComponent({ ...currentComponent, Modell: v })}
              />

              <Input
                label="Serie/ID Nummer"
                value={currentComponent?.["Serie/ID Nummer"]}
                onValueChange={v => setCurrentComponent({ ...currentComponent, ["Serie/ID Nummer"]: v })}
              />

              <Input
                label="Placering"
                value={currentComponent?.Placering}
                onValueChange={v => setCurrentComponent({ ...currentComponent, Placering: v })}
              />

              <Textarea
                label="Anteckningar"
                value={currentComponent?.Anteckningar}
                onValueChange={v => setCurrentComponent({ ...currentComponent, Anteckningar: v })}
              />

              {/* Specialfält: Skyddsrum */}
              {currentComponent?.Komponenttyp === "Skyddsrum" && (
                <>
                  <Input
                    label="Område"
                    value={currentComponent?.Område}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, Område: v })}
                  />
                  <Input
                    label="Area"
                    value={currentComponent?.Area}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, Area: v })}
                  />
                  <Input
                    label="Kapacitet"
                    value={currentComponent?.Kapacitet}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, Kapacitet: v })}
                  />
                  <Input
                    label="Skyddsrumstyp"
                    value={currentComponent?.Skyddsrumstyp}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, Skyddsrumstyp: v })}
                  />
                  <Input
                    label="Teknisk best."
                    value={currentComponent?.["Teknisk best."]}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, ["Teknisk best."]: v })}
                  />
                  <Input
                    label="Luftrening"
                    value={currentComponent?.Luftrening}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, Luftrening: v })}
                  />
                  <Input
                    label="Latitud"
                    value={currentComponent?.Latitud}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, Latitud: v })}
                  />
                  <Input
                    label="Longitud"
                    value={currentComponent?.Longitud}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, Longitud: v })}
                  />
                </>
              )}

              {/* Specialfält: Kylaggregat */}
              {currentComponent?.Komponenttyp === "Kylaggregat" && (
                <>
                  <Input
                    label="Kod"
                    value={currentComponent?.Kod}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, Kod: v })}
                  />
                  <Input
                    label="Fyllnadsmängd (kg)"
                    value={currentComponent?.["Fyllnadsmängd (kg)"]}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, ["Fyllnadsmängd (kg)"]: v })}
                  />
                  <Input
                    label="Köldmedietyp"
                    value={currentComponent?.Köldmedietyp}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, Köldmedietyp: v })}
                  />
                </>
              )}

              {/* Specialfält: Hiss */}
              {currentComponent?.Komponenttyp === "Hiss" && (
                <>
                  <Input
                    label="Hisstyp"
                    value={currentComponent?.Hisstyp}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, Hisstyp: v })}
                  />
                  <Input
                    label="Tillverkningsnr"
                    value={currentComponent?.Tillverkningsnr}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, Tillverkningsnr: v })}
                  />
                  <Input
                    label="Stannplan"
                    value={currentComponent?.Stannplan}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, Stannplan: v })}
                  />
                  <Input
                    label="Passagerare"
                    value={currentComponent?.Passagerare}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, Passagerare: v })}
                  />
                  <Input
                    label="Maxlast (kg)"
                    value={currentComponent?.["Maxlast (kg)"]}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, ["Maxlast (kg)"]: v })}
                  />
                  <Input
                    label="Hastighet (m/s)"
                    value={currentComponent?.["Hastighet (m/s)"]}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, ["Hastighet (m/s)"]: v })}
                  />
                  <Input
                    label="Höjd (m)"
                    value={currentComponent?.["Höjd (m)"]}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, ["Höjd (m)"]: v })}
                  />
                  <Input
                    label="Lyftorgan"
                    value={currentComponent?.Lyftorgan}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, Lyftorgan: v })}
                  />
                  <Input
                    label="Antal parter"
                    value={currentComponent?.["Antal parter"]}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, ["Antal parter"]: v })}
                  />
                  <Input
                    label="Dimension (mm)"
                    value={currentComponent?.["Dimension (mm)"]}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, ["Dimension (mm)"]: v })}
                  />
                  <Input
                    label="Nödtel.modell"
                    value={currentComponent?.["Nödtel.modell"]}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, ["Nödtel.modell"]: v })}
                  />
                  <Input
                    label="Nödtel.linje"
                    value={currentComponent?.["Nödtel.linje"]}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, ["Nödtel.linje"]: v })}
                  />
                  <Input
                    label="Antal starter"
                    value={currentComponent?.["Antal starter"]}
                    onValueChange={v => setCurrentComponent({ ...currentComponent, ["Antal starter"]: v })}
                  />
                </>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onPress={saveCurrent} color="primary">Spara</Button>
            <Button variant="flat" onPress={() => onOpenChange(false)}>Avbryt</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ComponentInstancesPage;
