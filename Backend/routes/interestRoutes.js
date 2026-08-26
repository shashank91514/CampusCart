const express = require("express");

const {
  createInterest,
  getSellerInterests,
  getBuyerInterests,
  updateInterestStatus,
} = require("../controllers/interestController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Buyer sends interest
router.post(
  "/:productId",
  protect,
  createInterest
);


// Seller views requests
router.get(
  "/seller",
  protect,
  getSellerInterests
);


// Buyer views their requests
router.get(
  "/buyer",
  protect,
  getBuyerInterests
);


// Seller accepts/rejects
router.put(
  "/:id",
  protect,
  updateInterestStatus
);


module.exports = router;