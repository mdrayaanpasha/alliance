import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/getProduct/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data[0]);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <img
        src={`http://localhost:5000${product.image_url}`}
        alt={product.product_name}
        className="w-full h-96 object-cover rounded-lg"
      />
      <h1 className="text-2xl font-bold mt-4">{product.product_name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-xl font-semibold mt-2">${product.product_price}</p>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Buy Now
      </button>
    </div>
  );
}
