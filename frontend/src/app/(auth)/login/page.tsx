"use client";
import { useAuth } from "@/context/AuthContext";
import * as Form from "@radix-ui/react-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const { signIn, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = (formData.get("email") || "").toString();
    const password = (formData.get("password") || "").toString();

    try {
      await signIn(email, password);
      router.push("/");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl font-bold">Log In</div>
      <Image src="/loginpage.svg" alt="login" width={250} height={250} />

      <Form.Root asChild>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <Form.Field name="email" className="mb-4 flex flex-col">
            <Form.Label className="text-2xl font-bold">Email</Form.Label>
            <Form.Control asChild>
              <input
                name="email"
                type="email"
                required
                className="border rounded-md h-10 px-3"
              />
            </Form.Control>
          </Form.Field>

          <Form.Field name="password" className="flex flex-col">
            <Form.Label className="text-2xl font-bold">Password</Form.Label>
            <Form.Control asChild>
              <input
                name="password"
                type="password"
                required
                className="border rounded-md h-10 px-3"
              />
            </Form.Control>
          </Form.Field>

          <Link href="/forgot-password" className="underline font-semibold">
            Forgot your email or password?
          </Link>

          {/* Temporary error message display */}
          {error && (
            <div className="mt-3 text-sm text-red-600 font-bold">{error}</div>
          )}

          <Form.Submit asChild>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full py-2 rounded-md bg-[#f1bb79] shadow-[3px_3px_0_#d09a58] font-bold text-xl hover:bg-[#f1bb79]/85 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </Form.Submit>

          <Link href="/signup">
            <button className="mt-4 w-full py-2 rounded-md border hover:bg-gray-100">
              Don&apos;t have an account? Sign Up
            </button>
          </Link>
        </form>
      </Form.Root>
    </div>
  );
};

export default LoginPage;
