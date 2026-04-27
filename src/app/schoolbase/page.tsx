"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Stats {
  totalSchools: number;
  verified: number;
  emailsFound: number;
  phonesFound: number;
  locationsIndexed: number;
  activeCampaigns: number;
}

export default function SchoolBasePage() {
  const [stats, setStats] = useState<Stats>({
    totalSchools: 0,
    verified: 0,
    emailsFound: 0,
    phonesFound: 0,
    locationsIndexed: 0,
    activeCampaigns: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/schoolbase/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      icon: "🌍",
      label: "Total Schools",
      value: stats.totalSchools,
      color: "bg-blue-50 border-blue-200",
    },
    {
      icon: "📧",
      label: "Emails Found",
      value: stats.emailsFound,
      color: "bg-green-50 border-green-200",
    },
    {
      icon: "📱",
      label: "Phone Numbers",
      value: stats.phonesFound,
      color: "bg-purple-50 border-purple-200",
    },
    {
      icon: "📍",
      label: "Locations Indexed",
      value: stats.locationsIndexed,
      color: "bg-red-50 border-red-200",
    },
    {
      icon: "📊",
      label: "Active Campaigns",
      value: stats.activeCampaigns,
      color: "bg-orange-50 border-orange-200",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">SchoolBase</h1>
        <p className="text-gray-600 mt-2">Discover schools and manage outreach campaigns across Asia</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-5 gap-4">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className={`border rounded-lg p-6 ${card.color}`}
          >
            <div className="text-3xl mb-4">
              {card.icon}
            </div>
            <p className="text-sm font-medium text-gray-700">{card.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {loading ? "..." : card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-4">
          <Link
            href="/schoolbase/search"
            className="p-6 border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition text-center"
          >
            <div className="text-4xl mx-auto mb-3">🔍</div>
            <p className="font-semibold text-gray-900">Search Schools</p>
            <p className="text-xs text-gray-600 mt-1">Find institutions by location</p>
          </Link>

          <Link
            href="/schoolbase/results"
            className="p-6 border border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-lg transition text-center"
          >
            <div className="text-4xl mx-auto mb-3">📊</div>
            <p className="font-semibold text-gray-900">View Results</p>
            <p className="text-xs text-gray-600 mt-1">Browse discovered schools</p>
          </Link>

          <Link
            href="/schoolbase/verification"
            className="p-6 border border-green-200 bg-green-50 hover:bg-green-100 rounded-lg transition text-center"
          >
            <div className="text-4xl mx-auto mb-3">✓</div>
            <p className="font-semibold text-gray-900">Verify Contacts</p>
            <p className="text-xs text-gray-600 mt-1">Check email and phone</p>
          </Link>

          <Link
            href="/schoolbase/campaigns"
            className="p-6 border border-purple-200 bg-purple-50 hover:bg-purple-100 rounded-lg transition text-center"
          >
            <div className="text-4xl mx-auto mb-3">📧</div>
            <p className="font-semibold text-gray-900">Manage Campaigns</p>
            <p className="text-xs text-gray-600 mt-1">Create outreach campaigns</p>
          </Link>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-8">
        <h2 className="text-xl font-semibold text-indigo-900 mb-4">Getting Started</h2>
        <ol className="text-indigo-900 space-y-2 list-decimal list-inside">
          <li>Go to <Link href="/schoolbase/search" className="font-semibold hover:underline">Search Schools</Link> and find institutions by location</li>
          <li>Review results and verify contact information</li>
          <li>Create campaigns to reach out to verified schools</li>
          <li>Track responses and manage outreach efforts</li>
          <li>Export qualified leads when ready</li>
        </ol>
      </div>
    </div>
  );
}
