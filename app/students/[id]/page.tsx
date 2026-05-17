import { createClient } from "@/lib/supabase/server";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: student } = await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

  if (!student) {
    return (
      <div className="p-8">
        Student not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Student Profile
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage student information.
        </p>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>
            {student.full_name}
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">
              Full Name
            </label>

            <Input
              value={student.full_name || ""}
              readOnly
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Email
            </label>

            <Input
              value={student.email || ""}
              readOnly
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Phone
            </label>

            <Input
              value={student.phone || ""}
              readOnly
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Course
            </label>

            <Input
              value={student.course_name || ""}
              readOnly
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Date of Birth
            </label>

            <Input
              value={student.dob || ""}
              readOnly
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Study Mode
            </label>

            <Input
              value={student.study_mode || ""}
              readOnly
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">
              Address
            </label>

            <Input
              value={student.address || ""}
              readOnly
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}