"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { navigationItems, type NavItem } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * Props for the Navigation component.
 */
export interface NavigationProps {
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Props for the NavigationLink component.
 */
interface NavigationLinkProps {
  item: NavItem;
  isActive: boolean;
  onClick?: () => void;
}

/**
 * Individual navigation link component.
 * Highlights the currently active page.
 */
function NavigationLink({ item, isActive, onClick }: NavigationLinkProps) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "block px-3 py-2 text-sm rounded-md transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground"
      )}
    >
      {item.title}
    </Link>
  );
}

/**
 * Navigation list component that renders all navigation items.
 */
function NavigationList({
  currentPath,
  onItemClick,
}: {
  currentPath: string;
  onItemClick?: () => void;
}) {
  return (
    <nav className="space-y-1">
      {navigationItems.map((item) => (
        <NavigationLink
          key={item.href}
          item={item}
          isActive={currentPath === item.href}
          onClick={onItemClick}
        />
      ))}
    </nav>
  );
}

/**
 * Desktop sidebar navigation component.
 * Displays a sidebar with all navigation items (below the header).
 * 
 * Requirements: 1.1, 1.3
 */
function DesktopNavigation({
  currentPath,
  className,
}: {
  currentPath: string;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "hidden lg:block w-64 shrink-0 border-r bg-background",
        className
      )}
    >
      {/* Navigation items */}
      <ScrollArea className="h-full px-4 py-4">
        <NavigationList currentPath={currentPath} />
      </ScrollArea>
    </aside>
  );
}

/**
 * Mobile navigation trigger button component.
 * Opens the navigation drawer on mobile.
 */
export function MobileNavTrigger() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const handleItemClick = () => {
    setOpen(false);
  };

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="border-b px-4 py-4">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 px-4 py-4">
            <NavigationList
              currentPath={pathname}
              onItemClick={handleItemClick}
            />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

/**
 * Main Navigation component.
 * Renders a sidebar navigation panel on desktop.
 * Mobile navigation is handled via MobileNavTrigger in the header.
 * 
 * Requirements: 1.1, 1.3, 1.5
 */
export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();

  return <DesktopNavigation currentPath={pathname} className={className} />;
}

export default Navigation;
