"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface UnverifiedSchool {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  notes?: string;
}

interface VerificationStatus {
  id: string;
  schoolId: string;
  schoolName: string;
  emailStatus: "pending" | "verified" | "invalid" | "bounced";
  phoneStatus: "pending" | "verified" | "invalid";
  websiteStatus: "pending" | "verified" | "invalid";
  lastCheckedAt?: string;
}

export default function VerificationPage() {
  const [unverified, setUnverified] = useState<UnverifiedSchool[]>([]);
  const [verified, setVerified] = useState<VerificationStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"pending" | "verified">("pending");
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const fetchVerifications = async () => {
      try {
        const res = await fetch(`/api/schoolbase/verification?status=${activeTab}`);
        const data = await res.json();

        if (activeTab === "pending") {
          setUnverified(data.unverified || []);
        } else {
          setVerified(data.verified || []);
        }
      } catch (error) {
        console.error("Failed to fetch verifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerifications();
  }, [activeTab]);

  const handleVerify = async (schoolId: string) => {
    setVerifying(true);
    try {
      const res = await fetch(`/api/schoolbase/verification/${schoolId}`, {
        method: "POST",
      });

      if (res.ok) {
        // Remove from unverified list
        setUnverified(unverified.filter((s) => s.id !== schoolId));
      }
    } catch (error) {
      console.error("Failed to verify school:", error);
    } finally {
      setVerifying(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: "bg-yellow-100 text-yellow-800",
      verified: "bg-green-100 text-green-800",
      invalid: "bg-red-100 text-red-800",
      bounced: "bg-red-100 text-red-800",
    };
    return statusMap[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Verification</h1>
          <p className="text-gray-600 mt-2">Verify email addresses, phone numbers, and websites</p>
        </div>
        <Link
          href="/schoolbase"
          className="text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("pending")}
          className={`py-3 px-4 font-medium border-b-2 transition-colors ${
            activeTab === "pending"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Pending Verification ({unverified.length})
        </button>
        <button
          onClick={() => setActiveTab("verified")}
          className={`py-3 px-4 font-medium border-b-2 transition-colors ${
            activeTab === "verified"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Verified ({verified.length})
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : activeTab === "pending" && unverified.length === 0 ? (
          <div className="text-center text-gray-600 py-8">
            No schools pending verification. Great job!
          </div>
        ) : activeTab === "verified" && verified.length === 0 ? (
          <div className="text-center text-gray-600 py-8">
            No verified schools yet.
          </div>
        ) : activeTab === "pending" ? (
          <div className="space-y-4">
            {unverified.map((school) => (
              <div
                key={school.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{school.name}</h3>
                    {school.location && (
                      <p className="text-sm text-gray-600">📍 {school.location}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-sm">
                  {school.email && (
                    <div className="p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">📧 Email</span>
                      <p className="font-mono text-sm mt-1">{school.email}</p>
                    </div>
                  )}
                  {school.phone && (
                    <div className="p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">📱 Phone</span>
                      <p className="font-mono text-sm mt-1">{school.phone}</p>
                    </div>
                  )}
                  {school.website && (
                    <div className="p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">🌐 Website</span>
                      <p className="font-mono text-sm mt-1 truncate">{school.website}</p>
                    </div>
                  )}
                </div>

                {school.notes && (
                  <p className="text-sm text-gray-600 mb-4 italic">📝 {school.notes}</p>
                )}

                <button
                  onClick={() => handleVerify(school.id)}
                  disabled={verifying}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  {verifying ? "Verifying..." : "✓ Verify Contact"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {verified.map((verification) => (
              <div
                key={verification.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{verification.schoolName}</h3>
                  </div>
                  <span className="text-xs text-gray-600">
                    {verification.lastCheckedAt &&
                      `Checked: ${new Date(verification.lastCheckedAt).toLocaleDateString()}`}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(verification.emailStatus)}`}>
                      📧 {verification.emailStatus}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(verification.phoneStatus)}`}>
                      📱 {verification.phoneStatus}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(verification.websiteStatus)}`}>
                      🌐 {verification.websiteStatus}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
