'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Home() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome</h1>
          <p className="text-muted-foreground">Please select your role to continue</p>
        </div>

        <div className="grid gap-4">
          <Button
            variant="outline"
            className={cn(
              "w-full h-auto p-6 text-left",
              "hover:bg-primary hover:text-primary-foreground",
              "transition-colors duration-200",
              "flex flex-col items-start gap-1",
              "group"
            )}
            onClick={() => router.push('/employee')}
          >
            <h2 className="font-semibold text-lg">Employee</h2>
            <span className="text-sm text-muted-foreground group-hover:text-primary-foreground">
              Access your attendance records and manage your schedule
            </span>
          </Button>

          <Button
            variant="outline"
            className={cn(
              "w-full h-auto p-6 text-left",
              "hover:bg-primary hover:text-primary-foreground",
              "transition-colors duration-200",
              "flex flex-col items-start gap-1",
              "group"
            )}
            onClick={() => router.push('/admin')}
          >
            <h2 className="font-semibold text-lg">Administrator</h2>
            <span className="text-sm text-muted-foreground group-hover:text-primary-foreground">
              Manage employees and view attendance reports
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
