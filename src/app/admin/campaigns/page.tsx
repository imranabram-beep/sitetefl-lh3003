"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Campaign {
  id: string;
  name: string;
  subject: string;
  status: string;
  recipient_count: number;
  sent_count: number;
  opened_count: number;
  created_at: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch("/api/admin/campaigns");
        const data = await res.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "sending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Email Campaigns</h1>
          <p className="text-gray-600 mt-2">Create, manage, and track email campaigns</p>
        </div>
        <Link
          href="/admin/campaigns/new"
          className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
        >
          📧 New Campaign
        </Link>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {loading ? (
          <div className="p-8 text-center text-gray-600">Loading campaigns...</div>
        ) : campaigns.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            No campaigns yet. <Link href="/admin/campaigns/new" className="text-blue-600 hover:underline">Create your first one</Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray-900">Campaign Name</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-900">Status</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-900">Recipients</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-900">Sent</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-900">Opens</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-900">Created</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900 font-medium">{campaign.name}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{campaign.recipient_count}</td>
                  <td className="px-6 py-4 text-gray-600">{campaign.sent_count}</td>
                  <td className="px-6 py-4 text-gray-600">{campaign.opened_count}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(campaign.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/admin/campaigns/${campaign.id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View
                    </Link>
                    {campaign.status === "draft" && (
                      <Link
                        href={`/admin/campaigns/${campaign.id}/edit`}
                        className="text-green-600 hover:underline text-sm"
                      >
                        Edit
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
