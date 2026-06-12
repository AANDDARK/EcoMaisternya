
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavTabsProps {
  eventBoardText: string;
  marketText: string;
  rerecyclingBins: string;
  homeText: string;
}

export function NavTabs({ eventBoardText, marketText, rerecyclingBins, homeText }: NavTabsProps) {
  const pathname = usePathname();

  const tabStyle = (href: string) => cn(
    navigationMenuTriggerStyle(),
    "px-4 py-2 text-sm font-medium transition-all duration-200",
    "hover:bg-background/50 hover:text-foreground",
    pathname === href 
      ? "bg-background text-foreground shadow-sm font-semibold" 
      : "bg-transparent text-muted-foreground"
  );

  return (
    <>
      <NavigationMenuItem>
  <NavigationMenuLink asChild>
    <Link href="/rerecycling" className={tabStyle("/rerecycling")}>
      {rerecyclingBins}
    </Link>
  </NavigationMenuLink>
</NavigationMenuItem>
  <NavigationMenuItem>
  <NavigationMenuLink asChild>
    <Link href="/event-board" className={tabStyle("/event-board")}>
      {eventBoardText}
    </Link>
  </NavigationMenuLink>
</NavigationMenuItem>
<NavigationMenuItem>
  <NavigationMenuLink asChild>
    <Link href="/" className={tabStyle("/")}>
      {homeText}
    </Link>
  </NavigationMenuLink>
</NavigationMenuItem>

<NavigationMenuItem>
  <NavigationMenuLink asChild>
    <Link href="/market" className={tabStyle("/market")}>
      {marketText}
    </Link>
  </NavigationMenuLink>
</NavigationMenuItem>

    </>
  );
}