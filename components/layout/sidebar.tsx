import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-72 border-r bg-muted/40 min-h-screen flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-3xl font-bold tracking-tight">
          PurePaw
        </h1>

        <p className="text-sm text-muted-foreground mt-2">
          Pet Grooming SaaS Platform
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/dashboard"
          className="block rounded-xl px-4 py-3 hover:bg-muted transition"
        >
          Dashboard
        </Link>

        <Link
          href="/students"
          className="block rounded-xl px-4 py-3 hover:bg-muted transition"
        >
          Students
        </Link>

        <Link
          href="/attendance"
          className="block rounded-xl px-4 py-3 hover:bg-muted transition"
        >
          Attendance
        </Link>

        <Link
          href="/pets"
          className="block rounded-xl px-4 py-3 hover:bg-muted transition"
        >
          Pets
        </Link>

        <Link
          href="/materials"
          className="block rounded-xl px-4 py-3 hover:bg-muted transition"
        >
          Study Materials
        </Link>

        <Link
          href="/settings"
          className="block rounded-xl px-4 py-3 hover:bg-muted transition"
        >
          Settings
        </Link>
      </nav>

      <div className="p-4 border-t">
        <form action="/auth/signout" method="post">
          <button className="w-full rounded-xl bg-black text-white py-3 hover:opacity-90 transition">
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}