"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createPet(
  formData: FormData
) {
  const supabase = await createClient();

  const pet_name = formData.get("pet_name") as string;

  const breed = formData.get("breed") as string;

  const gender = formData.get("gender") as string;

  const age = Number(
    formData.get("age")
  );

  const weight = Number(
    formData.get("weight")
  );

  const owner_name =
    formData.get("owner_name") as string;

  const notes =
    formData.get("notes") as string;

  const { error } = await supabase
    .from("pets")
    .insert([
      {
        pet_name,
        breed,
        gender,
        age,
        weight,
        owner_name,
        notes,
      },
    ]);

  if (error) {
    console.error(error.message);
    return;
  }

  redirect("/pets");
}

export async function deletePet(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("pets")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error.message);
    return;
  }

  redirect("/pets");
}