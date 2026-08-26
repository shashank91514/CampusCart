const express = require("express");

const {
  createRequest,
  getMyRequests,
  getSellerRequests,
  updateRequestStatus,
} = require("../controllers/requestController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// Buyer
// ===============================

// Create purchase request
router.post(
  "/product/:productId",
  protect,
  createRequest
);

// Get my requests
router.get(
  "/my-requests",
  protect,
  getMyRequests
);


// ===============================
// Seller
// ===============================

// Get requests for my products
router.get(
  "/seller-requests",
  protect,
  getSellerRequests
);

// Accept / Reject request
router.put(
  "/:id/status",
  protect,
  updateRequestStatus
);


module.exports = router;