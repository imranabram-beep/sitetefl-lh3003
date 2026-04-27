"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewTemplatePage() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          window.location.href = "/admin/templates";
        }, 1500);
      }
    } catch (error) {
      console.error("Failed to create template:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Email Template</h1>
          <p className="text-gray-600 mt-2">Design a reusable email template for your campaigns</p>
        </div>
        <Link
          href="/admin/templates"
          className="text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          ← Back to Templates
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="space-y-6">
          {/* Template Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Template Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Welcome Email"
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
              placeholder="e.g., Welcome to {{company_name}}!"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Use {{variable}} for dynamic content</p>
          </div>

          {/* Email Content */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              placeholder="Enter your email HTML content here..."
              rows={12}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Supports HTML. Use {{variable}} for dynamic content like {{recipient_name}}, {{company_name}}
            </p>
          </div>

          {/* Quick Variables Reference */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">🔤 Available Variables</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
              <div><code className="bg-blue-100 px-2 py-1 rounded">{{recipient_name}}</code> - Contact name</div>
              <div><code className="bg-blue-100 px-2 py-1 rounded">{{recipient_email}}</code> - Contact email</div>
              <div><code className="bg-blue-100 px-2 py-1 rounded">{{company_name}}</code> - Your company</div>
              <div><code className="bg-blue-100 px-2 py-1 rounded">{{custom_field}}</code> - Any custom field</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              {loading ? "Creating..." : "Create Template"}
            </button>
            <Link
              href="/admin/templates"
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Cancel
            </Link>
          </div>

          {submitted && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-900">
              ✓ Template created successfully! Redirecting...
            </div>
          )}
        </div>
      </form>

      {/* Template Example */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-3">📋 Example Template</h3>
        <code className="block text-xs bg-white border border-gray-300 rounded p-4 overflow-x-auto font-mono text-gray-700">
          {`<html>
  <body style="font-family: Arial, sans-serif;">
    <h1>Welcome {{recipient_name}}!</h1>
    <p>Thank you for joining siteTeFL.</p>
    <p>Check out our latest courses at our website.</p>
    <a href="https://sitetefl.com" style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none;">View Courses</a>
  </body>
</html>`}
        </code>
      </div>
    </div>
  );
}
