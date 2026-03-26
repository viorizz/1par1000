import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return <AdminLogin />;
  }

  redirect("/admin/dashboard");
}
