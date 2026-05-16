import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p className="text-muted-foreground mt-2">
          Welcome to PurePaw SaaS platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Total Pets</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Attendance</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">0%</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Study Materials</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}