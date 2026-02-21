"use client";

import { useEffect, useState } from "react";


interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

export default function AdminPage() {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(false);

    const ADMIN_PASSWORD = "admin123"; // change this later

    const handleLogin = () => {
      if (password === ADMIN_PASSWORD) {
        setAuthenticated(true);
        fetchLeads();
      } else {
        alert("Incorrect password");
      }
    };

    const fetchLeads = async () => {
      setLoading(true);
    
      try {
        const response = await fetch("/api/leads");
    
        if (!response.ok) {
          throw new Error("Failed to fetch leads");
        }
    
        const data = await response.json();
        setLeads(data);
      } catch (error) {
        console.error(error);
        alert("Error fetching leads");
      }
  
      setLoading(false);
    }; 
    if (!authenticated) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
          <div className="bg-gray-800 p-6 rounded space-y-4">
            <h2 className="text-xl font-bold">Admin Login</h2>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded bg-gray-700 w-full"
            />
            <button
              onClick={handleLogin}
              className="bg-blue-600 px-4 py-2 rounded"
            >
              Login
            </button>
          </div>
        </main>
      );
    }

    return (
      <main className="min-h-screen bg-gray-950 text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>    
        {loading ? (
          <p>Loading leads...</p>
        ) : (
          <table className="w-full border border-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3 border border-gray-700">Name</th>
                <th className="p-3 border border-gray-700">Email</th>
                <th className="p-3 border border-gray-700">Phone</th>
                <th className="p-3 border border-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="text-center">
                  <td className="p-2 border border-gray-700">{lead.name}</td>
                  <td className="p-2 border border-gray-700">{lead.email}</td>
                  <td className="p-2 border border-gray-700">{lead.phone}</td>
                  <td className="p-2 border border-gray-700">
                    {new Date(lead.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    );
}