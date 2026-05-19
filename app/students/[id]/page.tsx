import { createClient } from "@/lib/supabase/server";

import { updateStudent } from "./actions";

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
          Update student information.
        </p>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>
            {student.full_name}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            action={async (formData) => {
              "use server";

              await updateStudent(id, formData);
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="text-sm font-medium">
                Full Name
              </label>

              <Input
                name="full_name"
                defaultValue={student.full_name || ""}
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Email
              </label>

              <Input
                name="email"
                defaultValue={student.email || ""}
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Phone
              </label>

              <Input
                name="phone"
                defaultValue={student.phone || ""}
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Course
              </label>

              <Input
                name="course_name"
                defaultValue={student.course_name || ""}
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Date of Birth
              </label>

              <Input
                name="dob"
                type="date"
                defaultValue={student.dob || ""}
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Study Mode
              </label>

              <select
                name="study_mode"
                defaultValue={student.study_mode || ""}
                className="w-full border rounded-xl px-4 py-3 bg-background"
              >
                <option value="full-time">
                  Full Time
                </option>

                <option value="part-time">
                  Part Time
                </option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Grooming Experience
              </label>

              <select
                name="grooming_experience"
                defaultValue={
                  student.grooming_experience
                    ? "yes"
                    : "no"
                }
                className="w-full border rounded-xl px-4 py-3 bg-background"
              >
                <option value="yes">
                  Yes
                </option>

                <option value="no">
                  No
                </option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">
                Address
              </label>

              <Input
                name="address"
                defaultValue={student.address || ""}
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-black text-white rounded-xl px-6 py-3"
              >
                Save Changes
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}