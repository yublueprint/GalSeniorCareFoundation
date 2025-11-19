"use client";

import SignUpForm from "@/components/SignUpForm";
import VerifyModal from "@/components/VerifyModal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SignUpPage = () => {
  const [verifyPending, setVerifyPending] = useState<boolean>(false);

  if (verifyPending) {
    return <VerifyModal />;
  }

  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="absolute top-6 right-6">
        <Image src="/galLogo.svg" alt="galLogo" width={100} height={100} />
      </div>

      <div className="flex items-center text-center justify-center p-10 bg-[#f1bb79] rounded-r-xl">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-2">Welcome</h1>
          <p className="font-bold mb-8">Already have an account?</p>
          <Image src="/loginpage.svg" alt="landing" width={250} height={250} />
          <Link href="/login">
            <button className="cursor-pointer mt-10 py-2 px-4 rounded-md border w-full font-bold text-xl">
              Log In
            </button>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center p-10">
        <SignUpForm onNeedVerify={() => setVerifyPending(true)} />
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

export default SignUpPage;
