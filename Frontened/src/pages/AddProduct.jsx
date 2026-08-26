import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    condition: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setError("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Frontend validation
    if (
      !formData.title ||
      !formData.price ||
      !formData.category ||
      !formData.condition ||
      !formData.description
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (!image) {
      setError("Please select an image.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("condition", formData.condition);
      data.append("description", formData.description);
      data.append("image", image);

      // Debug
      console.log("Product data:", {
        title: formData.title,
        price: formData.price,
        category: formData.category,
        condition: formData.condition,
        description: formData.description,
        image: image.name,
      });

      const response = await api.post(
        "/products",
        data
      );

      console.log(response.data);

      setSuccess("Product added successfully!");

      setTimeout(() => {
        navigate("/my-products");
      }, 1000);

    } catch (error) {
      console.error("Add product error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to add product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 px-6 py-10">

      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Sell an Item
          </h1>

          <p className="mt-2 text-gray-600">
            List your item for other students.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Item Name
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Engineering Mathematics Book"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>


            {/* Price + Category */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Price (₹)
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="300"
                  min="0"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>


              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    Select category
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

                  <option value="other">
                    Other
                  </option>
                </select>
              </div>

            </div>


            {/* Condition */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Condition
              </label>

              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  Select condition
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


            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your item..."
                rows="5"
                required
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>


            {/* Image */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Item Picture
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 hover:border-blue-400 hover:bg-blue-50">

                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-56 w-full rounded-lg object-contain"
                  />
                ) : (
                  <>
                    <div className="mb-3 text-4xl">
                      📷
                    </div>

                    <p className="font-medium text-gray-700">
                      Click to upload an image
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      JPG, JPEG or PNG • Max 5MB
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

              </label>
            </div>


            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading
                ? "Uploading..."
                : "Add Product"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddProduct;