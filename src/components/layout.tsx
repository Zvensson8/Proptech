import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Switch
} from "@heroui/react";
import { useAuth } from "../hooks/use-auth";
import { useTheme } from "@heroui/use-theme";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { signOut, user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const isDark = theme === "dark";
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const navigationItems = [
    { name: "Dashboard", path: "/dashboard", icon: "lucide:layout-dashboard" },
    { name: "Fastigheter", path: "/properties", icon: "lucide:building" },
    { name: "Komponenttyper", path: "/component-types", icon: "lucide:settings" },
    { name: "Komponenter", path: "/component-instances", icon: "lucide:layers" },
    { name: "Driftbeställningar", path: "/work-orders", icon: "lucide:tool" },
    { name: "Ekonomi", path: "/financial", icon: "lucide:bar-chart" },
    { name: "Rapporter", path: "/reports", icon: "lucide:file-text" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar 
        isBordered 
        className="bg-content1"
        maxWidth="full"
      >
        <NavbarBrand>
          <div className="flex items-center gap-2">
            <Icon icon="lucide:building" width={28} height={28} className="text-primary" />
            <p className="font-bold text-xl">FastighetsSystem</p>
          </div>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex items-center gap-2">
            <Icon icon={isDark ? "lucide:sun" : "lucide:moon"} />
            <Switch 
              size="sm" 
              isSelected={isDark}
              onValueChange={toggleTheme}
              color="primary"
            />
          </NavbarItem>
          
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  className="p-0 bg-transparent"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                      {user?.email?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions">
                <DropdownItem key="profile">
                  <div className="flex flex-col">
                    <span>{user?.email}</span>
                    <span className="text-tiny text-default-500">Användare</span>
                  </div>
                </DropdownItem>
                <DropdownItem key="settings">Inställningar</DropdownItem>
                <DropdownItem key="logout" color="danger" onPress={signOut}>
                  Logga ut
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          
          <NavbarItem className="sm:hidden">
            <Button
              variant="flat"
              isIconOnly
              onPress={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Icon icon="lucide:menu" width={24} height={24} />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <div className="hidden sm:block w-64 bg-content1 border-r border-divider">
          <nav className="flex flex-col p-4 gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
                    ? "bg-primary text-white"
                    : "hover:bg-content2"
                }`}
              >
                <Icon icon={item.icon} width={20} height={20} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar - Mobile */}
        {isSidebarOpen && (
          <div className="sm:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed inset-y-0 left-0 w-64 bg-content1 shadow-lg">
              <div className="flex justify-between items-center p-4 border-b border-divider">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:building" width={24} height={24} className="text-primary" />
                  <p className="font-bold">FastighetsSystem</p>
                </div>
                <Button
                  isIconOnly
                  variant="flat"
                  size="sm"
                  onPress={() => setIsSidebarOpen(false)}
                >
                  <Icon icon="lucide:x" width={20} height={20} />
                </Button>
              </div>
              <nav className="flex flex-col p-4 gap-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
                        ? "bg-primary text-white"
                        : "hover:bg-content2"
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Icon icon={item.icon} width={20} height={20} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <main className="p-4 md:p-6 max-w-7xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;