import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [role, setRole] = useState(null);

  return (
    <div className="h-screen w-screen">
      {!role ? (
        <Login setRole={setRole} />
      ) : (
        <Dashboard role={role} setRole={setRole} />
      )}
    </div>
  );
}

export default App;
