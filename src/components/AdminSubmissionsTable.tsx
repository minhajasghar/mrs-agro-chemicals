"use client";

import { useState, useMemo } from "react";

type Submission = {
  id: number;
  formType: string;
  name: string;
  contactInfo: string;
  message: string;
  status: string;
  createdAt: Date;
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-brand-orange/15 text-brand-orange border-brand-orange/20",
  contacted:
    "bg-brand-light-green/15 text-brand-dark-green border-brand-light-green/20",
  closed: "bg-stone-100 text-stone-500 border-stone-200",
};

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  closed: "Closed",
};

function isPhone(value: string): boolean {
  const cleaned = value.replace(/[\s\-\(\)]/g, "");
  return /^\+?\d{6,15}$/.test(cleaned);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cleanPhone(value: string): string {
  return value.replace(/[\s\-\(\)]/g, "");
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminSubmissionsTable({
  submissions,
}: {
  submissions: Submission[];
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [localStatuses, setLocalStatuses] = useState<Record<number, string>>(
    () => {
      const map: Record<number, string> = {};
      for (const s of submissions) {
        map[s.id] = s.status;
      }
      return map;
    }
  );

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      const nameMatch = s.name.toLowerCase().includes(search.toLowerCase());
      const infoMatch = s.contactInfo
        .toLowerCase()
        .includes(search.toLowerCase());
      const statusMatch =
        statusFilter === "all" || localStatuses[s.id] === statusFilter;
      return (nameMatch || infoMatch) && statusMatch;
    });
  }, [submissions, search, statusFilter, localStatuses]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: submissions.length };
    for (const s of submissions) {
      counts[s.status] = (counts[s.status] || 0) + 1;
    }
    return counts;
  }, [submissions]);

  async function handleStatusChange(id: number, newStatus: string) {
    const prev = localStatuses[id];
    setLocalStatuses((m) => ({ ...m, [id]: newStatus }));
    try {
      const res = await fetch(
        `/api/admin/submissions/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!res.ok) throw new Error();
    } catch {
      setLocalStatuses((m) => ({ ...m, [id]: prev }));
    }
  }

  return (
    <div className="space-y-4">
      {/* Toolbar: Search + Status Filter + Export */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by name or contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm text-stone-700 placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Status Tabs */}
          <div className="flex rounded-xl border border-stone-200 bg-white p-0.5 shadow-sm">
            {["all", "new", "contacted", "closed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  statusFilter === tab
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                {tab === "all"
                  ? `All (${statusCounts.all})`
                  : `${STATUS_LABELS[tab]} (${statusCounts[tab] || 0})`}
              </button>
            ))}
          </div>

          {/* Export CSV */}
          <a
            href="/api/admin/submissions/export"
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-600 shadow-sm transition-colors hover:bg-stone-50 hover:text-stone-800"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export CSV
          </a>
        </div>
      </div>

      {/* Submission List */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center">
          <p className="text-3xl">
            {search || statusFilter !== "all" ? "🔍" : "📭"}
          </p>
          <p className="mt-3 text-lg font-medium text-stone-600">
            {search || statusFilter !== "all"
              ? "No submissions match your filter"
              : "No submissions yet"}
          </p>
          <p className="mt-1 text-sm text-stone-400">
            {search || statusFilter !== "all"
              ? "Try adjusting your search or filter."
              : "Contact form submissions will appear here once visitors start using the form."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((s) => {
            const isExpanded = expandedId === s.id;
            const phone = cleanPhone(s.contactInfo);
            const hasPhone = isPhone(s.contactInfo);
            const hasEmail = isEmail(s.contactInfo);

            return (
              <div
                key={s.id}
                className="rounded-2xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="p-5">
                  {/* Top row: date + status badge */}
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs text-stone-400 font-mono">
                      {formatDate(new Date(s.createdAt))}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                        STATUS_COLORS[localStatuses[s.id]] ||
                        "bg-stone-100 text-stone-500"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          localStatuses[s.id] === "new"
                            ? "bg-brand-orange"
                            : localStatuses[s.id] === "contacted"
                              ? "bg-brand-dark-green"
                              : "bg-stone-400"
                        }`}
                      />
                      {STATUS_LABELS[localStatuses[s.id]] || localStatuses[s.id]}
                    </span>
                  </div>

                  {/* Name + Contact */}
                  <h3 className="text-base font-bold text-stone-800 mb-1">
                    {s.name}
                  </h3>
                  <p className="text-sm text-stone-500 mb-3 break-words">
                    {s.contactInfo}
                  </p>

                  {/* Message */}
                  <div className="mb-4">
                    <p
                      className={`text-sm text-stone-600 leading-relaxed ${
                        !isExpanded ? "line-clamp-2" : ""
                      }`}
                    >
                      {s.message}
                    </p>
                    {s.message.length > 120 && (
                      <button
                        onClick={() =>
                          setExpandedId(isExpanded ? null : s.id)
                        }
                        className="mt-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                      >
                        {isExpanded ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>

                  {/* Actions row */}
                  <div className="flex items-center gap-2 pt-3 border-t border-stone-100">
                    {/* Contact quick-actions */}
                    <div className="flex items-center gap-1.5">
                      {hasPhone && (
                        <>
                          <a
                            href={`https://wa.me/${phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
                            title="Open WhatsApp"
                          >
                            <svg
                              className="h-3.5 w-3.5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp
                          </a>
                          <a
                            href={`tel:${phone}`}
                            className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                            title="Call"
                          >
                            <svg
                              className="h-3.5 w-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            Call
                          </a>
                        </>
                      )}
                      {hasEmail && (
                        <a
                          href={`mailto:${s.contactInfo}`}
                          className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100"
                          title="Send Email"
                        >
                          <svg
                            className="h-3.5 w-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          Email
                        </a>
                      )}
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Status change dropdown */}
                    <div className="relative">
                      <select
                        value={localStatuses[s.id]}
                        onChange={(e) =>
                          handleStatusChange(s.id, e.target.value)
                        }
                        className="appearance-none rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-600 cursor-pointer hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      >
                        <option value="new">Mark: New</option>
                        <option value="contacted">Mark: Contacted</option>
                        <option value="closed">Mark: Closed</option>
                      </select>
                      <svg
                        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-stone-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
