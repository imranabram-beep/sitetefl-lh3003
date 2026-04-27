import type { Metadata } from "next";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Admin Panel - siteTeFL",
  description: "Bulk email management and campaign tools",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  // Get email from user object
  const userEmail =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    "";

  console.log("🔐 User Email:", userEmail);
  console.log("🔐 User Object:", user);

  const adminEmails = ["imran.abram@gmail.com"];

  // Check if user is admin (case-insensitive)
  const isAdmin = adminEmails.some(
    (email) => email.toLowerCase() === userEmail.toLowerCase()
  );

  console.log("🔐 Is Admin?", isAdmin);

  if (!isAdmin) {
    console.log("❌ Access Denied");
    redirect("/");
  }

  console.log("✅ Admin Access Granted");

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "📊" },
    { label: "Contacts", href: "/admin/contacts", icon: "👥" },
    { label: "Templates", href: "/admin/templates", icon: "📧" },
    { label: "Campaigns", href: "/admin/campaigns", icon: "📬" },
    { label: "Analytics", href: "/admin/analytics", icon: "📈" },
    { label: "Settings", href: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-xl flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center font-bold text-white">
              S
            </div>
            <div>
              <h1 className="text-xl font-bold">siteTeFL</h1>
              <p className="text-xs text-slate-400">Admin</p>
            </div>
          </div>
          <p className="text-slate-300 text-xs mt-2">Email Campaign Manager</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-all duration-200 text-slate-100 hover:text-white group"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 px-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-200 truncate">{userEmail}</p>
              <p className="text-xs text-slate-400">Admin</p>
            </div>
            <UserButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h2 className="text-gray-900 font-semibold text-lg">Control Panel</h2>
            <p className="text-xs text-gray-500 mt-0.5">Manage your email campaigns</p>
          </div>
          <div className="text-right text-sm text-gray-600">
            📧 siteTeFL Email Manager
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-8 max-w-7xl mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}