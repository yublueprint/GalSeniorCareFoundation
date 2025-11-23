"use client";
import * as Form from "@radix-ui/react-form";
import { FormEvent, use, useState } from "react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase/firebase";

import Image from "next/image";
import Link from "next/dist/client/link";

export default function moduleLandingPage() {
    const router = useRouter();
    const { user } = useAuth();
    
    useEffect(() => {
        console.group("Check auth: ", user);
        if (user == undefined){
            console.log("loading");
            return; //case 1, user is loading, so do nothing and avoid flashing
        }
        if (!user) { 
            console.log("no user detected, redirecting to main page");
            router.push("/"); //case 2, user has not been detected so redirect to main page
            return;
        }

        console.log("user detected, stay on page");
    }, [user, router]); //otherwise user is logged in and verified so stay on the page

    const handleGoToModules = () => {
        router.push("/"); //update after module page created
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative px-4">
              <div className="absolute left-6 top-6">
                <Image src="/galLogo.svg" alt="galLogo" width={100} height={100} />
              </div>
        
            <main className="w-full max-w-2xl flex flex-col items-center text-center">
                <div className="flex flex-col items-center justify-center mb-6">
                    <h2 className="
                    text-[26px] font-medium">
                        Welcome to the </h2> 
                    <h1 className="
                    text-[45px] font-semibold">
                        Gal Senior Care Scam Simulator</h1>
                </div>

                {/* TODO ADD VIDEO and replace placeholder */}
                <div className="bg-zinc-500 w-[700px] h-[400px]"/>

                <Form.Submit asChild>
                    <button
                    onClick={handleGoToModules}
                    type="button"
                    className="
                    flex items-center
                    gap-[22px]
                    cursor-pointer mt-6 w-60 py-4 px-8
                    rounded-md bg-[#f1bb79] 
                    shadow-[3px_3px_0_#d09a58] 
                    font-bold text-xl leading-[150%]
                    hover:bg-[#f1bb79]/85 disabled:opacity-60
                    transition-all duration-200
                    hover:shadow-[6px_7px_0.5px_hsla(33,_56%,_58%,1)]"
                    >   
                        Go to Modules
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="15" 
                        height="15" 
                        viewBox="0 0 15 15" 
                        fill="none"
                        className="arrow-icon"
                        >
                            <path d="M1 6.36395C0.447715 6.36395 0 6.81167 0 7.36395C0 7.91624 0.447715 8.36395 1 8.36395V7.36395V6.36395ZM14.7071 8.07106C15.0976 7.68054 15.0976 7.04737 14.7071 6.65685L8.34315 0.292885C7.95262 -0.0976395 7.31946 -0.0976395 6.92893 0.292885C6.53841 0.683409 6.53841 1.31657 6.92893 1.7071L12.5858 7.36395L6.92893 13.0208C6.53841 13.4113 6.53841 14.0445 6.92893 14.435C7.31946 14.8255 7.95262 14.8255 8.34315 14.435L14.7071 8.07106ZM1 7.36395V8.36395H14V7.36395V6.36395H1V7.36395Z" 
                            fill="currentColor"/>
                        </svg>
                    </button>
                </Form.Submit>
            </main>

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