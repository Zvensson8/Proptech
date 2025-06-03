import React from "react";
import { 
  Card, 
  CardBody, 
  Button, 
  Tabs, 
  Tab,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import ExportButton from "../components/export-button";

// Sample data
const monthlyData = [
  { month: 'Jan', budget: 120000, actual: 115000, variance: -5000 },
  { month: 'Feb', budget: 125000, actual: 128000, variance: 3000 },
  { month: 'Mar', budget: 130000, actual: 125000, variance: -5000 },
  { month: 'Apr', budget: 128000, actual: 132000, variance: 4000 },
  { month: 'Maj', budget: 135000, actual: 138000, variance: 3000 },
  { month: 'Jun', budget: 140000, actual: 135000, variance: -5000 },
  { month: 'Jul', budget: 138000, actual: 130000, variance: -8000 },
  { month: 'Aug', budget: 142000, actual: 145000, variance: 3000 },
  { month: 'Sep', budget: 145000, actual: 148000, variance: 3000 },
  { month: 'Okt', budget: 150000, actual: 152000, variance: 2000 },
  { month: 'Nov', budget: 155000, actual: 150000, variance: -5000 },
  { month: 'Dec', budget: 160000, actual: 165000, variance: 5000 },
];

const categoryData = [
  { name: 'Energi', budget: 480000, actual: 495000, variance: 15000 },
  { name: 'Underhåll', budget: 350000, actual: 340000, variance: -10000 },
  { name: 'Service', budget: 280000, actual: 275000, variance: -5000 },
  { name: 'Avtal', budget: 420000, actual: 430000, variance: 10000 },
  { name: 'Övrigt', budget: 150000, actual: 143000, variance: -7000 },
];

const properties = [
  { id: 1, name: "Kontorsbyggnad A" },
  { id: 2, name: "Lagerlokal B" },
  { id: 3, name: "Bostadshus C" },
  { id: 4, name: "Butiksfastighet D" },
  { id: 5, name: "Alla fastigheter" },
];

const years = ["2023", "2024", "2025"];

// Add new quarterly forecast data
const quarterlyForecastData = [
  { 
    quarter: 'Q1', 
    accounts: [
      { name: '5020 - El', amount: 25500, category: 'Avtal' },
      { name: '6210 - Telefoni & Internet', amount: 3600, category: 'Avtal' },
      { name: '6310 - Försäkringar', amount: 6000, category: 'Avtal' },
      { name: '5060 - Städning', amount: 12000, category: 'Avtal' },
      { name: '5070 - Reparation', amount: 8500, category: 'Underhåll' },
    ]
  },
  { 
    quarter: 'Q2', 
    accounts: [
      { name: '5020 - El', amount: 22000, category: 'Avtal' },
      { name: '6210 - Telefoni & Internet', amount: 3600, category: 'Avtal' },
      { name: '6310 - Försäkringar', amount: 6000, category: 'Avtal' },
      { name: '5060 - Städning', amount: 12000, category: 'Avtal' },
      { name: '5070 - Reparation', amount: 15000, category: 'Underhåll' },
      { name: '5410 - Förbrukningsinventarier', amount: 4500, category: 'Underhåll' },
    ]
  },
  { 
    quarter: 'Q3', 
    accounts: [
      { name: '5020 - El', amount: 20000, category: 'Avtal' },
      { name: '6210 - Telefoni & Internet', amount: 3600, category: 'Avtal' },
      { name: '6310 - Försäkringar', amount: 6000, category: 'Avtal' },
      { name: '5060 - Städning', amount: 12000, category: 'Avtal' },
      { name: '5070 - Reparation', amount: 7500, category: 'Underhåll' },
    ]
  },
  { 
    quarter: 'Q4', 
    accounts: [
      { name: '5020 - El', amount: 28000, category: 'Avtal' },
      { name: '6210 - Telefoni & Internet', amount: 3600, category: 'Avtal' },
      { name: '6310 - Försäkringar', amount: 6000, category: 'Avtal' },
      { name: '5060 - Städning', amount: 12000, category: 'Avtal' },
      { name: '5070 - Reparation', amount: 9500, category: 'Underhåll' },
      { name: '6950 - Tillsynsavgifter', amount: 7500, category: 'Avtal' },
    ]
  }
];

// Add new financial items data
const financialItemsData = [
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
  },
  { 
    id: 4, 
    supplier: "Städbolaget AB", 
    account: "5060 - Städning", 
    amount: 4000, 
    frequency: "monthly",
    category: "Avtal",
    notes: "Kontorsstädning" 
  },
  { 
    id: 5, 
    supplier: "Securitas", 
    account: "6310 - Försäkringar", 
    amount: 6000, 
    frequency: "quarterly",
    category: "Avtal",
    notes: "Larmtjänst" 
  },
  { 
    id: 6, 
    supplier: "Hisservice AB", 
    account: "5070 - Reparation", 
    amount: 8500, 
    frequency: "quarterly",
    category: "Underhåll",
    notes: "Hissunderhåll" 
  }
];

const FinancialPage: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = React.useState("Alla fastigheter");
  const [selectedYear, setSelectedYear] = React.useState("2023");
  const [selectedQuarter, setSelectedQuarter] = React.useState("all");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedAccount, setSelectedAccount] = React.useState("all");
  const [financialItems, setFinancialItems] = React.useState(financialItemsData);
  
  const tableHeaders = ["KATEGORI", "BUDGET", "FAKTISK", "AVVIKELSE"];
  
  // Add new helper functions
  const getQuarterlyData = (quarter: string) => {
    if (quarter === "all") {
      return quarterlyForecastData;
    }
    return quarterlyForecastData.filter(q => q.quarter === quarter);
  };
  
  const getFilteredFinancialItems = () => {
    return financialItems.filter(item => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesAccount = selectedAccount === "all" || item.account === selectedAccount;
      return matchesCategory && matchesAccount;
    });
  };
  
  const calculateQuarterlyAmount = (item: any) => {
    switch (item.frequency) {
      case "monthly":
        return item.amount * 3;
      case "quarterly":
        return item.amount;
      case "biannually":
        return item.amount / 2;
      case "annually":
        return item.amount / 4;
      default:
        return item.amount * 3;
    }
  };
  
  const calculateMonthlyAmount = (item: any) => {
    switch (item.frequency) {
      case "monthly":
        return item.amount;
      case "quarterly":
        return item.amount / 3;
      case "biannually":
        return item.amount / 6;
      case "annually":
        return item.amount / 12;
      default:
        return item.amount;
    }
  };
  
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
  
  const getUniqueAccounts = () => {
    const accounts = new Set<string>();
    financialItems.forEach(item => accounts.add(item.account));
    return Array.from(accounts);
  };
  
  const getAccountTotals = () => {
    const accounts: Record<string, { monthly: number, quarterly: number, yearly: number }> = {};
    
    financialItems.forEach(item => {
      if (!accounts[item.account]) {
        accounts[item.account] = { monthly: 0, quarterly: 0, yearly: 0 };
      }
      
      accounts[item.account].monthly += calculateMonthlyAmount(item);
      accounts[item.account].quarterly += calculateQuarterlyAmount(item);
      accounts[item.account].yearly += calculateYearlyAmount(item);
    });
    
    return accounts;
  };
  
  const getCategoryTotals = () => {
    const categories: Record<string, { monthly: number, quarterly: number, yearly: number }> = {};
    
    financialItems.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = { monthly: 0, quarterly: 0, yearly: 0 };
      }
      
      categories[item.category].monthly += calculateMonthlyAmount(item);
      categories[item.category].quarterly += calculateQuarterlyAmount(item);
      categories[item.category].yearly += calculateYearlyAmount(item);
    });
    
    return categories;
  };
  
  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case "monthly":
        return "Månadlig";
      case "quarterly":
        return "Kvartallig";
      case "biannually":
        return "Tvåårig";
      case "annually":
        return "Årlig";
      default:
        return "Månadlig";
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Ekonomisk prognos</h1>
        <p className="text-default-500">Ekonomisk översikt och prognoser</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            label="Fastighet"
            placeholder="Välj fastighet"
            defaultSelectedKeys={[selectedProperty]}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="w-full sm:w-64"
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
            defaultSelectedKeys={[selectedYear]}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full sm:w-40"
          >
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </Select>
        </div>

        <ExportButton 
          title={`Ekonomisk prognos - ${selectedProperty} (${selectedYear})`}
          headers={tableHeaders}
          data={categoryData}
          filename="ekonomisk-prognos"
        />
      </div>

      <Tabs aria-label="Ekonomiska vyer">
        <Tab key="overview" title="Översikt">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Årlig översikt - {selectedYear}</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        borderColor: '#374151',
                        color: '#F9FAFB'
                      }}
                      formatter={(value: number) => [`${value.toLocaleString()} kr`, undefined]}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="budget" 
                      name="Budget" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      name="Faktisk" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4">Kostnader per kategori</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={categoryData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          borderColor: '#374151',
                          color: '#F9FAFB'
                        }}
                        formatter={(value: number) => [`${value.toLocaleString()} kr`, undefined]}
                      />
                      <Legend />
                      <Bar dataKey="budget" name="Budget" fill="#3B82F6" />
                      <Bar dataKey="actual" name="Faktisk" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4">Avvikelser per kategori</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={categoryData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          borderColor: '#374151',
                          color: '#F9FAFB'
                        }}
                        formatter={(value: number) => [`${value.toLocaleString()} kr`, undefined]}
                      />
                      <Legend />
                      <Bar 
                        dataKey="variance" 
                        name="Avvikelse" 
                        fill={(data) => (data.variance >= 0 ? "#10B981" : "#EF4444")}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>
        
        <Tab key="forecast" title="Kvartalsprognos">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Kvartalsprognos - {selectedYear}</h2>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Select
                  label="Kvartal"
                  placeholder="Välj kvartal"
                  defaultSelectedKeys={[selectedQuarter]}
                  onChange={(e) => setSelectedQuarter(e.target.value)}
                  className="w-full sm:w-48"
                >
                  <SelectItem key="all" value="all">Alla kvartal</SelectItem>
                  <SelectItem key="Q1" value="Q1">Q1 (Jan-Mar)</SelectItem>
                  <SelectItem key="Q2" value="Q2">Q2 (Apr-Jun)</SelectItem>
                  <SelectItem key="Q3" value="Q3">Q3 (Jul-Sep)</SelectItem>
                  <SelectItem key="Q4" value="Q4">Q4 (Okt-Dec)</SelectItem>
                </Select>
                
                <Select
                  label="Kategori"
                  placeholder="Välj kategori"
                  defaultSelectedKeys={[selectedCategory]}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full sm:w-48"
                >
                  <SelectItem key="all" value="all">Alla kategorier</SelectItem>
                  <SelectItem key="Avtal" value="Avtal">Avtal</SelectItem>
                  <SelectItem key="Underhåll" value="Underhåll">Underhåll</SelectItem>
                </Select>
                
                <Select
                  label="Konto"
                  placeholder="Välj konto"
                  defaultSelectedKeys={[selectedAccount]}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="w-full sm:w-64"
                >
                  <SelectItem key="all" value="all">Alla konton</SelectItem>
                  {getUniqueAccounts().map(account => (
                    <SelectItem key={account} value={account}>
                      {account}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              
              {getQuarterlyData(selectedQuarter).map((quarter) => (
                <div key={quarter.quarter} className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">{quarter.quarter} - {quarter.quarter === 'Q1' ? 'Jan-Mar' : quarter.quarter === 'Q2' ? 'Apr-Jun' : quarter.quarter === 'Q3' ? 'Jul-Sep' : 'Okt-Dec'}</h3>
                  
                  <Table 
                    removeWrapper 
                    aria-label={`Kvartalsprognos ${quarter.quarter}`}
                    className="mb-4"
                  >
                    <TableHeader>
                      <TableColumn>KONTO</TableColumn>
                      <TableColumn>KATEGORI</TableColumn>
                      <TableColumn className="text-right">BELOPP</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {quarter.accounts
                        .filter(account => {
                          const matchesCategory = selectedCategory === "all" || account.category === selectedCategory;
                          const matchesAccount = selectedAccount === "all" || account.name === selectedAccount;
                          return matchesCategory && matchesAccount;
                        })
                        .map((account, index) => (
                          <TableRow key={index}>
                            <TableCell>{account.name}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                account.category === "Avtal" 
                                  ? "bg-primary-100 text-primary-600" 
                                  : "bg-secondary-100 text-secondary-600"
                              }`}>
                                {account.category}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">{account.amount.toLocaleString()} kr</TableCell>
                          </TableRow>
                        ))
                      }
                      <TableRow className="bg-content2 font-semibold">
                        <TableCell>Totalt</TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-right">
                          {quarter.accounts
                            .filter(account => {
                              const matchesCategory = selectedCategory === "all" || account.category === selectedCategory;
                              const matchesAccount = selectedAccount === "all" || account.name === selectedAccount;
                              return matchesCategory && matchesAccount;
                            })
                            .reduce((sum, account) => sum + account.amount, 0)
                            .toLocaleString()} kr
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              ))}
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="accounts" title="Kontoöversikt">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Kontoöversikt - {selectedYear}</h2>
              
              <Table 
                removeWrapper 
                aria-label="Kontoöversikt"
                className="mb-6"
              >
                <TableHeader>
                  <TableColumn>KONTO</TableColumn>
                  <TableColumn className="text-right">MÅNADSKOSTNAD</TableColumn>
                  <TableColumn className="text-right">KVARTALSKOSTNAD</TableColumn>
                  <TableColumn className="text-right">ÅRSKOSTNAD</TableColumn>
                </TableHeader>
                <TableBody>
                  {Object.entries(getAccountTotals()).map(([account, totals]) => (
                    <TableRow key={account}>
                      <TableCell>{account}</TableCell>
                      <TableCell className="text-right">{totals.monthly.toLocaleString()} kr</TableCell>
                      <TableCell className="text-right">{totals.quarterly.toLocaleString()} kr</TableCell>
                      <TableCell className="text-right">{totals.yearly.toLocaleString()} kr</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-content2 font-semibold">
                    <TableCell>Totalt</TableCell>
                    <TableCell className="text-right">
                      {Object.values(getAccountTotals()).reduce((sum, total) => sum + total.monthly, 0).toLocaleString()} kr
                    </TableCell>
                    <TableCell className="text-right">
                      {Object.values(getAccountTotals()).reduce((sum, total) => sum + total.quarterly, 0).toLocaleString()} kr
                    </TableCell>
                    <TableCell className="text-right">
                      {Object.values(getAccountTotals()).reduce((sum, total) => sum + total.yearly, 0).toLocaleString()} kr
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <h3 className="text-lg font-semibold mb-3">Fördelning per kategori</h3>
              <Table 
                removeWrapper 
                aria-label="Kategorifördelning"
              >
                <TableHeader>
                  <TableColumn>KATEGORI</TableColumn>
                  <TableColumn className="text-right">MÅNADSKOSTNAD</TableColumn>
                  <TableColumn className="text-right">KVARTALSKOSTNAD</TableColumn>
                  <TableColumn className="text-right">ÅRSKOSTNAD</TableColumn>
                  <TableColumn className="text-right">ANDEL</TableColumn>
                </TableHeader>
                <TableBody>
                  {Object.entries(getCategoryTotals()).map(([category, totals]) => {
                    const yearlyTotal = Object.values(getAccountTotals()).reduce((sum, total) => sum + total.yearly, 0);
                    const percentage = (totals.yearly / yearlyTotal) * 100;
                    
                    return (
                      <TableRow key={category}>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            category === "Avtal" 
                              ? "bg-primary-100 text-primary-600" 
                              : "bg-secondary-100 text-secondary-600"
                          }`}>
                            {category}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">{totals.monthly.toLocaleString()} kr</TableCell>
                        <TableCell className="text-right">{totals.quarterly.toLocaleString()} kr</TableCell>
                        <TableCell className="text-right">{totals.yearly.toLocaleString()} kr</TableCell>
                        <TableCell className="text-right">{percentage.toFixed(1)}%</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="items" title="Kostnadsposter">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Kostnadsposter - {selectedYear}</h2>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Select
                  label="Kategori"
                  placeholder="Välj kategori"
                  defaultSelectedKeys={[selectedCategory]}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full sm:w-48"
                >
                  <SelectItem key="all" value="all">Alla kategorier</SelectItem>
                  <SelectItem key="Avtal" value="Avtal">Avtal</SelectItem>
                  <SelectItem key="Underhåll" value="Underhåll">Underhåll</SelectItem>
                </Select>
                
                <Select
                  label="Konto"
                  placeholder="Välj konto"
                  defaultSelectedKeys={[selectedAccount]}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="w-full sm:w-64"
                >
                  <SelectItem key="all" value="all">Alla konton</SelectItem>
                  {getUniqueAccounts().map(account => (
                    <SelectItem key={account} value={account}>
                      {account}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              
              <Table 
                removeWrapper 
                aria-label="Kostnadsposter"
              >
                <TableHeader>
                  <TableColumn>LEVERANTÖR</TableColumn>
                  <TableColumn>KONTO</TableColumn>
                  <TableColumn>KATEGORI</TableColumn>
                  <TableColumn className="text-right">BELOPP</TableColumn>
                  <TableColumn>FREKVENS</TableColumn>
                  <TableColumn className="text-right">MÅNADSKOSTNAD</TableColumn>
                  <TableColumn className="text-right">ÅRSKOSTNAD</TableColumn>
                </TableHeader>
                <TableBody>
                  {getFilteredFinancialItems().map((item) => (
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
                      <TableCell className="text-right">{item.amount.toLocaleString()} kr</TableCell>
                      <TableCell>{getFrequencyText(item.frequency)}</TableCell>
                      <TableCell className="text-right">{calculateMonthlyAmount(item).toLocaleString()} kr</TableCell>
                      <TableCell className="text-right">{calculateYearlyAmount(item).toLocaleString()} kr</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-content2 font-semibold">
                    <TableCell>Totalt</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">
                      {getFilteredFinancialItems().reduce((sum, item) => sum + calculateMonthlyAmount(item), 0).toLocaleString()} kr
                    </TableCell>
                    <TableCell className="text-right">
                      {getFilteredFinancialItems().reduce((sum, item) => sum + calculateYearlyAmount(item), 0).toLocaleString()} kr
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="details" title="Detaljerad vy">
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Detaljerad ekonomisk data</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-content2">
                    <th className="p-3 text-left">Kategori</th>
                    <th className="p-3 text-right">Budget</th>
                    <th className="p-3 text-right">Faktisk</th>
                    <th className="p-3 text-right">Avvikelse</th>
                    <th className="p-3 text-right">Avvikelse %</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData.map((item, index) => (
                    <tr 
                      key={index} 
                      className={`border-t border-divider ${
                        index % 2 === 0 ? "bg-content1" : "bg-content2/50"
                      }`}
                    >
                      <td className="p-3">{item.name}</td>
                      <td className="p-3 text-right">{item.budget.toLocaleString()} kr</td>
                      <td className="p-3 text-right">{item.actual.toLocaleString()} kr</td>
                      <td className={`p-3 text-right ${
                        item.variance >= 0 ? "text-success" : "text-danger"
                      }`}>
                        {item.variance >= 0 ? "+" : ""}{item.variance.toLocaleString()} kr
                      </td>
                      <td className={`p-3 text-right ${
                        item.variance >= 0 ? "text-success" : "text-danger"
                      }`}>
                        {item.variance >= 0 ? "+" : ""}
                        {((item.variance / item.budget) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-divider bg-content2 font-semibold">
                    <td className="p-3">Totalt</td>
                    <td className="p-3 text-right">
                      {categoryData.reduce((sum, item) => sum + item.budget, 0).toLocaleString()} kr
                    </td>
                    <td className="p-3 text-right">
                      {categoryData.reduce((sum, item) => sum + item.actual, 0).toLocaleString()} kr
                    </td>
                    <td className={`p-3 text-right ${
                      categoryData.reduce((sum, item) => sum + item.variance, 0) >= 0 
                        ? "text-success" 
                        : "text-danger"
                    }`}>
                      {categoryData.reduce((sum, item) => sum + item.variance, 0) >= 0 ? "+" : ""}
                      {categoryData.reduce((sum, item) => sum + item.variance, 0).toLocaleString()} kr
                    </td>
                    <td className={`p-3 text-right ${
                      categoryData.reduce((sum, item) => sum + item.variance, 0) >= 0 
                        ? "text-success" 
                        : "text-danger"
                    }`}>
                      {categoryData.reduce((sum, item) => sum + item.variance, 0) >= 0 ? "+" : ""}
                      {(categoryData.reduce((sum, item) => sum + item.variance, 0) / 
                        categoryData.reduce((sum, item) => sum + item.budget, 0) * 100).toFixed(1)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default FinancialPage;