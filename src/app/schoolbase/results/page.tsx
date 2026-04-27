"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface School {
  id: string;
  name: string;
  type: string;
  email?: string;
  phone?: string;
  website?: string;
  verified: boolean;
  leadScore: number;
  location?: string;
  createdAt: string;
}

export default function ResultsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("leadScore");

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch(`/api/schoolbase/results?type=${filter}&sort=${sortBy}`);
        const data = await res.json();

        if (Array.isArray(data.results)) {
          setSchools(data.results);
        } else {
          console.error("Invalid data:", data);
          setSchools([]);
        }
      } catch (error) {
        console.error("Failed to fetch results:", error);
        setSchools([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, [filter, sortBy]);

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(search.toLowerCase()) ||
    (school.email && school.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Discovered Schools</h1>
          <p className="text-gray-600 mt-2">Browse all schools discovered through SchoolBase ({schools.length} total)</p>
        </div>
        <Link
          href="/schoolbase"
          className="text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search by name or email..."
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
            <option value="school">Primary/Secondary</option>
            <option value="university">University</option>
            <option value="academy">Academy</option>
            <option value="college">College</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="leadScore">Lead Score (High to Low)</option>
            <option value="name">Name (A-Z)</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-gray-600">Loading schools...</div>
        ) : filteredSchools.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            No schools found. Try adjusting your search filters.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredSchools.map((school) => (
              <div
                key={school.id}
                className="p-6 hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{school.name}</h3>
                    {school.location && (
                      <p className="text-sm text-gray-600 mt-1">📍 {school.location}</p>
                    )}
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {school.type}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${school.leadScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-700">{school.leadScore}</span>
                    </div>
                    {school.verified && (
                      <span className="text-xs text-green-600 font-medium">✓ Verified</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
                  {school.email && (
                    <a href={`mailto:${school.email}`} className="hover:text-blue-600">
                      📧 {school.email}
                    </a>
                  )}
                  {school.phone && <span>📱 {school.phone}</span>}
                  {school.website && (
                    <a
                      href={school.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                    >
                      🌐 Website
                    </a>
                  )}
                  <span className="text-gray-500">Added {new Date(school.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/schoolbase/results/${school.id}`}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    View Details
                  </Link>
                  <button
                    className="text-purple-600 hover:underline text-sm font-medium"
                    onClick={() => {
                      // Add to campaign
                    }}
                  >
                    Add to Campaign
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
