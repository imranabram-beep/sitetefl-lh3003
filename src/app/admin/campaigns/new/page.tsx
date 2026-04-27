"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewCampaignPage() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    template_id: "",
    recipient_type: "all",
    scheduled_at: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          // Redirect to campaigns list
          window.location.href = "/admin/campaigns";
        }, 1500);
      }
    } catch (error) {
      console.error("Failed to create campaign:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Campaign</h1>
          <p className="text-gray-600 mt-2">Set up a new email campaign to your contacts</p>
        </div>
        <Link
          href="/admin/campaigns"
          className="text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          ← Back to Campaigns
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="space-y-6">
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
              required
              placeholder="e.g., Spring Promotion 2025"
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
              required
              placeholder="e.g., Don't miss our spring courses!"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">This will be the subject line of your email</p>
          </div>

          {/* Email Template */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email Template *
            </label>
            <select
              name="template_id"
              value={formData.template_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a template...</option>
              <option value="1">Welcome Email Template</option>
              <option value="2">Course Promotion Template</option>
              <option value="3">Newsletter Template</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Create templates in{" "}
              <Link href="/admin/templates" className="text-blue-600 hover:underline">
                Email Templates
              </Link>
            </p>
          </div>

          {/* Recipients */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Send To *
            </label>
            <select
              name="recipient_type"
              value={formData.recipient_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Contacts</option>
              <option value="schools">Schools Only</option>
              <option value="academies">Academies Only</option>
              <option value="teachers">Teachers Only</option>
            </select>
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Schedule Send Time (Optional)
            </label>
            <input
              type="datetime-local"
              name="scheduled_at"
              value={formData.scheduled_at}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty to send immediately</p>
          </div>

          {/* Preview Box */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">📧 Email Preview</h3>
            <div className="bg-white border border-gray-300 rounded p-4">
              <p className="text-xs text-gray-500">From: noreply@siteTeFL.com</p>
              <p className="text-xs text-gray-500 mb-3">Subject: {formData.subject || "(empty)"}</p>
              <hr className="my-3" />
              <p className="text-sm text-gray-600">Email content will appear here based on selected template</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              {loading ? "Creating..." : "Create Campaign"}
            </button>
            <Link
              href="/admin/campaigns"
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Cancel
            </Link>
          </div>

          {submitted && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-900">
              ✓ Campaign created successfully! Redirecting...
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
