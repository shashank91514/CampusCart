import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Wishlist
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Interest
  const [interestLoading, setInterestLoading] = useState(false);
  const [interestMessage, setInterestMessage] = useState("");

  const [error, setError] = useState("");
  const [wishlistMessage, setWishlistMessage] = useState("");

  // ===============================
  // Fetch Product
  // ===============================

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/products/${id}`);

      setProduct(response.data);
    } catch (error) {
      console.error("Product error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load product."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Wishlist
  // ===============================

  const handleWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setWishlistLoading(true);
      setWishlistMessage("");

      if (isWishlisted) {
        await api.delete(`/wishlist/${id}`);

        setIsWishlisted(false);
        setWishlistMessage("Removed from wishlist");
      } else {
        await api.post(`/wishlist/${id}`);

        setIsWishlisted(true);
        setWishlistMessage("Added to wishlist ❤️");
      }

      setTimeout(() => {
        setWishlistMessage("");
      }, 2000);
    } catch (error) {
      console.error("Wishlist error:", error);

      setWishlistMessage(
        error.response?.data?.message ||
          "Wishlist update failed."
      );
    } finally {
      setWishlistLoading(false);
    }
  };

  // ===============================
  // Send Interest
  // ===============================

  const handleInterest = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setInterestLoading(true);
      setInterestMessage("");

      const response = await api.post(
        `/interests/${id}`
      );

      setInterestMessage(
        response.data.message ||
          "Interest request sent successfully!"
      );
    } catch (error) {
      console.error("Interest error:", error);

      setInterestMessage(
        error.response?.data?.message ||
          "Failed to send interest request."
      );
    } finally {
      setInterestLoading(false);
    }
  };

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-500">
          Loading product...
        </p>
      </div>
    );
  }

  // ===============================
  // Error / Product Not Found
  // ===============================

  if (error || !product) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">

          <div className="text-5xl">
            😕
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-900">
            Product not found
          </h2>

          <p className="mt-2 text-gray-500">
            {error}
          </p>

          <Link
            to="/products"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Products
          </Link>

        </div>
      </div>
    );
  }

  // ===============================
  // Product Details
  // ===============================

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 px-6 py-10">

      <div className="mx-auto max-w-6xl">

        {/* Back Button */}

        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm font-medium text-gray-600 transition hover:text-blue-600"
        >
          ← Back
        </button>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="grid md:grid-cols-2">

            {/* ===============================
                Product Image
            =============================== */}

            <div className="flex min-h-[400px] items-center justify-center bg-gray-100 p-6">

              <img
                src={product.image}
                alt={product.title}
                className="max-h-[500px] w-full rounded-xl object-contain"
              />

            </div>

            {/* ===============================
                Product Information
            =============================== */}

            <div className="p-8 md:p-10">

              {/* Category */}

              <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-medium capitalize text-blue-600">
                {product.category}
              </span>

              {/* Title */}

              <h1 className="mt-4 text-3xl font-bold text-gray-900">
                {product.title}
              </h1>

              {/* Price */}

              <p className="mt-4 text-3xl font-bold text-blue-600">
                ₹{product.price}
              </p>

              {/* ===============================
                  Condition
              =============================== */}

              <div className="mt-6">

                <p className="text-sm font-semibold text-gray-700">
                  Condition
                </p>

                <span className="mt-2 inline-block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium capitalize text-gray-700">
                  {product.condition?.replace(
                    "-",
                    " "
                  )}
                </span>

              </div>

              {/* ===============================
                  Description
              =============================== */}

              <div className="mt-8">

                <h2 className="text-lg font-semibold text-gray-900">
                  Description
                </h2>

                <p className="mt-2 leading-7 text-gray-600">
                  {product.description}
                </p>

              </div>

              {/* ===============================
                  Seller Information
              =============================== */}

              {product.seller && (
                <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">

                  <h2 className="text-lg font-semibold text-gray-900">
                    Seller Information
                  </h2>

                  <div className="mt-4 flex items-center gap-4">

                    {/* Avatar */}

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                      {product.seller.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    {/* Seller Details */}

                    <div>

                      <p className="font-semibold text-gray-900">
                        {product.seller.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {product.seller.email}
                      </p>

                      {product.seller.college && (
                        <p className="text-sm text-gray-500">
                          {product.seller.college}
                        </p>
                      )}

                    </div>

                  </div>

                </div>
              )}

              {/* ===============================
                  Wishlist Message
              =============================== */}

              {wishlistMessage && (
                <div className="mt-5 rounded-lg bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600">
                  {wishlistMessage}
                </div>
              )}

              {/* ===============================
                  Interest Message
              =============================== */}

              {interestMessage && (
                <div className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  {interestMessage}
                </div>
              )}

              {/* ===============================
                  Actions
              =============================== */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                {/* I'm Interested */}

                <button
                  onClick={handleInterest}
                  disabled={interestLoading}
                  className="flex-1 rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {interestLoading
                    ? "Sending..."
                    : "🙋 I'm Interested"}
                </button>

                {/* Contact Seller */}

                {product.seller?.email ? (
                  <a
                    href={`mailto:${
                      product.seller.email
                    }?subject=Interested in ${encodeURIComponent(
                      product.title
                    )}`}
                    className="flex-1 rounded-lg bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                  >
                    ✉️ Contact Seller
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex-1 cursor-not-allowed rounded-lg bg-gray-300 py-3 font-semibold text-gray-500"
                  >
                    Seller Email Unavailable
                  </button>
                )}

                {/* Wishlist */}

                <button
                  onClick={handleWishlist}
                  disabled={wishlistLoading}
                  className={`rounded-lg border px-5 py-3 text-xl transition ${
                    isWishlisted
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {wishlistLoading
                    ? "..."
                    : isWishlisted
                    ? "♥"
                    : "♡"}
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;