"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ShoppingBag,
  DollarSign,
  BarChart2,
  FileText,
  MessageCircle,
  HelpCircle,
  Bell,
  ChevronDown,
  Menu,
  X,
  PanelLeftClose,
  PanelRightClose,
} from "lucide-react";
import logo from "../assets/images/logo.png";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/" },
  { label: "User Management", icon: Users, href: "/admin/users" },
  // { label: "Project Oversight", icon: FolderKanban, href: "/admin/project-oversight" },
  { label: "Product & Marketplace", icon: ShoppingBag, href: "/admin/marketplace" },
  { label: "Financials", icon: DollarSign, href: "/admin/financials" },
  { label: "Financial Reports", icon: BarChart2, href: "/admin/financial" },
  { label: "Reports", icon: BarChart2, href: "/admin/reports" },
  { label: "Contact Messages", icon: MessageCircle, href: "/admin/contact" },
  // { label: "Communication", icon: MessageCircle, href: "/admin/communication" },
  // { label: "Roles & Permissions", icon: FileText, href: "/admin/roles" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("adminUser");
      if (storedUser) {
        try {
          setAdmin(JSON.parse(storedUser));
        } catch (e) {
          console.error("Error parsing admin user", e);
        }
      }
    }
  }, []);

  const adminName = admin ? `${admin.firstName} ${admin.lastName}` : "Admin User";
  const firstName = admin ? admin.firstName : "Admin";
  const initials = admin ? `${admin.firstName?.[0] || ""}${admin.lastName?.[0] || ""}` : "AD";

  const pageTitle =
    pathname === "/"
      ? `Good Morning, ${firstName}`
      : navItems.find((item) => pathname === item.href)?.label ||
      navItems.find((item) => pathname.startsWith(item.href + "/"))?.label ||
      "Dashboard";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setDropdownOpen(false);
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen w-full max-w-full overflow-x-hidden bg-[#f5f6fa] font-sans relative">
      {/* ── Mobile Hamburger ── */}
      <button
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        className="lg:hidden fixed top-4 left-4 z-[300] bg-[#FFC700] border-none rounded-xl p-2 cursor-pointer flex items-center justify-center shadow-md hover:scale-105 transition-transform"
      >
        {sidebarOpen ? (
          <X size={22} className="text-[#1a1a2e]" />
        ) : (
          <Menu size={22} className="text-[#1a1a2e]" />
        )}
      </button>

      {/* ── Overlay (mobile) ── */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[150] lg:hidden"
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-[#1a1a2e] flex flex-col z-[200]
          transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden
          ${isCollapsed ? "lg:w-[80px]" : "lg:w-[200px]"} w-[200px]
          ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
          lg:translate-x-0 lg:shadow-none
        `}
      >
        {/* Logo and Collapse Toggle */}
        <div
          className="flex items-center bg-white gap-2 px-5 py-2.5 border-b border-white/10"
          style={{ justifyContent: isCollapsed ? 'center' : 'space-between' }}
        >
          {!isCollapsed && <Image src={logo} alt="Mejarc Logo" width={100} height={40} priority />}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors border-none bg-transparent cursor-pointer"
          >
            {isCollapsed ? <PanelRightClose size={20} /> : <PanelLeftClose size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <ul className="flex flex-col gap-1 list-none m-0 p-0">
            {navItems.map(({ label, icon: Icon, href }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

              return (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={closeSidebar}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                      no-underline transition-all duration-200 cursor-pointer whitespace-nowrap
                      ${isCollapsed ? "justify-center" : ""}
                      ${isActive
                        ? "bg-[#FFC700] text-[#1a1a2e] font-semibold shadow-md shadow-yellow-400/30"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }
                    `}
                    title={isCollapsed ? label : undefined}
                  >
                    <Icon
                      size={18}
                      className={`flex-shrink-0 ${isActive ? "text-[#1a1a2e]" : "text-gray-300"}`}
                    />
                    {!isCollapsed && label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Help Center / Inbox Card */}
        {!isCollapsed && (
          <div className="mx-3 mb-5 bg-[#FFF8E7] rounded-2xl p-4 flex flex-col items-center text-center border border-yellow-200">
            <div className="w-10 h-10 bg-[#FFC700] rounded-full flex items-center justify-center mb-2.5">
              <HelpCircle size={20} className="text-white" />
            </div>
            <h4 className="text-[13px] font-bold text-[#1a1a2e] m-0 mb-1">Inbox</h4>
            <p className="text-[11px] text-gray-600 m-0 mb-3 leading-relaxed">
              Customer queries and project issues
            </p>
            <button className="bg-[#FFC700] text-[#1a1a2e] border-none rounded-full py-2 px-4 text-[12px] font-bold w-full cursor-pointer hover:bg-[#e5b300] hover:-translate-y-0.5 transition-all duration-200">
              See Message
            </button>
          </div>
        )}
      </aside>

      {/* ── Main Content ── */}
      <main className={`flex-1 flex flex-col min-h-screen w-full max-w-full overflow-x-hidden bg-[#f5f6fa] transition-all duration-300 ${isCollapsed ? "lg:ml-[80px]" : "lg:ml-[200px]"}`}>
        {/* ── Topbar ── */}
        <header className="flex items-center justify-between px-6 lg:px-8 py-4 bg-white border-b border-[#e8eaf0] sticky top-0 z-[100]">
          {/* Greeting — offset on mobile for hamburger */}
          <h1 className="text-lg lg:text-2xl font-bold text-[#1a1a2e] m-0 ml-10 lg:ml-0">
            {pageTitle}
          </h1>

          <div className="flex items-center gap-3 lg:gap-4">
            {/* Bell */}
            <div className="relative cursor-pointer text-gray-600 flex items-center">
              <Bell size={22} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </div>

            {/* User */}
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-[#FFC700] to-orange-400 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-[#1a1a2e] text-sm">{initials}</span>
                </div>
                <div className="hidden sm:flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-[#1a1a2e] max-w-[120px] truncate">
                    {adminName}
                  </span>
                  <span className="text-[11px] text-gray-600 uppercase font-bold tracking-tight">
                    {admin?.role || "Admin"}
                  </span>
                </div>
                <ChevronDown size={15} className="text-gray-600 hidden sm:block" />
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-[300] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100 sm:hidden">
                    <p className="text-sm font-bold text-[#1a1a2e] truncate">{adminName}</p>
                    <p className="text-xs text-gray-600 uppercase tracking-wider mt-0.5">
                      {admin?.role || "Admin"}
                    </p>
                  </div>
                  <ul className="py-2 list-none m-0 p-0">
                    <li>
                      <Link
                        href="/admin/settings"
                        className="flex items-center px-5 py-2.5 text-sm text-[#1a1a2e] hover:bg-gray-50 transition-colors no-underline"
                        onClick={() => setDropdownOpen(false)}
                      >
                        View Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/settings"
                        className="flex items-center px-5 py-2.5 text-sm text-[#1a1a2e] hover:bg-gray-50 transition-colors no-underline"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Account Settings
                      </Link>
                    </li>
                    <li className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        className="w-full text-left flex items-center px-5 py-3 text-sm text-red-600 font-semibold hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer"
                        onClick={handleLogout}
                      >
                        Log out safely
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 w-full max-w-full overflow-x-hidden p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
