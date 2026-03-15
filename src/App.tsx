import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Gamification from "./pages/Gamification";
import "./App.css";
import Payments from "./pages/Payments";
import Insights from "./pages/Insights";
import Applications from "./pages/Applications";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-center"
        className="bg-[#303030]"
        duration={1000}
      />
      <Routes>
        <Route
          element={
            <MainLayout>
              <Outlet />
            </MainLayout>
          }
        >
          <Route index element={<Navigate to="/gamification" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/gamification" element={<Gamification />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/payments" element={<Payments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
