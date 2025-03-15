import { ProdutorPage } from "./components/pages/Produtor";
import { LoginPage } from "./components/pages/Login";
import { ServicosPage } from "./components/pages/Servicos";
import { DashboardPage } from "./components/pages/Dashboard";
import { GestorPage } from "./components/pages/Gestor";
import { ViewManagerPage } from "./components/pages/Gestor/View";
import { ViewBeekeeperPage } from "./components/pages/Produtor/View";
import { ViewJobPage } from "./components/pages/Servicos/View";

interface Route {
  path: string;
  component: React.FC;
}

interface RouteType {
  withTemplate: Route[];
  withoutTemplate: Route[];
}

export const routes: RouteType = {
  // Rotas com template
  withTemplate: [
    { path: "/apicultor", component: ProdutorPage },
    { path: "/apicultor/:id", component: ViewBeekeeperPage },
    { path: "/gestor", component: GestorPage },
    { path: "/gestor/:id", component: ViewManagerPage },
    { path: "/servico", component: ServicosPage },
    { path: "/servico/:id", component: ViewJobPage },
    { path: "/dashboard", component: DashboardPage },
  ],
  // Rotas sem template
  withoutTemplate: [{ path: "/login", component: LoginPage }],
};
