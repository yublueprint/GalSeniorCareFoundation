"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { user, signOut, loading } = useAuth();
  const handleGoToProfile = () => {
    router.push("/profile");
  };

  if (loading) return null;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-3 py-2 border-b bg-white">
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
        <div className="flex items-center gap-4">
        {/* Profile Button */}
          <button
            onClick={handleGoToProfile}
            className="px-4 py-2 rounded-md bg-[#f1bb79] shadow-[3px_3px_0_#d09a58] font-bold hover:bg-[#f1bb79]/85 transition-colors flex items-center gap-2  cursor-pointer ">
                Profile
          </button>
        {/* Log Out Button */}
          <button
            onClick={signOut}
            className="px-4 py-2 rounded-md bg-[#f1bb79] shadow-[3px_3px_0_#d09a58] font-bold hover:bg-[#f1bb79]/85 transition-colors flex items-center gap-2  cursor-pointer ">
                Log Out
          </button>

        </div>
      )}
    </header>
  );
}
