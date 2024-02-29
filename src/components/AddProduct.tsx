import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/productSlice";

export default function AddProduct() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    rate: 0,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addProduct(formData));
    setFormData({ name: "", quantity: 0, rate: 0 });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productName" className="block mb-1">
            Product Name:
          </label>
          <input
            type="text"
            id="productName"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productQty" className="block mb-1">
            Product Qty:
          </label>
          <input
            type="number"
            id="productQty"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            min="1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productRate" className="block mb-1">
            Product Rate:
          </label>
          <input
            type="number"
            id="productRate"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          {0 ? "Adding..." : "Add Product"}
        </button>
        {/* {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && (
          <p className="text-green-500 mt-2">Product added successfully!</p>
        )} */}
      </form>
    </div>
  );
}
