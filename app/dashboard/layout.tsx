import Sidebar from "@/components/layout/sidebar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Logged in as
          </p>

          <h2 className="text-xl font-semibold">
            {user.email}
          </h2>
        </div>

        {children}
      </main>
    </div>
  );
}