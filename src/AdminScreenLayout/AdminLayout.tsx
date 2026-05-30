"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import logo from "../assets/images/logo.png";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/" },
  { label: "User Management", icon: Users, href: "/admin/users" },
  { label: "Project Oversight", icon: FolderKanban, href: "/admin/project-oversight" },
  { label: "Marketplace", icon: ShoppingBag, href: "/admin/marketplace" },
  { label: "Financials", icon: DollarSign, href: "/admin/financials" },
  { label: "Reports", icon: BarChart2, href: "/admin/reports" },
  { label: "Communication", icon: MessageCircle, href: "/admin/communication" },
  { label: "Roles & Permissions", icon: FileText, href: "/admin/roles" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const pageTitle =
  pathname === "/"
    ? "Good Morning, Roland"
    : navItems.find((item) => pathname === item.href)?.label ||
      navItems.find((item) => pathname.startsWith(item.href + "/"))?.label ||
      "Dashboard";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    // <div className="flex min-h-screen bg-[#f5f6fa] font-sans relative">
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
          transition-transform duration-300 ease-in-out overflow-y-auto overflow-x-hidden
          w-[200px]
          ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
          lg:translate-x-0 lg:shadow-none
        `}
      >
        {/* Logo */}
        <div className="flex items-center bg-white gap-2 px-5 py-2.5 border-b border-white/10">
          <Image src={logo} alt="Mejarc Logo" width={100} height={40} priority />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <ul className="flex flex-col gap-1 list-none m-0 p-0">
            {navItems.map(({ label, icon: Icon, href }) => {
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);

              return (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={closeSidebar}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                      no-underline transition-all duration-200 cursor-pointer whitespace-nowrap
                      ${isActive
                        ? "bg-[#FFC700] text-[#1a1a2e] font-semibold shadow-md shadow-yellow-400/30"
                        : "text-gray-400 hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >
                    <Icon
                      size={18}
                      className={`flex-shrink-0 ${isActive ? "text-[#1a1a2e]" : "text-gray-400"}`}
                    />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Help Center / Inbox Card */}
        <div className="mx-3 mb-5 bg-[#FFF8E7] rounded-2xl p-4 flex flex-col items-center text-center border border-yellow-200">
          <div className="w-10 h-10 bg-[#FFC700] rounded-full flex items-center justify-center mb-2.5">
            <HelpCircle size={20} className="text-white" />
          </div>
          <h4 className="text-[13px] font-bold text-[#1a1a2e] m-0 mb-1">Inbox</h4>
          <p className="text-[11px] text-gray-500 m-0 mb-3 leading-relaxed">
            Customer queries and project issues
          </p>
          <button className="bg-[#FFC700] text-[#1a1a2e] border-none rounded-full py-2 px-4 text-[12px] font-bold w-full cursor-pointer hover:bg-[#e5b300] hover:-translate-y-0.5 transition-all duration-200">
            See Message
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      {/* <main className="flex-1 flex flex-col min-h-screen lg:ml-[200px] bg-[#f5f6fa]"> */}
      <main className="flex-1 flex flex-col min-h-screen w-full max-w-full overflow-x-hidden lg:ml-[200px] bg-[#f5f6fa]">
        {/* ── Topbar ── */}
        <header className="flex items-center justify-between px-6 lg:px-8 py-4 bg-white border-b border-[#e8eaf0] sticky top-0 z-[100]">
          {/* Greeting — offset on mobile for hamburger */}
          <h1 className="text-lg lg:text-2xl font-bold text-[#1a1a2e] m-0 ml-10 lg:ml-0">
            {pageTitle}
          </h1>

          <div className="flex items-center gap-3 lg:gap-4">
            {/* Bell */}
            <div className="relative cursor-pointer text-gray-500 flex items-center">
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
              <span className="font-bold text-[#1a1a2e] text-sm">RE</span>
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-semibold text-[#1a1a2e]">Roland Emm...</span>
              <span className="text-[11px] text-gray-500">Admin</span>
            </div>
            <ChevronDown size={15} className="text-gray-400 hidden sm:block" />
          </div>
          {/* Dropdown */}
          {dropdownOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[300]">
              <ul className="py-1">
                <li>
                  <Link
                    href="/admin/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      // Handle Logout
                      setDropdownOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        {/* <div className="flex-1 p-4 lg:p-6"> */}
        <div className="flex-1 w-full max-w-full overflow-x-hidden p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
