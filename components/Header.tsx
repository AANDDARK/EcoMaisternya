import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { getT } from "next-i18next/server";
import { NavTabs } from "./nav-tabs";
import { LanguageDropdown } from "./language-dropdown";

export default async function Header() {
  const { t } = await getT("home");

  return (
    <header className="flex items-center justify-between border-b border-border bg-background px-6 p-2">
      {/* Left side spacer to keep the center tabs perfectly centered */}
      <div className="w-[120px] hidden md:block" />

      {/* Center Tabs */}
      <NavigationMenu>
        <NavigationMenuList className="flex gap-1 rounded-lg bg-muted p-1">
          <NavTabs 
            eventBoardText={t("event-board")} 
            marketText={t("market")}
            homeText={t("home")}
            rerecyclingBins="Контейнери"
          />
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right Side Language Dropdown */}
      <div className="min-w-[120px] flex justify-end">
        <LanguageDropdown />
      </div>
    </header>
  );
}