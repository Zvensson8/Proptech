// src/pages/properties.tsx

import React from "react";
import { Link } from "react-router-dom";
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
  TableCell
} from "@heroui/react";
import { Icon } from "@iconify/react";

// *** ÄNDRAT: Använd fetchFastigheter i stället för fetchRecords ***
import { fetchFastigheter } from "../utils/supabaseService";

const PropertiesPage: React.FC = () => {
  const [propertiesData, setPropertiesData] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchFastigheter()
      .then(records => {
        setPropertiesData(records);
      })
      .catch(() => setPropertiesData([]));
  }, []);

  const filteredProperties = propertiesData.filter(property => {
    const matchesSearch =
      property.Fastighet?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.Adress?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || property["Typ av fastighet"] === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(propertiesData.map(p => p["Typ av fastighet"])));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Fastigheter</h1>
        <p className="text-default-500">Hantera dina fastigheter</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Sök fastighet..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            startContent={<Icon icon="lucide:search" className="text-default-400" />}
            className="w-full sm:w-64"
          />

          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat" endContent={<Icon icon="lucide:chevron-down" />}>
                {selectedCategory || "Filtrera kategori"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Kategorier"
              selectionMode="single"
              selectedKeys={selectedCategory ? [selectedCategory] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setSelectedCategory(selected === selectedCategory ? null : selected);
              }}
            >
              {categories.map((category) => (
                <DropdownItem key={category}>{category}</DropdownItem>
              ))}
              <DropdownItem key="clear" color="danger">
                Rensa filter
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <Link to="/properties/new">
          <Button color="primary" startContent={<Icon icon="lucide:plus" />}>
            Ny fastighet
          </Button>
        </Link>
      </div>

      <Card>
        <CardBody>
          <Table removeWrapper aria-label="Fastigheter">
            <TableHeader>
              <TableColumn>NAMN</TableColumn>
              <TableColumn>ADRESS</TableColumn>
              <TableColumn>KATEGORI</TableColumn>
              <TableColumn>YTA (m²)</TableColumn>
              <TableColumn>KOMPONENTER</TableColumn>
              <TableColumn>DRIFTBESTÄLLNINGAR</TableColumn>
              <TableColumn>ÅTGÄRDER</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Inga fastigheter hittades">
              {filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <Link to={`/properties/${property.id}`} className="text-primary hover:underline">
                      {property.Fastighet}
                    </Link>
                  </TableCell>
                  <TableCell>{property.Adress}</TableCell>
                  <TableCell>{property["Typ av fastighet"]}</TableCell>
                  <TableCell>{property.LOA}</TableCell>
                  <TableCell>{property.Komponenter ?? 0}</TableCell>
                  <TableCell>{property["Driftbeställningar"] ?? 0}</TableCell>
                  <TableCell>
                    <Link to={`/properties/${property.id}`}>
                      <Button variant="flat" size="sm" startContent={<Icon icon="lucide:chevron-right" />}>
                        Visa
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default PropertiesPage;
