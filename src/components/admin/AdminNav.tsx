"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", label: "Tableau de bord" },
  { href: "/admin/demandes", label: "Demandes" },
  { href: "/admin/benevoles", label: "Bénévoles" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <nav className="bg-[#1A3A5C] text-white">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-6">
          <Link
            href="/admin/dashboard"
            className="font-bold text-sm no-underline text-white"
          >
            1‰ Admin
          </Link>
          <div className="flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded text-sm no-underline transition-colors ${
                  pathname === item.href
                    ? "bg-white/20 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/fr"
            className="text-xs text-white/50 no-underline hover:text-white"
          >
            Voir le site
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs text-white/50 hover:text-white bg-transparent border-none cursor-pointer"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}
