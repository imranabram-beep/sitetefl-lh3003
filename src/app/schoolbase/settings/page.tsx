/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Settings {
  geonamesUsername: string;
  enableOverpassAPI: boolean;
  overpassAPIUrl: string;
  maxSearchRadius: number;
  emailVerificationService: "smtp" | "clearout" | "zerobounce" | "mailgun";
  enableWebScraping: boolean;
  scrapingRateLimit: number;
  verificationBatchSize: number;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    geonamesUsername: "",
    enableOverpassAPI: true,
    overpassAPIUrl: "https://overpass-api.de/api/interpreter",
    maxSearchRadius: 50,
    emailVerificationService: "smtp",
    enableWebScraping: true,
    scrapingRateLimit: 0.5,
    verificationBatchSize: 50,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/schoolbase/settings");
        const data = await res.json();
        if (data.settings) {
          setSettings(data.settings);
        }
      } catch (err) {
        console.error("Failed to fetch settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings({
      ...settings,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? parseFloat(value)
          : value,
    });
    setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/schoolbase/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("✓ Settings saved successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error || "Failed to save settings");
      }
    } catch (err: any) {
      setError(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 py-8">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Configure SchoolBase features and integrations</p>
        </div>
        <Link
          href="/schoolbase"
          className="text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-8">
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

        {/* Location Services */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">📍 Location Services</h2>

          <div className="space-y-6">
            {/* GeoNames */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                GeoNames Username
              </label>
              <input
                type="text"
                name="geonamesUsername"
                value={settings.geonamesUsername}
                onChange={handleChange}
                placeholder="Enter your GeoNames username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-600 mt-2">
                Get a free account at{" "}
                <a href="https://www.geonames.org/login" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  geonames.org
                </a>
              </p>
            </div>

            {/* Overpass API */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="enableOverpassAPI"
                  checked={settings.enableOverpassAPI}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="ml-3 font-medium text-gray-900">Enable Overpass API</span>
              </label>
              <p className="text-xs text-gray-600 mt-2">
                Use Overpass API to discover schools from OpenStreetMap data
              </p>
            </div>

            {settings.enableOverpassAPI && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Overpass API URL
                </label>
                <input
                  type="url"
                  name="overpassAPIUrl"
                  value={settings.overpassAPIUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Search Radius */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Max Search Radius (km)
              </label>
              <input
                type="number"
                name="maxSearchRadius"
                value={settings.maxSearchRadius}
                onChange={handleChange}
                min="1"
                max="200"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Verification Services */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">✓ Verification Services</h2>

          <div className="space-y-6">
            {/* Email Verification Service */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email Verification Service
              </label>
              <select
                name="emailVerificationService"
                value={settings.emailVerificationService}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="smtp">SMTP (Built-in)</option>
                <option value="clearout">Clearout</option>
                <option value="zerobounce">ZeroBounce</option>
                <option value="mailgun">Mailgun</option>
              </select>
              <p className="text-xs text-gray-600 mt-2">
                Choose the service for email verification
              </p>
            </div>

            {/* Batch Size */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Verification Batch Size
              </label>
              <input
                type="number"
                name="verificationBatchSize"
                value={settings.verificationBatchSize}
                onChange={handleChange}
                min="10"
                max="500"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-600 mt-2">
                Number of contacts to verify in each batch
              </p>
            </div>
          </div>
        </div>

        {/* Web Scraping */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">🕷️ Web Scraping</h2>

          <div className="space-y-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="enableWebScraping"
                checked={settings.enableWebScraping}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="ml-3 font-medium text-gray-900">Enable Web Scraping</span>
            </label>
            <p className="text-xs text-gray-600">
              Automatically scrape school websites to find contact information
            </p>

            {settings.enableWebScraping && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Scraping Rate Limit (requests per second)
                </label>
                <input
                  type="number"
                  name="scrapingRateLimit"
                  value={settings.scrapingRateLimit}
                  onChange={handleChange}
                  min="0.1"
                  max="5"
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-600 mt-2">
                  Lower values prevent server overload. Recommended: 0.5
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            {saving ? "Saving..." : "💾 Save Settings"}
          </button>
          <Link
            href="/schoolbase"
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
