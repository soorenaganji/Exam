"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the exam page
    router.push("/exam");
  }, [router]);

  return null; // Return null since we are redirecting
}