import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/interests/buyer");

      setRequests(response.data);
    } catch (error) {
      console.error("My requests error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load your requests."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-500">
          Loading your requests...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 px-6 py-10">

      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            My Requests
          </h1>

          <p className="mt-2 text-gray-500">
            Track the products you're interested in.
          </p>

        </div>


        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}


        {/* Empty State */}

        {!error && requests.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">

            <div className="text-5xl">
              📭
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              No requests yet
            </h2>

            <p className="mt-2 text-gray-500">
              When you show interest in a product,
              it will appear here.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Products
            </Link>

          </div>
        )}


        {/* Requests */}

        <div className="grid gap-6 md:grid-cols-2">

          {requests.map((request) => (

            <div
              key={request._id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >

              {/* Product Image */}

              <div className="h-52 bg-gray-100">

                {request.product?.image ? (
                  <img
                    src={request.product.image}
                    alt={request.product.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-5xl">
                    📦
                  </div>
                )}

              </div>


              {/* Details */}

              <div className="p-6">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h2 className="text-xl font-bold text-gray-900">
                      {request.product?.title ||
                        "Product unavailable"}
                    </h2>

                    <p className="mt-1 text-lg font-bold text-blue-600">
                      ₹{request.product?.price}
                    </p>

                  </div>


                  {/* Status */}

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${
                      request.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : request.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {request.status}
                  </span>

                </div>


                {/* Seller */}

                <div className="mt-5 rounded-xl bg-gray-50 p-4">

                  <p className="text-sm font-semibold text-gray-500">
                    Seller
                  </p>

                  <div className="mt-3 flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                      {request.seller?.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>

                      <p className="font-semibold text-gray-900">
                        {request.seller?.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {request.seller?.email}
                      </p>

                    </div>

                  </div>

                </div>


                {/* Accepted */}

                {request.status === "accepted" && (
                  <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-700">

                    <p className="font-semibold">
                      🎉 Request Accepted!
                    </p>

                    <p className="mt-1">
                      The seller has accepted your
                      request. Contact them to arrange
                      the exchange.
                    </p>

                  </div>
                )}


                {/* Pending */}

                {request.status === "pending" && (
                  <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-700">

                    ⏳ Waiting for the seller to
                    respond.

                  </div>
                )}


                {/* Rejected */}

                {request.status === "rejected" && (
                  <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">

                    This request was rejected by the
                    seller.

                  </div>
                )}


                {/* Actions */}

                <div className="mt-5 flex gap-3">

                  {request.product?._id && (
                    <Link
                      to={`/product/${request.product._id}`}
                      className="flex-1 rounded-lg border border-gray-300 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                    >
                      View Product
                    </Link>
                  )}


                  {request.status === "accepted" &&
                    request.seller?.email && (
                      <a
                        href={`mailto:${
                          request.seller.email
                        }?subject=Regarding ${encodeURIComponent(
                          request.product?.title || ""
                        )}`}
                        className="flex-1 rounded-lg bg-blue-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        ✉️ Contact Seller
                      </a>
                    )}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default MyRequests;