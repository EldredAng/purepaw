"use server";

import { createClient } from "@/lib/supabase/server";

export async function updateStudent(
  id: string,
  formData: FormData
) {
  const supabase = await createClient();

  const full_name = formData.get("full_name") as string;

  const email = formData.get("email") as string;

  const phone = formData.get("phone") as string;

  const course_name = formData.get("course_name") as string;

  const dob = formData.get("dob") as string;

  const address = formData.get("address") as string;

  const study_mode = formData.get("study_mode") as string;

  const grooming_experience =
    formData.get("grooming_experience") === "yes";

  const { error } = await supabase
    .from("students")
    .update({
      full_name,
      email,
      phone,
      course_name,
      dob,
      address,
      study_mode,
      grooming_experience,
    })
    .eq("id", id);

  if (error) {
    console.error(error.message);
  }
}