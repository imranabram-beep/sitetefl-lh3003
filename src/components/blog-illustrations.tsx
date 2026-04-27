/**
 * Blog Illustration Components
 * SVG illustrations for blog post thumbnails and hero sections
 * Each component uses teal gradient colors matching the design system
 */

export function TeflCoursesIllustration() {
  return (
    <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Background gradient */}
      <defs>
        <linearGradient id="teal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#17a697", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#0f766e", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Stack of books */}
      <rect x="80" y="120" width="50" height="60" fill="url(#teal-grad)" rx="4" />
      <rect x="75" y="105" width="50" height="60" fill="#17a697" rx="4" opacity="0.8" />
      <rect x="70" y="90" width="50" height="60" fill="#2db5ac" rx="4" opacity="0.6" />

      {/* Book lines */}
      <line x1="75" y1="100" x2="125" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <line x1="80" y1="115" x2="130" y2="115" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <line x1="85" y1="130" x2="135" y2="130" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

      {/* Checkmark circle */}
      <circle cx="170" cy="100" r="30" fill="#10b981" />
      <path
        d="M 160 100 L 165 105 L 180 90"
        stroke="white"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThailandIllustration() {
  return (
    <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="thailand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#17a697", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#0f766e", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Temple spire */}
      <polygon points="150,40 130,120 170,120" fill="url(#thailand-grad)" />
      <polygon points="150,60 140,95 160,95" fill="#2db5ac" />

      {/* Temple base */}
      <rect x="120" y="120" width="60" height="50" fill="#17a697" rx="4" />

      {/* Decorative patterns */}
      <line x1="130" y1="130" x2="170" y2="130" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
      <line x1="130" y1="145" x2="170" y2="145" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
      <line x1="130" y1="160" x2="170" y2="160" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />

      {/* Ornamental top */}
      <circle cx="150" cy="35" r="8" fill="#f59e0b" />
    </svg>
  );
}

export function VietnamIllustration() {
  return (
    <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="vietnam-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#17a697", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#0f766e", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Ha Long Bay karst mountains */}
      <polygon points="70,160 90,80 110,150" fill="url(#vietnam-grad)" />
      <polygon points="110,170 135,90 160,160" fill="#2db5ac" />
      <polygon points="160,175 180,95 200,165" fill="#17a697" opacity="0.8" />
      <polygon points="200,180 220,100 240,170" fill="#0f766e" />

      {/* Water waves */}
      <path d="M 60 190 Q 70 185 80 190 T 100 190 T 120 190 T 140 190 T 160 190 T 180 190 T 200 190 T 220 190" stroke="#3b82f6" strokeWidth="2" fill="none" />
      <path d="M 60 210 Q 70 205 80 210 T 100 210 T 120 210 T 140 210 T 160 210 T 180 210 T 200 210 T 220 210" stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.6" />
    </svg>
  );
}

export function DegreeQuestionIllustration() {
  return (
    <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="degree-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#17a697", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#0f766e", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Graduation cap */}
      <polygon points="150,80 100,130 200,130" fill="url(#degree-grad)" />
      <rect x="145" y="130" width="10" height="40" fill="#17a697" />

      {/* Cap board */}
      <rect x="90" y="130" width="120" height="8" fill="#17a697" />

      {/* Tassel */}
      <circle cx="155" cy="175" r="8" fill="#f59e0b" />
      <line x1="155" y1="138" x2="155" y2="170" stroke="#f59e0b" strokeWidth="2" />

      {/* Question mark circle */}
      <circle cx="150" cy="70" r="25" fill="#3b82f6" opacity="0.7" />
      <text x="150" y="80" fontSize="30" fontWeight="bold" fill="white" textAnchor="middle">?</text>
    </svg>
  );
}

export function RequirementsIllustration() {
  return (
    <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="req-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#17a697", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#0f766e", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Checklist items */}
      <rect x="70" y="60" width="160" height="140" fill="rgba(23, 166, 151, 0.1)" rx="8" stroke="url(#req-grad)" strokeWidth="2" />

      {/* Checkbox 1 */}
      <rect x="85" y="75" width="18" height="18" fill="url(#req-grad)" rx="3" />
      <path d="M 88 83 L 92 87 L 98 81" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      <line x1="110" y1="85" x2="210" y2="85" stroke="#4a5868" strokeWidth="2" />

      {/* Checkbox 2 */}
      <rect x="85" y="110" width="18" height="18" fill="url(#req-grad)" rx="3" />
      <path d="M 88 118 L 92 122 L 98 116" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      <line x1="110" y1="120" x2="210" y2="120" stroke="#4a5868" strokeWidth="2" />

      {/* Checkbox 3 */}
      <rect x="85" y="145" width="18" height="18" fill="url(#req-grad)" rx="3" />
      <path d="M 88 153 L 92 157 L 98 151" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      <line x1="110" y1="155" x2="210" y2="155" stroke="#4a5868" strokeWidth="2" />
    </svg>
  );
}

export function CareerPathsIllustration() {
  return (
    <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="career-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#17a697", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#0f766e", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Starting point */}
      <circle cx="70" cy="120" r="12" fill="url(#career-grad)" />

      {/* Arrows */}
      <path d="M 85 100 L 135 90" stroke="#17a697" strokeWidth="2" fill="none" />
      <path d="M 140 85 L 145 80 L 140 90" stroke="#17a697" strokeWidth="2" fill="none" />

      <path d="M 85 120 L 135 120" stroke="#2db5ac" strokeWidth="2" fill="none" />
      <path d="M 140 120 L 145 115 L 145 125" stroke="#2db5ac" strokeWidth="2" fill="none" />

      <path d="M 85 140 L 135 150" stroke="#0f766e" strokeWidth="2" fill="none" />
      <path d="M 140 155 L 145 160 L 140 150" stroke="#0f766e" strokeWidth="2" fill="none" />

      {/* Destination circles */}
      <circle cx="160" cy="85" r="12" fill="#17a697" opacity="0.8" />
      <circle cx="160" cy="120" r="12" fill="#2db5ac" opacity="0.8" />
      <circle cx="160" cy="155" r="12" fill="#0f766e" opacity="0.8" />

      {/* Labels (as text) */}
      <text x="160" y="205" fontSize="11" fill="#4a5868" textAnchor="middle" fontWeight="600">Multiple pathways</text>
    </svg>
  );
}

export function WorthItIllustration() {
  return (
    <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="worth-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#17a697", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#0f766e", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Scales */}
      <line x1="150" y1="80" x2="150" y2="150" stroke="#4a5868" strokeWidth="3" />
      <circle cx="150" cy="75" r="6" fill="#4a5868" />

      {/* Left side (costs) */}
      <rect x="80" y="135" width="50" height="40" fill="#ef4444" rx="4" opacity="0.7" />
      <text x="105" y="165" fontSize="11" fill="white" textAnchor="middle" fontWeight="600">Costs</text>

      {/* Right side (benefits) */}
      <rect x="170" y="100" width="50" height="75" fill="url(#worth-grad)" rx="4" />
      <text x="195" y="145" fontSize="11" fill="white" textAnchor="middle" fontWeight="600">Benefits</text>

      {/* Fulcrum */}
      <polygon points="140,155 160,155 150,165" fill="#4a5868" />
    </svg>
  );
}

export function OnlineTeachingIllustration() {
  return (
    <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="online-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#17a697", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#0f766e", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Computer screen */}
      <rect x="60" y="50" width="180" height="130" fill="rgba(23, 166, 151, 0.1)" rx="8" stroke="url(#online-grad)" strokeWidth="2" />

      {/* Screen bezel */}
      <rect x="65" y="55" width="170" height="110" fill="#ffffff" rx="4" />

      {/* Video grid (3 people) */}
      <rect x="75" y="65" width="45" height="45" fill="url(#online-grad)" rx="4" />
      <rect x="128" y="65" width="45" height="45" fill="#2db5ac" rx="4" opacity="0.8" />
      <rect x="181" y="65" width="45" height="45" fill="#0f766e" opacity="0.8" rx="4" />

      {/* Chat area */}
      <rect x="75" y="120" width="151" height="35" fill="#f3f4f6" rx="4" />
      <line x1="78" y1="127" x2="220" y2="127" stroke="#d1d5db" strokeWidth="1" />
      <line x1="78" y1="135" x2="220" y2="135" stroke="#d1d5db" strokeWidth="1" />
      <line x1="78" y1="143" x2="200" y2="143" stroke="#d1d5db" strokeWidth="1" />

      {/* Stand */}
      <rect x="120" y="180" width="60" height="8" fill="#4a5868" rx="2" />
    </svg>
  );
}

export function SalaryGuideIllustration() {
  return (
    <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="salary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#17a697", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#0f766e", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Chart background */}
      <rect x="50" y="50" width="200" height="150" fill="rgba(23, 166, 151, 0.05)" rx="8" />

      {/* Axis lines */}
      <line x1="70" y1="175" x2="230" y2="175" stroke="#4a5868" strokeWidth="2" />
      <line x1="70" y1="175" x2="70" y2="60" stroke="#4a5868" strokeWidth="2" />

      {/* Bar 1 */}
      <rect x="85" y="120" width="30" height="55" fill="url(#salary-grad)" rx="4" />

      {/* Bar 2 */}
      <rect x="130" y="90" width="30" height="85" fill="#2db5ac" rx="4" opacity="0.8" />

      {/* Bar 3 */}
      <rect x="175" y="70" width="30" height="105" fill="#0f766e" opacity="0.8" rx="4" />

      {/* Labels */}
      <text x="100" y="195" fontSize="10" fill="#4a5868" textAnchor="middle" fontWeight="600">Tier 1</text>
      <text x="145" y="195" fontSize="10" fill="#4a5868" textAnchor="middle" fontWeight="600">Tier 2</text>
      <text x="190" y="195" fontSize="10" fill="#4a5868" textAnchor="middle" fontWeight="600">Tier 3</text>
    </svg>
  );
}
