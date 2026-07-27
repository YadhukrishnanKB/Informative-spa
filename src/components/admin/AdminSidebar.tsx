"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const links = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/pages", label: "Pages", icon: "📄" },
  { href: "/admin/theme", label: "Theme", icon: "🎨" },
  { href: "/admin/messages", label: "Messages", icon: "✉️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      <Link href="/admin" className="text-xl font-bold mb-8 block" style={{ color: "var(--primary)" }}>
        Admin Panel
      </Link>
      <nav className="space-y-1">
        {links.map((link) => {
          const active = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                active ? "text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
              style={active ? { backgroundColor: "var(--primary)" } : {}}
            >
              <span>{link.icon}</span>
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-8 pt-6 border-t">
        <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <span>🏠</span>
          <span className="font-medium">View Site</span>
        </Link>
        <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors mt-1">
          <span>🚪</span>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
