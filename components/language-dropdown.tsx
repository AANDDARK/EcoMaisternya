"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check } from "lucide-react"; 
import { useChangeLanguage } from "next-i18next/client";
import { useState } from "react";

// Mapping locale keys to their human-readable display names
const languageLabels: Record<string, string> = {
  en: "English",
  ua: "Українська",
};

export function LanguageDropdown() {
  const { i18n } = useTranslation();
  const changeLanguage = useChangeLanguage(); 

  const [ currentLang, setLang ]= useState<"ua" | "en">(i18n.resolvedLanguage || i18n.language || "ua");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 h-9 text-muted-foreground hover:text-foreground">
          <Globe className="h-4 w-4 text-muted-foreground/70" />
          <span className="font-medium text-sm">
            {languageLabels[currentLang] || "Language"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-40 bg-popover text-popover-foreground">
        
        {/* English Selection Item */}
        <DropdownMenuItem 
          onClick={() => { changeLanguage("en"); setLang("en") }}
          className="flex items-center justify-between cursor-pointer focus:bg-accent focus:text-accent-foreground"
        >
          <span>English</span>
          {currentLang === "en" && <Check className="h-4 w-4 opacity-80" />}
        </DropdownMenuItem>
        
        {/* Ukrainian Selection Item */}
        <DropdownMenuItem 
          onClick={() => {changeLanguage("uk"); setLang("ua") }}
          className="flex items-center justify-between cursor-pointer focus:bg-accent focus:text-accent-foreground"
        >
          <span>Українська</span>
          {currentLang === "ua" && <Check className="h-4 w-4 opacity-80" />}
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}