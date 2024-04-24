import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.scss";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import NotFoundPage from "./pages/404";
import Users from "./pages/users";
import CreateUser from "./pages/users/create";
import EditUser from "./pages/users/edit";
import Teams from "./pages/teams";
import CreateTeam from "./pages/teams/create";
import EditTeam from "./pages/teams/edit";
import Templates from "./pages/templates";
import CreateTemplate from "./pages/templates/create";
import EditTemplate from "./pages/templates/edit";
import ServiceRequests from "./pages/serviceRequests";
import CreateServiceRequest from "./pages/serviceRequests/create";
import EditServiceRequest from "./pages/serviceRequests/edit";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="logout" element={<Logout />} />
      <Route path="users" element={<Users />} />
      <Route path="users/create" element={<CreateUser />} />
      <Route path="users/:id/edit" element={<EditUser />} />
      <Route path="teams" element={<Teams />} />
      <Route path="teams/create" element={<CreateTeam />} />
      <Route path="teams/:id/edit" element={<EditTeam />} />
      <Route path="templates" element={<Templates />} />
      <Route path="templates/create" element={<CreateTemplate />} />
      <Route path="templates/:id/edit" element={<EditTemplate />} />
      <Route path="service-requests" element={<ServiceRequests />} />
      <Route
        path="service-requests/:id/edit"
        element={<EditServiceRequest />}
      />
      <Route
        path="service-requests/create"
        element={<CreateServiceRequest />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => (
  <div className="bg-light" style={{ height: "100vh" }}>
    <RouterProvider router={router} />
    <ToastContainer />
  </div>
);

export default App;
