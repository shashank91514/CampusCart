import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Wishlist() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const response = await api.get("/wishlist");

      setProducts(response.data);
    } catch (error) {
      console.error("Wishlist error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load wishlist."
      );
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`/wishlist/${productId}`);

      setProducts((previous) =>
        previous.filter(
          (product) => product._id !== productId
        )
      );
    } catch (error) {
      console.error("Remove wishlist error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to remove product."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-500">
          Loading wishlist...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 px-6 py-10">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            My Wishlist ❤️
          </h1>

          <p className="mt-2 text-gray-600">
            Items you've saved for later.
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-red-600">
            {error}
          </div>
        )}

        {/* Empty */}
        {!error && products.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center shadow-sm">

            <div className="text-6xl">
              ♡
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Your wishlist is empty
            </h2>

            <p className="mt-2 text-gray-500">
              Save products you like and find them here later.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Browse Products
            </Link>

          </div>
        )}

        {/* Products */}
        {products.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {products.map((product) => (
              <div
                key={product._id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >

                {/* Image */}
                <Link to={`/product/${product._id}`}>
                  <div className="h-56 bg-gray-100">

                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover transition hover:scale-105"
                    />

                  </div>
                </Link>

                {/* Content */}
                <div className="p-5">

                  <Link
                    to={`/product/${product._id}`}
                    className="line-clamp-2 font-semibold text-gray-900 hover:text-blue-600"
                  >
                    {product.title}
                  </Link>

                  <p className="mt-2 text-xl font-bold text-blue-600">
                    ₹{product.price}
                  </p>

                  <div className="mt-3 flex gap-2">

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs capitalize text-blue-600">
                      {product.category}
                    </span>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs capitalize text-gray-600">
                      {product.condition?.replace("-", " ")}
                    </span>

                  </div>

                  <div className="mt-5 flex gap-2">

                    <Link
                      to={`/product/${product._id}`}
                      className="flex-1 rounded-lg border border-gray-300 py-2 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      View
                    </Link>

                    <button
                      onClick={() =>
                        removeFromWishlist(product._id)
                      }
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Wishlist;