"use client";

import Link from "next/link";

/* ─────────────────────────────────────────────
   PAYMENT METHODS — SEA-first ordering
───────────────────────────────────────────── */
const PAYMENT_METHODS = [
  {
    id: "card",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="2" y="6" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M2 11h24" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M7 17h4M16 17h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    label: "Visa / Mastercard",
    sub: "All major cards accepted",
    popular: false,
  },
  {
    id: "paypal",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M8 6h7.5c3.5 0 5.5 2 5 5.5C20 15 17.5 17 14 17H11l-1.5 7H6L8 6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M11 17l-.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    label: "PayPal",
    sub: "Pay securely with PayPal",
    popular: false,
  },
  {
    id: "gcash",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M14 9v10M9 14h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    label: "GCash",
    sub: "Philippines e-wallet",
    popular: true,
    flag: "🇵🇭",
  },
  {
    id: "maya",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M10 14l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Maya",
    sub: "Philippines e-wallet",
    popular: false,
    flag: "🇵🇭",
  },
  {
    id: "grabpay",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10S19.523 4 14 4z" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M14 9v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    label: "GrabPay",
    sub: "SEA super-app wallet",
    popular: false,
    flag: "🇲🇾",
  },
  {
    id: "transfer",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 14h20M18 8l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Bank Transfer",
    sub: "Direct transfer, all countries",
    popular: false,
  },
  {
    id: "truemoney",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3" y="8" width="22" height="14" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M3 13h22" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="8" cy="18" r="1.5" fill="currentColor"/>
      </svg>
    ),
    label: "TrueMoney",
    sub: "Thailand e-wallet",
    popular: false,
    flag: "🇹🇭",
  },
  {
    id: "dana",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M10 18V10h4a4 4 0 010 8h-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    label: "DANA",
    sub: "Indonesia e-wallet",
    popular: false,
    flag: "🇮🇩",
  },
];

/* ─────────────────────────────────────────────
   INSTALLMENT PLANS
───────────────────────────────────────────── */
const PLANS = [
  {
    course: "120-Hour Premier",
    slug: "120-hour-premier-online-tefl-course",
    price: "£149",
    color: "teal",
    options: [
      { label: "Pay in full", amount: "£149", saving: "Save £1", perMonth: null, tag: "Best value" },
      { label: "3 instalments", amount: "3 × £50", saving: null, perMonth: "£50/mo", tag: null },
    ],
  },
  {
    course: "Level 5 Diploma",
    slug: "168-hour-level-5-tefl-diploma",
    price: "£299",
    color: "navy",
    options: [
      { label: "Pay in full", amount: "£299", saving: "Save £1", perMonth: null, tag: "Best value" },
      { label: "3 instalments", amount: "3 × £100", saving: null, perMonth: "£100/mo", tag: null },
    ],
  },
  {
    course: "30-Hr Online Course",
    slug: "30-hour-teach-english-online-course",
    price: "£59",
    color: "gold",
    options: [
      { label: "Pay in full", amount: "£59", saving: null, perMonth: null, tag: "One payment" },
    ],
  },
];

/* ─────────────────────────────────────────────
   TRUST SIGNALS
───────────────────────────────────────────── */
const TRUST_SIGNALS = [
  { icon: "🔒", text: "256-bit SSL encryption" },
  { icon: "↩️", text: "30-day money-back guarantee" },
  { icon: "♾️", text: "Lifetime access, one payment" },
  { icon: "📧", text: "No subscription. No hidden fees." },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export function PaymentSection() {
  return (
    <section className="pay-section" aria-label="Payment options">

      {/* Ambient glow */}
      <div className="pay-orb pay-orb--1" aria-hidden="true" />
      <div className="pay-orb pay-orb--2" aria-hidden="true" />

      <div className="container pay-container">

        {/* ── Header ── */}
        <div className="pay-header reveal">
          <p className="hp-eyebrow hp-eyebrow-teal">Flexible payment</p>
          <h2 className="pay-heading">Simple pricing.<br />No surprises.</h2>
          <p className="pay-sub">
            Pay in full or spread the cost. Choose the method that works for you —
            card, e-wallet, or bank transfer. No credit card required to get started.
          </p>

          {/* "No credit card required" badge */}
          <div className="pay-no-card">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <circle cx="7.5" cy="7.5" r="6.5" stroke="#22c99a" strokeWidth="1.5"/>
              <path d="M4.5 7.5l2 2 4-4" stroke="#22c99a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            No credit card required to create your account
          </div>
        </div>

        {/* ── Main grid: instalment plans + payment methods ── */}
        <div className="pay-main-grid reveal">

          {/* LEFT — Instalment plans */}
          <div className="pay-plans">
            <h3 className="pay-col-label">Choose how you pay</h3>

            <div className="pay-plan-list">
              {PLANS.map((plan) => (
                <div key={plan.course} className={`pay-plan pay-plan--${plan.color}`}>
                  <div className="pay-plan-head">
                    <span className="pay-plan-course">{plan.course}</span>
                    <span className={`pay-plan-price pay-plan-price--${plan.color}`}>{plan.price}</span>
                  </div>

                  <div className="pay-plan-options">
                    {plan.options.map((opt) => (
                      <div key={opt.label} className="pay-plan-option">
                        <div className="pay-plan-option-left">
                          <span className="pay-plan-option-label">{opt.label}</span>
                          <span className="pay-plan-option-amount">{opt.amount}</span>
                        </div>
                        <div className="pay-plan-option-right">
                          {opt.tag && (
                            <span className={`pay-plan-tag ${opt.tag === "Best value" ? "pay-plan-tag--green" : "pay-plan-tag--grey"}`}>
                              {opt.tag}
                            </span>
                          )}
                          {opt.perMonth && (
                            <span className="pay-plan-per">{opt.perMonth}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link href={`/courses/${plan.slug}`} className={`pay-plan-cta pay-plan-cta--${plan.color}`}>
                    Enrol now
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                      <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Payment methods */}
          <div className="pay-methods">
            <h3 className="pay-col-label">Accepted payment methods</h3>

            <div className="pay-methods-grid">
              {PAYMENT_METHODS.map((m) => (
                <div key={m.id} className={`pay-method ${m.popular ? "pay-method--popular" : ""}`}>
                  {m.popular && (
                    <span className="pay-method-popular-badge">Popular</span>
                  )}
                  <span className="pay-method-icon">{m.icon}</span>
                  <div className="pay-method-text">
                    <span className="pay-method-label">
                      {m.flag && <span className="pay-method-flag">{m.flag}</span>}
                      {m.label}
                    </span>
                    <span className="pay-method-sub">{m.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Regional note */}
            <p className="pay-regional-note">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M6.5 5.5v4M6.5 4h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Regional e-wallets (GCash, Maya, GrabPay, TrueMoney, DANA) are available
              at checkout. Availability varies by country.
            </p>
          </div>
        </div>

        {/* ── Trust signals strip ── */}
        <div className="pay-trust reveal-stagger">
          {TRUST_SIGNALS.map((t) => (
            <div key={t.text} className="pay-trust-item">
              <span className="pay-trust-icon" aria-hidden="true">{t.icon}</span>
              <span className="pay-trust-text">{t.text}</span>
            </div>
          ))}
        </div>

        {/* ── Help line ── */}
        <p className="pay-help reveal">
          Questions about payment?{" "}
          <a href="mailto:support@teflseaacademy.com" className="pay-help-link">
            Contact our support team
          </a>{" "}
          — we reply within 24 hours.
        </p>

      </div>
    </section>
  );
}
