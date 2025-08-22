"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  return (
    <nav className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Dashboard</div>
      <div>
        <Button onClick={toggleTheme} variant="outline" size="sm">
          {theme === "light" ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </div>
    </nav>
  );
}
