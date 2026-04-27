"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Contact {
  id: string;
  email: string;
  name: string;
  type: string;
  country?: string;
  website?: string;
  notes?: string;
  created_at: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(`/api/admin/contacts?type=${filter}`);
        const data = await res.json();

        // Ensure data is an array
        if (Array.isArray(data)) {
          setContacts(data);
        } else {
          console.error("API returned invalid data:", data);
          setContacts([]);
        }
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [filter]);

  const filteredContacts = contacts.filter((contact) =>
    contact.email.toLowerCase().includes(search.toLowerCase()) ||
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600 mt-2">Manage schools, academies, and teachers</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/contacts/new"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            ➕ Add Contact
          </Link>
          <Link
            href="/admin/contacts/import"
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            📤 Import CSV
          </Link>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="flex gap-4 flex-col md:flex-row">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by email or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="school">Schools</option>
            <option value="academy">Academies</option>
            <option value="teacher">Teachers</option>
          </select>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {loading ? (
          <div className="p-8 text-center text-gray-600">Loading contacts...</div>
        ) : filteredContacts.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            No contacts found. <Link href="/admin/contacts/new" className="text-blue-600 hover:underline">Add one now</Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray-900">Email</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-900">Name</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-900">Type</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-900">Country</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-900">Date Added</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{contact.email}</td>
                  <td className="px-6 py-4 text-gray-900">{contact.name}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {contact.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{contact.country || "—"}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(contact.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/admin/contacts/${contact.id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      className="text-red-600 hover:underline text-sm"
                      onClick={() => {
                        if (confirm("Delete this contact?")) {
                          // Handle delete
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
