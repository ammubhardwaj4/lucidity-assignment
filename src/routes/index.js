import { Route, Routes } from "react-router-dom";
import InventoryManagement from "../Pages/InventoryManagement";

export default function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<InventoryManagement />} />
    </Routes>
  );
}
