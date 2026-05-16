import { signup } from "../actions/auth";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 border rounded-2xl">
        <h1 className="text-3xl font-bold mb-6">
          Create PurePaw Account
        </h1>

        <form action={signup} className="space-y-4">
          <div>
            <label className="block mb-2">
              Email
            </label>

            <input
              name="email"
              type="email"
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-2">
              Password
            </label>

            <input
              name="password"
              type="password"
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Create password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
}