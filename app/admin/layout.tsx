import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUserWithRole } from "@/lib/auth";
import { getPendingBookingsCount } from "@/lib/bookings";
import { Logo } from "@/components/brand/Logo";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getCurrentUserWithRole();

  if (!session) {
    redirect("/connexion?suivant=/admin");
  }
  if (!session.isAdmin) {
    redirect("/");
  }

  const pendingCount = await getPendingBookingsCount();

  return (
    <div className="flex min-h-screen w-full bg-ivory text-black">
      <aside className="flex w-60 shrink-0 flex-col gap-6 border-r border-black/10 bg-white px-5 py-6">
        <Link href="/" aria-label="Horizon — Accueil">
          <Logo />
        </Link>
        <AdminNav pendingCount={pendingCount} />
      </aside>

      <main className="flex-1 px-8 py-10">{children}</main>
    </div>
  );
}
