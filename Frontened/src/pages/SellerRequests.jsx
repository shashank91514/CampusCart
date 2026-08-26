import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function SellerRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/interests/seller");

      setRequests(response.data);
    } catch (error) {
      console.error("Requests error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load requests."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Accept / Reject
  // ===============================

  const updateRequest = async (id, status) => {
    try {
      setActionLoading(id);

      await api.put(`/interests/${id}`, {
        status,
      });

      setRequests((prev) =>
        prev.map((request) =>
          request._id === id
            ? { ...request, status }
            : request
        )
      );
    } catch (error) {
      console.error("Update request error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update request."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-500">
          Loading requests...
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
            Interest Requests
          </h1>

          <p className="mt-2 text-gray-500">
            See who is interested in your products.
          </p>

        </div>


        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}


        {/* Empty */}

        {!error && requests.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">

            <div className="text-5xl">
              📭
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              No requests yet
            </h2>

            <p className="mt-2 text-gray-500">
              When someone shows interest in your
              products, their request will appear here.
            </p>

            <Link
              to="/my-products"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              View My Products
            </Link>

          </div>
        )}


        {/* Requests */}

        <div className="space-y-5">

          {requests.map((request) => (

            <div
              key={request._id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >

              <div className="grid md:grid-cols-[180px_1fr]">

                {/* Product Image */}

                <div className="h-48 bg-gray-100 md:h-full">

                  {request.product?.image ? (
                    <img
                      src={request.product.image}
                      alt={request.product.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-4xl">
                      📦
                    </div>
                  )}

                </div>


                {/* Request Information */}

                <div className="p-6">

                  <div className="flex flex-col justify-between gap-4 sm:flex-row">

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
                      className={`h-fit rounded-full px-3 py-1 text-sm font-semibold capitalize ${
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


                  {/* Buyer */}

                  <div className="mt-5 rounded-xl bg-gray-50 p-4">

                    <p className="text-sm font-semibold text-gray-500">
                      Interested Buyer
                    </p>

                    <div className="mt-3 flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                        {request.buyer?.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>

                        <p className="font-semibold text-gray-900">
                          {request.buyer?.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {request.buyer?.email}
                        </p>

                        {request.buyer?.college && (
                          <p className="text-sm text-gray-500">
                            {request.buyer.college}
                          </p>
                        )}

                      </div>

                    </div>

                  </div>


                  {/* Actions */}

                  {request.status === "pending" && (
                    <div className="mt-5 flex gap-3">

                      <button
                        onClick={() =>
                          updateRequest(
                            request._id,
                            "accepted"
                          )
                        }
                        disabled={
                          actionLoading === request._id
                        }
                        className="flex-1 rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                      >
                        {actionLoading === request._id
                          ? "Updating..."
                          : "✓ Accept"}
                      </button>

                      <button
                        onClick={() =>
                          updateRequest(
                            request._id,
                            "rejected"
                          )
                        }
                        disabled={
                          actionLoading === request._id
                        }
                        className="flex-1 rounded-lg border border-red-200 bg-red-50 py-3 font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                      >
                        ✕ Reject
                      </button>

                    </div>
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

export default SellerRequests;