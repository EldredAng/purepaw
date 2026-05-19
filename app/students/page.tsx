import { createClient } from "@/lib/supabase/server";
import {
  createStudent,
  deleteStudent,
} from "./actions";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
  }>;
}) {
  const supabase = await createClient();

  const { search } = await searchParams;

  let query = supabase
    .from("students")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (search) {
    query = query.or(
      `full_name.ilike.%${search}%,email.ilike.%${search}%`
    );
  }

  const { data: students } = await query;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Students
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage grooming academy students.
        </p>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Create Student</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            action={createStudent}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Input
              name="full_name"
              placeholder="Full Name"
              required
            />

            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
            />

            <Input
              name="phone"
              placeholder="Phone Number"
            />

            <Input
              name="course_name"
              placeholder="Course Name"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Date of Birth
              </label>

              <Input
                name="dob"
                type="date"
              />
            </div>

            <Input
              name="address"
              placeholder="Address"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Study Mode
              </label>

              <select
                name="study_mode"
                className="w-full border rounded-xl px-4 py-3 bg-background"
              >
                <option value="">
                  Select Study Mode
                </option>

                <option value="full-time">
                  Full Time
                </option>

                <option value="part-time">
                  Part Time
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Grooming Experience
              </label>

              <select
                name="grooming_experience"
                className="w-full border rounded-xl px-4 py-3 bg-background"
              >
                <option value="no">
                  No
                </option>

                <option value="yes">
                  Yes
                </option>
              </select>
            </div>

            <Input
              name="profile_photo_url"
              placeholder="Profile Photo URL"
            />

            <button
              type="submit"
              className="bg-black text-white rounded-xl py-3"
            >
              Create Student
            </button>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Student Records</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="mb-6">
            <Input
              name="search"
              placeholder="Search students..."
              defaultValue={search || ""}
            />
          </form>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>

                <TableHead>Email</TableHead>

                <TableHead>Phone</TableHead>

                <TableHead>Course</TableHead>

                <TableHead>Study Mode</TableHead>

                <TableHead>Experience</TableHead>

                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {students?.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    {student.full_name}
                  </TableCell>

                  <TableCell>
                    {student.email}
                  </TableCell>

                  <TableCell>
                    {student.phone || "-"}
                  </TableCell>

                  <TableCell>
                    {student.course_name || "-"}
                  </TableCell>

                  <TableCell>
                    {student.study_mode || "-"}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        student.grooming_experience
                          ? "default"
                          : "secondary"
                      }
                    >
                      {student.grooming_experience
                        ? "Experienced"
                        : "Beginner"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/students/${student.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View / Edit
                      </Link>

                      <form
                        action={async () => {
                          "use server";

                          await deleteStudent(student.id);
                        }}
                      >
                        <button className="text-red-600 hover:underline">
                          Delete
                        </button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}