import { createClient } from "@/lib/supabase/server";

import { addWeightLog } from "./weight-actions";
import { addGroomingLog } from "./grooming-actions";
import { updatePet } from "./actions";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

export default async function PetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: pet } = await supabase
    .from("pets")
    .select("*")
    .eq("id", id)
    .single();

  const { data: weightLogs } = await supabase
    .from("pet_weight_logs")
    .select("*")
    .eq("pet_id", id)
    .order("recorded_at", {
      ascending: false,
    });

  const { data: groomingLogs } = await supabase
    .from("pet_grooming_logs")
    .select("*")
    .eq("pet_id", id)
    .order("grooming_date", {
      ascending: false,
    });

  if (!pet) {
    return (
      <div className="p-8">
        Pet not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Pet Profile
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage pet information.
        </p>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>
            {pet.pet_name}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            action={async (formData) => {
              "use server";

              await updatePet(id, formData);
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Pet Name
              </label>

              <Input
                name="pet_name"
                defaultValue={pet.pet_name || ""}
                placeholder="Pet Name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Breed
              </label>

              <Input
                name="breed"
                defaultValue={pet.breed || ""}
                placeholder="Breed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Gender
              </label>

              <select
                name="gender"
                defaultValue={pet.gender || ""}
                className="w-full border rounded-xl px-4 py-3 bg-background"
              >
                <option value="male">
                  Male
                </option>

                <option value="female">
                  Female
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Age
              </label>

              <Input
                name="age"
                type="number"
                defaultValue={pet.age || ""}
                placeholder="Age"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Weight (kg)
              </label>

              <Input
                name="weight"
                type="number"
                step="0.1"
                defaultValue={pet.weight || ""}
                placeholder="Weight"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Owner Name
              </label>

              <Input
                name="owner_name"
                defaultValue={pet.owner_name || ""}
                placeholder="Owner Name"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium">
                Notes
              </label>

              <Input
                name="notes"
                defaultValue={pet.notes || ""}
                placeholder="Notes"
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

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>
            Weight Tracking
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form
            action={async (formData) => {
              "use server";

              await addWeightLog(id, formData);
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <Input
              name="weight"
              type="number"
              step="0.1"
              placeholder="Weight (kg)"
              required
            />

            <Input
              name="recorded_at"
              type="date"
              required
            />

            <Input
              name="notes"
              placeholder="Notes"
            />

            <button
              type="submit"
              className="bg-black text-white rounded-xl py-3 md:col-span-3"
            >
              Add Weight Record
            </button>
          </form>

          <div className="space-y-4">
            {weightLogs?.map((log) => (
              <div
                key={log.id}
                className="border rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold">
                    {log.weight} kg
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {log.recorded_at}
                  </p>
                </div>

                <div>
                  <p className="text-sm">
                    {log.notes || "-"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>
            Grooming History
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form
            action={async (formData) => {
              "use server";

              await addGroomingLog(id, formData);
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Input
              name="grooming_date"
              type="date"
              required
            />

            <select
              name="grooming_type"
              className="w-full border rounded-xl px-4 py-3 bg-background"
            >
              <option value="full-grooming">
                Full Grooming
              </option>

              <option value="bath">
                Bath
              </option>

              <option value="nail-trim">
                Nail Trim
              </option>

              <option value="ear-cleaning">
                Ear Cleaning
              </option>
            </select>

            <Input
              name="groomer_name"
              placeholder="Groomer Name"
            />

            <Input
              name="notes"
              placeholder="Notes"
            />

            <button
              type="submit"
              className="bg-black text-white rounded-xl py-3 md:col-span-2"
            >
              Add Grooming Record
            </button>
          </form>

          <div className="space-y-4">
            {groomingLogs?.map((log) => (
              <div
                key={log.id}
                className="border rounded-xl p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">
                    {log.grooming_type}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {log.grooming_date}
                  </p>
                </div>

                <p className="text-sm">
                  Groomer: {log.groomer_name || "-"}
                </p>

                <p className="text-sm">
                  {log.notes || "-"}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}