"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Campaign {
  id: string;
  name: string;
  subject: string;
  status: "draft" | "scheduled" | "sending" | "completed";
  emailsSent: number;
  emailsOpened: number;
  emailsClicked: number;
  emailsBounced: number;
  createdAt: string;
  scheduledAt?: string;
  sentAt?: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch(`/api/schoolbase/campaigns?status=${filter}`);
        const data = await res.json();

        if (Array.isArray(data.campaigns)) {
          setCampaigns(data.campaigns);
        } else {
          console.error("Invalid data:", data);
          setCampaigns([]);
        }
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [filter]);

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(search.toLowerCase()) ||
    campaign.subject.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      draft: "bg-gray-100 text-gray-800",
      scheduled: "bg-blue-100 text-blue-800",
      sending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getOpenRate = (campaign: Campaign) => {
    if (campaign.emailsSent === 0) return 0;
    return Math.round((campaign.emailsOpened / campaign.emailsSent) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-600 mt-2">Create and manage outreach campaigns to schools</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/schoolbase/campaigns/new"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg"
          >
            ➕ New Campaign
          </Link>
          <Link
            href="/schoolbase"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            ← Back
          </Link>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="flex gap-4 flex-col md:flex-row">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="sending">Sending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-gray-600">Loading campaigns...</div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            No campaigns found.{" "}
            <Link href="/schoolbase/campaigns/new" className="text-blue-600 hover:underline">
              Create one now
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Subject: {campaign.subject}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-4">
                  <div className="p-3 bg-gray-50 rounded">
                    <span className="text-xs text-gray-600">Emails Sent</span>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{campaign.emailsSent}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded">
                    <span className="text-xs text-blue-600">Open Rate</span>
                    <p className="text-2xl font-bold text-blue-900 mt-1">{getOpenRate(campaign)}%</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded">
                    <span className="text-xs text-green-600">Opened</span>
                    <p className="text-2xl font-bold text-green-900 mt-1">{campaign.emailsOpened}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded">
                    <span className="text-xs text-purple-600">Clicked</span>
                    <p className="text-2xl font-bold text-purple-900 mt-1">{campaign.emailsClicked}</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded">
                    <span className="text-xs text-red-600">Bounced</span>
                    <p className="text-2xl font-bold text-red-900 mt-1">{campaign.emailsBounced}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-600">
                    Created {new Date(campaign.createdAt).toLocaleDateString()}
                    {campaign.sentAt && ` • Sent ${new Date(campaign.sentAt).toLocaleDateString()}`}
                  </span>
                  <div className="flex gap-2">
                    <Link
                      href={`/schoolbase/campaigns/${campaign.id}`}
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      View
                    </Link>
                    {campaign.status === "draft" && (
                      <>
                        <Link
                          href={`/schoolbase/campaigns/${campaign.id}/edit`}
                          className="text-blue-600 hover:underline text-sm font-medium"
                        >
                          Edit
                        </Link>
                        <button
                          className="text-red-600 hover:underline text-sm font-medium"
                          onClick={() => {
                            if (confirm("Delete this campaign?")) {
                              // Handle delete
                            }
                          }}
                        >
                          Delete
                        </button>
                      </>
                    )}
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
