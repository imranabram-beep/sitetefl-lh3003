"use client";

import { useState } from "react";
import Link from "next/link";

interface CampaignFormData {
  name: string;
  subject: string;
  body: string;
  schoolIds: string[];
  scheduleDate: string;
  scheduleTime: string;
}

export default function NewCampaignPage() {
  const [formData, setFormData] = useState<CampaignFormData>({
    name: "",
    subject: "",
    body: "",
    schoolIds: [],
    scheduleDate: "",
    scheduleTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.name.trim()) {
      setError("Campaign name is required");
      setLoading(false);
      return;
    }
    if (!formData.subject.trim()) {
      setError("Email subject is required");
      setLoading(false);
      return;
    }
    if (!formData.body.trim()) {
      setError("Email body is required");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/schoolbase/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          subject: formData.subject,
          body: formData.body,
          schoolIds: formData.schoolIds.length > 0 ? formData.schoolIds : undefined,
          scheduledAt: formData.scheduleDate && formData.scheduleTime
            ? new Date(`${formData.scheduleDate}T${formData.scheduleTime}`).toISOString()
            : null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("✓ Campaign created successfully!");
        setTimeout(() => {
          window.location.href = `/schoolbase/campaigns/${data.campaign.id}`;
        }, 1500);
      } else {
        setError(data.error || "Failed to create campaign");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Campaign</h1>
          <p className="text-gray-600 mt-2">Set up a new outreach campaign to schools</p>
        </div>
        <Link
          href="/schoolbase/campaigns"
          className="text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          ← Back to Campaigns
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
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

        {/* Campaign Name */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Campaign Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Thailand School Outreach Q2 2026"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Email Subject *
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g., Teach English in Thailand - TEFL Opportunities"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email Body */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Email Body *
          </label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Write your email message here. Include {{school_name}} for personalization."
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-600 mt-2">
            💡 Tip: Use {{school_name}}, {{email}}, {{phone}} for dynamic fields
          </p>
        </div>

        {/* Scheduling */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Schedule (Optional)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Send Date
              </label>
              <input
                type="date"
                name="scheduleDate"
                value={formData.scheduleDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Send Time
              </label>
              <input
                type="time"
                name="scheduleTime"
                value={formData.scheduleTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Leave blank to create as draft. You can schedule it later.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">ℹ️ About Campaigns</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Campaigns are created as drafts unless scheduled</li>
            <li>• You can add schools to the campaign after creation</li>
            <li>• Email preview available before sending</li>
            <li>• Track opens, clicks, and bounces automatically</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            {loading ? "Creating..." : "📧 Create Campaign"}
          </button>
          <Link
            href="/schoolbase/campaigns"
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
