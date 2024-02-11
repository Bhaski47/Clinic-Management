import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReceptionistDash from "./pages/Receptionist/ReceptionistDash";
import PatientAdd from "./pages/Receptionist/PatientAdd";
import BillingAmount from "./pages/Receptionist/BillingAmount";
import DoctorDash from "./pages/Doctor/DoctorDash";
import PatientChecker from "./pages/Doctor/PatientChecker";
import Auth from "./pages/Auth/Auth";
import UserInfo from "./pages/Receptionist/UserInfo";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
    },
    {
      path: "/recept/dashboard",
      element: <ReceptionistDash />,
    },
    {
      path: "/recept/dashboard/pats",
      element: <PatientAdd />,
    },
    {
      path: "/recept/dashboard/bill",
      element: <BillingAmount />,
    },
    {
      path: "/doc/dash",
      element: <DoctorDash />,
    },
    {
      path: "/doc/dash/pats",
      element: <PatientChecker />,
    },
    {
      path: "/recept/userinfo",
      element: <UserInfo />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
