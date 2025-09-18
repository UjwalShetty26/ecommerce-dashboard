import { useEffect, useState } from "react";
import axios from "axios";

export default function Products({ role }) {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });

  // Fetch products on load
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Delete a product (Admin only)
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`).then(() => {
      setProducts(products.filter((p) => p.id !== id));
    });
  };

  // Add a new product (Admin only)
  const handleAdd = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category) {
      alert("Please fill all fields before adding a product.");
      return;
    }

    const productWithId = { ...newProduct, id: Math.random().toString(16).slice(2, 6) }; // generate short id

    axios.post("http://localhost:5000/products", productWithId).then((res) => {
      setProducts([...products, res.data]);
      setNewProduct({ name: "", price: "", stock: "", category: "" });
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Products</h2>

      {/* Products Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Category</th>
            {role === "admin" && <th className="p-2 border">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="text-center">
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">₹{p.price}</td>
              <td className="border p-2">{p.stock}</td>
              <td className="border p-2">{p.category}</td>
              {role === "admin" && (
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Product Form (Admin only) */}
      {role === "admin" && (
        <div className="mt-6">
          <h3 className="font-bold mb-2">Add New Product</h3>
          <div className="flex gap-2">
            <input
              className="border p-2 flex-1"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              className="border p-2 flex-1"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
              className="border p-2 flex-1"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
            <input
              className="border p-2 flex-1"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
