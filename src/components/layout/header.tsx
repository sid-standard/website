"use client";

import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";

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
        <span className="font-semibold text-lg hidden sm:inline">
          Semantic Interaction Description
        </span>
        <span className="font-semibold text-lg sm:hidden">SID</span>
      </Link>

      {/* GitHub link */}
      <a
        href="https://github.com/sid-standard"
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
