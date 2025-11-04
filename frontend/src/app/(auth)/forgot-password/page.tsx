"use client";
import { useAuth } from "@/context/AuthContext";
import * as Form from "@radix-ui/react-form";
import Link from "next/link";
import { FormEvent, useState } from "react";

const ForgotPasswordPage = () => {
  const { sendPasswordResetEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(email);
      setMessage(
        "If an account with that email exists, a password reset link has been sent."
      );
    } catch (error) {
      setMessage("An error occurred while sending the reset email.");
      console.error("Password reset failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl font-bold mb-8">Reset Password</div>

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
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Control>
          </Form.Field>

          <p className="mb-4 text-sm">
            Enter the email associated with your account and we&apos;ll send a
            link to reset your password.
          </p>

          {message && <div className="mb-2 text-sm font-bold">{message}</div>}

          <Form.Submit asChild>
            <button
              type="submit"
              className="mt-6 w-full py-2 rounded-md bg-[#f1bb79] shadow-[3px_3px_0_#d09a58] font-bold text-xl hover:bg-[#f1bb79]/85 disabled:opacity-60"
              disabled={!email}
            >
              Send Reset Email
            </button>
          </Form.Submit>

          <Link href="/login">
            <button className="mt-4 w-full py-2 rounded-md border hover:bg-gray-100">
              Back to Log In
            </button>
          </Link>
        </form>
      </Form.Root>
    </div>
  );
};

export default ForgotPasswordPage;
