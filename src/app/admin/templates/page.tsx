"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Template {
  id: string;
  name: string;
  subject: string;
  variables: string[];
  created_at: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch("/api/admin/templates");
        const data = await res.json();
        setTemplates(data);
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Email Templates</h1>
          <p className="text-gray-600 mt-2">Create and manage reusable email templates</p>
        </div>
        <Link
          href="/admin/templates/new"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
        >
          ➕ New Template
        </Link>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-600">Loading templates...</div>
        ) : templates.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-600">
            No templates yet. <Link href="/admin/templates/new" className="text-blue-600 hover:underline">Create your first one</Link>
          </div>
        ) : (
          templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-4 truncate">{template.subject}</p>

              {template.variables.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Variables:</p>
                  <div className="flex flex-wrap gap-2">
                    {template.variables.map((variable) => (
                      <span
                        key={variable}
                        className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                      >
                        {variable}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500 mb-4">
                Created {new Date(template.created_at).toLocaleDateString()}
              </p>

              <div className="flex gap-2">
                <Link
                  href={`/admin/templates/${template.id}/edit`}
                  className="flex-1 text-center bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 px-4 rounded transition-colors text-sm"
                >
                  Edit
                </Link>
                <button
                  className="flex-1 text-center bg-red-50 text-red-600 hover:bg-red-100 py-2 px-4 rounded transition-colors text-sm"
                  onClick={() => {
                    if (confirm("Delete this template?")) {
                      // Handle delete
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
