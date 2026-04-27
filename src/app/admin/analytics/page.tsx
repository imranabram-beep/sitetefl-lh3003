"use client";

import { useState, useEffect } from "react";

interface AnalyticsData {
  totalCampaigns: number;
  totalEmailsSent: number;
  averageOpenRate: number;
  averageClickRate: number;
  totalBounces: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    totalCampaigns: 0,
    totalEmailsSent: 0,
    averageOpenRate: 0,
    averageClickRate: 0,
    totalBounces: 0,
  });

  useEffect(() => {
    // Fetch analytics data
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/analytics");
        const analyticsData = await res.json();
        setData(analyticsData);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Campaign performance and engagement metrics</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600 font-medium">Total Campaigns</p>
          <p className="text-3xl font-bold text-gray-900 mt-3">{data.totalCampaigns}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600 font-medium">Emails Sent</p>
          <p className="text-3xl font-bold text-gray-900 mt-3">
            {data.totalEmailsSent.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600 font-medium">Avg Open Rate</p>
          <p className="text-3xl font-bold text-green-600 mt-3">
            {data.averageOpenRate.toFixed(1)}%
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600 font-medium">Avg Click Rate</p>
          <p className="text-3xl font-bold text-blue-600 mt-3">
            {data.averageClickRate.toFixed(1)}%
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600 font-medium">Total Bounces</p>
          <p className="text-3xl font-bold text-red-600 mt-3">
            {data.totalBounces}
          </p>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600 text-lg">
          📊 Detailed charts and campaign breakdowns coming soon
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Run your first campaign to see analytics data
        </p>
      </div>
    </div>
  );
}
