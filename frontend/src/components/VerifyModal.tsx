"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase/firebase";
import { Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RESENT_COOLDOWN = 59;

export default function VerifyModal() {
  const router = useRouter();
  const { sendEmailVerification, signOut } = useAuth();
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [polling, setPolling] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const pollRef = useRef<number | null>(null);

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  const handleSend = async () => {
    setSending(true);
    setMessage(null);
    try {
      await sendEmailVerification();
      setMessage(
        "Verification email sent. Please check your inbox. If you don't see it, check your spam folder."
      );
      setCooldown(RESENT_COOLDOWN);
      setPolling(true);
    } catch (err) {
      setMessage("Failed to send verification email. Please try again.");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (cooldown <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setCooldown((prev) => {
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
  }, [cooldown]);

  useEffect(() => {
    if (!polling) return;
    pollRef.current = window.setInterval(async () => {
      try {
        if (auth.currentUser) {
          await auth.currentUser.reload();
          if (auth.currentUser.emailVerified) {
            if (pollRef.current) {
              clearInterval(pollRef.current);
              pollRef.current = null;
            }
            setPolling(false);
            router.push("/");
          }
        }
      } catch (err) {}
    }, 3000);
    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [polling, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">

      <div className="shadow-lg p-12 max-w-md w-full text-center">
        <div className="flex justify-center mb-10">
          <div className="w-24 h-24 rounded-full border-4 border-[#f1bb79] flex items-center justify-center">
            <Mail className="w-12 h-12 text-[#f1bb79]" />
          </div>
        </div>
        <h1 className="text-2xl mb-10">Verify Your Email Address</h1>
        <p className="text-base mb-8">
          To start your journey, confirm your email address to verify your
          account.
        </p>

        {message && <p className="mt-4 text-sm font-semibold">{message}</p>}
      </div>

      <button
        onClick={handleSend}
        disabled={sending || cooldown > 0}
        className="cursor-pointer mt-8 w-sm py-2 rounded-md bg-[#f1bb79] shadow-[3px_3px_0_#d09a58] font-bold text-xl hover:bg-[#f1bb79]/85 disabled:opacity-80"
      >
        {sending
          ? "Sending..."
          : cooldown > 0
          ? `Resend in ${cooldown}s`
          : "Click to Verify"}
      </button>

      <button
        onClick={handleSignOut}
        className="cursor-pointer mt-4 w-sm text-xl font-bold py-2 rounded-md border hover:bg-gray-100"
      >
        Log Out
      </button>

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
}
