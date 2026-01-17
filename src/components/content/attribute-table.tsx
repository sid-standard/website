"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Represents a single row in the attribute table.
 */
export interface AttributeRow {
  /** The attribute name (e.g., "data-sid-description") */
  attribute: string;
  /** Whether the attribute is required */
  required: boolean;
  /** The expected format/type of the attribute value */
  format: string;
  /** Description of what the attribute does */
  description: string;
}

/**
 * Props for the AttributeTable component.
 */
export interface AttributeTableProps {
  /** Array of attribute rows to display */
  attributes: AttributeRow[];
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * AttributeTable component - displays a reference table for HTML attributes.
 *
 * Features:
 * - Four columns: Attribute, Required, Format, Description
 * - Monospace font for attribute names to make them stand out
 * - Clear required/optional status indicators
 * - Consistent styling with the black and white theme
 *
 * Requirements:
 * - 9.2: Include the attribute reference table
 *
 * @example
 * ```tsx
 * <AttributeTable
 *   attributes={[
 *     {
 *       attribute: "data-sid-description",
 *       required: true,
 *       format: "string",
 *       description: "Human-readable description of the element's purpose"
 *     },
 *     {
 *       attribute: "data-sid-actions",
 *       required: false,
 *       format: "JSON",
 *       description: "Array of action definitions for the element"
 *     }
 *   ]}
 * />
 * ```
 */
export function AttributeTable({
  attributes,
  className,
}: AttributeTableProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border overflow-hidden",
        "bg-card",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-3 text-left font-semibold text-foreground border-b border-border">
                Attribute
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground border-b border-border">
                Required
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground border-b border-border">
                Format
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground border-b border-border">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((row, index) => (
              <tr
                key={row.attribute}
                className={cn(
                  "transition-colors hover:bg-muted/50",
                  index !== attributes.length - 1 && "border-b border-border"
                )}
              >
                {/* Attribute name - monospace font to stand out */}
                <td className="px-4 py-3 align-top">
                  <code className="font-mono text-sm font-medium text-foreground bg-muted px-1.5 py-0.5 rounded">
                    {row.attribute}
                  </code>
                </td>

                {/* Required status - clear visual indicator */}
                <td className="px-4 py-3 align-top">
                  <span
                    className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                      row.required
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {row.required ? "Required" : "Optional"}
                  </span>
                </td>

                {/* Format - monospace for technical values */}
                <td className="px-4 py-3 align-top">
                  <code className="font-mono text-sm text-muted-foreground">
                    {row.format}
                  </code>
                </td>

                {/* Description */}
                <td className="px-4 py-3 align-top text-sm text-muted-foreground leading-relaxed">
                  {row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttributeTable;
