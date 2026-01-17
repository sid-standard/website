"use client";

import * as React from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SID Logo SVG component
 */
function SIDLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
    >
      {/* Outer circle representing the "semantic" boundary */}
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      {/* Inner connected nodes representing "interaction" */}
      <circle cx="10" cy="12" r="3" fill="currentColor" />
      <circle cx="22" cy="12" r="3" fill="currentColor" />
      <circle cx="16" cy="22" r="3" fill="currentColor" />
      {/* Lines connecting nodes representing "description" */}
      <line
        x1="12.5"
        y1="13.5"
        x2="14"
        y2="19.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="19.5"
        y1="13.5"
        x2="18"
        y2="19.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="13"
        y1="12"
        x2="19"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/**
 * Props for the Header component.
 */
export interface HeaderProps {
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Header component - displays the site header content with logo, title, and GitHub link.
 * This is the inner content, meant to be placed inside a header container.
 */
export function Header({ className }: HeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        className
      )}
    >
      {/* Logo and title */}
      <Link href="/" className="flex items-center gap-2">
        <SIDLogo />
        <span className="font-semibold text-lg hidden sm:inline">
          Semantic Interaction Description
        </span>
        <span className="font-semibold text-lg sm:hidden">SID</span>
      </Link>

      {/* GitHub link */}
      <a
        href=""
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="View on GitHub"
      >
        <Github className="h-5 w-5" />
        <span className="hidden sm:inline text-sm">GitHub</span>
      </a>
    </div>
  );
}

export default Header;
