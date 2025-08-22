"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/employees");
  }, [router]);

  return (
    <LoadingSpinner text="Redirecting to Employees..." />
  );
}
