"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [sendgridKey, setSendgridKey] = useState("");
  const [senderEmail, setSenderEmail] = useState("noreply@siteTeFL.com");
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sendgridKey, senderEmail }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure email services and system preferences</p>
      </div>

      {/* Email Service Settings */}
      <form onSubmit={handleSave} className="bg-white rounded-lg border border-gray-200 p-8 max-w-2xl">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Email Service</h2>

        <div className="space-y-6">
          {/* SendGrid API Key */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              SendGrid API Key
            </label>
            <input
              type="password"
              value={sendgridKey}
              onChange={(e) => setSendgridKey(e.target.value)}
              placeholder="SG.xxxxxxxxxxxxx"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-600 mt-2">
              Get your API key from{" "}
              <a
                href="https://app.sendgrid.com/settings/api_keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                SendGrid Dashboard
              </a>
            </p>
          </div>

          {/* Sender Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Sender Email Address
            </label>
            <input
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-600 mt-2">
              This email will appear in the "From" field of all emails
            </p>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Save Settings
            </button>
            {saved && <p className="text-green-600 text-sm">✓ Settings saved successfully</p>}
          </div>
        </div>
      </form>

      {/* Configuration Status */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-8">
        <h2 className="text-lg font-bold text-blue-900 mb-4">📋 Configuration Checklist</h2>
        <ul className="space-y-2 text-blue-900">
          <li className="flex items-center gap-2">
            <span className={sendgridKey ? "✓" : "○"}>✓</span>
            SendGrid API key configured
          </li>
          <li className="flex items-center gap-2">
            <span className={senderEmail ? "✓" : "○"}>✓</span>
            Sender email configured
          </li>
          <li className="flex items-center gap-2">
            <span>○</span>
            Database connected (Supabase)
          </li>
        </ul>
      </div>
    </div>
  );
}
