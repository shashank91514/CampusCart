import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || ""
  );

  const [condition, setCondition] = useState(
    searchParams.get("condition") || ""
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || ""
  );


  // =========================
  // Fetch Products
  // =========================

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/products");

      setProducts(response.data);

    } catch (error) {
      console.error("Products error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  };


  // =========================
  // Apply Filters
  // =========================

  useEffect(() => {
    let result = [...products];


    // Search
    if (search.trim()) {
      result = result.filter((product) =>
        product.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }


    // Category
    if (category) {
      result = result.filter(
        (product) =>
          product.category?.toLowerCase() ===
          category.toLowerCase()
      );
    }


    // Condition
    if (condition) {
      result = result.filter(
        (product) =>
          product.condition?.toLowerCase() ===
          condition.toLowerCase()
      );
    }


    // Maximum Price
    if (maxPrice) {
      result = result.filter(
        (product) =>
          Number(product.price) <= Number(maxPrice)
      );
    }


    setFilteredProducts(result);

  }, [
    products,
    search,
    category,
    condition,
    maxPrice,
  ]);


  // =========================
  // Update URL
  // =========================

  useEffect(() => {
    const params = {};

    if (search.trim()) {
      params.search = search;
    }

    if (category) {
      params.category = category;
    }

    if (condition) {
      params.condition = condition;
    }

    if (maxPrice) {
      params.maxPrice = maxPrice;
    }

    setSearchParams(params);

  }, [
    search,
    category,
    condition,
    maxPrice,
    setSearchParams,
  ]);


  // =========================
  // Clear Filters
  // =========================

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setCondition("");
    setMaxPrice("");
  };


  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-500">
          Loading products...
        </p>
      </div>
    );
  }


  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 px-6 py-10">

      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Browse Products
          </h1>

          <p className="mt-2 text-gray-600">
            Find affordable items from fellow students.
          </p>

        </div>


        {/* ================= FILTER BOX ================= */}

        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">


            {/* Search */}

            <div className="lg:col-span-2">

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Search
              </label>

              <div className="relative">

                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  🔍
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search books, laptops, furniture..."
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>


            {/* Category */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              >

                <option value="">
                  All Categories
                </option>

                <option value="books">
                  Books
                </option>

                <option value="electronics">
                  Electronics
                </option>

                <option value="furniture">
                  Furniture
                </option>

                <option value="clothing">
                  Clothing
                </option>

                <option value="stationery">
                  Stationery
                </option>

              </select>

            </div>


            {/* Condition */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Condition
              </label>

              <select
                value={condition}
                onChange={(e) =>
                  setCondition(e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              >

                <option value="">
                  Any Condition
                </option>

                <option value="new">
                  New
                </option>

                <option value="like-new">
                  Like New
                </option>

                <option value="good">
                  Good
                </option>

                <option value="fair">
                  Fair
                </option>

              </select>

            </div>


            {/* Maximum Price */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Maximum Price
              </label>

              <input
                type="number"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value)
                }
                placeholder="₹ Maximum"
                min="0"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

          </div>


          {/* Clear */}

          {(search ||
            category ||
            condition ||
            maxPrice) && (
            <button
              onClick={clearFilters}
              className="mt-5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              ✕ Clear Filters
            </button>
          )}

        </div>


        {/* ================= ERROR ================= */}

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-red-600">
            {error}
          </div>
        )}


        {/* ================= RESULT COUNT ================= */}

        <div className="mb-5 flex items-center justify-between">

          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredProducts.length}
            </span>{" "}
            product
            {filteredProducts.length !== 1
              ? "s"
              : ""}
          </p>

        </div>


        {/* ================= EMPTY ================= */}

        {filteredProducts.length === 0 && !error && (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center">

            <div className="text-5xl">
              🔍
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              No products found
            </h2>

            <p className="mt-2 text-gray-500">
              Try changing your search or filters.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Clear Filters
            </button>

          </div>
        )}


        {/* ================= PRODUCTS ================= */}

        {filteredProducts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map((product) => (

              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Image */}

                <div className="h-56 bg-gray-100">

                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />

                </div>


                {/* Details */}

                <div className="p-5">

                  <h2 className="line-clamp-2 font-semibold text-gray-900">
                    {product.title}
                  </h2>

                  <p className="mt-2 text-xl font-bold text-blue-600">
                    ₹{product.price}
                  </p>


                  <div className="mt-3 flex flex-wrap gap-2">

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs capitalize text-blue-600">
                      {product.category}
                    </span>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs capitalize text-gray-600">
                      {product.condition?.replace(
                        "-",
                        " "
                      )}
                    </span>

                  </div>

                </div>

              </Link>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Products;