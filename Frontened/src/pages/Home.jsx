import { Link } from "react-router-dom";

function Home() {
  const categories = [
    {
      name: "Books",
      value: "books",
      icon: "📚",
      description: "Textbooks & study material",
    },
    {
      name: "Electronics",
      value: "electronics",
      icon: "💻",
      description: "Laptops, gadgets & more",
    },
    {
      name: "Furniture",
      value: "furniture",
      icon: "🪑",
      description: "Chairs, tables & essentials",
    },
    {
      name: "Clothing",
      value: "clothing",
      icon: "👕",
      description: "Campus fashion & accessories",
    },
    {
      name: "Stationery",
      value: "stationery",
      icon: "✏️",
      description: "Notes, pens & supplies",
    },
    {
      name: "All Items",
      value: "",
      icon: "🛍️",
      description: "Explore everything",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================================
          HERO SECTION
      ================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">

        {/* Decorative circles */}

        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />

        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">

          <div className="grid items-center gap-12 md:grid-cols-2">

            {/* Hero Content */}

            <div className="text-white">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                🎓 Built for Students
              </div>

              <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Buy, Sell & Connect
                <span className="block text-blue-200">
                  on Campus
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-blue-100 sm:text-lg">
                Find affordable products from students around you.
                Sell things you no longer need and discover great
                deals without leaving your campus community.
              </p>

              {/* Buttons */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <Link
                  to="/products"
                  className="rounded-xl bg-white px-6 py-3.5 text-center font-bold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
                >
                  Browse Products →
                </Link>

                <Link
                  to="/add-product"
                  className="rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-center font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  Sell an Item
                </Link>

              </div>

              {/* Trust indicators */}

              <div className="mt-10 flex flex-wrap gap-6 text-sm text-blue-100">

                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                    ✓
                  </span>
                  Student-focused
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                    ✓
                  </span>
                  Easy to use
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                    ✓
                  </span>
                  Local marketplace
                </div>

              </div>

            </div>


            {/* Hero Visual */}

            <div className="hidden md:block">

              <div className="relative mx-auto max-w-md">

                {/* Main Card */}

                <div className="rounded-3xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md">

                  <div className="rounded-2xl bg-white p-5">

                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-xs font-medium text-gray-400">
                          CAMPUS MARKETPLACE
                        </p>

                        <h3 className="mt-1 text-xl font-bold text-gray-900">
                          Popular Finds
                        </h3>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">
                        🛒
                      </div>

                    </div>

                    <div className="mt-5 space-y-3">

                      <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                          📚
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            Engineering Books
                          </p>

                          <p className="text-xs text-gray-500">
                            Used · Good condition
                          </p>
                        </div>

                        <span className="font-bold text-blue-600">
                          ₹200
                        </span>
                      </div>


                      <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                          💻
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            Laptop
                          </p>

                          <p className="text-xs text-gray-500">
                            Used · Excellent
                          </p>
                        </div>

                        <span className="font-bold text-blue-600">
                          ₹25K
                        </span>
                      </div>


                      <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl">
                          🪑
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            Study Table
                          </p>

                          <p className="text-xs text-gray-500">
                            Used · Good condition
                          </p>
                        </div>

                        <span className="font-bold text-blue-600">
                          ₹800
                        </span>
                      </div>

                    </div>

                  </div>

                </div>

                {/* Floating Badge */}

                <div className="absolute -bottom-5 -left-6 rounded-2xl bg-white px-5 py-4 shadow-xl">
                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-lg">
                      ❤️
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Trusted by students
                      </p>

                      <p className="font-bold text-gray-900">
                        Buy smarter
                      </p>
                    </div>

                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================
          CATEGORIES
      ================================= */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

          <div>

            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Browse Categories
            </h2>

            <p className="mt-2 text-gray-500">
              Find exactly what you're looking for.
            </p>

          </div>

          <Link
            to="/products"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all products →
          </Link>

        </div>


        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">

          {categories.map((category) => (

            <Link
              key={category.name}
              to={
                category.value
                  ? `/products?category=${category.value}`
                  : "/products"
              }
              className="group rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-4xl transition group-hover:scale-110 group-hover:bg-blue-50">
                {category.icon}
              </div>

              <h3 className="mt-4 font-bold text-gray-900">
                {category.name}
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                {category.description}
              </p>

            </Link>

          ))}

        </div>

      </section>


      {/* ================================
          HOW IT WORKS
      ================================= */}

      <section className="border-y border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Simple & Fast
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              How CampusCart Works
            </h2>

            <p className="mt-3 text-gray-500">
              Buying and selling on campus doesn't need to be complicated.
            </p>

          </div>


          <div className="mt-12 grid gap-8 md:grid-cols-3">

            {/* Step 1 */}

            <div className="relative text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                🔍
              </div>

              <div className="mt-5">

                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Step 01
                </span>

                <h3 className="mt-2 text-lg font-bold text-gray-900">
                  Find What You Need
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Browse products and categories to discover
                  affordable items from fellow students.
                </p>

              </div>

            </div>


            {/* Step 2 */}

            <div className="relative text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
                💬
              </div>

              <div className="mt-5">

                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Step 02
                </span>

                <h3 className="mt-2 text-lg font-bold text-gray-900">
                  Show Interest
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Send an interest request to the seller and
                  connect with them directly.
                </p>

              </div>

            </div>


            {/* Step 3 */}

            <div className="relative text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                🤝
              </div>

              <div className="mt-5">

                <span className="text-xs font-bold uppercase tracking-wider text-green-600">
                  Step 03
                </span>

                <h3 className="mt-2 text-lg font-bold text-gray-900">
                  Make the Deal
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Connect with the seller and complete your
                  campus transaction.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================
          SELL CTA
      ================================= */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-blue-900 px-8 py-12 shadow-xl md:px-14">

          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

            <div className="max-w-2xl">

              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-200">
                Have something you don't need?
              </span>

              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                Turn your unused stuff into cash.
              </h2>

              <p className="mt-3 max-w-xl text-blue-100">
                List your books, electronics, furniture and more.
                Connect with students looking for exactly what you have.
              </p>

            </div>

            <Link
              to="/add-product"
              className="shrink-0 rounded-xl bg-white px-7 py-3.5 font-bold text-gray-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Start Selling →
            </Link>

          </div>

        </div>

      </section>


      {/* ================================
          FOOTER
      ================================= */}

      <footer className="border-t border-gray-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg">
              🛒
            </div>

            <span className="font-bold text-gray-900">
              Campus<span className="text-blue-600">Cart</span>
            </span>

          </div>

          <p className="text-sm text-gray-500">
            Built for students, by students.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;