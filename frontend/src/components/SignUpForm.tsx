"use client";
import * as Form from "@radix-ui/react-form";
import { FormEvent, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { AuthError } from "@/types/auth";

type Props = {
  onNeedVerify: () => void;
};

const SignUpForm = ({ onNeedVerify }: Props) => {
  const { signUp, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    name.trim() !== "" && email.trim() !== "" && password !== "";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      await signUp(name.trim(), email.trim(), password);
      onNeedVerify?.();
    } catch (err: unknown) {
      console.log("Error caught:", err);
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

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl font-bold mb-8">Create An Account</div>
      <Form.Root asChild>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <Form.Field name="name" className="mb-8 flex flex-col">
            <Form.Label className="text-md font-bold">Enter Name</Form.Label>
            <Form.Control asChild>
              <input
                name="name"
                type="text"
                required
                className="border rounded-md h-10 px-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field name="email" className="mb-8 flex flex-col">
            <Form.Label className="text-md font-bold">Enter Email</Form.Label>
            <Form.Control asChild>
              <input
                name="email"
                type="email"
                required
                className="border rounded-md h-10 px-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Control>
            <Form.Message
              match="typeMismatch"
              className="text-sm text-red-600 mt-1 font-bold"
            >
              Please enter a valid email address
            </Form.Message>
          </Form.Field>

          <Form.Field name="password" className="mb-8 flex flex-col">
            <Form.Label className="text-md font-bold">
              Enter Password
            </Form.Label>
            <Form.Control asChild>
              <input
                name="password"
                type="password"
                required
                className="border rounded-md h-10 px-3"
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
        </form>
      </Form.Root>
    </div>
  );
};

export default SignUpForm;
