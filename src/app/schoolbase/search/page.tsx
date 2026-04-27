"use client";

import { useState } from "react";
import Link from "next/link";

interface SearchFilters {
  country: string;
  region: string;
  city: string;
  schoolType: string;
  radius: number;
}

interface SearchResult {
  id: string;
  name: string;
  type: string;
  location: string;
  email?: string;
  phone?: string;
  verified: boolean;
  leadScore: number;
}

export default function SearchSchoolsPage() {
  const [filters, setFilters] = useState<SearchFilters>({
    country: "",
    region: "",
    city: "",
    schoolType: "all",
    radius: 50,
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: name === "radius" ? parseInt(value) : value,
    });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const queryParams = new URLSearchParams({
        country: filters.country,
        city: filters.city,
        region: filters.region,
        type: filters.schoolType,
        radius: filters.radius.toString(),
      });

      const res = await fetch(`/api/schoolbase/search?${queryParams}`);
      const data = await res.json();

      if (res.ok) {
        setResults(data.results || []);
      } else {
        setError(data.error || "Failed to search schools");
        setResults([]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to search schools");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Search Schools</h1>
          <p className="text-gray-600 mt-2">Find educational institutions by location and type</p>
        </div>
        <Link
          href="/schoolbase"
          className="text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-900 text-sm">
            💡 Tip: Leave fields empty to search all schools, or filter by city/school name and type
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Country (Optional)
            </label>
            <input
              type="text"
              name="country"
              value={filters.country}
              onChange={handleChange}
              placeholder="e.g., Thailand, Vietnam"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              City/School Name (Optional)
            </label>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleChange}
              placeholder="e.g., Bangkok, International"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Region/Province
            </label>
            <input
              type="text"
              name="region"
              value={filters.region}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* School Type */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              School Type
            </label>
            <select
              name="schoolType"
              value={filters.schoolType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="school">Primary/Secondary</option>
              <option value="university">University</option>
              <option value="academy">Academy</option>
              <option value="college">College</option>
            </select>
          </div>

          {/* Radius */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Search Radius (km)
            </label>
            <input
              type="number"
              name="radius"
              value={filters.radius}
              onChange={handleChange}
              min="1"
              max="100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-900">
            ❌ {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            {loading ? "Searching..." : "🔍 Search Schools"}
          </button>
          <button
            type="reset"
            onClick={() => {
              setFilters({
                country: "",
                region: "",
                city: "",
                schoolType: "all",
                radius: 50,
              });
              setResults([]);
              setSearched(false);
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Results */}
      {searched && (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Results {results.length > 0 && `(${results.length})`}
          </h2>

          {results.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              {loading ? "Searching..." : "No schools found. Try adjusting your filters."}
            </p>
          ) : (
            <div className="space-y-4">
              {results.map((school) => (
                <Link
                  key={school.id}
                  href={`/schoolbase/results/${school.id}`}
                  className="block border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 hover:text-blue-600">{school.name}</h3>
                      <p className="text-sm text-gray-600">📍 {school.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {school.type}
                      </span>
                      {school.verified && (
                        <span className="block text-xs text-green-600 mt-2">✓ Verified</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                    {school.email && <span>📧 {school.email}</span>}
                    {school.phone && <span>📱 {school.phone}</span>}
                    <span>Lead Score: {school.leadScore}/100</span>
                  </div>
                  <div className="mt-3 text-xs text-blue-600 font-medium">
                    View Details →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
