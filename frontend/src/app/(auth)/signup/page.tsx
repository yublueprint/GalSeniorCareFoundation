"use client";
import * as Form from "@radix-ui/react-form";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { AuthError } from "@/types/auth";

const RESEND_COOLDOWN = 60;

const SignUpPage = () => {
  const { signUp, sendEmailVerification, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  const canSubmit = email.trim() !== "" && password !== "";

  useEffect(() => {
    if (cooldownRemaining <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setCooldownRemaining((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [cooldownRemaining]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const startCooldown = (seconds = RESEND_COOLDOWN) => {
    setCooldownRemaining(seconds);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      await signUp(email.trim(), password);
      await sendEmailVerification();
      setEmailSent(true);
      startCooldown();
    } catch (err: unknown) {
      console.error("Sign up failed:", err);
      const error = err as AuthError;
      if (error?.code === "auth/email-already-in-use") {
        setError("An account with that email already exists.");
      } else if (error?.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Invalid email format. Please enter a valid email.");
      }
    }
  };

  const handleResend = async () => {
    if (resending || cooldownRemaining > 0) return;

    setResending(true);
    try {
      await sendEmailVerification();
      startCooldown();
    } catch (err) {
      console.error("Resend failed:", err);
    } finally {
      setResending(false);
    }
  };

  const formatCooldown = (seconds: number) => {
    if (seconds <= 0) return "";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}:${s.toString().padStart(2, "0")}` : `${s}s`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl font-bold">Create An Account</div>

      {!emailSent ? (
        <Form.Root asChild>
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <Form.Field name="email" className="mb-4 flex flex-col">
              <Form.Label className="text-2xl font-bold">Email</Form.Label>
              <Form.Control asChild>
                <input
                  name="email"
                  type="email"
                  required
                  className="border rounded-md h-10 px-3 focus:outline-none focus:border-[#f1bb79] focus:ring-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="password" className="mb-4 flex flex-col">
              <Form.Label className="text-2xl font-bold">Password</Form.Label>
              <Form.Control asChild>
                <input
                  name="password"
                  type="password"
                  required
                  className="border rounded-md h-10 px-3 focus:outline-none focus:border-[#f1bb79] focus:ring-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Control>
            </Form.Field>

            {error && (
              <div className="mt-3 text-sm text-red-600 font-bold">{error}</div>
            )}

            <Form.Submit asChild>
              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="mt-6 w-full py-2 rounded-md bg-[#f1bb79] shadow-[3px_3px_0_#d09a58] font-bold text-xl hover:bg-[#f1bb79]/85 disabled:opacity-80"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </Form.Submit>

            <Link href="/login">
              <button className="mt-4 w-full py-2 rounded-md border hover:bg-gray-100">
                Have an account? Log In
              </button>
            </Link>
          </form>
        </Form.Root>
      ) : (
        <div className="w-full max-w-sm p-6 border rounded-md">
          <h2 className="text-2xl font-semibold mb-2">
            Verification Email Sent
          </h2>
          <p className="mb-4 text-sm">
            A verification email was sent to <strong>{email}</strong>. Please
            check your inbox (and spam folder) and follow the link to verify
            your email.
          </p>

          <div className="flex gap-2 items-center">
            <button
              onClick={handleResend}
              disabled={resending || cooldownRemaining > 0}
              className="py-2 px-4 rounded-md bg-[#f1bb79] font-medium hover:bg-[#f1bb79]/90 disabled:opacity-60"
            >
              {resending ? "Resending..." : "Resend Email"}
            </button>

            <Link href="/login">
              <button className="py-2 px-4 rounded-md border">
                Go to Log In
              </button>
            </Link>
          </div>

          {cooldownRemaining > 0 ? (
            <div className="mt-3 text-sm text-gray-700">
              You can resend the verification email in{" "}
              <strong>{formatCooldown(cooldownRemaining)}</strong>.
            </div>
          ) : (
            <div className="mt-3 text-sm text-gray-700">
              Didn&apos;t receive it? You can resend the email.
            </div>
          )}

          {error && (
            <div className="mt-3 text-sm text-red-600 font-bold">{error}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
