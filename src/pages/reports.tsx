// src/pages/reports.tsx

import React from "react";
import {
  Card,
  CardBody,
  Button,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Checkbox,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@heroui/react";
import { Icon } from "@iconify/react";
import ExportButton from "../components/export-button";

// *** ÄNDRAT: Importera fetch‐funktioner från airtableService ***
import {
  fetchFastigheter,
  fetchKomponenttyper,
  fetchKomponenter,
  fetchDriftarenden
} from "../utils/airtableService";

const ReportsPage: React.FC = () => {
  const [properties, setProperties] = React.useState<string[]>([]);
  const [componentTypes, setComponentTypes] = React.useState<string[]>([]);
  const [componentData, setComponentData] = React.useState<any[]>([]);
  const [workOrdersData, setWorkOrdersData] = React.useState<any[]>([]);

  const [selectedProperty, setSelectedProperty] = React.useState("Alla fastigheter");
  const [selectedComponentType, setSelectedComponentType] = React.useState("Alla typer");
  const [selectedDateRange, setSelectedDateRange] = React.useState("all");
  const [selectedFields, setSelectedFields] = React.useState<string[]>([
    "Komponent", "Komponenttyp", "Fastighet", "Tillverkare", "Modell", "Status"
  ]);

  // Hämta allt från Airtable vid inläsning
  React.useEffect(() => {
    fetchFastigheter()
      .then(records => setProperties(records.map(r => r.fields.Fastighet)))
      .catch(() => setProperties([]));

    fetchKomponenttyper()
      .then(records => setComponentTypes(records.map(r => r.fields.Komponent)))
      .catch(() => setComponentTypes([]));

    fetchKomponenter()
      .then(records => setComponentData(records.map(r => ({ id: r.id, ...r.fields }))))
      .catch(() => setComponentData([]));

    fetchDriftarenden()
      .then(records => setWorkOrdersData(records.map(r => ({ id: r.id, ...r.fields }))))
      .catch(() => setWorkOrdersData([]));
  }, []);

  const handleFieldToggle = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(f => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const getFilteredComponents = () => {
    return componentData.filter(component => {
      const matchesProperty =
        selectedProperty === "Alla fastigheter" || component.Fastighet === selectedProperty;
      const matchesType =
        selectedComponentType === "Alla typer" || component.Komponenttyp === selectedComponentType;
      return matchesProperty && matchesType;
    });
  };

  const getFilteredWorkOrders = () => {
    return workOrdersData.filter(order => {
      const matchesProperty =
        selectedProperty === "Alla fastigheter" || order.Fastighet === selectedProperty;

      // Filtrera på datumintervall
      if (selectedDateRange !== "all") {
        const orderDate = new Date(order.Datum);
        const today = new Date();
        if (selectedDateRange === "month") {
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(today.getMonth() - 1);
          return orderDate >= oneMonthAgo && matchesProperty;
        }
        if (selectedDateRange === "quarter") {
          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(today.getMonth() - 3);
          return orderDate >= threeMonthsAgo && matchesProperty;
        }
      }
      return matchesProperty;
    });
  };

  const getComponentHeaders = () => {
    const headerMap: Record<string, string> = {
      Komponent: "NAMN",
      Komponenttyp: "TYP",
      Fastighet: "FASTIGHET",
      Tillverkare: "TILLVERKARE",
      Modell: "MODELL",
      Serienummer: "SERIENUMMER",
      Installationsår: "INSTALLATIONSÅR",
      Status: "STATUS"
    };
    return selectedFields.map(field => headerMap[field] || field.toUpperCase());
  };

  const getComponentDataRows = () => {
    return getFilteredComponents().map(component => {
      const row: Record<string, any> = {};
      selectedFields.forEach(field => {
        row[field] = component[field as keyof typeof component];
      });
      return row;
    });
  };

  const workOrderHeaders = ["FASTIGHET", "ÅTGÄRD", "STATUS", "DATUM", "ENTREPRENÖR", "KOSTNAD"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Rapporter</h1>
        <p className="text-default-500">Generera och exportera rapporter</p>
      </div>

      <Tabs aria-label="Rapporttyper">
        <Tab key="components" title="Komponenter">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Komponentrapport</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Select
                  label="Fastighet"
                  placeholder="Välj fastighet"
                  defaultSelectedKeys={[selectedProperty]}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                >
                  <SelectItem key="Alla fastigheter" value="Alla fastigheter">
                    Alla fastigheter
                  </SelectItem>
                  {properties.map((prop) => (
                    <SelectItem key={prop} value={prop}>
                      {prop}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  label="Komponenttyp"
                  placeholder="Välj komponenttyp"
                  defaultSelectedKeys={[selectedComponentType]}
                  onChange={(e) => setSelectedComponentType(e.target.value)}
                >
                  <SelectItem key="Alla typer" value="Alla typer">
                    Alla typer
                  </SelectItem>
                  {componentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Välj fält att inkludera</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {(Object.keys(getComponentHeaders()) as string[]).map(fieldKey => (
                    <Checkbox
                      key={fieldKey}
                      isSelected={selectedFields.includes(fieldKey)}
                      onValueChange={() => handleFieldToggle(fieldKey)}
                    >
                      {fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1)}
                    </Checkbox>
                  ))}
                </div>
              </div>

              <Table removeWrapper aria-label="Komponentrapport">
                <TableHeader>
                  {getComponentHeaders().map(header => (
                    <TableColumn key={header}>{header}</TableColumn>
                  ))}
                </TableHeader>
                <TableBody emptyContent="Inga data att visa">
                  {getComponentDataRows().map((row, idx) => (
                    <TableRow key={idx}>
                      {selectedFields.map(field => (
                        <TableCell key={field}>{row[field]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-4 flex justify-end">
                <ExportButton
                  title="Komponentrapport"
                  headers={getComponentHeaders()}
                  data={getComponentDataRows()}
                  filename="komponentrapport"
                />
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="workorders" title="Driftärenden">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Driftorder‐rapport</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Select
                  label="Fastighet"
                  placeholder="Välj fastighet"
                  defaultSelectedKeys={[selectedProperty]}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                >
                  <SelectItem key="Alla fastigheter" value="Alla fastigheter">
                    Alla fastigheter
                  </SelectItem>
                  {properties.map(prop => (
                    <SelectItem key={prop} value={prop}>
                      {prop}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  label="Datumintervall"
                  placeholder="Välj intervall"
                  defaultSelectedKeys={[selectedDateRange]}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                >
                  <SelectItem key="all" value="all">Alla</SelectItem>
                  <SelectItem key="month" value="month">Senaste månaden</SelectItem>
                  <SelectItem key="quarter" value="quarter">Senaste kvartalet</SelectItem>
                </Select>
              </div>

              <Table removeWrapper aria-label="Driftorderrapport">
                <TableHeader>
                  {workOrderHeaders.map(header => (
                    <TableColumn key={header}>{header}</TableColumn>
                  ))}
                </TableHeader>
                <TableBody emptyContent="Inga ärenden att visa">
                  {getFilteredWorkOrders().map((wo, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{wo.Fastighet}</TableCell>
                      <TableCell>{wo.Åtgärd}</TableCell>
                      <TableCell>{wo.Status}</TableCell>
                      <TableCell>{wo.Datum}</TableCell>
                      <TableCell>{wo.Entreprenör}</TableCell>
                      <TableCell>{wo.Pris}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-4 flex justify-end">
                <ExportButton
                  title="Driftorderrapport"
                  headers={workOrderHeaders}
                  data={getFilteredWorkOrders().map(wo => ({
                    FASTIGHET: wo.Fastighet,
                    ÅTGÄRD: wo.Åtgärd,
                    STATUS: wo.Status,
                    DATUM: wo.Datum,
                    ENTREPRENÖR: wo.Entreprenör,
                    KOSTNAD: wo.Pris
                  }))}
                  filename="driftorderrapport"
                />
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
