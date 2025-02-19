"use client";
import { useState } from "react";
import ThemeCard from "./ThemeCard";

const Theme = () => {
  const [selectedTheme, setSelectedTheme] = useState("Light");

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <div className="mx-auto md:p-6 w-full p-3 space-y-5">
      <h2 className="text-xl font-semibold">Customize your UI theme</h2>
      <div className=" justify-center gap-5 md:gap-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center">
        <ThemeCard
          label="Light"
          isActive={selectedTheme === "Light"}
          onClick={() => handleThemeChange("Light")}
          themeImage="/light.jpg"
        />
        <ThemeCard
          label="Dark"
          isActive={selectedTheme === "Dark"}
          onClick={() => handleThemeChange("Dark")}
          themeImage="/dark.avif"
        />
        <ThemeCard
          label="System"
          isActive={selectedTheme === "System"}
          onClick={() => handleThemeChange("System")}
          themeImage="/system.png"
        />
      </div>
    </div>
  );
};

export default Theme;
