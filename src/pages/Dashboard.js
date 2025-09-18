import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Products from "./Products";
import Analytics from "./Analytics";

export default function Dashboard({ role, setRole }) {
  const [page, setPage] = useState("products");

  return (
    <div className="flex h-screen">
      <Sidebar setPage={setPage} />
      <div className="flex flex-col flex-1">
        <Topbar role={role} setRole={setRole} />
        <div className="p-6">
          {page === "products" && <Products role={role} />}
          {page === "analytics" && <Analytics />}
        </div>
      </div>
    </div>
  );
}
