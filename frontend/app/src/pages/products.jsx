import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetch("http://localhost:5000/getProducts")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {loading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-64 w-full rounded-xl" />
        ))
      ) : (
        products.map((product) => (
          <Card key={product.id} className="shadow-lg">
            <CardHeader>
              <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
                <img
                  src={`http://localhost:5000${product.image_url}`}
                  alt={product.product_name}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg font-bold">{product.product_name}</CardTitle>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-xl font-semibold mt-2">${product.product_price}</p>
              <button
                onClick={() => navigate(`/product/${product.id}`)} // Navigate to product page
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Buy Now
              </button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
