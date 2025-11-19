"use client";
import { useAuth } from "@/context/AuthContext";
import * as Form from "@radix-ui/react-form";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";

const VALID_TIME = 60 * 60;

const formatTime = (secs: number) => {
  const m = Math.floor(secs / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(secs % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

const ForgotPasswordPage = () => {
  const { sendPasswordResetEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState<number>(VALID_TIME);
  const [timerStarted, setTimerStarted] = useState(false);
  const timerRef = useRef<number | null>(null);

  const startTimer = (startFrom = VALID_TIME) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerStarted(true);
    setTimeLeft(startFrom);
    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(email);
      setMessage(
        "An email has been sent to your inbox. Click the reset link provided. If you don't see it, check your spam folder."
      );
      startTimer();
    } catch (error) {
      setMessage("An error occurred while sending the reset email.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="absolute top-6 right-6">
        <Image src="/galLogo.svg" alt="galLogo" width={100} height={100} />
      </div>

      <div className="flex items-center text-center justify-center p-10 bg-[#f1bb79] rounded-r-xl">
        <Image src="/loginpage.svg" alt="password" width={400} height={400} />
      </div>

      <div className="flex items-center justify-center p-10">
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <div className="text-4xl font-bold mb-20">Reset your Password</div>

          <Form.Root asChild>
            <form className="w-full" onSubmit={handleSubmit}>
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Control>
                <Form.Message
                  match="typeMismatch"
                  className="text-sm text-red-500 mt-1 font-bold"
                >
                  Please enter a valid email address.
                </Form.Message>
              </Form.Field>

              {message && <div className="mb-4 text-sm">{message}</div>}

              {timerStarted && (
                <div className="text-sm text-gray-600 mb-4">
                  Reset link will become invalid in {formatTime(timeLeft)}.
                </div>
              )}

              <Form.Submit asChild>
                <button
                  type="submit"
                  className="cursor-pointer mt-40 w-full py-2 rounded-md bg-[#f1bb79] shadow-[3px_3px_0_#d09a58] font-bold text-xl hover:bg-[#f1bb79]/85 disabled:opacity-60"
                  disabled={!email}
                >
                  Reset
                </button>
              </Form.Submit>
            </form>
          </Form.Root>
        </div>
      </div>

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

export default ForgotPasswordPage;
