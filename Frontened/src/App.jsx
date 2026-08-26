import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import EditProduct from "./pages/EditProduct";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import MyRequests from "./pages/MyRequests";
import SellerRequests from "./pages/SellerRequests";
import InterestRequests from "./pages/InterestRequests";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/products" element={<Products />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        {/* ================= PROTECTED ROUTES ================= */}

        <Route element={<ProtectedRoute />}>

          {/* Add Product */}
          <Route
            path="/add-product"
            element={<AddProduct />}
          />

          {/* My Products */}
          <Route
            path="/my-products"
            element={<MyProducts />}
          />

          {/* Edit Product */}
          <Route
            path="/edit-product/:id"
            element={<EditProduct />}
          />

          {/* Seller Requests */}
          <Route
            path="/seller-requests"
            element={<SellerRequests />}
          />

          {/* Buyer Requests */}
          <Route
            path="/my-requests"
            element={<MyRequests />}
          />

          {/* Interest Requests */}
          <Route
            path="/interest-requests"
            element={<InterestRequests />}
          />

          {/* Wishlist */}
          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={<Profile />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;