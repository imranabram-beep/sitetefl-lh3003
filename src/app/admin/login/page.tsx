import { LoginForm } from "@/components/forms";

export default function AdminLoginPage() {
  return (
    <main className="section-page">
      <section className="section centered">
        <div className="container narrow">
          <LoginForm endpoint="/api/auth/admin-login" title="Admin login" />
        </div>
      </section>
    </main>
  );
}
