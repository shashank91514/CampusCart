import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // ===============================
  // Logout
  // ===============================

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-[73px] max-w-7xl items-center justify-between px-6">

        {/* ===============================
            Logo
        =============================== */}

        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl">
            🛒
          </div>

          <span className="text-xl font-bold text-gray-900">
            Campus<span className="text-blue-600">Cart</span>
          </span>
        </Link>


        {/* ===============================
            Navigation
        =============================== */}

        <div className="hidden items-center gap-5 md:flex">

          {/* Home */}

          <Link
            to="/"
            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            Home
          </Link>


          {/* Products */}

          <Link
            to="/products"
            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            Products
          </Link>


          {/* Logged-in Navigation */}

          {user && (
            <>

              {/* Sell Item */}

              <Link
                to="/add-product"
                className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
              >
                Sell Item
              </Link>


              {/* My Products */}

              <Link
                to="/my-products"
                className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
              >
                My Products
              </Link>


              {/* Seller Requests */}

              <Link
                to="/seller-requests"
                className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
              >
                Requests
              </Link>


              {/* My Requests */}

              <Link
                to="/my-requests"
                className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
              >
                My Requests
              </Link>


              {/* Wishlist */}

              <Link
                to="/wishlist"
                className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
              >
                Wishlist
              </Link>

            </>
          )}

        </div>


        {/* ===============================
            Right Side
        =============================== */}

        <div className="flex items-center gap-3">

          {/* ===============================
              Logged Out
          =============================== */}

          {!user ? (
            <>

              {/* Login */}

              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Login
              </Link>


              {/* Register */}

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Register
              </Link>

            </>
          ) : (

            /* ===============================
               Logged In
            =============================== */

            <>

              {/* Profile */}

              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-gray-100"
              >

                {/* Avatar */}

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                  {user.name
                    ?.charAt(0)
                    .toUpperCase()}
                </div>


                {/* Name */}

                <span className="hidden text-sm font-semibold text-gray-700 sm:block">
                  {user.name}
                </span>

              </Link>


              {/* Logout */}

              <button
                onClick={handleLogout}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
              >
                Logout
              </button>

            </>

          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;