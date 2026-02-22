"use client";

import { useState } from "react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const ADMIN_PASSWORD = "admin123";

  const handleLogin = async () => {
    if (password !== ADMIN_PASSWORD) {
      alert("Incorrect password");
      return;
    }

    setAuthenticated(true);
    await fetchLeads();
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

  const getStatusStyle = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-600 text-white";
    case "contacted":
      return "bg-blue-600 text-white";
    case "rejected":
      return "bg-red-600 text-white";
    case "follow-up":
      return "bg-yellow-500 text-black";
    default:
      return "bg-gray-600 text-white"; // new
  }
};
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
              <th className="p-3 border border-gray-700">Status</th>
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
                  <select
                    value={lead.status}
                    onChange={async (e) => {
                      const newStatus = e.target.value;
                    
                      try {
                        const res = await fetch(`/api/leads/${lead.id}`, {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ status: newStatus }),
                        });
                      
                        if (!res.ok) {
                          throw new Error("Failed to update status");
                        }
                      
                        // Update UI immediately
                        setLeads((prev) =>
                          prev.map((l) =>
                            l.id === lead.id ? { ...l, status: newStatus } : l
                          )
                        );
                      } catch (err) {
                        alert("Error updating status");
                      }
                    }}
                    className={`p-1 rounded ${getStatusStyle(lead.status)}`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="follow-up">Follow-up</option>
                  </select>
                </td>
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