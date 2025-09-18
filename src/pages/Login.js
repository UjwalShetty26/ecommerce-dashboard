export default function Login({ setRole }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">E-Commerce Dashboard</h1>
      <button
        onClick={() => setRole("admin")}
        className="bg-blue-600 text-white px-6 py-2 rounded mb-3"
      >
        Login as Admin
      </button>
      <button
        onClick={() => setRole("staff")}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Login as Staff
      </button>
    </div>
  );
}
