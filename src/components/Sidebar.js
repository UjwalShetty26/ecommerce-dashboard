export default function Sidebar({ setPage }) {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <ul>
        <li
          className="mb-3 cursor-pointer hover:text-blue-400"
          onClick={() => setPage("products")}
        >
          Products
        </li>
        <li
          className="cursor-pointer hover:text-blue-400"
          onClick={() => setPage("analytics")}
        >
          Analytics
        </li>
      </ul>
    </div>
  );
}
