import React from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardBody, 
  Button, 
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Checkbox
} from "@heroui/react";
import { Icon } from "@iconify/react";
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

// Sample data for charts
const financialData = [
  { name: 'Jan', budget: 4000, actual: 3800 },
  { name: 'Feb', budget: 3000, actual: 3200 },
  { name: 'Mar', budget: 2000, actual: 2800 },
  { name: 'Apr', budget: 2780, actual: 3000 },
  { name: 'Maj', budget: 1890, actual: 2300 },
  { name: 'Jun', budget: 2390, actual: 2500 },
];

const workOrdersData = [
  { id: 1, property: "Kontorsbyggnad A", task: "Filterbyte ventilation", status: "Pågående", dueDate: "2023-06-15", contractor: "VentService AB" },
  { id: 2, property: "Bostadshus C", task: "Reparation av värmepump", status: "Ej påbörjad", dueDate: "2023-06-20", contractor: "Värme & Kyla AB" },
  { id: 3, property: "Lagerlokal B", task: "Kontroll av brandlarm", status: "Klar", dueDate: "2023-06-10", contractor: "Säkerhetstjänst AB" },
  { id: 4, property: "Kontorsbyggnad A", task: "Byte av belysning", status: "Pågående", dueDate: "2023-06-18", contractor: "El-Service AB" },
];

const todoItems = [
  { id: 1, task: "Beställ filter till ventilationsaggregat", completed: false },
  { id: 2, task: "Kontakta entreprenör om värmepump", completed: false },
  { id: 3, task: "Skicka rapport till fastighetsägare", completed: true },
  { id: 4, task: "Boka besiktning av hiss", completed: false },
];

const DashboardPage: React.FC = () => {
  const [todos, setTodos] = React.useState(todoItems);

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pågående": return "warning";
      case "Klar": return "success";
      case "Ej påbörjad": return "default";
      case "Avbruten": return "danger";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-default-500 text-xl">Översikt av fastigheter och komponenter</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="flex gap-4">
          <Link to="/properties/new">
            <Button 
              color="primary" 
              size="lg" 
              className="h-14 px-6"
              startContent={<Icon icon="lucide:plus" width={20} height={20} />}
            >
              Ny fastighet
            </Button>
          </Link>
          <Link to="/component-types/new">
            <Button 
              color="secondary" 
              variant="flat" 
              size="lg" 
              className="h-14 px-6"
              startContent={<Icon icon="lucide:plus" width={20} height={20} />}
            >
              Ny komponenttyp
            </Button>
          </Link>
        </div>

        {/* Todo List */}
        <Card className="h-full">
          <CardBody>
            <h2 className="text-xl font-semibold mb-4">Att göra</h2>
            <div className="space-y-2">
              {todos.map(todo => (
                <div 
                  key={todo.id} 
                  className={`flex items-center p-2 rounded-md ${
                    todo.completed ? "bg-content2/50" : "bg-content2"
                  }`}
                >
                  <Checkbox 
                    isSelected={todo.completed}
                    onValueChange={() => toggleTodo(todo.id)}
                    className="mr-2"
                  />
                  <span className={todo.completed ? "line-through text-default-400" : ""}>
                    {todo.task}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-content2/50">
          <CardBody className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-default-500">Fastigheter</p>
                <h3 className="text-4xl font-bold">4</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon icon="lucide:building" width={24} height={24} className="text-primary" />
              </div>
            </div>
            <Link to="/properties" className="text-primary text-sm flex items-center mt-4">
              Visa alla <Icon icon="lucide:arrow-right" className="ml-1" />
            </Link>
          </CardBody>
        </Card>

        <Card className="bg-content2/50">
          <CardBody className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-default-500">Komponenttyper</p>
                <h3 className="text-4xl font-bold">3</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Icon icon="lucide:settings" width={24} height={24} className="text-secondary" />
              </div>
            </div>
            <Link to="/component-types" className="text-secondary text-sm flex items-center mt-4">
              Visa alla <Icon icon="lucide:arrow-right" className="ml-1" />
            </Link>
          </CardBody>
        </Card>

        <Card className="bg-content2/50">
          <CardBody className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-default-500">Komponenter</p>
                <h3 className="text-4xl font-bold">12</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <Icon icon="lucide:layers" width={24} height={24} className="text-success" />
              </div>
            </div>
            <Link to="/component-instances" className="text-success text-sm flex items-center mt-4">
              Visa alla <Icon icon="lucide:arrow-right" className="ml-1" />
            </Link>
          </CardBody>
        </Card>

        <Card className="bg-content2/50">
          <CardBody className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-default-500">Driftbeställningar</p>
                <h3 className="text-4xl font-bold">7</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                <Icon icon="lucide:tool" width={24} height={24} className="text-warning" />
              </div>
            </div>
            <Link to="/work-orders" className="text-warning text-sm flex items-center mt-4">
              Visa alla <Icon icon="lucide:arrow-right" className="ml-1" />
            </Link>
          </CardBody>
        </Card>
      </div>

      {/* Work Orders */}
      <Card>
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Pågående driftbeställningar</h2>
            <Link to="/work-orders">
              <Button variant="flat" color="primary" size="sm">
                Visa alla
              </Button>
            </Link>
          </div>
          <Table removeWrapper aria-label="Pågående driftbeställningar">
            <TableHeader>
              <TableColumn>FASTIGHET</TableColumn>
              <TableColumn>ÅTGÄRD</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>DATUM</TableColumn>
              <TableColumn>ENTREPRENÖR</TableColumn>
            </TableHeader>
            <TableBody>
              {workOrdersData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.property}</TableCell>
                  <TableCell>{order.task}</TableCell>
                  <TableCell>
                    <Chip 
                      color={getStatusColor(order.status)} 
                      size="sm"
                      variant="flat"
                    >
                      {order.status}
                    </Chip>
                  </TableCell>
                  <TableCell>{order.dueDate}</TableCell>
                  <TableCell>{order.contractor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Financial Chart */}
      <Card>
        <CardBody>
          <h2 className="text-xl font-semibold mb-4">Ekonomisk översikt</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={financialData}
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
                />
                <Legend />
                <Bar dataKey="budget" name="Budget" fill="#3B82F6" />
                <Bar dataKey="actual" name="Faktisk" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardPage;