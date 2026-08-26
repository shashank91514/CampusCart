const Interest = require("../models/Interest");
const Product = require("../models/Product");


// ===============================
// Create Interest Request
// ===============================

const createInterest = async (req, res) => {
  try {
    const { productId } = req.params;

    const buyerId = req.user.userId;

    // Find product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Seller cannot request own product
    if (
      product.seller.toString() === buyerId
    ) {
      return res.status(400).json({
        message:
          "You cannot request your own product",
      });
    }

    // Check existing request
    const existingInterest =
      await Interest.findOne({
        product: productId,
        buyer: buyerId,
      });

    if (existingInterest) {
      return res.status(400).json({
        message:
          "You have already shown interest in this product",
      });
    }

    // Create request
    const interest = await Interest.create({
      product: productId,
      buyer: buyerId,
      seller: product.seller,
    });

    res.status(201).json({
      message: "Interest request sent successfully",
      interest,
    });

  } catch (error) {
    console.error(
      "Create interest error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ===============================
// Get Seller Requests
// ===============================

const getSellerInterests = async (req, res) => {
  try {
    const interests = await Interest.find({
      seller: req.user.userId,
    })
      .populate(
        "product",
        "title price image"
      )
      .populate(
        "buyer",
        "name email college"
      )
      .sort({ createdAt: -1 });

    res.json(interests);

  } catch (error) {
    console.error(
      "Get seller interests error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ===============================
// Get Buyer Requests
// ===============================

const getBuyerInterests = async (req, res) => {
  try {
    const interests = await Interest.find({
      buyer: req.user.userId,
    })
      .populate(
        "product",
        "title price image"
      )
      .populate(
        "seller",
        "name email college"
      )
      .sort({ createdAt: -1 });

    res.json(interests);

  } catch (error) {
    console.error(
      "Get buyer interests error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ===============================
// Update Interest Status
// ===============================

const updateInterestStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (
      !["accepted", "rejected"].includes(
        status
      )
    ) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const interest =
      await Interest.findById(id);

    if (!interest) {
      return res.status(404).json({
        message: "Interest request not found",
      });
    }

    // Only seller can update
    if (
      interest.seller.toString() !==
      req.user.userId
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to update this request",
      });
    }

    interest.status = status;

    await interest.save();

    res.json({
      message: `Request ${status} successfully`,
      interest,
    });

  } catch (error) {
    console.error(
      "Update interest error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


module.exports = {
  createInterest,
  getSellerInterests,
  getBuyerInterests,
  updateInterestStatus,
};