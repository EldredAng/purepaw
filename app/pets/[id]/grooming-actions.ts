"use server";

import { createClient } from "@/lib/supabase/server";

export async function addGroomingLog(
  petId: string,
  formData: FormData
) {
  const supabase = await createClient();

  const grooming_date =
    formData.get("grooming_date") as string;

  const grooming_type =
    formData.get("grooming_type") as string;

  const groomer_name =
    formData.get("groomer_name") as string;

  const notes =
    formData.get("notes") as string;

  const { error } = await supabase
    .from("pet_grooming_logs")
    .insert([
      {
        pet_id: petId,
        grooming_date,
        grooming_type,
        groomer_name,
        notes,
      },
    ]);

  if (error) {
    console.error(error.message);
  }
}