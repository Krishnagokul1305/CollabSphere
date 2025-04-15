"use client";

import { useTheme } from "next-themes";
import ThemeCard from "./ThemeCard";

const Theme = () => {
  const { theme, setTheme } = useTheme(); // Get theme state and updater function

  return (
    <div className="mx-auto md:p-6 w-full p-3 space-y-5">
      <h2 className="text-xl font-semibold">Customize your UI theme</h2>
      <div className="justify-center gap-5 md:gap-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center">
        <ThemeCard
          label="Light"
          isActive={theme === "light"}
          onClick={() => setTheme("light")}
          themeImage="/light.jpg"
        />
        <ThemeCard
          label="Dark"
          isActive={theme === "dark"}
          onClick={() => setTheme("dark")}
          themeImage="/dark.avif"
        />
        <ThemeCard
          label="System"
          isActive={theme === "system"}
          onClick={() => setTheme("system")}
          themeImage="/system.png"
        />
      </div>
    </div>
  );
};

export default Theme;
