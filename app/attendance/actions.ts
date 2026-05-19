"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createAttendance(
  formData: FormData
) {
  const supabase = await createClient();

  const student_id = formData.get("student_id") as string;

  const attendance_date =
    formData.get("attendance_date") as string;

  const status = formData.get("status") as string;

  const remarks = formData.get("remarks") as string;

  const { error } = await supabase
    .from("attendance")
    .insert([
      {
        student_id,
        attendance_date,
        status,
        remarks,
      },
    ]);

  if (error) {
    console.error(error.message);
    return;
  }

  redirect("/attendance");
}