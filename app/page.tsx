import { supabase } from "@/lib/supabase/client";

export default async function HomePage() {
  const { data, error } = await supabase
    .from("test")
    .select("*");

  console.log(data);
  console.log(error);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-5xl font-bold">
        PurePaw Connected
      </h1>
    </main>
  );
}