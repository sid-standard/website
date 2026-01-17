"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";

/**
 * Props for the TypeDefinition component.
 */
export interface TypeDefinitionProps {
  /** The name of the type or interface */
  name: string;
  /** The TypeScript code defining the type/interface */
  code: string;
  /** Optional description text explaining the type */
  description?: string;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * TypeDefinition component - displays TypeScript interfaces/types with syntax highlighting.
 *
 * Features:
 * - Prominent type name header
 * - Syntax-highlighted TypeScript code using CodeBlock
 * - Optional description text below the code
 * - Consistent styling with the black and white theme
 *
 * Requirements:
 * - 8.3: Document all TypeScript interfaces (SIDElement, ActionDefinition, InteractionResult, Operation, etc.)
 *
 * @example
 * ```tsx
 * <TypeDefinition
 *   name="SIDElement"
 *   code={`interface SIDElement {
 *   id: string;
 *   description: string;
 *   actions: ActionDefinition[];
 * }`}
 *   description="Represents an element that has been annotated with SID metadata."
 * />
 * ```
 */
export function TypeDefinition({
  name,
  code,
  description,
  className,
}: TypeDefinitionProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border overflow-hidden",
        "bg-card",
        className
      )}
    >
      {/* Type name header */}
      <div className="flex items-center px-4 py-3 border-b border-border bg-muted">
        <code className="font-mono font-semibold text-foreground">
          {name}
        </code>
      </div>

      {/* Code block with syntax highlighting */}
      <div className="border-b border-border last:border-b-0">
        <CodeBlock
          code={code}
          language="typescript"
          className="border-0 rounded-none"
        />
      </div>

      {/* Optional description */}
      {description && (
        <div className="px-4 py-3 bg-muted/30">
          <p className="text-sm text-muted-foreground leading-relaxed m-0">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}

export default TypeDefinition;
