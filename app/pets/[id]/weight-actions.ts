"use server";

import { createClient } from "@/lib/supabase/server";

export async function addWeightLog(
  petId: string,
  formData: FormData
) {
  const supabase = await createClient();

  const weight = Number(
    formData.get("weight")
  );

  const notes =
    formData.get("notes") as string;

  const recorded_at =
    formData.get("recorded_at") as string;

  const { error } = await supabase
    .from("pet_weight_logs")
    .insert([
      {
        pet_id: petId,
        weight,
        notes,
        recorded_at,
      },
    ]);

  if (error) {
    console.error(error.message);
  }
}