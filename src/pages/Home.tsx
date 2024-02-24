import { useSelector } from "react-redux";
import AddProduct from "../components/AddProduct";
import { RootState } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { clearProducts } from "../store/store/productSlice";
import axios from "axios";

export default function Home() {
  const dispatch = useDispatch();

  const { products } = useSelector((state: RootState) => state.products);

  const handleDownloadPDF = async () => {
    const token = localStorage.getItem("token");

    await axios
      .post(
        "http://localhost:5001/api/product/add",
        { cartItems: products },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        dispatch(clearProducts());
        console.log("sucess");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });

    // For demo purposes, just clear products array without API call
    dispatch(clearProducts());
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-6 bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <AddProduct />
      </div>

      <div className="mt-8 w-full max-w-lg ml-4">
        <h2 className="text-xl font-semibold mb-4">Added Products</h2>

        {products.map((product, index) => {
          const { name, quantity, rate } = product;

          const totalWithoutGST = quantity * rate;
          const totalWithGST = totalWithoutGST + totalWithoutGST * 0.18;

          return (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md mb-4"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Name: {name}</h3>
                <p className="text-gray-700">Quantity: {quantity}</p>
                <p className="text-gray-700">Rate: {rate}</p>
                <p className="text-gray-700">
                  Total without GST: {totalWithoutGST}
                </p>
                <p className="text-gray-700">Total Inc. GST: {totalWithGST}</p>
              </div>
            </div>
          );
        })}

        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-blue-600"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
