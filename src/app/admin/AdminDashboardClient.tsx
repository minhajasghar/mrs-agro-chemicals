"use client";

import Link from "next/link";

type RecentContact = {
  id: number;
  type: "contact";
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
};

type RecentFranchise = {
  id: number;
  type: "franchise";
  name: string;
  phone: string;
  city: string;
  status: string;
  createdAt: string;
};

type RecentItem = {
  id: number;
  type: "contact" | "franchise";
  name: string;
  status: string;
  date: string;
  subtitle: string;
  iconType: "contact" | "franchise";
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(iso);
}

const statusConfig: Record<string, { label: string; dot: string; bg: string }> = {
  new: {
    label: "New",
    dot: "bg-amber-400",
    bg: "bg-amber-500/10 text-amber-600",
  },
  contacted: {
    label: "Contacted",
    dot: "bg-emerald-400",
    bg: "bg-emerald-500/10 text-emerald-600",
  },
  closed: {
    label: "Closed",
    dot: "bg-stone-400",
    bg: "bg-stone-500/10 text-stone-500",
  },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] || statusConfig.new;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider ${cfg.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export default function AdminDashboardClient({
  totalProducts,
  totalCategories,
  totalInquiries,
  totalFranchise,
  totalNewsletter,
  totalUnread,
  recentSubmissions,
  recentFranchise,
}: {
  totalProducts: number;
  totalCategories: number;
  totalInquiries: number;
  totalFranchise: number;
  totalNewsletter: number;
  totalUnread: number;
  recentSubmissions: RecentContact[];
  recentFranchise: RecentFranchise[];
}) {
  const allRecent: RecentItem[] = [
    ...recentSubmissions.map((s): RecentItem => ({
      id: s.id,
      type: "contact",
      name: s.name,
      status: s.status,
      date: s.createdAt,
      subtitle: s.email,
      iconType: "contact",
    })),
    ...recentFranchise.map((s): RecentItem => ({
      id: s.id,
      type: "franchise",
      name: s.name,
      status: s.status,
      date: s.createdAt,
      subtitle: `${s.phone} · ${s.city}`,
      iconType: "franchise",
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
   .slice(0, 8);

  const statCards = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      gradient: "from-emerald-600 to-emerald-700",
      bg: "bg-emerald-500/10",
      textColor: "text-emerald-600",
    },
    {
      label: "Categories",
      value: totalCategories,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg>
      ),
      gradient: "from-violet-600 to-violet-700",
      bg: "bg-violet-500/10",
      textColor: "text-violet-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--admin-text)" }}>
            Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--admin-text-muted)" }}>
            Overview of your platform activity
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium" style={{ backgroundColor: "var(--admin-surface)", color: "var(--admin-text-secondary)", border: "1px solid var(--admin-border)" }}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          System Online
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="relative group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5"
            style={{
              backgroundColor: "var(--admin-card)",
              border: "1px solid var(--admin-border)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.bg}`}>
                <span className={card.textColor}>{card.icon}</span>
              </div>
            </div>
            <p className="text-3xl font-bold tracking-tight" style={{ color: "var(--admin-text)" }}>
              {card.value}
            </p>
            <p className="text-sm font-medium mt-1.5" style={{ color: "var(--admin-text-secondary)" }}>
              {card.label}
            </p>
            {/* Gradient accent line */}
            <div className={`absolute bottom-0 left-5 right-5 h-0.5 rounded-full bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          </div>
        ))}
      </div>

      {/* Simplified Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Welcome Info Banner */}
        <div
          className="lg:col-span-2 rounded-2xl p-6 flex flex-col justify-between"
          style={{
            backgroundColor: "var(--admin-card)",
            border: "1px solid var(--admin-border)",
          }}
        >
          <div>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--admin-text)" }}>
              Welcome to Mrs. Agro Chemicals Admin Panel
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--admin-text-secondary)" }}>
              You are logged in to the control center. Use this portal to manage your products and check category structures.
            </p>
            <div className="p-4 rounded-xl border flex gap-3 items-start text-xs leading-relaxed" style={{ borderColor: "var(--admin-border)", backgroundColor: "var(--admin-surface)" }}>
              <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <span className="font-bold block mb-1 text-amber-600">Email Delivery Notice:</span>
                Contact and Franchise submissions are sent directly to your registered email address <strong>mrsagrochemicals1133@gmail.com</strong>.
              </div>
            </div>
          </div>
          <div className="pt-4 text-xs" style={{ color: "var(--admin-text-muted)" }}>
            Need help? Contact support or settings.
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: "var(--admin-card)",
            border: "1px solid var(--admin-border)",
          }}
        >
          <h2 className="text-base font-bold mb-5" style={{ color: "var(--admin-text)" }}>
            Quick Actions
          </h2>
          <div className="space-y-2">
            <Link
              href="/admin/products"
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-[var(--admin-hover)] group"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: "var(--admin-text)" }}>
                  Products Catalog
                </p>
                <p className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
                  Browse & edit product catalog
                </p>
              </div>
              <svg className="w-4 h-4" style={{ color: "var(--admin-text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
