/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function SchoolDetailPage() {
  const params = useParams();
  const router = useRouter();
  const schoolId = params.id as string;

  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const res = await fetch(`/api/schoolbase/results/${schoolId}`);
        const data = await res.json();

        if (res.ok) {
          setSchool(data.school);
        } else {
          setError(data.error || "Failed to load school");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load school");
      } finally {
        setLoading(false);
      }
    };

    if (schoolId) {
      fetchSchool();
    }
  }, [schoolId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-600">Loading school details...</p>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/schoolbase/results"
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to Results
          </Link>
        </div>
        <div className="p-8 bg-red-50 border border-red-200 rounded-lg text-red-900">
          ❌ School not found
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/schoolbase/results"
          className="text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          ← Back to Results
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-900">
          ❌ {error}
        </div>
      )}

      {/* School Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-8">
        {/* Header Section */}
        <div className="border-b border-gray-200 pb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{school.name}</h1>
              {school.location && (
                <p className="text-gray-600 mt-2">📍 {school.location}</p>
              )}
            </div>
            <div className="flex flex-col items-end gap-3">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {school.type}
              </span>
              {school.verified && (
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  ✓ Verified
                </span>
              )}
            </div>
          </div>

          {/* Lead Score */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Lead Quality Score</span>
              <span className="text-2xl font-bold text-blue-600">{school.leadScore}/100</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                style={{ width: `${school.leadScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {school.email && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <a href={`mailto:${school.email}`} className="text-blue-600 hover:underline font-medium">
                  {school.email}
                </a>
              </div>
            )}
            {school.phone && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Phone</p>
                <a href={`tel:${school.phone}`} className="text-blue-600 hover:underline font-medium">
                  {school.phone}
                </a>
              </div>
            )}
            {school.website && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Website</p>
                <a
                  href={school.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium break-all"
                >
                  Visit Website →
                </a>
              </div>
            )}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Added to Database</p>
              <p className="font-medium text-gray-900">
                {new Date(school.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">School Information</h2>
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <div>
              <p className="text-sm text-gray-600 mb-1">School Type</p>
              <p className="font-medium text-gray-900 capitalize">{school.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Verification Status</p>
              <p className="font-medium text-gray-900">
                {school.verified ? "✓ Verified" : "Pending Verification"}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 pt-8 flex gap-3">
          {school.email && (
            <a
              href={`mailto:${school.email}`}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              📧 Send Email
            </a>
          )}
          <button
            onClick={() => router.back()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
