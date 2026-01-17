"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  getPreviousNavItem,
  getNextNavItem,
  type NavItem,
} from "@/lib/navigation";

/**
 * Props for the PageNavigation component.
 */
export interface PageNavigationProps {
  /** Optional previous page (if not provided, will be computed from current path) */
  previousPage?: NavItem;
  /** Optional next page (if not provided, will be computed from current path) */
  nextPage?: NavItem;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Props for the PageNavigationLink component.
 */
interface PageNavigationLinkProps {
  item: NavItem;
  direction: "previous" | "next";
}

/**
 * Individual navigation link for previous/next page.
 * Displays direction label and page title.
 */
function PageNavigationLink({ item, direction }: PageNavigationLinkProps) {
  const isPrevious = direction === "previous";

  return (
    <Link
      href={item.href}
      className={cn(
        "group flex flex-col gap-1 p-4 rounded-lg border transition-colors",
        "hover:bg-accent hover:border-accent-foreground/20",
        isPrevious ? "items-start" : "items-end"
      )}
    >
      {/* Direction label */}
      <span
        className={cn(
          "flex items-center gap-1 text-xs text-muted-foreground uppercase tracking-wide",
          isPrevious ? "flex-row" : "flex-row-reverse"
        )}
      >
        {isPrevious ? (
          <ChevronLeft className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
        {isPrevious ? "Previous" : "Next"}
      </span>

      {/* Page title */}
      <span
        className={cn(
          "text-sm font-medium text-foreground group-hover:text-accent-foreground",
          isPrevious ? "text-left" : "text-right"
        )}
      >
        {item.title}
      </span>
    </Link>
  );
}

/**
 * PageNavigation component - displays previous/next page links at the bottom of each page.
 *
 * This component provides sequential navigation through the documentation,
 * allowing users to move to the previous or next page in the reading order.
 *
 * Requirements:
 * - 2.2: Display a link to the next page in sequence at the end of each page
 * - 2.3: Display a link to the previous page in sequence at the end of each page
 *
 * Behavior:
 * - First page: Only shows "Next" link (no previous)
 * - Last page: Only shows "Previous" link (no next)
 * - Middle pages: Shows both "Previous" and "Next" links
 */
export function PageNavigation({
  previousPage,
  nextPage,
  className,
}: PageNavigationProps) {
  const pathname = usePathname();

  // Compute previous/next pages from current path if not provided
  const previous = previousPage ?? getPreviousNavItem(pathname);
  const next = nextPage ?? getNextNavItem(pathname);

  // Don't render if there are no navigation links
  if (!previous && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Page navigation"
      className={cn(
        "mt-12 pt-8 border-t",
        "grid gap-4",
        // Use grid layout: 2 columns on larger screens, 1 column on mobile
        previous && next ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1",
        className
      )}
    >
      {/* Previous page link - aligned to the left */}
      {previous ? (
        <PageNavigationLink item={previous} direction="previous" />
      ) : (
        // Empty placeholder to maintain grid layout when only next exists
        next && <div className="hidden sm:block" />
      )}

      {/* Next page link - aligned to the right */}
      {next && <PageNavigationLink item={next} direction="next" />}
    </nav>
  );
}

export default PageNavigation;
