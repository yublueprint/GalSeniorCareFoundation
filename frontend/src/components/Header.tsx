"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeftCircle, XCircle, Settings, UserCircle } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, signOut, loading } = useAuth();

  const handleGoToProfile = () => {
    router.push("/profile");
  };

  const handleBack = () => {
    router.back();
  };

  const handleQuit = () => {
    signOut();
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  const isModulePage = pathname.startsWith("/modules/");

  if (loading || !user || isModulePage) return null;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 border-b bg-white">
      {/* GSC Logo Button, redirects to homepage */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/GSC.svg"
          alt="GSC Logo"
          width={90}
          height={90}
        />
      </Link>

      {user && (
        <div className="flex items-center gap-6">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors cursor-pointer font-medium"
          >
            <ArrowLeftCircle size={28} strokeWidth={1.5} />
            <span>Back</span>
          </button>

          {/* Quit Button */}
          <button
            onClick={handleQuit}
            className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors cursor-pointer font-medium"
          >
            <XCircle size={28} strokeWidth={1.5} />
            <span>Quit</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={handleSettings}
            className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors cursor-pointer font-medium"
          >
            <Settings size={28} strokeWidth={1.5} />
            <span>Settings</span>
          </button>

          {/* Profile Button */}
          <button
            onClick={handleGoToProfile}
            className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors cursor-pointer font-medium"
          >
            <UserCircle size={28} strokeWidth={1.5} />
            <span>Profile</span>
          </button>
        </div>
      )}
    </header>
  );
}
