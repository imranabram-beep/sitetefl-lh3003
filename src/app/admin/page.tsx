"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Stats {
  totalContacts: number;
  totalCampaigns: number;
  sentEmails: number;
  openRate: number;
  activeCampaigns: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalContacts: 0,
    totalCampaigns: 0,
    sentEmails: 0,
    openRate: 0,
    activeCampaigns: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Contacts",
      value: stats.totalContacts,
      icon: "👥",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Campaigns Created",
      value: stats.totalCampaigns,
      icon: "📬",
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Emails Sent",
      value: stats.sentEmails,
      icon: "✉️",
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Open Rate",
      value: `${stats.openRate}%`,
      icon: "📊",
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "Active Campaigns",
      value: stats.activeCampaigns,
      icon: "🚀",
      color: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your email campaign overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`${card.color} rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{card.label}</p>
                <p className="text-3xl font-bold mt-3">{loading ? "..." : card.value}</p>
              </div>
              <div className="text-4xl opacity-50">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">⚡ Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/contacts/new"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 text-center hover:shadow-lg hover:-translate-y-0.5"
          >
            ➕ Add Contact
          </Link>
          <Link
            href="/admin/contacts/import"
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 text-center hover:shadow-lg hover:-translate-y-0.5"
          >
            📤 Import Contacts
          </Link>
          <Link
            href="/admin/campaigns/new"
            className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 text-center hover:shadow-lg hover:-translate-y-0.5"
          >
            📧 New Campaign
          </Link>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-xl font-bold text-gray-900 mb-6">📬 Recent Campaigns</h2>
        <p className="text-gray-600">No campaigns yet. <Link href="/admin/campaigns/new" className="text-blue-600 hover:underline font-medium">Create your first campaign</Link> to get started!</p>
      </div>
    </div>
  );
}
