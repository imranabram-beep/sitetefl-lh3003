"use client";

import { useState, useEffect } from "react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  source: string;
  postedAt?: string;
  applyUrl?: string;
  country?: string;
  region?: string;
}

const JOBS_PER_PAGE = 3;

const REGIONS = [
  { name: "Asia", icon: "/images/Jobs/Icons/continent/Asia.svg", jobs: 13, salary: "USD 900-3M/mo" },
  { name: "Europe", icon: "/images/Jobs/Icons/continent/Europe.svg", jobs: 4, salary: "EUR 1.2-3.5k/mo" },
  { name: "Americas", icon: "/images/Jobs/Icons/continent/Americas.svg", jobs: 4, salary: "USD 600-55k/mo" },
  { name: "Africa", icon: "/images/Jobs/Icons/continent/Africa.svg", jobs: 0, salary: "Coming soon" },
  { name: "Oceania", icon: "/images/Jobs/Icons/continent/Oceania.svg", jobs: 3, salary: "AUD 55k-80k/mo" },
];

export function JobsClient() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("Thailand");
  const [dateFilter, setDateFilter] = useState("any");

  // Parse URL query parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const countryParam = params.get("country");
      if (countryParam) {
        setCountry(decodeURIComponent(countryParam));
      }
    }
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs?country=${country}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      let jobList = data.jobs || [];

      // Apply date filter
      if (dateFilter !== "any") {
        const now = new Date();
        const cutoffDays = dateFilter === "week" ? 7 : 30;
        const cutoffDate = new Date(now.getTime() - cutoffDays * 24 * 60 * 60 * 1000);
        jobList = jobList.filter((job: Job) => {
          if (!job.postedAt) return false;
          return new Date(job.postedAt) >= cutoffDate;
        });
      }

      setAllJobs(jobList);
      setJobs(jobList.slice(0, JOBS_PER_PAGE));
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setAllJobs([]);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextCount = jobs.length + JOBS_PER_PAGE;
    setJobs(allJobs.slice(0, nextCount));
  };

  useEffect(() => {
    fetchJobs();
  }, [country, dateFilter]);

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Region Showcase Cards */}
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ margin: "0 0 1.5rem 0", color: "#0d4e7d", fontSize: "1.5rem" }}>
          Teaching Opportunities by Region
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1.25rem" }}>
          {REGIONS.map((region, index) => {
            const borderColors = ["#dc2626", "#2563eb", "#ea580c", "#ca8a04", "#0891b2"];
            const bgGradients = [
              "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
              "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
              "linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)",
              "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
              "linear-gradient(135deg, #ecf0f1 0%, #cffafe 100%)",
            ];

            return (
              <div
                key={region.name}
                onClick={() => setCountry(region.name)}
                style={{
                  padding: "1.25rem 1rem",
                  background: bgGradients[index],
                  border: `2px solid ${borderColors[index]}`,
                  borderRadius: "12px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: country === region.name ? "translateY(-2px)" : "translateY(0)",
                  boxShadow: country === region.name ? `0 6px 16px ${borderColors[index]}33` : "0 2px 6px rgba(0, 0, 0, 0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 6px 16px ${borderColors[index]}33`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = country === region.name ? "translateY(-2px)" : "translateY(0)";
                  e.currentTarget.style.boxShadow = country === region.name ? `0 6px 16px ${borderColors[index]}33` : "0 2px 6px rgba(0, 0, 0, 0.08)";
                }}
              >
                <img
                  src={region.icon}
                  alt={region.name}
                  style={{ width: "80px", height: "80px", marginBottom: "0.75rem", objectFit: "contain" }}
                />
                <h3 style={{ margin: "0 0 0.5rem 0", color: "#0d4e7d", fontSize: "0.95rem", fontWeight: "700" }}>
                  {region.name}
                </h3>
                <div style={{ fontSize: "1.75rem", fontWeight: "900", color: borderColors[index], marginBottom: "0.25rem" }}>
                  {region.jobs}
                </div>
                <div style={{ fontSize: "0.7rem", color: "#666", marginBottom: "0.5rem", fontWeight: "500" }}>
                  jobs available
                </div>
                <div style={{
                  padding: "0.5rem",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  borderRadius: "6px",
                  fontSize: "0.65rem",
                  color: "#0d4e7d",
                  fontWeight: "600",
                  border: `1px solid ${borderColors[index]}22`
                }}>
                  {region.salary}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search Controls */}
      <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          Continent/Country:
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{ padding: "0.5rem" }}
          >
            <optgroup label="Continents">
              <option>Asia</option>
              <option>Europe</option>
              <option>Americas</option>
              <option>Africa</option>
              <option>Oceania</option>
            </optgroup>
            <optgroup label="South East Asia Countries">
              <option>Thailand</option>
              <option>Vietnam</option>
              <option>Cambodia</option>
            </optgroup>
            <optgroup label="East Asia Countries">
              <option>South Korea</option>
              <option>Japan</option>
              <option>China</option>
            </optgroup>
            <optgroup label="Middle East Countries">
              <option>UAE</option>
              <option>Qatar</option>
              <option>Saudi Arabia</option>
            </optgroup>
            <optgroup label="Europe Countries">
              <option>United Kingdom</option>
              <option>Germany</option>
              <option>France</option>
              <option>Spain</option>
            </optgroup>
            <optgroup label="Americas Countries">
              <option>United States</option>
              <option>Canada</option>
              <option>Brazil</option>
              <option>Colombia</option>
            </optgroup>
            <optgroup label="Other Countries">
              <option>Australia</option>
              <option>New Zealand</option>
              <option>India</option>
            </optgroup>
          </select>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          Posted:
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{ padding: "0.5rem" }}
          >
            <option value="any">Any time</option>
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
          </select>
        </label>

        <button
          onClick={fetchJobs}
          style={{
            padding: "0.5rem 1rem",
            background: "#17a697",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {loading && <p>Loading jobs...</p>}

      {!loading && jobs.length === 0 && (
        <p>No jobs found. Try searching for a different country.</p>
      )}

      {!loading && jobs.length > 0 && (
        <div>
          {/* Metadata Display */}
          <div
            style={{
              marginBottom: "2rem",
              padding: "1.5rem",
              background: "linear-gradient(135deg, #f0fdfb 0%, #e0f9f7 100%)",
              border: "1px solid #a7e8dc",
              borderRadius: "12px",
            }}
          >
            <h3 style={{ margin: "0 0 1rem 0", color: "#0d4e7d", fontSize: "1.25rem" }}>
              Job Search Results
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#17a697" }}>
                  {jobs.length}
                </div>
                <div style={{ color: "#666", marginTop: "0.25rem" }}>Total Jobs Found</div>
              </div>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#fd9000" }}>
                  {new Set(jobs.map((j) => j.type)).size}
                </div>
                <div style={{ color: "#666", marginTop: "0.25rem" }}>Job Types Available</div>
              </div>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#0d4e7d" }}>
                  {jobs.filter((j) => j.type === "Full-time").length}
                </div>
                <div style={{ color: "#666", marginTop: "0.25rem" }}>Full-time Positions</div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
            {jobs.map((job) => (
              <div
                key={job.id}
                style={{
                  padding: "1.25rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <h3 style={{ margin: "0 0 0.5rem 0", color: "#0d4e7d" }}>{job.title}</h3>
                <p style={{ margin: "0.25rem 0", color: "#666" }}>
                  <strong>{job.company}</strong> • {job.location}
                </p>
                <p style={{ margin: "0.25rem 0", color: "#666" }}>
                  {job.type} • <span style={{ fontWeight: "600", color: "#17a697" }}>{job.salary}</span>
                </p>
                <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.85rem", color: "#999", flex: "1" }}>
                  Posted: {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : "Recently"}
                </p>

                {job.applyUrl && (
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      marginTop: "1rem",
                      padding: "0.75rem 1.5rem",
                      background: "#17a697",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      textAlign: "center",
                      textDecoration: "none",
                      fontSize: "0.95rem",
                      fontWeight: "600",
                      transition: "background 0.3s",
                      display: "inline-block",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#0f8074")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#17a697")}
                  >
                    Apply Now →
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {jobs.length < allJobs.length && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <button
                onClick={loadMore}
                style={{
                  padding: "0.75rem 2rem",
                  background: "#17a697",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#0f8074")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#17a697")}
              >
                Load More ({allJobs.length - jobs.length} remaining)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
