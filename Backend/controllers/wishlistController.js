const User = require("../models/User");

// Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const productId = req.params.productId;

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({
        message: "Product already in wishlist",
      });
    }

    user.wishlist.push(productId);

    await user.save();

    res.json({
      message: "Product added to wishlist",
    });
  } catch (error) {
    console.error("Add wishlist error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== req.params.productId
    );

    await user.save();

    res.json({
      message: "Product removed from wishlist",
    });
  } catch (error) {
    console.error("Remove wishlist error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// Get wishlist
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate({
        path: "wishlist",
        populate: {
          path: "seller",
          select: "name email college",
        },
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user.wishlist);
  } catch (error) {
    console.error("Get wishlist error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};