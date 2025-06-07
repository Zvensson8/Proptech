// src/pages/property-detail.tsx

import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Card, 
  CardBody, 
  Button, 
  Input, 
  Textarea, 
  Select, 
  SelectItem 
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { fetchFastighet, saveFastighet } from "../utils/supabaseService";

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = React.useState<any>(null);
  const [isEditingInfo, setIsEditingInfo] = React.useState(false);
  const [propertyInfo, setPropertyInfo] = React.useState<any>({});

  React.useEffect(() => {
    fetchFastighet(id)
      .then((rec) => {
        if (rec) {
          setProperty({ id: rec.id, fields: rec });
          setPropertyInfo(rec);
        }
      })
      .catch(() => {});
  }, [id]);

  const handlePropertyInfoChange = (field: string, value: any) => {
    setPropertyInfo({ ...propertyInfo, [field]: value });
  };

  const saveInfo = () => {
    saveFastighet(
      {
        Fastighet: propertyInfo.Fastighet,
        Adress: propertyInfo.Adress,
        "Typ av fastighet": propertyInfo["Typ av fastighet"],
        LOA: parseFloat(propertyInfo.LOA),
        Byggår: parseInt(propertyInfo.Byggår, 10),
        Notes: propertyInfo.Notes
      },
      id
    )
      .then(updated => {
        setProperty({ id, fields: updated });
        setPropertyInfo(updated);
      })
      .finally(() => setIsEditingInfo(false));
  };

  if (!property) return <div>Laddar...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <Link to="/properties" className="text-primary hover:underline flex items-center">
          <Icon icon="lucide:chevron-left" className="mr-1" /> Tillbaka
        </Link>
        <div>
          <h1 className="text-4xl font-bold">{property.fields.Fastighet}</h1>
          <p className="text-default-500">{property.fields.Adress}</p>
        </div>
        <Button
          variant="flat"
          onPress={() => {
            if (isEditingInfo) saveInfo();
            else setIsEditingInfo(true);
          }}
        >
          {isEditingInfo ? "Spara" : "Redigera"}
        </Button>
      </div>

      <Card>
        <CardBody>
          {isEditingInfo ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Fastighet"
                value={propertyInfo.Fastighet}
                onValueChange={(v) => handlePropertyInfoChange("Fastighet", v)}
                isRequired
              />
              <Input
                label="Adress"
                value={propertyInfo.Adress}
                onValueChange={(v) => handlePropertyInfoChange("Adress", v)}
                isRequired
              />
              <Select
                label="Typ av fastighet"
                defaultSelectedKeys={[propertyInfo["Typ av fastighet"]]}
                onChange={(e: any) => handlePropertyInfoChange("Typ av fastighet", e.target.value)}
              >
                <SelectItem key="Kontor" value="Kontor">Kontor</SelectItem>
                <SelectItem key="Lager" value="Lager">Lager</SelectItem>
                <SelectItem key="Bostad" value="Bostad">Bostad</SelectItem>
                <SelectItem key="Handel" value="Handel">Handel</SelectItem>
              </Select>
              <Input
                label="Yta (m²)"
                type="number"
                value={propertyInfo.LOA}
                onValueChange={(v) => handlePropertyInfoChange("LOA", v)}
                isRequired
              />
              <Input
                label="Byggår"
                type="number"
                value={propertyInfo.Byggår}
                onValueChange={(v) => handlePropertyInfoChange("Byggår", v)}
                isRequired
              />
              <Textarea
                label="Anteckningar"
                value={propertyInfo.Notes}
                onValueChange={(v) => handlePropertyInfoChange("Notes", v)}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <p><strong>Fastighet:</strong> {property.fields.Fastighet}</p>
              <p><strong>Adress:</strong> {property.fields.Adress}</p>
              <p><strong>Typ av fastighet:</strong> {property.fields["Typ av fastighet"]}</p>
              <p><strong>Yta:</strong> {property.fields.LOA} m²</p>
              <p><strong>Byggår:</strong> {property.fields.Byggår}</p>
              <p><strong>Anteckningar:</strong> {property.fields.Notes}</p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default PropertyDetailPage;
