// src/pages/financial.tsx

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
import ExportButton from "../components/export-button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";

// Sample data (oförändrat)
const monthlyData = [
  { name: 'Jan', budget: 120000, actual: 115000, variance: -5000 },
  { name: 'Feb', budget: 125000, actual: 128000, variance: 3000 },
  { name: 'Mar', budget: 130000, actual: 125000, variance: -5000 },
  { name: 'Apr', budget: 128000, actual: 132000, variance: 4000 },
  { name: 'Maj', budget: 135000, actual: 138000, variance: 3000 },
  { name: 'Jun', budget: 140000, actual: 135000, variance: -5000 },
  { name: 'Jul', budget: 138000, actual: 130000, variance: -8000 },
  { name: 'Aug', budget: 142000, actual: 145000, variance: 3000 },
  { name: 'Sep', budget: 145000, actual: 148000, variance: 3000 },
  { name: 'Okt', budget: 150000, actual: 152000, variance: 2000 },
  { name: 'Nov', budget: 155000, actual: 150000, variance: -5000 },
  { name: 'Dec', budget: 160000, actual: 165000, variance: 5000 },
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

  const tableHeaders = ["DOMÄN", "BUDGET", "FAKTISK", "AVVIKELSE"];

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
    const accounts: Record<string, { monthly: number; quarterly: number; yearly: number }> = {};

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
    const categories: Record<string, { monthly: number; quarterly: number; yearly: number }> = {};

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

  const FinancialTableHeaders = ["LEVERANTÖR", "KONTO", "MÅNADS- IBUDGET", "MÅNADS- IFAKTISK", "KVAR ÅR"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Ekonomi</h1>
        <p className="text-default-500">Budget och kostnadsöversikt</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Kvartalsprognos</h2>
          <Select
            label="Kvartal"
            placeholder="Välj kvartal"
            defaultSelectedKeys={[selectedQuarter]}
            onChange={(e) => setSelectedQuarter(e.target.value)}
          >
            <SelectItem key="all" value="all">Alla</SelectItem>
            <SelectItem key="Q1" value="Q1">Q1</SelectItem>
            <SelectItem key="Q2" value="Q2">Q2</SelectItem>
            <SelectItem key="Q3" value="Q3">Q3</SelectItem>
            <SelectItem key="Q4" value="Q4">Q4</SelectItem>
          </Select>

          <ResponsiveContainer width="100%" height={300} className="mt-4">
            <BarChart data={getQuarterlyData(selectedQuarter)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="accounts.length" name="Antal konton" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Månatlig budget vs faktisk</h2>
          <Select
            label="År"
            placeholder="Välj år"
            defaultSelectedKeys={[selectedYear]}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map(year => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </Select>

          <ResponsiveContainer width="100%" height={300} className="mt-4">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="budget" name="Budget" />
              <Line type="monotone" dataKey="actual" name="Faktisk" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Finansiell översikt</h2>
        <div className="flex gap-4 flex-wrap mb-4">
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
            label="Kategori"
            placeholder="Välj kategori"
            defaultSelectedKeys={[selectedCategory]}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <SelectItem key="all" value="all">Alla kategorier</SelectItem>
            {Object.keys(getCategoryTotals()).map(cat => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Konto"
            placeholder="Välj konto"
            defaultSelectedKeys={[selectedAccount]}
            onChange={(e) => setSelectedAccount(e.target.value)}
          >
            <SelectItem key="all" value="all">Alla konton</SelectItem>
            {getUniqueAccounts().map(account => (
              <SelectItem key={account} value={account}>
                {account}
              </SelectItem>
            ))}
          </Select>
        </div>

        <Table removeWrapper aria-label="Finansiella poster">
          <TableHeader>
            {FinancialTableHeaders.map(header => (
              <TableColumn key={header}>{header}</TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent="Inga data att visa">
            {getFilteredFinancialItems().map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>{item.account}</TableCell>
                <TableCell>{calculateMonthlyAmount(item)}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{calculateYearlyAmount(item)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex justify-end">
          <ExportButton
            title="Finansiell översikt"
            headers={FinancialTableHeaders}
            data={getFilteredFinancialItems().map(item => ({
              LEVERANTÖR: item.supplier,
              KONTO: item.account,
              "MÅNADS- IBUDGET": calculateMonthlyAmount(item),
              "MÅNADS- IFAKTISK": item.amount,
              "KVAR ÅR": calculateYearlyAmount(item)
            }))}
            filename="finansiell_oversikt"
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialPage;
