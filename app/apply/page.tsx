"use client";


import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Apply() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      const { error } = await supabase.from("leads").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      ]);

      if (error) {
        alert("Something went wrong. Please try again.");
        console.error(error);
        setLoading(false);
        return;
      }

      const message = `Hello, I am ${formData.name}. My email is ${formData.email} and phone is ${formData.phone}. I want to apply for a loan.`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = "919229178350"; // your real number
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      window.location.href = whatsappURL;
    };
    return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Apply for Loan</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold disabled:bg-gray-500"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </main>
  );
}