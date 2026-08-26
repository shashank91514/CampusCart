const Request = require("../models/Request");
const Product = require("../models/Product");

// ===============================
// Create Request
// ===============================
const createRequest = async (req, res) => {
  try {
    const { message } = req.body;

    const product = await Product.findById(
      req.params.productId
    );

    // Product doesn't exist
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // User cannot request own product
    if (
      product.seller.toString() ===
      req.user.userId
    ) {
      return res.status(400).json({
        message:
          "You cannot request your own product",
      });
    }

    // Check existing pending request
    const existingRequest =
      await Request.findOne({
        product: product._id,
        buyer: req.user.userId,
        status: "pending",
      });

    if (existingRequest) {
      return res.status(400).json({
        message:
          "You already have a pending request for this product",
      });
    }

    // Create request
    const request = await Request.create({
      product: product._id,
      buyer: req.user.userId,
      seller: product.seller,
      message,
    });

    const populatedRequest =
      await Request.findById(
        request._id
      )
        .populate(
          "product",
          "title price image"
        )
        .populate(
          "buyer",
          "name email college"
        )
        .populate(
          "seller",
          "name email college"
        );

    res.status(201).json({
      message:
        "Purchase request sent successfully",
      request: populatedRequest,
    });

  } catch (error) {
    console.error(
      "Create request error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ===============================
// Get My Requests
// ===============================
const getMyRequests = async (req, res) => {
  try {
    const requests =
      await Request.find({
        buyer: req.user.userId,
      })
        .populate(
          "product",
          "title price image category condition"
        )
        .populate(
          "seller",
          "name email college"
        )
        .sort({
          createdAt: -1,
        });

    res.json(requests);

  } catch (error) {
    console.error(
      "Get my requests error:",
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
const getSellerRequests = async (
  req,
  res
) => {
  try {
    const requests =
      await Request.find({
        seller: req.user.userId,
      })
        .populate(
          "product",
          "title price image category condition"
        )
        .populate(
          "buyer",
          "name email college"
        )
        .sort({
          createdAt: -1,
        });

    res.json(requests);

  } catch (error) {
    console.error(
      "Get seller requests error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ===============================
// Update Request Status
// ===============================
const updateRequestStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    if (
      !["accepted", "rejected"].includes(
        status
      )
    ) {
      return res.status(400).json({
        message:
          "Invalid request status",
      });
    }

    const request =
      await Request.findById(
        req.params.id
      );

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    // Only seller can accept/reject
    if (
      request.seller.toString() !==
      req.user.userId
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to update this request",
      });
    }

    request.status = status;

    await request.save();

    const updatedRequest =
      await Request.findById(
        request._id
      )
        .populate(
          "product",
          "title price image"
        )
        .populate(
          "buyer",
          "name email college"
        )
        .populate(
          "seller",
          "name email college"
        );

    res.json({
      message:
        `Request ${status} successfully`,
      request: updatedRequest,
    });

  } catch (error) {
    console.error(
      "Update request error:",
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
  createRequest,
  getMyRequests,
  getSellerRequests,
  updateRequestStatus,
};