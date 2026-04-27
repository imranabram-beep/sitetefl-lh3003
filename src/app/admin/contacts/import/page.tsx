"use client";

import { useState } from "react";
import Link from "next/link";

export default function ImportContactsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: number; error?: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/contacts/import", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
      if (res.ok) {
        setFile(null);
      }
    } catch (error) {
      setResult({ error: "Failed to import contacts" });
      console.error("Import error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Import Contacts</h1>
          <p className="text-gray-600 mt-2">Upload a CSV file to import multiple contacts at once</p>
        </div>
        <Link
          href="/admin/contacts"
          className="text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          ← Back to Contacts
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
        {/* CSV Format Guide */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">📋 CSV Format</h3>
          <p className="text-sm text-blue-800 mb-3">Your CSV file should have these columns:</p>
          <code className="block bg-blue-100 rounded p-2 text-sm text-blue-900 font-mono overflow-x-auto">
            name,email,type,country,website,notes
          </code>
          <p className="text-xs text-blue-700 mt-2">Required: name, email, type</p>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Select CSV File *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="csv-input"
            />
            <label htmlFor="csv-input" className="cursor-pointer">
              <div className="text-gray-600">
                {file ? (
                  <>
                    <p className="font-semibold text-gray-900">{file.name}</p>
                    <p className="text-sm">{(file.size / 1024).toFixed(2)} KB</p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-gray-900">📤 Click to upload CSV</p>
                    <p className="text-sm">or drag and drop</p>
                  </>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={!file || loading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            {loading ? "Importing..." : "Import Contacts"}
          </button>
          <Link
            href="/admin/contacts"
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Cancel
          </Link>
        </div>

        {/* Results */}
        {result && (
          <div
            className={`p-4 rounded-lg border ${
              result.success
                ? "bg-green-50 border-green-200 text-green-900"
                : "bg-red-50 border-red-200 text-red-900"
            }`}
          >
            {result.success ? (
              <>
                <p className="font-semibold">✓ Import successful!</p>
                <p className="text-sm mt-1">{result.success} contacts imported</p>
              </>
            ) : (
              <>
                <p className="font-semibold">✕ Import failed</p>
                <p className="text-sm mt-1">{result.error}</p>
              </>
            )}
          </div>
        )}
      </form>

      {/* Example CSV */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-3">📝 Example CSV</h3>
        <code className="block text-xs bg-white border border-gray-300 rounded p-4 overflow-x-auto font-mono text-gray-700">
          {`name,email,type,country,website,notes
ABC School,contact@abc.com,school,Thailand,https://abc.com,Main school
XYZ Academy,hello@xyz.edu,academy,Vietnam,,Online academy
John Teacher,john@email.com,teacher,Cambodia,,Individual teacher`}
        </code>
      </div>
    </div>
  );
}
