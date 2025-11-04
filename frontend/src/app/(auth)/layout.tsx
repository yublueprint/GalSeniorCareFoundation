import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute left-6 top-6">
        <Image src="/galLogo.svg" alt="galLogo" width={100} height={100} />
      </div>

      <main className="w-full px-4">{children}</main>

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

export default AuthLayout;
