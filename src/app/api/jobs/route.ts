import { NextRequest, NextResponse } from "next/server";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  source: string;
  postedAt: string;
  applyUrl: string;
  country: string;
  region: string;
}

// Country to continent/region mapping
const countryToRegion: Record<string, string> = {
  "Thailand": "South East Asia", "Vietnam": "South East Asia", "Cambodia": "South East Asia",
  "Singapore": "South East Asia", "Malaysia": "South East Asia", "Indonesia": "South East Asia",
  "Philippines": "South East Asia",
  "South Korea": "East Asia", "Japan": "East Asia", "China": "East Asia", "Taiwan": "East Asia",
  "India": "Other",
  "UAE": "Middle East", "Qatar": "Middle East", "Saudi Arabia": "Middle East",
  "United Kingdom": "Europe", "Germany": "Europe", "France": "Europe", "Spain": "Europe",
  "Italy": "Europe", "Netherlands": "Europe", "Poland": "Europe", "Sweden": "Europe",
  "United States": "Americas", "Canada": "Americas", "Brazil": "Americas", "Colombia": "Americas",
  "Mexico": "Americas", "Argentina": "Americas",
  "Australia": "Other", "New Zealand": "Other",
};

// ============ USAJOBS API (USA) ============
async function fetchFromUSAJobs(keywords: string): Promise<Job[]> {
  try {
    const apiKey = process.env.USAJOBS_API_KEY;
    const userAgent = process.env.USAJOBS_USER_AGENT || "your_email@example.com";

    if (!apiKey) {
      console.log("USAJobs: API key not configured");
      return [];
    }

    const response = await fetch(
      `https://data.usajobs.gov/api/search?Keyword=teacher&ResultsPerPage=50`,
      {
        method: "GET",
        headers: {
          "Host": "data.usajobs.gov",
          "User-Agent": userAgent,
          "Authorization-Key": apiKey,
        },
      }
    );

    console.log(`USAJobs request: Keyword=teacher, Status=${response.status}`);

    if (!response.ok) {
      console.error("USAJobs error:", response.status);
      return [];
    }

    const data = await response.json();
    const jobs = data.SearchResultItems || [];

    if (jobs.length === 0) {
      console.warn("USAJobs: No jobs returned for keyword search");
    }

    return jobs.slice(0, 10).map((job: any) => ({
      id: `usajobs-${job.MatchedObjectId}`,
      title: job.PositionTitle || "Job Title",
      company: job.OrganizationName || "Government Agency",
      location: job.LocationName || "USA",
      salary: job.SalaryMax ? `$${job.SalaryMin || 0}-${job.SalaryMax}/year` : "Salary not specified",
      type: "Full-time",
      source: "USAJobs",
      postedAt: job.PublicationStartDate || new Date().toISOString(),
      applyUrl: job.ApplyURI || "#",
      country: "United States",
      region: "Americas",
    }));
  } catch (error) {
    console.error("Error fetching from USAJobs:", error);
    return [];
  }
}

// ============ EURES API (EU-wide) ============
async function fetchFromEURES(): Promise<Job[]> {
  try {
    const host = process.env.EURES_API_HOST || "pam-eures-stilling-eksport.nais.oera.no";
    const basePath = process.env.EURES_API_BASE_PATH || "/input/api/jv/v0.1";

    const response = await fetch(
      `https://${host}${basePath}/getAll`,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("EURES error:", response.status);
      return [];
    }

    const data = await response.json();
    const jobs = Array.isArray(data) ? data : data.jobs || [];

    return jobs.slice(0, 20).map((job: any) => ({
      id: `eures-${job.id || Math.random()}`,
      title: job.jobTitle || job.positionTitle || "Job Title",
      company: job.employerName || "Company",
      location: job.locations?.[0]?.location || "Europe",
      salary: job.salaryText || "Salary not specified",
      type: job.employmentType || "Full-time",
      source: "EURES",
      postedAt: job.publishedDate || new Date().toISOString(),
      applyUrl: job.applicationUrl || job.link || "#",
      country: job.countries?.[0] || "EU",
      region: "Europe",
    }));
  } catch (error: any) {
    if (error.code === 'ENOTFOUND') {
      console.warn("EURES: DNS resolution failed - skipping this API");
    } else {
      console.error("Error fetching from EURES:", error);
    }
    return [];
  }
}

// ============ BUNDESAGENTUR für ARBEIT (Germany) ============
async function fetchFromBundesagentur(): Promise<Job[]> {
  try {
    const apiKey = process.env.ARBEITSAGENTUR_API_KEY;

    if (!apiKey) {
      console.log("Bundesagentur: API key not configured");
      return [];
    }

    const response = await fetch(
      `https://rest.arbeitsagentur.de/jobboerse/jobsuche-service/pc/v4/jobs?paginationIndex=0&size=50`,
      {
        method: "GET",
        headers: {
          "X-API-Key": apiKey,
          "Accept": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Bundesagentur error:", response.status);
      return [];
    }

    const data = await response.json();
    const jobs = data.stellenangebote || data.results || [];

    return jobs.slice(0, 10).map((job: any) => ({
      id: `arbeitsagentur-${job.refnr || Math.random()}`,
      title: job.titel || job.title || "Job Title",
      company: job.arbeitgeber || job.company || "Company",
      location: job.ort || "Germany",
      salary: job.bruttoMonatsverdienst ? `€${job.bruttoMonatsverdienst}` : "Salary not specified",
      type: "Full-time",
      source: "Bundesagentur für Arbeit",
      postedAt: job.modifikationsstand || new Date().toISOString(),
      applyUrl: job.url || "#",
      country: "Germany",
      region: "Europe",
    }));
  } catch (error) {
    console.error("Error fetching from Bundesagentur:", error);
    return [];
  }
}

// ============ FRANCE TRAVAIL / PÔLE EMPLOI ============
async function fetchFromFranceTravail(): Promise<Job[]> {
  try {
    const clientId = process.env.FRANCE_TRAVAIL_CLIENT_ID;
    const clientSecret = process.env.FRANCE_TRAVAIL_CLIENT_SECRET;
    const tokenUrl = process.env.FRANCE_TRAVAIL_TOKEN_URL;

    if (!clientId || !clientSecret || !tokenUrl) {
      console.log("France Travail: Credentials not configured");
      return [];
    }

    // Get OAuth2 token
    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("France Travail token error:", tokenResponse.status, errorText);
      return [];
    }

    const tokenData = await tokenResponse.json();
    const token = tokenData.access_token;

    if (!token) {
      console.error("France Travail: No access token in response", tokenData);
      return [];
    }

    // Search jobs
    const jobResponse = await fetch(
      `https://api.francetravail.io/api/offers/v1/search?keywords=english%20teacher&range=0-100`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      }
    );

    if (!jobResponse.ok) {
      console.error("France Travail jobs error:", jobResponse.status);
      return [];
    }

    const jobData = await jobResponse.json();
    const jobs = jobData.resultats || jobData.results || [];

    return jobs.slice(0, 10).map((job: any) => ({
      id: `france-${job.id || Math.random()}`,
      title: job.libelle || job.title || "Job Title",
      company: job.nomEntreprise || job.company || "Company",
      location: job.lieuTravail?.commune || "France",
      salary: job.salaireMensuel ? `€${job.salaireMensuel}` : "Salary not specified",
      type: job.typeContrat || "Full-time",
      source: "France Travail",
      postedAt: job.dateCreation || new Date().toISOString(),
      applyUrl: job.urlRedirectCandidat || "#",
      country: "France",
      region: "Europe",
    }));
  } catch (error) {
    console.error("Error fetching from France Travail:", error);
    return [];
  }
}

// ============ MYCAREERSFUTURE (Singapore) ============
async function fetchFromMyCareersFuture(): Promise<Job[]> {
  try {
    const apiKey = process.env.MYCAREERSFUTURE_API_KEY;

    if (!apiKey || apiKey === "your_api_key_here") {
      console.log("MyCareersFuture: API key not configured");
      return [];
    }

    const response = await fetch(
      `https://api.mycareersfuture.gov.sg/api/jobs/search?keywords=english%20teacher&limit=50`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Accept": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("MyCareersFuture error:", response.status);
      return [];
    }

    const data = await response.json();
    const jobs = data.jobs || data.results || [];

    return jobs.slice(0, 10).map((job: any) => ({
      id: `mcf-${job.id || Math.random()}`,
      title: job.jobTitle || job.title || "Job Title",
      company: job.company?.name || "Company",
      location: "Singapore",
      salary: job.salary || "Salary not specified",
      type: "Full-time",
      source: "MyCareersFuture",
      postedAt: job.postingDate || new Date().toISOString(),
      applyUrl: job.applyUrl || "#",
      country: "Singapore",
      region: "South East Asia",
    }));
  } catch (error) {
    console.error("Error fetching from MyCareersFuture:", error);
    return [];
  }
}

// ============ WORKNET (South Korea) ============
async function fetchFromWorkNet(): Promise<Job[]> {
  try {
    const apiKey = process.env.WORKNET_API_KEY;

    if (!apiKey || apiKey === "your_api_key_here") {
      console.log("WorkNet: API key not configured");
      return [];
    }

    const response = await fetch(
      `https://api.work.go.kr/api/jobs/search?keyword=english&limit=50`,
      {
        method: "GET",
        headers: {
          "Authorization": apiKey,
          "Accept": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("WorkNet error:", response.status);
      return [];
    }

    const data = await response.json();
    const jobs = data.data || data.jobs || [];

    return jobs.slice(0, 10).map((job: any) => ({
      id: `worknet-${job.id || Math.random()}`,
      title: job.jobTitle || "Job Title",
      company: job.companyName || "Company",
      location: job.location || "South Korea",
      salary: job.salary || "Salary not specified",
      type: "Full-time",
      source: "WorkNet",
      postedAt: job.postedDate || new Date().toISOString(),
      applyUrl: job.applyUrl || "#",
      country: "South Korea",
      region: "East Asia",
    }));
  } catch (error) {
    console.error("Error fetching from WorkNet:", error);
    return [];
  }
}

// ============ NCS (National Career Service - India) ============
async function fetchFromNCS(): Promise<Job[]> {
  try {
    const apiKey = process.env.NCS_API_KEY;

    if (!apiKey || apiKey === "your_api_key_here") {
      console.log("NCS: API key not configured");
      return [];
    }

    const response = await fetch(
      `https://api.ncs.gov.in/jobs/search?keyword=english&limit=50`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Accept": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("NCS error:", response.status);
      return [];
    }

    const data = await response.json();
    const jobs = data.jobs || data.results || [];

    return jobs.slice(0, 10).map((job: any) => ({
      id: `ncs-${job.id || Math.random()}`,
      title: job.position || job.jobTitle || "Job Title",
      company: job.companyName || "Company",
      location: job.location || "India",
      salary: job.salary || "Salary not specified",
      type: "Full-time",
      source: "NCS",
      postedAt: job.datePosted || new Date().toISOString(),
      applyUrl: job.applyUrl || "#",
      country: "India",
      region: "Other",
    }));
  } catch (error) {
    console.error("Error fetching from NCS:", error);
    return [];
  }
}

// ============ LIGHTCAST CANADA ============
async function fetchFromLightcastCanada(): Promise<Job[]> {
  try {
    const apiKey = process.env.LIGHTCAST_API_KEY;

    if (!apiKey || apiKey === "your_api_key_here") {
      console.log("Lightcast Canada: API key not configured");
      return [];
    }

    const response = await fetch(
      `https://api.lightcast.dev/v1/jobs?query=english%20teacher&limit=50`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Accept": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Lightcast Canada error:", response.status);
      return [];
    }

    const data = await response.json();
    const jobs = data.jobs || data.results || [];

    return jobs.slice(0, 10).map((job: any) => ({
      id: `lightcast-${job.id || Math.random()}`,
      title: job.jobTitle || "Job Title",
      company: job.company || "Company",
      location: job.location || "Canada",
      salary: job.salary || "Salary not specified",
      type: "Full-time",
      source: "Lightcast",
      postedAt: job.postedDate || new Date().toISOString(),
      applyUrl: job.url || "#",
      country: "Canada",
      region: "Americas",
    }));
  } catch (error) {
    console.error("Error fetching from Lightcast Canada:", error);
    return [];
  }
}

// ============ WORKFORCE AUSTRALIA ============
async function fetchFromWorkforceAustralia(): Promise<Job[]> {
  try {
    const apiKey = process.env.WORKFORCE_AU_API_KEY;

    if (!apiKey || apiKey === "your_api_key_here") {
      console.log("Workforce Australia: API key not configured");
      return [];
    }

    const response = await fetch(
      `https://www.workforceaustralia.gov.au/api/jobs/search?keyword=english%20teacher&limit=50`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Accept": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Workforce Australia error:", response.status);
      return [];
    }

    const data = await response.json();
    const jobs = data.jobs || data.results || [];

    return jobs.slice(0, 10).map((job: any) => ({
      id: `workau-${job.id || Math.random()}`,
      title: job.jobTitle || "Job Title",
      company: job.company || "Company",
      location: job.location || "Australia",
      salary: job.salary || "Salary not specified",
      type: "Full-time",
      source: "Workforce Australia",
      postedAt: job.postedDate || new Date().toISOString(),
      applyUrl: job.applyUrl || "#",
      country: "Australia",
      region: "Other",
    }));
  } catch (error) {
    console.error("Error fetching from Workforce Australia:", error);
    return [];
  }
}

// ============ CAREERS NEW ZEALAND ============
async function fetchFromCareersNZ(): Promise<Job[]> {
  try {
    const apiKey = process.env.CAREERS_NZ_API_KEY;

    if (!apiKey || apiKey === "your_api_key_here") {
      console.log("Careers New Zealand: API key not configured");
      return [];
    }

    const response = await fetch(
      `https://api.careers.govt.nz/api/jobs?keyword=english&limit=50`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Accept": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Careers NZ error:", response.status);
      return [];
    }

    const data = await response.json();
    const jobs = data.jobs || data.results || [];

    return jobs.slice(0, 10).map((job: any) => ({
      id: `nzjobs-${job.id || Math.random()}`,
      title: job.title || "Job Title",
      company: job.employer || "Company",
      location: job.location || "New Zealand",
      salary: job.salary || "Salary not specified",
      type: "Full-time",
      source: "Careers NZ",
      postedAt: job.postedDate || new Date().toISOString(),
      applyUrl: job.url || "#",
      country: "New Zealand",
      region: "Other",
    }));
  } catch (error) {
    console.error("Error fetching from Careers NZ:", error);
    return [];
  }
}

// ============ ARBETSFÖRMEDLINGEN (Sweden) ============
async function fetchFromArbetsformedlingen(): Promise<Job[]> {
  try {
    const apiKey = process.env.ARBETSFORMEDLINGEN_API_KEY;

    if (!apiKey || apiKey === "your_api_key_here") {
      console.log("Arbetsförmedlingen: API key not configured");
      return [];
    }

    const response = await fetch(
      `https://api.arbetsformedlingen.se/jobs/search?keyword=english%20teacher&limit=50`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Accept": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Arbetsförmedlingen error:", response.status);
      return [];
    }

    const data = await response.json();
    const jobs = data.jobs || data.results || [];

    return jobs.slice(0, 10).map((job: any) => ({
      id: `arbetsfor-${job.id || Math.random()}`,
      title: job.jobTitle || "Job Title",
      company: job.company || "Company",
      location: job.location || "Sweden",
      salary: job.salary || "Salary not specified",
      type: "Full-time",
      source: "Arbetsförmedlingen",
      postedAt: job.postedDate || new Date().toISOString(),
      applyUrl: job.applyUrl || "#",
      country: "Sweden",
      region: "Europe",
    }));
  } catch (error) {
    console.error("Error fetching from Arbetsförmedlingen:", error);
    return [];
  }
}

// ============ MAIN ROUTE HANDLER ============
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("country") || "Thailand";

  console.log(`Fetching jobs for: ${filter}`);

  const allJobs: Job[] = [];

  try {
    // Fetch from all government APIs in parallel
    const [
      usajobsJobs,
      euresJobs,
      bundesagenturJobs,
      franceTravailJobs,
      mcfJobs,
      worknetJobs,
      ncsJobs,
      lightcastJobs,
      workforceAuJobs,
      careersNzJobs,
      arbetsJobs,
    ] = await Promise.all([
      fetchFromUSAJobs("english teacher TEFL ESL"),
      fetchFromEURES(),
      fetchFromBundesagentur(),
      fetchFromFranceTravail(),
      fetchFromMyCareersFuture(),
      fetchFromWorkNet(),
      fetchFromNCS(),
      fetchFromLightcastCanada(),
      fetchFromWorkforceAustralia(),
      fetchFromCareersNZ(),
      fetchFromArbetsformedlingen(),
    ]);

    // Log results from each API
    console.log(`🇺🇸 USAJobs: ${usajobsJobs.length} jobs`);
    console.log(`🇪🇺 EURES: ${euresJobs.length} jobs`);
    console.log(`🇩🇪 Bundesagentur: ${bundesagenturJobs.length} jobs`);
    console.log(`🇫🇷 France Travail: ${franceTravailJobs.length} jobs`);
    console.log(`🇸🇬 MyCareersFuture: ${mcfJobs.length} jobs`);
    console.log(`🇰🇷 WorkNet: ${worknetJobs.length} jobs`);
    console.log(`🇮🇳 NCS: ${ncsJobs.length} jobs`);
    console.log(`🇨🇦 Lightcast: ${lightcastJobs.length} jobs`);
    console.log(`🇦🇺 Workforce AU: ${workforceAuJobs.length} jobs`);
    console.log(`🇳🇿 Careers NZ: ${careersNzJobs.length} jobs`);
    console.log(`🇸🇪 Arbetsförmedlingen: ${arbetsJobs.length} jobs`);

    // Aggregate all jobs
    allJobs.push(
      ...usajobsJobs,
      ...euresJobs,
      ...bundesagenturJobs,
      ...franceTravailJobs,
      ...mcfJobs,
      ...worknetJobs,
      ...ncsJobs,
      ...lightcastJobs,
      ...workforceAuJobs,
      ...careersNzJobs,
      ...arbetsJobs
    );

    console.log(`✅ Total jobs fetched: ${allJobs.length}`);
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  // Remove duplicates based on title + company
  const uniqueJobs = Array.from(
    new Map(
      allJobs.map((job) => [
        `${job.title}-${job.company}`,
        job,
      ])
    ).values()
  );

  // Sort by posted date (newest first)
  uniqueJobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());

  return NextResponse.json({
    jobs: uniqueJobs.slice(0, 150), // Return up to 150 jobs
    meta: {
      country: filter,
      total: uniqueJobs.length,
      sources: [
        "USAJobs",
        "EURES",
        "Bundesagentur für Arbeit",
        "France Travail",
        "MyCareersFuture",
        "WorkNet",
        "NCS",
        "Lightcast Canada",
        "Workforce Australia",
        "Careers NZ",
        "Arbetsförmedlingen",
      ],
      timestamp: new Date().toISOString(),
    },
  });
}
