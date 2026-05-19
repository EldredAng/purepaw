import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

import {
  createPet,
  deletePet,
} from "./actions";

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

export default async function PetsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
  }>;
}) {
  const supabase = await createClient();

  const { search } = await searchParams;

  let query = supabase
    .from("pets")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (search) {
    query = query.or(
      `pet_name.ilike.%${search}%,owner_name.ilike.%${search}%`
    );
  }

  const { data: pets } = await query;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Pets
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage pets information and profiles.
        </p>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Create Pet</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            action={createPet}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Input
              name="pet_name"
              placeholder="Pet Name"
              required
            />

            <Input
              name="breed"
              placeholder="Breed"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Gender
              </label>

              <select
                name="gender"
                className="w-full border rounded-xl px-4 py-3 bg-background"
              >
                <option value="">
                  Select Gender
                </option>

                <option value="male">
                  Male
                </option>

                <option value="female">
                  Female
                </option>
              </select>
            </div>

            <Input
              name="age"
              type="number"
              placeholder="Age"
            />

            <Input
              name="weight"
              type="number"
              step="0.1"
              placeholder="Weight (kg)"
            />

            <Input
              name="owner_name"
              placeholder="Owner Name"
            />

            <Input
              name="notes"
              placeholder="Notes"
            />

            <button
              type="submit"
              className="bg-black text-white rounded-xl py-3"
            >
              Create Pet
            </button>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Pet Records</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="mb-6">
            <Input
              name="search"
              placeholder="Search pets..."
              defaultValue={search || ""}
            />
          </form>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pet Name</TableHead>

                <TableHead>Breed</TableHead>

                <TableHead>Gender</TableHead>

                <TableHead>Age</TableHead>

                <TableHead>Weight</TableHead>

                <TableHead>Owner</TableHead>

                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {pets?.map((pet) => (
                <TableRow key={pet.id}>
                  <TableCell className="font-medium">
                    {pet.pet_name}
                  </TableCell>

                  <TableCell>
                    {pet.breed || "-"}
                  </TableCell>

                  <TableCell>
                    <Badge>
                      {pet.gender || "-"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {pet.age || "-"}
                  </TableCell>

                  <TableCell>
                    {pet.weight || "-"} kg
                  </TableCell>

                  <TableCell>
                    {pet.owner_name || "-"}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/pets/${pet.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View / Edit
                      </Link>

                      <form
                        action={async () => {
                          "use server";

                          await deletePet(pet.id);
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