import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";
import Layout from "./components/layout";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";
import PropertiesPage from "./pages/properties";
import ComponentTypesPage from "./pages/component-types";
import ComponentInstancesPage from "./pages/component-instances";
import WorkOrdersPage from "./pages/work-orders";
import FinancialPage from "./pages/financial";
import ReportsPage from "./pages/reports";
import PropertyDetailPage from "./pages/property-detail";
import NewPropertyPage from "./pages/new-property";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="text-center">
          <div className="mb-4">
            <img 
              src="/logo.svg" 
              alt="FastighetsSystem" 
              className="h-16 w-16 mx-auto"
            />
          </div>
          <div className="flex justify-center">
            <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/login" exact>
        {user ? <Redirect to="/dashboard" /> : <LoginPage />}
      </Route>
      
      <Route path="/">
        <Layout>
          <Switch>
            <Route path="/dashboard" exact component={DashboardPage} />
            <Route path="/properties" exact component={PropertiesPage} />
            <Route path="/properties/new" exact component={NewPropertyPage} />
            <Route path="/properties/:id" component={PropertyDetailPage} />
            <Route path="/component-types" component={ComponentTypesPage} />
            <Route path="/component-instances" component={ComponentInstancesPage} />
            <Route path="/work-orders" component={WorkOrdersPage} />
            <Route path="/financial" component={FinancialPage} />
            <Route path="/reports" component={ReportsPage} />
            <Redirect to="/dashboard" />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}