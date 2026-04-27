"use client";

import { useState } from "react";
import Link from "next/link";

interface ExportOptions {
  dataType: "schools" | "campaigns" | "verification";
  format: "csv" | "json" | "xlsx";
  includeUnverified: boolean;
  includeEmails: boolean;
  includePhones: boolean;
  dateRange: "all" | "week" | "month" | "quarter";
}

export default function ExportPage() {
  const [options, setOptions] = useState<ExportOptions>({
    dataType: "schools",
    format: "csv",
    includeUnverified: false,
    includeEmails: true,
    includePhones: true,
    dateRange: "all",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setOptions({
      ...options,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
    setError("");
  };

  const handleExport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/schoolbase/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      });

      if (res.ok) {
        // Trigger download
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `schoolbase-export-${Date.now()}.${options.format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setSuccess("✓ Export completed successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to export data");
      }
    } catch (err: any) {
      setError(err.message || "Failed to export data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Export Data</h1>
          <p className="text-gray-600 mt-2">Export schools, campaigns, and verification data</p>
        </div>
        <Link
          href="/schoolbase"
          className="text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Export Form */}
      <form onSubmit={handleExport} className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-900">
            ❌ {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-900">
            {success}
          </div>
        )}

        {/* Data Type */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            What do you want to export? *
          </label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="dataType"
                value="schools"
                checked={options.dataType === "schools"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3 text-gray-700">
                <span className="font-medium">Schools</span>
                <p className="text-sm text-gray-600">All discovered schools with contact information</p>
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="dataType"
                value="campaigns"
                checked={options.dataType === "campaigns"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3 text-gray-700">
                <span className="font-medium">Campaigns</span>
                <p className="text-sm text-gray-600">Campaign history with performance metrics</p>
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="dataType"
                value="verification"
                checked={options.dataType === "verification"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3 text-gray-700">
                <span className="font-medium">Verification Results</span>
                <p className="text-sm text-gray-600">Contact verification status for all schools</p>
              </span>
            </label>
          </div>
        </div>

        {/* Export Format */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Export Format *
          </label>
          <select
            name="format"
            value={options.format}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="csv">CSV (Excel compatible)</option>
            <option value="json">JSON (For integration)</option>
            <option value="xlsx">XLSX (Excel)</option>
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Date Range
          </label>
          <select
            name="dateRange"
            value={options.dateRange}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Time</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
            <option value="quarter">Past Quarter</option>
          </select>
        </div>

        {/* Options */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-medium text-gray-900 mb-3">Include in Export</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="includeEmails"
                checked={options.includeEmails}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="ml-3 text-gray-700">Email Addresses</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="includePhones"
                checked={options.includePhones}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="ml-3 text-gray-700">Phone Numbers</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="includeUnverified"
                checked={options.includeUnverified}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="ml-3 text-gray-700">Include Unverified Contacts</span>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            {loading ? "Exporting..." : "📥 Export Data"}
          </button>
          <Link
            href="/schoolbase"
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">ℹ️ About Exports</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• Exports are generated on-demand and include the most current data</li>
          <li>• Large exports may take a moment to generate</li>
          <li>• Personal information (emails, phones) requires verification first</li>
          <li>• All exports are encrypted and secure</li>
        </ul>
      </div>
    </div>
  );
}
