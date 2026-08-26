import { useEffect, useState } from "react";
import api from "../services/api";

function InterestRequests() {
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInterests();
  }, []);

  const fetchInterests = async () => {
    try {
      setLoading(true);

      const response = await api.get("/interests/seller");

      setInterests(response.data);
    } catch (error) {
      console.error("Interest requests error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load interest requests."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setActionLoading(id);

      const response = await api.put(`/interests/${id}`, {
        status,
      });

      setInterests((prev) =>
        prev.map((interest) =>
          interest._id === id
            ? response.data.interest
            : interest
        )
      );
    } catch (error) {
      console.error("Update interest error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update request."
      );
    } finally {
      setActionLoading("");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-500">
          Loading interest requests...
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
            Manage buyers interested in your products.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!error && interests.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">

            <div className="text-5xl">
              🙋
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              No interest requests yet
            </h2>

            <p className="mt-2 text-gray-500">
              When someone shows interest in your
              products, their request will appear here.
            </p>

          </div>
        )}

        {/* Interest Requests */}
        <div className="space-y-5">

          {interests.map((interest) => (

            <div
              key={interest._id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >

              <div className="grid md:grid-cols-[180px_1fr]">

                {/* Product Image */}
                <div className="flex min-h-[180px] items-center justify-center bg-gray-100 p-4">

                  {interest.product?.image ? (
                    <img
                      src={interest.product.image}
                      alt={interest.product.title}
                      className="max-h-40 w-full rounded-xl object-contain"
                    />
                  ) : (
                    <div className="text-5xl">
                      📦
                    </div>
                  )}

                </div>

                {/* Content */}
                <div className="p-6">

                  <div className="flex flex-col justify-between gap-4 sm:flex-row">

                    <div>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                        Product
                      </span>

                      <h2 className="mt-3 text-xl font-bold text-gray-900">
                        {interest.product?.title}
                      </h2>

                      <p className="mt-1 text-lg font-bold text-blue-600">
                        ₹{interest.product?.price}
                      </p>

                    </div>

                    {/* Status */}
                    <div>

                      {interest.status === "accepted" && (
                        <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-600">
                          ✓ Accepted
                        </span>
                      )}

                      {interest.status === "rejected" && (
                        <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
                          ✕ Rejected
                        </span>
                      )}

                      {(!interest.status ||
                        interest.status === "pending") && (
                        <span className="rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-600">
                          ⏳ Pending
                        </span>
                      )}

                    </div>

                  </div>

                  {/* Buyer */}
                  <div className="mt-6 rounded-xl bg-gray-50 p-4">

                    <p className="text-sm font-semibold text-gray-700">
                      Interested Buyer
                    </p>

                    <div className="mt-3 flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                        {interest.buyer?.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>

                        <p className="font-semibold text-gray-900">
                          {interest.buyer?.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {interest.buyer?.email}
                        </p>

                        {interest.buyer?.college && (
                          <p className="text-sm text-gray-500">
                            {interest.buyer.college}
                          </p>
                        )}

                      </div>

                    </div>

                  </div>

                  {/* Buttons */}
                  {(!interest.status ||
                    interest.status === "pending") && (

                    <div className="mt-5 flex gap-3">

                      <button
                        onClick={() =>
                          updateStatus(
                            interest._id,
                            "accepted"
                          )
                        }
                        disabled={
                          actionLoading === interest._id
                        }
                        className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                      >
                        {actionLoading === interest._id
                          ? "Updating..."
                          : "✓ Accept"}
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            interest._id,
                            "rejected"
                          )
                        }
                        disabled={
                          actionLoading === interest._id
                        }
                        className="rounded-lg border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                      >
                        ✕ Reject
                      </button>

                    </div>
                  )}

                  {/* Contact Buyer */}
                  {interest.status === "accepted" &&
                    interest.buyer?.email && (
                      <a
                        href={`mailto:${interest.buyer.email}?subject=Regarding ${encodeURIComponent(
                          interest.product?.title ||
                            "Product"
                        )}`}
                        className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        ✉️ Contact Buyer
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

export default InterestRequests;