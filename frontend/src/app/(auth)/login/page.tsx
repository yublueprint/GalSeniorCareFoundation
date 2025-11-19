"use client";

import { useAuth } from "@/context/AuthContext";
import * as Form from "@radix-ui/react-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const { signIn } = useAuth();
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute left-6 top-6">
        <Image src="/galLogo.svg" alt="galLogo" width={100} height={100} />
      </div>

      <main className="w-full px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="text-4xl font-bold">Log In</div>
          <Image src="/loginpage.svg" alt="login" width={250} height={250} />

          <Form.Root asChild>
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
              <Form.Field name="email" className="mb-4 flex flex-col">
                <Form.Label className="text-md font-bold">
                  Enter Email
                </Form.Label>
                <Form.Control asChild>
                  <input
                    name="email"
                    type="email"
                    required
                    className="border rounded-md h-10 px-3"
                  />
                </Form.Control>
                <Form.Message
                  match="valueMissing"
                  className="text-sm text-red-600 mt-1 font-bold"
                >
                  Please enter your email address.
                </Form.Message>
              </Form.Field>

              <Form.Field name="password" className="flex flex-col">
                <Form.Label className="text-md font-bold">
                  Enter Password
                </Form.Label>
                <Form.Control asChild>
                  <input
                    name="password"
                    type="password"
                    required
                    className="border rounded-md h-10 px-3 mb-2"
                  />
                </Form.Control>
              </Form.Field>

              <Link
                href="/forgot-password"
                className="cursor-pointer underline font-semibold"
              >
                Forgot your password?
              </Link>

              {error && (
                <div className="mt-3 text-sm text-red-600 font-bold">
                  {error}
                </div>
              )}

              <Form.Submit asChild>
                <button
                  type="submit"
                  className="cursor-pointer mt-6 w-full py-2 rounded-md bg-[#f1bb79] shadow-[3px_3px_0_#d09a58] font-bold text-xl hover:bg-[#f1bb79]/85 disabled:opacity-60"
                >
                  Log In
                </button>
              </Form.Submit>

              <Link href="/">
                <button className="cursor-pointer mt-4 w-full py-2 rounded-md border hover:bg-gray-100">
                  Don&apos;t have an account? Sign Up
                </button>
              </Link>
            </form>
          </Form.Root>
        </div>
      </main>

      <div className="absolute right-4 bottom-4 text-xl flex items-center gap-2 font-medium">
        Created by{" "}
        <Link href="https://yublueprint.org/">
          <Image
            src="/myblueprint.svg"
            alt="myblueprint"
            width={40}
            height={20}
          />
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
