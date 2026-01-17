"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

/**
 * Props for the DownloadCard component.
 */
export interface DownloadCardProps {
  /** The title of the downloadable document */
  title: string;
  /** Description of what the document contains */
  description: string;
  /** The filename that will be shown and used for the download */
  filename: string;
  /** The URL/path to the downloadable file */
  href: string;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * DownloadCard component - displays a card with download button for spec documents.
 *
 * Features:
 * - Card layout with title and description
 * - Download button with download attribute for file downloads
 * - Shows the filename being downloaded
 * - Consistent styling with the black and white theme
 *
 * Requirements:
 * - 5.3: WHEN a user clicks a download link, THE Documentation_Site SHALL initiate a file download
 *
 * @example
 * ```tsx
 * <DownloadCard
 *   title="Coding Agent Specification"
 *   description="Complete specification for AI agents that build websites with SID metadata."
 *   filename="sid-spec-for-coding-agents.md"
 *   href="/specs/sid-spec-for-coding-agents.md"
 * />
 * ```
 */
export function DownloadCard({
  title,
  description,
  filename,
  href,
  className,
}: DownloadCardProps) {
  return (
    <Card className={cn("bg-card", className)}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-start gap-3">
        {/* Filename display */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-mono bg-muted px-2 py-1 rounded text-xs">
            {filename}
          </span>
        </div>
        {/* Download button with download attribute */}
        <Button asChild variant="default" size="default">
          <a href={href} download={filename}>
            <Download className="size-4" />
            Download
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default DownloadCard;
