import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/products/my-products");

      setProducts(response.data);
    } catch (error) {
      console.error("My products error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load your products."
      );
    } finally {
      setLoading(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-500">
          Loading your products...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 px-6 py-10">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Products
            </h1>

            <p className="mt-2 text-gray-600">
              Manage the items you've listed on CampusCart.
            </p>
          </div>

          <Link
            to="/add-product"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            + Add Product
          </Link>

        </div>


        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
            {error}
          </div>
        )}


        {/* Empty State */}
        {!error && products.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center shadow-sm">

            <div className="text-6xl">
              📦
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              You haven't listed anything yet
            </h2>

            <p className="mt-2 text-gray-500">
              Sell your unused books, electronics, furniture,
              and other items to fellow students.
            </p>

            <Link
              to="/add-product"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Sell Your First Item
            </Link>

          </div>
        )}


        {/* Product Grid */}
        {products.length > 0 && (
          <>
            <div className="mb-5">
              <p className="text-sm text-gray-500">
                {products.length}{" "}
                {products.length === 1
                  ? "product"
                  : "products"}{" "}
                listed
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {products.map((product) => (
                <div
                  key={product._id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* Image */}
                  <Link
                    to={`/product/${product._id}`}
                  >
                    <div className="h-56 overflow-hidden bg-gray-100">

                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      />

                    </div>
                  </Link>


                  {/* Content */}
                  <div className="p-5">

                    <div className="flex items-start justify-between gap-3">

                      <Link
                        to={`/product/${product._id}`}
                        className="line-clamp-2 font-semibold text-gray-900 hover:text-blue-600"
                      >
                        {product.title}
                      </Link>

                      <span className="whitespace-nowrap text-lg font-bold text-blue-600">
                        ₹{product.price}
                      </span>

                    </div>


                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-2">

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-600">
                        {product.category}
                      </span>

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600">
                        {product.condition?.replace(
                          "-",
                          " "
                        )}
                      </span>

                    </div>


                    {/* Description */}
                    <p className="mt-3 line-clamp-2 text-sm text-gray-500">
                      {product.description}
                    </p>


                    {/* Actions */}
                    <div className="mt-5 flex gap-2">

                      <Link
                        to={`/product/${product._id}`}
                        className="flex-1 rounded-lg border border-gray-300 py-2 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                      >
                        View
                      </Link>

                      <button
                        onClick={() => {
                          alert(
                            "Delete feature will be added next."
                          );
                        }}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          </>
        )}

      </div>

    </div>
  );
}

export default MyProducts;