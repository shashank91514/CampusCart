import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
            👤
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            Login Required
          </h2>

          <p className="mt-2 text-gray-500">
            Please login to view your profile.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  const initial =
    user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50">

      {/* =========================================
          PROFILE HERO
      ========================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700">

        {/* Decorative circles */}

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-white/10" />

        <div className="absolute right-1/3 top-10 h-20 w-20 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-6xl px-6 py-14">

          <div className="flex flex-col items-center gap-7 sm:flex-row">

            {/* Avatar */}

            <div className="relative">

              <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white/30 bg-white text-5xl font-bold text-blue-600 shadow-2xl">
                {initial}
              </div>

              {/* Online indicator */}

              <span className="absolute bottom-2 right-2 h-6 w-6 rounded-full border-4 border-blue-600 bg-green-400" />

            </div>


            {/* User information */}

            <div className="text-center text-white sm:text-left">

              <div className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-blue-100 backdrop-blur-sm">
                ✨ CampusCart Member
              </div>

              <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {user.name}
              </h1>

              <p className="mt-2 text-blue-100">
                {user.email}
              </p>

              {user.college && (
                <div className="mt-3 flex items-center justify-center gap-2 text-sm text-blue-100 sm:justify-start">
                  <span>🎓</span>
                  <span>{user.college}</span>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <main className="mx-auto max-w-6xl px-6 py-10">

        <div className="grid gap-6 lg:grid-cols-3">


          {/* =====================================
              PERSONAL INFORMATION
          ===================================== */}

          <div className="lg:col-span-2">

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              {/* Header */}

              <div className="border-b border-gray-100 px-6 py-6">

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                    👤
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Personal Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Your CampusCart account details
                    </p>
                  </div>

                </div>

              </div>


              {/* Information */}

              <div className="grid gap-4 p-6 sm:grid-cols-2">

                {/* Name */}

                <div className="group rounded-xl border border-gray-100 bg-gray-50 p-5 transition hover:border-blue-200 hover:bg-blue-50">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                      👤
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Full Name
                      </p>

                      <p className="mt-1 font-semibold text-gray-900">
                        {user.name || "Not provided"}
                      </p>
                    </div>

                  </div>

                </div>


                {/* Email */}

                <div className="group rounded-xl border border-gray-100 bg-gray-50 p-5 transition hover:border-blue-200 hover:bg-blue-50">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                      ✉️
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Email Address
                      </p>

                      <p className="mt-1 truncate font-semibold text-gray-900">
                        {user.email || "Not provided"}
                      </p>

                    </div>

                  </div>

                </div>


                {/* College */}

                <div className="group rounded-xl border border-gray-100 bg-gray-50 p-5 transition hover:border-blue-200 hover:bg-blue-50">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                      🎓
                    </div>

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        College
                      </p>

                      <p className="mt-1 font-semibold text-gray-900">
                        {user.college || "Not provided"}
                      </p>

                    </div>

                  </div>

                </div>


                {/* Account Status */}

                <div className="group rounded-xl border border-gray-100 bg-gray-50 p-5 transition hover:border-green-200 hover:bg-green-50">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                      ✓
                    </div>

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Account Status
                      </p>

                      <div className="mt-1 flex items-center gap-2">

                        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                        <span className="font-semibold text-green-600">
                          Active
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* =====================================
                CAMPUSCART BANNER
            ===================================== */}

            <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-7 shadow-lg">

              <div className="relative z-10">

                <div className="max-w-xl">

                  <span className="text-3xl">
                    🛒
                  </span>

                  <h2 className="mt-3 text-2xl font-bold text-white">
                    Buy smart. Sell easy.
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    Find affordable products from students around your
                    campus or sell items you no longer need.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">

                    <Link
                      to="/products"
                      className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
                    >
                      Browse Products
                    </Link>

                    <Link
                      to="/add-product"
                      className="rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                    >
                      Sell an Item
                    </Link>

                  </div>

                </div>

              </div>

              {/* Decorative shape */}

              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />

              <div className="absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-white/5" />

            </div>

          </div>


          {/* =====================================
              QUICK ACTIONS
          ===================================== */}

          <div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="mb-6">

                <h2 className="text-xl font-bold text-gray-900">
                  Quick Actions
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage your CampusCart activity
                </p>

              </div>


              <div className="space-y-3">

                {/* My Products */}

                <Link
                  to="/my-products"
                  className="group flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                    📦
                  </div>

                  <div className="flex-1">

                    <p className="font-semibold text-gray-900">
                      My Products
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      Manage your listings
                    </p>

                  </div>

                  <span className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-600">
                    →
                  </span>

                </Link>


                {/* Wishlist */}

                <Link
                  to="/wishlist"
                  className="group flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 hover:shadow-sm"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-xl">
                    ❤️
                  </div>

                  <div className="flex-1">

                    <p className="font-semibold text-gray-900">
                      Wishlist
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      View saved products
                    </p>

                  </div>

                  <span className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-red-500">
                    →
                  </span>

                </Link>


                {/* My Requests */}

                <Link
                  to="/my-requests"
                  className="group flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition hover:-translate-y-0.5 hover:border-purple-200 hover:bg-purple-50 hover:shadow-sm"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-xl">
                    📩
                  </div>

                  <div className="flex-1">

                    <p className="font-semibold text-gray-900">
                      My Requests
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      Track your requests
                    </p>

                  </div>

                  <span className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-purple-600">
                    →
                  </span>

                </Link>


                {/* Seller Requests */}

                <Link
                  to="/seller-requests"
                  className="group flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition hover:-translate-y-0.5 hover:border-green-200 hover:bg-green-50 hover:shadow-sm"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl">
                    🤝
                  </div>

                  <div className="flex-1">

                    <p className="font-semibold text-gray-900">
                      Seller Requests
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      Manage buyer requests
                    </p>

                  </div>

                  <span className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-green-600">
                    →
                  </span>

                </Link>

              </div>

            </div>


            {/* Account card */}

            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                  🔒
                </div>

                <div>

                  <h3 className="font-semibold text-gray-900">
                    Your account is secure
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Your account information is protected.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Profile;