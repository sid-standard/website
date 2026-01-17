"use client";

import * as React from "react";
import { Navigation, MobileNavTrigger } from "./navigation";
import { Header } from "./header";
import { cn } from "@/lib/utils";

/**
 * Props for the DocLayout component.
 */
export interface DocLayoutProps {
  /** The page content to render in the main area */
  children: React.ReactNode;
  /** Optional additional CSS classes for the main content area */
  className?: string;
}

/**
 * DocLayout component - wraps all documentation pages.
 * Provides consistent layout with header, navigation sidebar on desktop,
 * and responsive design for mobile.
 *
 * Requirements:
 * - 1.1: Display Navigation_Panel on the left side of every page
 * - 3.1: Black and white color scheme (via CSS variables)
 * - 3.2: Typography optimized for reading technical documentation
 * - 3.4: Consistent spacing and visual hierarchy
 */
export function DocLayout({ children, className }: DocLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with mobile nav trigger */}
      <div className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          {/* Mobile nav trigger */}
          <div className="lg:hidden mr-2">
            <MobileNavTrigger />
          </div>
          {/* Header content */}
          <Header className="flex-1 border-0" />
        </div>
      </div>

      {/* Main container with max-width */}
      <div className="mx-auto w-full max-w-7xl flex flex-1">
        {/* Navigation sidebar (desktop only) */}
        <Navigation />

        {/* Main content area */}
        <main className={cn("flex-1 min-w-0", className)}>
          {/* Content container */}
          <div className="px-4 sm:px-6 lg:px-8">
            {/* Article wrapper with typography styles */}
            <article
              className={cn(
                // Vertical padding for content breathing room
                "py-8 lg:py-12",
                // Prose-like typography for documentation
                "prose-container",
                // Max width for readability
                "max-w-4xl"
              )}
            >
              {children}
            </article>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DocLayout;
