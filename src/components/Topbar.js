export default function Topbar({ role, setRole }) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <h1 className="text-lg font-semibold">Welcome, {role}</h1>
      <button
        onClick={() => setRole(null)}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
