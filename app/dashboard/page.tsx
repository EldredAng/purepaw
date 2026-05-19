import { createClient } from "@/lib/supabase/server";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { count: studentCount } = await supabase
    .from("students")
    .select("*", {
      count: "exact",
      head: true,
    });

  const { count: attendanceCount } = await supabase
    .from("attendance")
    .select("*", {
      count: "exact",
      head: true,
    });

  const { count: presentCount } = await supabase
    .from("attendance")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("status", "present");

  const { count: absentCount } = await supabase
    .from("attendance")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("status", "absent");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p className="text-muted-foreground mt-2">
          Welcome to PurePaw SaaS platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">
              {studentCount || 0}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Total Attendance</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">
              {attendanceCount || 0}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Present</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">
              {presentCount || 0}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Absent</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">
              {absentCount || 0}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}