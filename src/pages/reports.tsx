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

// Sample data
const properties = [
  { id: 1, name: "Kontorsbyggnad A" },
  { id: 2, name: "Lagerlokal B" },
  { id: 3, name: "Bostadshus C" },
  { id: 4, name: "Butiksfastighet D" },
  { id: 5, name: "Alla fastigheter" },
];

const componentTypes = [
  { id: 1, name: "Ventilationsaggregat" },
  { id: 2, name: "Kylanläggning" },
  { id: 3, name: "Värmepump" },
  { id: 4, name: "Alla typer" },
];

const componentData = [
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
    status: "Aktiv"
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
    status: "Aktiv"
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
    status: "Aktiv"
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
    status: "Inaktiv"
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
    status: "Aktiv"
  }
];

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
  }
];

const ReportsPage: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = React.useState("Alla fastigheter");
  const [selectedComponentType, setSelectedComponentType] = React.useState("Alla typer");
  const [selectedDateRange, setSelectedDateRange] = React.useState("all");
  const [selectedFields, setSelectedFields] = React.useState<string[]>([
    "name", "type", "property", "manufacturer", "model", "status"
  ]);
  
  const handleFieldToggle = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(f => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };
  
  const getFilteredComponents = () => {
    return componentData.filter(component => {
      const matchesProperty = selectedProperty === "Alla fastigheter" || component.property === selectedProperty;
      const matchesType = selectedComponentType === "Alla typer" || component.type === selectedComponentType;
      return matchesProperty && matchesType;
    });
  };
  
  const getFilteredWorkOrders = () => {
    return workOrdersData.filter(order => {
      const matchesProperty = selectedProperty === "Alla fastigheter" || order.property === selectedProperty;
      
      // Filter by date range
      const orderDate = new Date(order.due_date);
      const today = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(today.getMonth() - 1);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(today.getMonth() - 3);
      
      let matchesDate = true;
      if (selectedDateRange === "month") {
        matchesDate = orderDate >= oneMonthAgo;
      } else if (selectedDateRange === "quarter") {
        matchesDate = orderDate >= threeMonthsAgo;
      }
      
      return matchesProperty && matchesDate;
    });
  };
  
  const getComponentHeaders = () => {
    const headerMap: Record<string, string> = {
      name: "NAMN",
      type: "TYP",
      property: "FASTIGHET",
      manufacturer: "TILLVERKARE",
      model: "MODELL",
      serialNumber: "SERIENUMMER",
      installDate: "INSTALLATIONSDATUM",
      lastService: "SENASTE SERVICE",
      status: "STATUS"
    };
    
    return selectedFields.map(field => headerMap[field]);
  };
  
  const getComponentData = () => {
    return getFilteredComponents().map(component => {
      const result: Record<string, any> = {};
      selectedFields.forEach(field => {
        result[field] = component[field as keyof typeof component];
      });
      return result;
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
                  {properties.map((property) => (
                    <SelectItem key={property.name} value={property.name}>
                      {property.name}
                    </SelectItem>
                  ))}
                </Select>
                
                <Select
                  label="Komponenttyp"
                  placeholder="Välj komponenttyp"
                  defaultSelectedKeys={[selectedComponentType]}
                  onChange={(e) => setSelectedComponentType(e.target.value)}
                >
                  {componentTypes.map((type) => (
                    <SelectItem key={type.name} value={type.name}>
                      {type.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Välj fält att inkludera</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  <Checkbox 
                    isSelected={selectedFields.includes("name")}
                    onValueChange={() => handleFieldToggle("name")}
                  >
                    Namn
                  </Checkbox>
                  <Checkbox 
                    isSelected={selectedFields.includes("type")}
                    onValueChange={() => handleFieldToggle("type")}
                  >
                    Typ
                  </Checkbox>
                  <Checkbox 
                    isSelected={selectedFields.includes("property")}
                    onValueChange={() => handleFieldToggle("property")}
                  >
                    Fastighet
                  </Checkbox>
                  <Checkbox 
                    isSelected={selectedFields.includes("manufacturer")}
                    onValueChange={() => handleFieldToggle("manufacturer")}
                  >
                    Tillverkare
                  </Checkbox>
                  <Checkbox 
                    isSelected={selectedFields.includes("model")}
                    onValueChange={() => handleFieldToggle("model")}
                  >
                    Modell
                  </Checkbox>
                  <Checkbox 
                    isSelected={selectedFields.includes("serialNumber")}
                    onValueChange={() => handleFieldToggle("serialNumber")}
                  >
                    Serienummer
                  </Checkbox>
                  <Checkbox 
                    isSelected={selectedFields.includes("installDate")}
                    onValueChange={() => handleFieldToggle("installDate")}
                  >
                    Installationsdatum
                  </Checkbox>
                  <Checkbox 
                    isSelected={selectedFields.includes("lastService")}
                    onValueChange={() => handleFieldToggle("lastService")}
                  >
                    Senaste service
                  </Checkbox>
                  <Checkbox 
                    isSelected={selectedFields.includes("status")}
                    onValueChange={() => handleFieldToggle("status")}
                  >
                    Status
                  </Checkbox>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-default-500">
                  {getFilteredComponents().length} komponenter hittades
                </p>
                <ExportButton 
                  title={`Komponentrapport - ${selectedProperty} (${selectedComponentType})`}
                  headers={getComponentHeaders()}
                  data={getComponentData()}
                  filename="komponentrapport"
                />
              </div>
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="work-orders" title="Driftbeställningar">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Driftbeställningsrapport</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Select
                  label="Fastighet"
                  placeholder="Välj fastighet"
                  defaultSelectedKeys={[selectedProperty]}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                >
                  {properties.map((property) => (
                    <SelectItem key={property.name} value={property.name}>
                      {property.name}
                    </SelectItem>
                  ))}
                </Select>
                
                <Select
                  label="Tidsperiod"
                  placeholder="Välj tidsperiod"
                  defaultSelectedKeys={[selectedDateRange]}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                >
                  <SelectItem key="all" value="all">Alla</SelectItem>
                  <SelectItem key="month" value="month">Senaste månaden</SelectItem>
                  <SelectItem key="quarter" value="quarter">Senaste kvartalet</SelectItem>
                </Select>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-default-500">
                  {getFilteredWorkOrders().length} driftbeställningar hittades
                </p>
                <ExportButton 
                  title={`Driftbeställningsrapport - ${selectedProperty}`}
                  headers={workOrderHeaders}
                  data={getFilteredWorkOrders()}
                  filename="driftbeställningsrapport"
                />
              </div>
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="financial" title="Ekonomi">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Ekonomisk rapport</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Select
                  label="Fastighet"
                  placeholder="Välj fastighet"
                  defaultSelectedKeys={[selectedProperty]}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                >
                  {properties.map((property) => (
                    <SelectItem key={property.name} value={property.name}>
                      {property.name}
                    </SelectItem>
                  ))}
                </Select>
                
                <Select
                  label="År"
                  placeholder="Välj år"
                  defaultSelectedKeys={["2023"]}
                >
                  <SelectItem key="2023" value="2023">2023</SelectItem>
                  <SelectItem key="2022" value="2022">2022</SelectItem>
                  <SelectItem key="2021" value="2021">2021</SelectItem>
                </Select>
                
                <Select
                  label="Rapporttyp"
                  placeholder="Välj rapporttyp"
                  defaultSelectedKeys={["summary"]}
                >
                  <SelectItem key="summary" value="summary">Sammanfattning</SelectItem>
                  <SelectItem key="quarterly" value="quarterly">Kvartalsprognos</SelectItem>
                  <SelectItem key="category" value="category">Kategorifördelning</SelectItem>
                  <SelectItem key="account" value="account">Kontofördelning</SelectItem>
                </Select>
              </div>
              
              <Tabs aria-label="Ekonomiska rapporter">
                <Tab key="summary" title="Sammanfattning">
                  <div className="space-y-4">
                    <Table 
                      removeWrapper 
                      aria-label="Ekonomisk sammanfattning"
                    >
                      <TableHeader>
                        <TableColumn>KATEGORI</TableColumn>
                        <TableColumn>BUDGET</TableColumn>
                        <TableColumn>FAKTISK</TableColumn>
                        <TableColumn>AVVIKELSE</TableColumn>
                        <TableColumn>AVVIKELSE %</TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Energi</TableCell>
                          <TableCell>480 000 kr</TableCell>
                          <TableCell>495 000 kr</TableCell>
                          <TableCell className="text-success">+15 000 kr</TableCell>
                          <TableCell className="text-success">+3.1%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Underhåll</TableCell>
                          <TableCell>350 000 kr</TableCell>
                          <TableCell>340 000 kr</TableCell>
                          <TableCell className="text-danger">-10 000 kr</TableCell>
                          <TableCell className="text-danger">-2.9%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Service</TableCell>
                          <TableCell>280 000 kr</TableCell>
                          <TableCell>275 000 kr</TableCell>
                          <TableCell className="text-danger">-5 000 kr</TableCell>
                          <TableCell className="text-danger">-1.8%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Avtal</TableCell>
                          <TableCell>420 000 kr</TableCell>
                          <TableCell>430 000 kr</TableCell>
                          <TableCell className="text-success">+10 000 kr</TableCell>
                          <TableCell className="text-success">+2.4%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Övrigt</TableCell>
                          <TableCell>150 000 kr</TableCell>
                          <TableCell>143 000 kr</TableCell>
                          <TableCell className="text-danger">-7 000 kr</TableCell>
                          <TableCell className="text-danger">-4.7%</TableCell>
                        </TableRow>
                        <TableRow className="bg-content2 font-semibold">
                          <TableCell>Totalt</TableCell>
                          <TableCell>1 680 000 kr</TableCell>
                          <TableCell>1 683 000 kr</TableCell>
                          <TableCell className="text-success">+3 000 kr</TableCell>
                          <TableCell className="text-success">+0.2%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    
                    <div className="flex justify-end">
                      <ExportButton 
                        title={`Ekonomisk rapport - ${selectedProperty}`}
                        headers={["KATEGORI", "BUDGET", "FAKTISK", "AVVIKELSE", "AVVIKELSE %"]}
                        data={[
                          { kategori: "Energi", budget: 480000, faktisk: 495000, avvikelse: 15000, avvikelse_procent: "3.1%" },
                          { kategori: "Underhåll", budget: 350000, faktisk: 340000, avvikelse: -10000, avvikelse_procent: "-2.9%" },
                          { kategori: "Service", budget: 280000, faktisk: 275000, avvikelse: -5000, avvikelse_procent: "-1.8%" },
                          { kategori: "Avtal", budget: 420000, faktisk: 430000, avvikelse: 10000, avvikelse_procent: "2.4%" },
                          { kategori: "Övrigt", budget: 150000, faktisk: 143000, avvikelse: -7000, avvikelse_procent: "-4.7%" },
                          { kategori: "Totalt", budget: 1680000, faktisk: 1683000, avvikelse: 3000, avvikelse_procent: "0.2%" }
                        ]}
                        filename="ekonomisk-rapport"
                      />
                    </div>
                  </div>
                </Tab>
                
                <Tab key="quarterly" title="Kvartalsprognos">
                  <div className="space-y-4">
                    <Table 
                      removeWrapper 
                      aria-label="Kvartalsprognos"
                    >
                      <TableHeader>
                        <TableColumn>KVARTAL</TableColumn>
                        <TableColumn>KONTO</TableColumn>
                        <TableColumn>KATEGORI</TableColumn>
                        <TableColumn>BELOPP</TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell rowSpan={5}>Q1 (Jan-Mar)</TableCell>
                          <TableCell>5020 - El</TableCell>
                          <TableCell>Avtal</TableCell>
                          <TableCell>25 500 kr</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>6210 - Telefoni & Internet</TableCell>
                          <TableCell>Avtal</TableCell>
                          <TableCell>3 600 kr</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>6310 - Försäkringar</TableCell>
                          <TableCell>Avtal</TableCell>
                          <TableCell>6 000 kr</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>5060 - Städning</TableCell>
                          <TableCell>Avtal</TableCell>
                          <TableCell>12 000 kr</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>5070 - Reparation</TableCell>
                          <TableCell>Underhåll</TableCell>
                          <TableCell>8 500 kr</TableCell>
                        </TableRow>
                        
                        <TableRow className="bg-content2">
                          <TableCell colSpan={3} className="font-semibold">Q1 Totalt</TableCell>
                          <TableCell className="font-semibold">55 600 kr</TableCell>
                        </TableRow>
                        
                        <TableRow>
                          <TableCell rowSpan={6}>Q2 (Apr-Jun)</TableCell>
                          <TableCell>5020 - El</TableCell>
                          <TableCell>Avtal</TableCell>
                          <TableCell>22 000 kr</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>6210 - Telefoni & Internet</TableCell>
                          <TableCell>Avtal</TableCell>
                          <TableCell>3 600 kr</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>6310 - Försäkringar</TableCell>
                          <TableCell>Avtal</TableCell>
                          <TableCell>6 000 kr</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>5060 - Städning</TableCell>
                          <TableCell>Avtal</TableCell>
                          <TableCell>12 000 kr</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>5070 - Reparation</TableCell>
                          <TableCell>Underhåll</TableCell>
                          <TableCell>15 000 kr</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>5410 - Förbrukningsinventarier</TableCell>
                          <TableCell>Underhåll</TableCell>
                          <TableCell>4 500 kr</TableCell>
                        </TableRow>
                        
                        <TableRow className="bg-content2">
                          <TableCell colSpan={3} className="font-semibold">Q2 Totalt</TableCell>
                          <TableCell className="font-semibold">63 100 kr</TableCell>
                        </TableRow>
                        
                        <TableRow className="bg-content2 font-semibold">
                          <TableCell colSpan={3}>Totalt (Alla kvartal)</TableCell>
                          <TableCell>237 700 kr</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    
                    <div className="flex justify-end">
                      <ExportButton 
                        title={`Kvartalsprognos - ${selectedProperty}`}
                        headers={["KVARTAL", "KONTO", "KATEGORI", "BELOPP"]}
                        data={[
                          { kvartal: "Q1", konto: "5020 - El", kategori: "Avtal", belopp: 25500 },
                          { kvartal: "Q1", konto: "6210 - Telefoni & Internet", kategori: "Avtal", belopp: 3600 },
                          { kvartal: "Q1", konto: "6310 - Försäkringar", kategori: "Avtal", belopp: 6000 },
                          { kvartal: "Q1", konto: "5060 - Städning", kategori: "Avtal", belopp: 12000 },
                          { kvartal: "Q1", konto: "5070 - Reparation", kategori: "Underhåll", belopp: 8500 },
                          { kvartal: "Q2", konto: "5020 - El", kategori: "Avtal", belopp: 22000 },
                          { kvartal: "Q2", konto: "6210 - Telefoni & Internet", kategori: "Avtal", belopp: 3600 },
                          { kvartal: "Q2", konto: "6310 - Försäkringar", kategori: "Avtal", belopp: 6000 },
                          { kvartal: "Q2", konto: "5060 - Städning", kategori: "Avtal", belopp: 12000 },
                          { kvartal: "Q2", konto: "5070 - Reparation", kategori: "Underhåll", belopp: 15000 },
                          { kvartal: "Q2", konto: "5410 - Förbrukningsinventarier", kategori: "Underhåll", belopp: 4500 }
                        ]}
                        filename="kvartalsprognos"
                      />
                    </div>
                  </div>
                </Tab>
                
                <Tab key="category" title="Kategorifördelning">
                  <div className="space-y-4">
                    <Table 
                      removeWrapper 
                      aria-label="Kategorifördelning"
                    >
                      <TableHeader>
                        <TableColumn>KATEGORI</TableColumn>
                        <TableColumn>MÅNADSKOSTNAD</TableColumn>
                        <TableColumn>KVARTALSKOSTNAD</TableColumn>
                        <TableColumn>ÅRSKOSTNAD</TableColumn>
                        <TableColumn>ANDEL</TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Avtal</TableCell>
                          <TableCell>18 200 kr</TableCell>
                          <TableCell>54 600 kr</TableCell>
                          <TableCell>218 400 kr</TableCell>
                          <TableCell>78.5%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Underhåll</TableCell>
                          <TableCell>5 000 kr</TableCell>
                          <TableCell>15 000 kr</TableCell>
                          <TableCell>60 000 kr</TableCell>
                          <TableCell>21.5%</TableCell>
                        </TableRow>
                        <TableRow className="bg-content2 font-semibold">
                          <TableCell>Totalt</TableCell>
                          <TableCell>23 200 kr</TableCell>
                          <TableCell>69 600 kr</TableCell>
                          <TableCell>278 400 kr</TableCell>
                          <TableCell>100%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    
                    <div className="flex justify-end">
                      <ExportButton 
                        title={`Kategorifördelning - ${selectedProperty}`}
                        headers={["KATEGORI", "MÅNADSKOSTNAD", "KVARTALSKOSTNAD", "ÅRSKOSTNAD", "ANDEL"]}
                        data={[
                          { kategori: "Avtal", manadskostnad: 18200, kvartalskostnad: 54600, arskostnad: 218400, andel: "78.5%" },
                          { kategori: "Underhåll", manadskostnad: 5000, kvartalskostnad: 15000, arskostnad: 60000, andel: "21.5%" },
                          { kategori: "Totalt", manadskostnad: 23200, kvartalskostnad: 69600, arskostnad: 278400, andel: "100%" }
                        ]}
                        filename="kategorifordelning"
                      />
                    </div>
                  </div>
                </Tab>
                
                <Tab key="account" title="Kontofördelning">
                  <div className="space-y-4">
                    <Table 
                      removeWrapper 
                      aria-label="Kontofördelning"
                    >
                      <TableHeader>
                        <TableColumn>KONTO</TableColumn>
                        <TableColumn>KATEGORI</TableColumn>
                        <TableColumn>MÅNADSKOSTNAD</TableColumn>
                        <TableColumn>KVARTALSKOSTNAD</TableColumn>
                        <TableColumn>ÅRSKOSTNAD</TableColumn>
                        <TableColumn>ANDEL</TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>5020 - El</TableCell>
                          <TableCell>Avtal</TableCell>
                          <TableCell>8 500 kr</TableCell>
                          <TableCell>25 500 kr</TableCell>
                          <TableCell>102 000 kr</TableCell>
                          <TableCell>36.6%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>6210 - Telefoni & Internet</TableCell>
                          <TableCell>Avtal</TableCell>
                          <TableCell>1 200 kr</TableCell>
                          <TableCell>3 600 kr</TableCell>
                          <TableCell>14 400 kr</TableCell>
                          <TableCell>5.2%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>6310 - Försäkringar</TableCell>
                          <TableCell>Avtal</TableCell>
                          <TableCell>2 000 kr</TableCell>
                          <TableCell>6 000 kr</TableCell>
                          <TableCell>24 000 kr</TableCell>
                          <TableCell>8.6%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>5060 - Städning</TableCell>
                          <TableCell>Avtal</TableCell>
                          <TableCell>4 000 kr</TableCell>
                          <TableCell>12 000 kr</TableCell>
                          <TableCell>48 000 kr</TableCell>
                          <TableCell>17.2%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>5070 - Reparation</TableCell>
                          <TableCell>Underhåll</TableCell>
                          <TableCell>2 833 kr</TableCell>
                          <TableCell>8 500 kr</TableCell>
                          <TableCell>34 000 kr</TableCell>
                          <TableCell>12.2%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>5410 - Förbrukningsinventarier</TableCell>
                          <TableCell>Underhåll</TableCell>
                          <TableCell>1 500 kr</TableCell>
                          <TableCell>4 500 kr</TableCell>
                          <TableCell>18 000 kr</TableCell>
                          <TableCell>6.5%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>6950 - Tillsynsavgifter</TableCell>
                          <TableCell>Avtal</TableCell>
                          <TableCell>2 500 kr</TableCell>
                          <TableCell>7 500 kr</TableCell>
                          <TableCell>30 000 kr</TableCell>
                          <TableCell>10.8%</TableCell>
                        </TableRow>
                        <TableRow className="bg-content2 font-semibold">
                          <TableCell colSpan={2}>Totalt</TableCell>
                          <TableCell>22 533 kr</TableCell>
                          <TableCell>67 600 kr</TableCell>
                          <TableCell>270 400 kr</TableCell>
                          <TableCell>100%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    
                    <div className="flex justify-end">
                      <ExportButton 
                        title={`Kontofördelning - ${selectedProperty}`}
                        headers={["KONTO", "KATEGORI", "MÅNADSKOSTNAD", "KVARTALSKOSTNAD", "ÅRSKOSTNAD", "ANDEL"]}
                        data={[
                          { konto: "5020 - El", kategori: "Avtal", manadskostnad: 8500, kvartalskostnad: 25500, arskostnad: 102000, andel: "36.6%" },
                          { konto: "6210 - Telefoni & Internet", kategori: "Avtal", manadskostnad: 1200, kvartalskostnad: 3600, arskostnad: 14400, andel: "5.2%" },
                          { konto: "6310 - Försäkringar", kategori: "Avtal", manadskostnad: 2000, kvartalskostnad: 6000, arskostnad: 24000, andel: "8.6%" },
                          { konto: "5060 - Städning", kategori: "Avtal", manadskostnad: 4000, kvartalskostnad: 12000, arskostnad: 48000, andel: "17.2%" },
                          { konto: "5070 - Reparation", kategori: "Underhåll", manadskostnad: 2833, kvartalskostnad: 8500, arskostnad: 34000, andel: "12.2%" },
                          { konto: "5410 - Förbrukningsinventarier", kategori: "Underhåll", manadskostnad: 1500, kvartalskostnad: 4500, arskostnad: 18000, andel: "6.5%" },
                          { konto: "6950 - Tillsynsavgifter", kategori: "Avtal", manadskostnad: 2500, kvartalskostnad: 7500, arskostnad: 30000, andel: "10.8%" },
                          { konto: "Totalt", kategori: "", manadskostnad: 22533, kvartalskostnad: 67600, arskostnad: 270400, andel: "100%" }
                        ]}
                        filename="kontofordelning"
                      />
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ReportsPage;