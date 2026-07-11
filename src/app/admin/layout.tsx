"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";

const navItems = [
  {
    label: "Dashboard",
    labelUr: "ڈیش بورڈ",
    href: "/admin",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    label: "Products",
    labelUr: "مصنوعات",
    href: "/admin/products",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    label: "Newsletter",
    labelUr: "نیوز لیٹر",
    href: "/admin/newsletter",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "Settings",
    labelUr: "ترتیبات",
    href: "/admin/settings",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },

];

function getBreadcrumbs(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  return parts.map((part, i) => ({
    label: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "),
    href: "/" + parts.slice(0, i + 1).join("/"),
  }));
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const isUrdu = language === "ur";
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("admin-theme") as "light" | "dark" | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("admin-theme", theme);
    document.documentElement.classList.add(theme === "dark" ? "admin-dark" : "admin-light");
    document.documentElement.classList.remove(theme === "dark" ? "admin-light" : "admin-dark");
    return () => {
      document.documentElement.classList.remove("admin-dark", "admin-light");
    };
  }, [theme, mounted]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <div className="min-h-screen flex"
      style={{
        backgroundColor: "var(--admin-bg)",
        color: "var(--admin-text)",
      }}
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 shrink-0 border-r transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          backgroundColor: "var(--admin-sidebar)",
          borderColor: "var(--admin-border)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b" style={{ borderColor: "var(--admin-border)" }}>
          <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-white/10">
            <Image
              src="/images/logo.jpeg"
              alt="MRS Agro Chemicals"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-bold truncate leading-tight" style={{ color: "var(--admin-text)" }}>
              MRS Agro Chemicals
            </h1>
            <p className="text-[10px] font-medium tracking-wider uppercase" style={{ color: "var(--admin-text-muted)" }}>
              Admin Panel
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto admin-scrollbar px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 group ${
                  active
                    ? "text-white shadow-sm"
                    : "hover:bg-[var(--admin-sidebar-hover)]"
                }`}
                style={{
                  backgroundColor: active ? "var(--admin-sidebar-active)" : "transparent",
                  color: active ? "#ffffff" : "var(--admin-text-secondary)",
                }}
              >
                <span className={`shrink-0 transition-transform duration-200 ${
                  active ? "scale-110" : "group-hover:scale-110"
                }`}>
                  {item.icon}
                </span>
                <span className="truncate">
                  {isUrdu ? item.labelUr : item.label}
                </span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t px-3 py-3" style={{ borderColor: "var(--admin-border)" }}>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-[var(--admin-sidebar-hover)] cursor-pointer"
            style={{ color: "var(--admin-text-secondary)" }}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            <span>{isUrdu ? "لاگ آؤٹ" : "Logout"}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden">
        {/* Top Bar */}
        <header
          className="sticky top-0 z-30 h-16 border-b backdrop-blur-xl"
          style={{
            backgroundColor: `color-mix(in srgb, var(--admin-bg) 80%, transparent)`,
            borderColor: "var(--admin-border)",
          }}
        >
          <div className="flex items-center justify-between h-full px-4 lg:px-6 gap-4">
            {/* Left: Hamburger + Breadcrumb */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-[var(--admin-hover)] transition-colors cursor-pointer"
                style={{ color: "var(--admin-text-secondary)" }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

              {/* Breadcrumb */}
              <nav className="hidden sm:flex items-center gap-1.5 text-sm min-w-0">
                {breadcrumbs.map((crumb, i) => (
                  <span key={crumb.href} className="flex items-center gap-1.5 min-w-0">
                    {i > 0 && (
                      <svg className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--admin-text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d={isUrdu ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                      </svg>
                    )}
                    <Link
                      href={crumb.href}
                      className={`truncate transition-colors hover:opacity-80 ${
                        i === breadcrumbs.length - 1
                          ? "font-semibold"
                          : ""
                      }`}
                      style={{
                        color: i === breadcrumbs.length - 1
                          ? "var(--admin-text)"
                          : "var(--admin-text-muted)",
                      }}
                    >
                      {isUrdu ? (crumb.label === "Dashboard" ? "ڈیش بورڈ" :
                        crumb.label === "Products" ? "مصنوعات" :
                        crumb.label === "Submissions" ? "انکوائریز" :
                        crumb.label === "Franchise" ? "فرنچائز" :
                        crumb.label === "Newsletter" ? "نیوز لیٹر" :
                        crumb.label === "Settings" ? "ترتیبات" :
                        crumb.label) : crumb.label}
                    </Link>
                  </span>
                ))}
              </nav>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 hover:bg-[var(--admin-hover)] cursor-pointer"
                style={{ color: "var(--admin-text-secondary)" }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.78.147 2.653.255m-5.147 5.795c-.58.926-1.272 1.782-2.057 2.553" />
                </svg>
                <span className="hidden sm:inline">{isUrdu ? "English" : "اردو"}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-xl transition-all duration-200 hover:bg-[var(--admin-hover)] cursor-pointer"
                style={{ color: "var(--admin-text-secondary)" }}
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {theme === "dark" ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                )}
              </button>

              {/* Search */}
              <button
                className="p-2 rounded-xl transition-all duration-200 hover:bg-[var(--admin-hover)] cursor-pointer"
                style={{ color: "var(--admin-text-secondary)" }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-2.5 pl-2 border-l ml-1" style={{ borderColor: "var(--admin-border)" }}>
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-medium" style={{ color: "var(--admin-text)" }}>
                    Admin
                  </p>
                  <p className="text-[10px]" style={{ color: "var(--admin-text-muted)" }}>
                    {isUrdu ? "منتظم" : "Administrator"}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-emerald-900/20">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main
          className="flex-1 overflow-y-auto admin-scrollbar p-4 lg:p-6 xl:p-8"
          style={{ backgroundColor: "var(--admin-bg)" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
