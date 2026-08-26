const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

// ===============================
// Create Product
// ===============================
const createProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      category,
      condition,
      description,
    } = req.body;

    // Check text fields
    if (
      !title ||
      !price ||
      !category ||
      !condition ||
      !description
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check image
    if (!req.file) {
      return res.status(400).json({
        message: "Product image is required",
      });
    }

    // ===============================
    // Upload Image to Cloudinary
    // ===============================

    const uploadResult = await new Promise(
      (resolve, reject) => {
        const uploadStream =
          cloudinary.uploader.upload_stream(
            {
              folder: "campuscart/products",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

        uploadStream.end(req.file.buffer);
      }
    );

    // ===============================
    // Create Product
    // ===============================

    const product = await Product.create({
      title,
      price,
      category,
      condition,
      description,
      image: uploadResult.secure_url,
      seller: req.user.userId,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    console.error("Create product error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ===============================
// Get All Products
// Search + Filters + Sorting
// ===============================
const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      condition,
      minPrice,
      maxPrice,
      sort,
    } = req.query;

    // ===============================
    // Build Filter
    // ===============================

    const filter = {};

    // Search by title or description
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // ===============================
    // Category Filter
    // ===============================

    if (
      category &&
      category !== "all"
    ) {
      filter.category =
        category.toLowerCase();
    }

    // ===============================
    // Condition Filter
    // ===============================

    if (
      condition &&
      condition !== "all"
    ) {
      filter.condition =
        condition.toLowerCase();
    }

    // ===============================
    // Price Filter
    // ===============================

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte =
          Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte =
          Number(maxPrice);
      }
    }

    // ===============================
    // Sorting
    // ===============================

    let sortOption = {
      createdAt: -1,
    };

    // Newest
    if (sort === "newest") {
      sortOption = {
        createdAt: -1,
      };
    }

    // Oldest
    if (sort === "oldest") {
      sortOption = {
        createdAt: 1,
      };
    }

    // Price Low → High
    if (sort === "price-low") {
      sortOption = {
        price: 1,
      };
    }

    // Price High → Low
    if (sort === "price-high") {
      sortOption = {
        price: -1,
      };
    }

    // ===============================
    // Fetch Products
    // ===============================

    const products = await Product.find(filter)
      .populate(
        "seller",
        "name email college"
      )
      .sort(sortOption);

    res.json(products);

  } catch (error) {
    console.error(
      "Get products error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ===============================
// Get Single Product
// ===============================
const getProductById = async (req, res) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      ).populate(
        "seller",
        "name email college"
      );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);

  } catch (error) {
    console.error(
      "Get product error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ===============================
// Get My Products
// ===============================
const getMyProducts = async (req, res) => {
  try {
    const products =
      await Product.find({
        seller: req.user.userId,
      }).sort({
        createdAt: -1,
      });

    res.json(products);

  } catch (error) {
    console.error(
      "Get my products error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ===============================
// Update Product
// ===============================
const updateProduct = async (req, res) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    // Product doesn't exist
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // ===============================
    // Check Ownership
    // ===============================

    if (
      product.seller.toString() !==
      req.user.userId
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to edit this product",
      });
    }

    const {
      title,
      price,
      category,
      condition,
      description,
    } = req.body;

    // ===============================
    // Validate Fields
    // ===============================

    if (
      !title ||
      !price ||
      !category ||
      !condition ||
      !description
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // ===============================
    // Update Text Fields
    // ===============================

    product.title = title;
    product.price = price;
    product.category = category;
    product.condition = condition;
    product.description =
      description;

    // ===============================
    // Update Image
    // ===============================

    if (req.file) {
      const uploadResult =
        await new Promise(
          (resolve, reject) => {
            const uploadStream =
              cloudinary.uploader.upload_stream(
                {
                  folder:
                    "campuscart/products",
                },
                (
                  error,
                  result
                ) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result);
                  }
                }
              );

            uploadStream.end(
              req.file.buffer
            );
          }
        );

      product.image =
        uploadResult.secure_url;
    }

    // Save
    await product.save();

    res.json({
      message:
        "Product updated successfully",
      product,
    });

  } catch (error) {
    console.error(
      "Update product error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ===============================
// Delete Product
// ===============================
const deleteProduct = async (req, res) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    // Product doesn't exist
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // ===============================
    // Check Ownership
    // ===============================

    if (
      product.seller.toString() !==
      req.user.userId
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to delete this product",
      });
    }

    // Delete
    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Product deleted successfully",
    });

  } catch (error) {
    console.error(
      "Delete product error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ===============================
// Export
// ===============================

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  getMyProducts,
  updateProduct,
  deleteProduct,
};