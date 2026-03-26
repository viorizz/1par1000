import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin");

  return <AdminDashboard />;
}
