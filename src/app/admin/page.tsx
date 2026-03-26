import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { AdminLogin } from "@/components/admin/AdminLogin";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const authed = await isAdminAuthenticated();

  if (authed) {
    redirect("/admin/dashboard");
  }

  const params = await searchParams;
  const error = params.error;

  return <AdminLogin error={error} />;
}
