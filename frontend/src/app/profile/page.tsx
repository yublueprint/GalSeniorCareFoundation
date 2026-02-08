"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>

      <div className="space-y-4 text-sm">
        <div>
          <p className="text-gray-500">Display Name</p>
          <p className="font-medium">
            {user.displayName || "No Name Provided"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>

        <div>
          <p className="text-gray-500">Account Created</p>
          <p className="font-medium">
            {new Date(user.metadata.creationTime!).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
