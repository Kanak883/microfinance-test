"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] flex items-center">
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div>
          <p className="text-sm tracking-widest text-gray-500 mb-6">
            TIRUPATI BALAJI MICROFINANCE
          </p>

          <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-black mb-6">
            Trusted financial solutions
            <br />
            for your growing business.
          </h1>

          <p className="text-gray-600 text-lg max-w-lg mb-8">
            We provide secure and transparent loan services designed to help
            individuals and small businesses achieve financial stability.
          </p>

          <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition">
            Coming Soon
          </button>
        </div>

        {/* Right Abstract Shape */}
        <div className="relative flex justify-center md:justify-end">
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 blur-3xl opacity-70" />
        </div>

      </section>
    </main>
  );
}