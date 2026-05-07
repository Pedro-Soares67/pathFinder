import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Location from "./pages/Location";
import Alerts from "./pages/Alerts";
import MedicalRecord from "./pages/MedicalRecord";
import Dependents from "./pages/Dependents";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "location", Component: Location },
      { path: "alerts", Component: Alerts },
      { path: "medical", Component: MedicalRecord },
      { path: "dependents", Component: Dependents },
      { path: "settings", Component: Settings },
      { path: "admin", Component: Admin },
    ],
  },
]);
