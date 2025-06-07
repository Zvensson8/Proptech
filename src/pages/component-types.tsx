import React from "react";
import {
  Card, CardBody, Button, Input,
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  useDisclosure, Textarea, Select, SelectItem
} from "@heroui/react";
import { Icon } from "@iconify/react";
// Uppdaterad import: matchar exakt exportnamnen i supabaseService
import {
  fetchKomponenttyper,
  saveKomponenttyp,
  fetchKomponentfält  // förutsätter att supabaseService-funktionen döpts om med 'ä'
} from "../utils/supabaseService";

// Definiera typer för datamodellerna
interface Komponentfält { 
  id: string; 
  Fältnamn: string; 
  // ...övriga fältegenskaper om de finns 
}
interface Komponenttyp {
  id?: string;
  Komponent: string;
  Beskrivning?: string;
  "Tillåtna fält": string[];  // lagras som lista av fält-ID (uuid) i nya schemat
  Instanser?: number;
}

const ComponentTypesPage: React.FC = () => {
  const [componentTypes, setComponentTypes] = React.useState<Komponenttyp[]>([]);
  const [componentFields, setComponentFields] = React.useState<Komponentfält[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentComponentType, setCurrentComponentType] = React.useState<Komponenttyp | null>(null);
  const [selectedFields, setSelectedFields] = React.useState<string[]>([]);

  React.useEffect(() => {
    // Hämta komponenttyper
    fetchKomponenttyper()
      .then(records => setComponentTypes(records || []))
      .catch(err => {
        console.error("Kunde inte hämta Komponenttyper:", err);
        setComponentTypes([]);
      });
    // Hämta tillgängliga fält
    fetchKomponentfält()
      .then(records => setComponentFields(records || []))
      .catch(err => {
        console.error("Kunde inte hämta Komponentfält:", err);
        setComponentFields([]);
      });
  }, []);

  const handleEdit = (ct: Komponenttyp) => {
    setCurrentComponentType(ct);
    // Anta att Tillåtna fält är en array av fält-ID (uuid) i nya schemat
    setSelectedFields(ct["Tillåtna fält"] ? [...ct["Tillåtna fält"]] : []); 
    onOpen();
  };

  const handleNew = () => {
    // Nytt objekt för komponenttyp
    setCurrentComponentType({
      Komponent: "",
      Beskrivning: "",
      "Tillåtna fält": []
    });
    setSelectedFields([]);
    onOpen();
  };

const saveCurrent = async () => {
  if (!currentComponentType) return;
  try {
    const fields: Partial<Komponenttyp> = {
      Komponent: currentComponentType.Komponent,
      Beskrivning: currentComponentType.Beskrivning || "",
      "Tillåtna fält": selectedFields
    };
    const recordId = currentComponentType.id;
    await saveKomponenttyp(fields, recordId);

    // Uppdatera listan lokalt istället för hel reload
    if (recordId) {
      // Uppdatera befintlig i state
      setComponentTypes(prev =>
        prev.map(ct =>
          ct.id === recordId ? { ...ct, ...fields } as Komponenttyp : ct
        )
      );
    } else {
      // Lägg till ny i state
      const refreshedList = await fetchKomponenttyper().catch(() => null);

      if (refreshedList) {
        setComponentTypes(refreshedList); // <-- ÄNDRAD HÄR
      }
      // Annars behåller vi befintlig lista
    }

    onOpenChange(false); // stäng modalen
  } catch (error: any) {
    console.error("Fel vid sparande av komponenttyp:", error);
    alert("Kunde inte spara komponenttypen. Kontrollera data och försök igen.");
  }
};


  // Filtrera listan baserat på söksträngen
  const filtered = componentTypes.filter(ct => {
    const name = ct.Komponent || "";      // säkerställ sträng
    const desc = ct.Beskrivning || "";
    return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           desc.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Sökfält och ny-knapp */}
      <div className="flex justify-between items-center">
        <Input
          placeholder="Sök komponenttyp..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          startContent={<Icon icon="lucide:search" className="text-default-400" />}
          className="w-full sm:w-64"
        />
        <Button color="primary" startContent={<Icon icon="lucide:plus" />} onPress={handleNew}>
          Ny komponenttyp
        </Button>
      </div>

      {/* Tabell med komponenttyper */}
      <Card>
        <CardBody>
          <Table aria-label="Komponenttyper" removeWrapper>
            <TableHeader>
              <TableColumn>NAMN</TableColumn>
              <TableColumn>BESKRIVNING</TableColumn>
              <TableColumn>FÄLT</TableColumn>
              <TableColumn>INSTANSER</TableColumn>
              <TableColumn>ÅTGÄRDER</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Inga komponenttyper hittades">
              {filtered.map(ct => {
                // Mappa fält-ID-lista till namnlista för visning
                const fieldNames = (ct["Tillåtna fält"] || []).map(fid => {
                  const f = componentFields.find(field => field.id === fid);
                  return f ? f.Fältnamn : fid;
                });
                return (
                  <TableRow key={ct.id}>
                    <TableCell>{ct.Komponent}</TableCell>
                    <TableCell>{ct.Beskrivning || ""}</TableCell>
                    <TableCell>{fieldNames.join(", ")}</TableCell>
                    <TableCell>{ct.Instanser ?? 0}</TableCell>
                    <TableCell>
                      <Button variant="flat" size="sm" onPress={() => handleEdit(ct)}
                              startContent={<Icon icon="lucide:edit" />} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Modal för ny/redigera komponenttyp */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          <ModalHeader>{currentComponentType?.id ? "Redigera typ" : "Ny typ"}</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Komponent"
                value={currentComponentType?.Komponent}
                onValueChange={v => setCurrentComponentType(prev => prev ? { ...prev, Komponent: v } : prev)}
                isRequired
              />
              <Textarea
                label="Beskrivning"
                value={currentComponentType?.Beskrivning}
                onValueChange={v => setCurrentComponentType(prev => prev ? { ...prev, Beskrivning: v } : prev)}
              />
              <Select
                label="Tillåtna fält"
                placeholder="Välj fält"
                // Använd selectedKeys för kontrollerat läge med fält-ID:n
                selectedKeys={new Set(selectedFields)}
                onSelectionChange={keys => setSelectedFields(Array.from(keys) as string[])}
                multiple
              >
                {componentFields.map(f => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.Fältnamn}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={saveCurrent}>Spara</Button>
            <Button variant="flat" onPress={() => onOpenChange(false)}>Avbryt</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ComponentTypesPage;
