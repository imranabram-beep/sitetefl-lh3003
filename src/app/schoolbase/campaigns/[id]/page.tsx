"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Campaign {
  id: string;
  name: string;
  subject: string;
  body: string;
  status: "draft" | "scheduled" | "sending" | "completed";
  emailsSent: number;
  emailsOpened: number;
  emailsClicked: number;
  emailsBounced: number;
  createdAt: string;
  scheduledAt?: string;
  sentAt?: string;
}

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id as string;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState("");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await fetch(`/api/schoolbase/campaigns/${campaignId}`);
        const data = await res.json();

        if (res.ok) {
          setCampaign(data.campaign);
        } else {
          setError(data.error || "Failed to load campaign");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load campaign");
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) {
      fetchCampaign();
    }
  }, [campaignId]);

  const handleSendCampaign = async () => {
    if (!campaign || campaign.status !== "draft") {
      setError("Only draft campaigns can be sent");
      return;
    }

    if (!confirm(`Send campaign "${campaign.name}" to all recipients? This cannot be undone.`)) {
      return;
    }

    setSending(true);
    setError("");
    setSendResult("");

    try {
      const res = await fetch("/api/schoolbase/campaigns/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaignId }),
      });

      const data = await res.json();

      if (res.ok) {
        setSendResult(`✓ Campaign sent! ${data.emailsSent} emails sent, ${data.emailsFailed} failed.`);
        setTimeout(() => {
          router.refresh();
        }, 2000);
      } else {
        setError(data.error || "Failed to send campaign");
      }
    } catch (err: any) {
      setError(err.message || "Failed to send campaign");
    } finally {
      setSending(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      draft: "bg-gray-100 text-gray-800",
      scheduled: "bg-blue-100 text-blue-800",
      sending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getOpenRate = () => {
    if (!campaign || campaign.emailsSent === 0) return 0;
    return Math.round((campaign.emailsOpened / campaign.emailsSent) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-600">Loading campaign...</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/schoolbase/campaigns"
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to Campaigns
          </Link>
        </div>
        <div className="p-8 bg-red-50 border border-red-200 rounded-lg text-red-900">
          ❌ Campaign not found
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/schoolbase/campaigns"
          className="text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          ← Back to Campaigns
        </Link>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
        </span>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-900">
          ❌ {error}
        </div>
      )}

      {sendResult && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-900">
          {sendResult}
        </div>
      )}

      {/* Campaign Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
        {/* Title and Subject */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
          <p className="text-gray-600 mt-2">Subject: <span className="font-medium">{campaign.subject}</span></p>
        </div>

        {/* Email Body Preview */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Preview</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 font-mono text-sm text-gray-800 max-h-80 overflow-y-auto">
            {campaign.body}
          </div>
        </div>

        {/* Campaign Metrics */}
        {campaign.status !== "draft" && (
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <span className="text-xs text-gray-600">Emails Sent</span>
                <p className="text-3xl font-bold text-gray-900 mt-2">{campaign.emailsSent}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <span className="text-xs text-blue-600">Open Rate</span>
                <p className="text-3xl font-bold text-blue-900 mt-2">{getOpenRate()}%</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <span className="text-xs text-green-600">Opened</span>
                <p className="text-3xl font-bold text-green-900 mt-2">{campaign.emailsOpened}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <span className="text-xs text-purple-600">Clicked</span>
                <p className="text-3xl font-bold text-purple-900 mt-2">{campaign.emailsClicked}</p>
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600 min-w-28">Created:</span>
              <span className="text-gray-900">{new Date(campaign.createdAt).toLocaleString()}</span>
            </div>
            {campaign.scheduledAt && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600 min-w-28">Scheduled:</span>
                <span className="text-gray-900">{new Date(campaign.scheduledAt).toLocaleString()}</span>
              </div>
            )}
            {campaign.sentAt && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600 min-w-28">Sent:</span>
                <span className="text-gray-900">{new Date(campaign.sentAt).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 pt-6 flex gap-3">
          {campaign.status === "draft" && (
            <>
              <button
                onClick={handleSendCampaign}
                disabled={sending}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                {sending ? "Sending..." : "📧 Send Campaign"}
              </button>
              <Link
                href={`/schoolbase/campaigns/${campaign.id}/edit`}
                className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Edit
              </Link>
            </>
          )}
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 font-medium py-2 px-6"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
