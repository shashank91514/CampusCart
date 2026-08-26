const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  getMyProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// My products
router.get("/my-products", protect, getMyProducts);

// Public
router.get("/", getProducts);

router.get("/:id", getProductById);

// Protected
router.post(
  "/",
  protect,
  upload.single("image"),
  createProduct
);

// Edit product
router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateProduct
);

// Delete product
router.delete(
  "/:id",
  protect,
  deleteProduct
);

module.exports = router;