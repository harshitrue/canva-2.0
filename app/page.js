"use client"
import { Button } from "@/components/ui/button";
import { UserButton } from "@stackframe/stack";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (router) {
      router.replace('/workspace')
    }
  }, [])

  return (
    <div>

    </div>
  );
}
