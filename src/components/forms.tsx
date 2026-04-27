"use client";

import { useState } from "react";

type LoginResponse = {
  success: boolean;
  message: string;
  redirectTo?: string;
};

export function LoginForm({ endpoint, title }: { endpoint: string; title: string }) {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage("");

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password")
      })
    });

const result = (await response.json()) as LoginResponse;

if (result.success && result.redirectTo) {
  window.location.href = result.redirectTo;
  return;
}

setMessage(
  result.message + (result.redirectTo ? ` Redirect: ${result.redirectTo}` : "")
);
setLoading(false);
  }

  return (
    <form
      action={handleSubmit}
      className="form-card"
    >
      <div className="section-intro tight">
        <p className="eyebrow">Secure access</p>
        <h2>{title}</h2>
        <p>Use the demo credentials from the README or wire this into your own auth service.</p>
      </div>
      <label>
        Email
        <input type="email" name="email" placeholder="name@example.com" required />
      </label>
      <label>
        Password
        <input type="password" name="password" placeholder="••••••••" required />
      </label>
      <button type="submit" className="button" disabled={loading}>
        {loading ? "Signing in..." : "Log in"}
      </button>
      {message ? <p className="form-message">{message}</p> : null}
    </form>
  );
}

type CheckoutResponse = {
  success: boolean;
  message: string;
  reference: string;
};

export function CheckoutForm() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        course: formData.get("course"),
        market: formData.get("market"),
        paymentMethod: formData.get("paymentMethod")
      })
    });

    const result = (await response.json()) as CheckoutResponse;
    setMessage(`${result.message} Reference: ${result.reference}`);
    setLoading(false);
  }

  return (
    <form action={handleSubmit} className="form-card">
      <div className="section-intro tight">
        <p className="eyebrow">Enrollment checkout</p>
        <h2>Secure your seat</h2>
        <p>Built to support SEA payment preferences and installment options.</p>
      </div>
      <div className="grid-two">
        <label>
          Full name
          <input type="text" name="fullName" placeholder="Amina Rahman" required />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="amina@example.com" required />
        </label>
      </div>
      <div className="grid-two">
        <label>
          Course
          <select name="course" defaultValue="120-hour-premier-online-tefl-course">
            <option value="120-hour-premier-online-tefl-course">120-hour Premier Online TEFL Course</option>
            <option value="250-hour-level-5-diploma">250-hour Level 5 TEFL Diploma</option>
            <option value="140-hour-combined-tefl-course">140-hour Combined TEFL Course</option>
          </select>
        </label>
        <label>
          Market
          <select name="market" defaultValue="Singapore">
            <option>Singapore</option>
            <option>Thailand</option>
            <option>Vietnam</option>
            <option>Malaysia</option>
            <option>Philippines</option>
            <option>Indonesia</option>
          </select>
        </label>
      </div>
      <label>
        Payment method
        <select name="paymentMethod" defaultValue="Card">
          <option>Card</option>
          <option>PromptPay</option>
          <option>GrabPay</option>
          <option>GCash</option>
          <option>FPX</option>
          <option>Bank transfer</option>
          <option>3-part instalments</option>
        </select>
      </label>
      <button type="submit" className="button" disabled={loading}>
        {loading ? "Processing..." : "Complete payment"}
      </button>
      {message ? <p className="form-message">{message}</p> : null}
    </form>
  );
}
