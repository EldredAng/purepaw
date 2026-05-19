import { createClient } from "@/lib/supabase/server";

import { createAttendance } from "./actions";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

export default async function AttendancePage() {
  const supabase = await createClient();

  const { data: students } = await supabase
    .from("students")
    .select("*")
    .order("full_name");

  const { data: attendance } = await supabase
    .from("attendance")
    .select(`
      *,
      students (
        full_name
      )
    `)
    .order("attendance_date", {
      ascending: false,
    });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Attendance
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage student attendance records.
        </p>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>
            Mark Attendance
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            action={createAttendance}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Student
              </label>

              <select
                name="student_id"
                className="w-full border rounded-xl px-4 py-3 bg-background"
                required
              >
                <option value="">
                  Select Student
                </option>

                {students?.map((student) => (
                  <option
                    key={student.id}
                    value={student.id}
                  >
                    {student.full_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Attendance Date
              </label>

              <Input
                type="date"
                name="attendance_date"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Status
              </label>

              <select
                name="status"
                className="w-full border rounded-xl px-4 py-3 bg-background"
              >
                <option value="present">
                  Present
                </option>

                <option value="absent">
                  Absent
                </option>

                <option value="late">
                  Late
                </option>
              </select>
            </div>

            <Input
              name="remarks"
              placeholder="Remarks"
            />

            <button
              type="submit"
              className="bg-black text-white rounded-xl py-3"
            >
              Save Attendance
            </button>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>
            Attendance Records
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>

                <TableHead>Date</TableHead>

                <TableHead>Status</TableHead>

                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {attendance?.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    {
                      record.students?.full_name
                    }
                  </TableCell>

                  <TableCell>
                    {record.attendance_date}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        record.status === "present"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {record.remarks || "-"}
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