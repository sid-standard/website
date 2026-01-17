"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Supported languages for syntax highlighting.
 */
export type SupportedLanguage = "typescript" | "javascript" | "html" | "json";

/**
 * Props for the CodeBlock component.
 */
export interface CodeBlockProps {
  /** The code content to display */
  code: string;
  /** The programming language for syntax highlighting */
  language: SupportedLanguage;
  /** Optional filename to display in a header */
  filename?: string;
  /** Whether to show line numbers */
  showLineNumbers?: boolean;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Token types for syntax highlighting.
 */
type TokenType =
  | "keyword"
  | "string"
  | "number"
  | "comment"
  | "punctuation"
  | "operator"
  | "property"
  | "tag"
  | "attribute"
  | "plain";

/**
 * A token represents a piece of code with its type for styling.
 */
interface Token {
  type: TokenType;
  content: string;
}

/**
 * Tokenize TypeScript/JavaScript code for syntax highlighting.
 */
function tokenizeJS(code: string): Token[] {
  const tokens: Token[] = [];
  const keywords = new Set([
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "for",
    "while",
    "do",
    "switch",
    "case",
    "break",
    "continue",
    "default",
    "try",
    "catch",
    "finally",
    "throw",
    "new",
    "class",
    "extends",
    "implements",
    "interface",
    "type",
    "enum",
    "import",
    "export",
    "from",
    "as",
    "async",
    "await",
    "yield",
    "static",
    "public",
    "private",
    "protected",
    "readonly",
    "abstract",
    "true",
    "false",
    "null",
    "undefined",
    "void",
    "never",
    "any",
    "unknown",
    "string",
    "number",
    "boolean",
    "object",
    "symbol",
    "bigint",
    "this",
    "super",
    "typeof",
    "instanceof",
    "in",
    "of",
    "delete",
    "declare",
  ]);

  // Simple regex-based tokenizer
  const patterns: Array<{ regex: RegExp; type: TokenType }> = [
    // Comments (single-line and multi-line)
    { regex: /^\/\/[^\n]*/, type: "comment" },
    { regex: /^\/\*[\s\S]*?\*\//, type: "comment" },
    // Strings (double-quoted, single-quoted, template literals)
    { regex: /^"(?:[^"\\]|\\.)*"/, type: "string" },
    { regex: /^'(?:[^'\\]|\\.)*'/, type: "string" },
    { regex: /^`(?:[^`\\]|\\.)*`/, type: "string" },
    // Numbers
    { regex: /^0x[0-9a-fA-F]+/, type: "number" },
    { regex: /^0b[01]+/, type: "number" },
    { regex: /^0o[0-7]+/, type: "number" },
    { regex: /^\d+\.?\d*(?:[eE][+-]?\d+)?/, type: "number" },
    // Operators
    { regex: /^(?:===|!==|==|!=|<=|>=|&&|\|\||=>|\.\.\.|\?\?|\?\.|\+\+|--|[+\-*/%<>&|^!~=?:])/, type: "operator" },
    // Punctuation
    { regex: /^[{}[\]();,.]/, type: "punctuation" },
    // Identifiers (keywords and properties)
    { regex: /^[a-zA-Z_$][a-zA-Z0-9_$]*/, type: "plain" },
    // Whitespace
    { regex: /^\s+/, type: "plain" },
  ];

  let remaining = code;
  while (remaining.length > 0) {
    let matched = false;

    for (const { regex, type } of patterns) {
      const match = remaining.match(regex);
      if (match) {
        const content = match[0];
        let tokenType = type;

        // Check if identifier is a keyword
        if (type === "plain" && keywords.has(content)) {
          tokenType = "keyword";
        }

        tokens.push({ type: tokenType, content });
        remaining = remaining.slice(content.length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      // If no pattern matched, consume one character
      tokens.push({ type: "plain", content: remaining[0] });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

/**
 * Tokenize HTML code for syntax highlighting.
 */
function tokenizeHTML(code: string): Token[] {
  const tokens: Token[] = [];

  const patterns: Array<{ regex: RegExp; handler: (match: RegExpMatchArray) => Token[] }> = [
    // Comments
    {
      regex: /^<!--[\s\S]*?-->/,
      handler: (match) => [{ type: "comment", content: match[0] }],
    },
    // DOCTYPE
    {
      regex: /^<!DOCTYPE[^>]*>/i,
      handler: (match) => [{ type: "keyword", content: match[0] }],
    },
    // Tags with attributes
    {
      regex: /^<\/?([a-zA-Z][a-zA-Z0-9-]*)/,
      handler: (match) => [
        { type: "punctuation", content: match[0].startsWith("</") ? "</" : "<" },
        { type: "tag", content: match[1] },
      ],
    },
    // Attribute names
    {
      regex: /^([a-zA-Z][a-zA-Z0-9-:]*)\s*=/,
      handler: (match) => [
        { type: "attribute", content: match[1] },
        { type: "operator", content: "=" },
      ],
    },
    // Attribute values (quoted)
    {
      regex: /^"[^"]*"/,
      handler: (match) => [{ type: "string", content: match[0] }],
    },
    {
      regex: /^'[^']*'/,
      handler: (match) => [{ type: "string", content: match[0] }],
    },
    // Closing bracket
    {
      regex: /^\/?>/,
      handler: (match) => [{ type: "punctuation", content: match[0] }],
    },
    // Whitespace
    {
      regex: /^\s+/,
      handler: (match) => [{ type: "plain", content: match[0] }],
    },
  ];

  let remaining = code;
  while (remaining.length > 0) {
    let matched = false;

    for (const { regex, handler } of patterns) {
      const match = remaining.match(regex);
      if (match) {
        tokens.push(...handler(match));
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Plain text content
      const nextTag = remaining.indexOf("<");
      if (nextTag === -1) {
        tokens.push({ type: "plain", content: remaining });
        break;
      } else if (nextTag === 0) {
        tokens.push({ type: "plain", content: remaining[0] });
        remaining = remaining.slice(1);
      } else {
        tokens.push({ type: "plain", content: remaining.slice(0, nextTag) });
        remaining = remaining.slice(nextTag);
      }
    }
  }

  return tokens;
}

/**
 * Tokenize JSON code for syntax highlighting.
 */
function tokenizeJSON(code: string): Token[] {
  const tokens: Token[] = [];

  const patterns: Array<{ regex: RegExp; type: TokenType }> = [
    // Strings (property names and values)
    { regex: /^"(?:[^"\\]|\\.)*"/, type: "string" },
    // Numbers
    { regex: /^-?\d+\.?\d*(?:[eE][+-]?\d+)?/, type: "number" },
    // Keywords
    { regex: /^(?:true|false|null)/, type: "keyword" },
    // Punctuation
    { regex: /^[{}[\]:,]/, type: "punctuation" },
    // Whitespace
    { regex: /^\s+/, type: "plain" },
  ];

  let remaining = code;
  let lastWasColon = false;

  while (remaining.length > 0) {
    let matched = false;

    for (const { regex, type } of patterns) {
      const match = remaining.match(regex);
      if (match) {
        let tokenType = type;

        // Property names (strings before colons) get special styling
        if (type === "string" && !lastWasColon) {
          // Check if next non-whitespace is a colon
          const afterString = remaining.slice(match[0].length).trimStart();
          if (afterString.startsWith(":")) {
            tokenType = "property";
          }
        }

        tokens.push({ type: tokenType, content: match[0] });
        lastWasColon = match[0] === ":";
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      tokens.push({ type: "plain", content: remaining[0] });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

/**
 * Tokenize code based on language.
 */
function tokenize(code: string, language: SupportedLanguage): Token[] {
  switch (language) {
    case "typescript":
    case "javascript":
      return tokenizeJS(code);
    case "html":
      return tokenizeHTML(code);
    case "json":
      return tokenizeJSON(code);
    default:
      return [{ type: "plain", content: code }];
  }
}

/**
 * Get CSS class for a token type.
 * Uses grayscale colors to match the black and white theme.
 */
function getTokenClass(type: TokenType): string {
  switch (type) {
    case "keyword":
      return "font-semibold text-foreground";
    case "string":
      return "text-muted-foreground";
    case "number":
      return "text-foreground";
    case "comment":
      return "text-muted-foreground/60 italic";
    case "punctuation":
      return "text-muted-foreground";
    case "operator":
      return "text-foreground";
    case "property":
      return "font-medium text-foreground";
    case "tag":
      return "font-semibold text-foreground";
    case "attribute":
      return "text-muted-foreground";
    default:
      return "text-foreground";
  }
}

/**
 * CodeBlock component - displays code with syntax highlighting.
 *
 * Features:
 * - Syntax highlighting for TypeScript, JavaScript, HTML, and JSON
 * - Optional filename header
 * - Optional line numbers
 * - Grayscale theme matching the site's black and white design
 *
 * Requirements:
 * - 3.3: Display code blocks with syntax highlighting
 */
export function CodeBlock({
  code,
  language,
  filename,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const tokens = React.useMemo(() => tokenize(code, language), [code, language]);
  const lines = React.useMemo(() => {
    // Split tokens into lines
    const result: Token[][] = [[]];
    for (const token of tokens) {
      const parts = token.content.split("\n");
      for (let i = 0; i < parts.length; i++) {
        if (i > 0) {
          result.push([]);
        }
        if (parts[i]) {
          result[result.length - 1].push({ type: token.type, content: parts[i] });
        }
      }
    }
    return result;
  }, [tokens]);

  return (
    <div
      className={cn(
        "rounded-lg border border-border overflow-hidden",
        "bg-muted/50",
        className
      )}
    >
      {/* Optional filename header */}
      {filename && (
        <div className="flex items-center px-4 py-2 border-b border-border bg-muted">
          <span className="text-sm font-mono text-muted-foreground">
            {filename}
          </span>
        </div>
      )}

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="p-4 m-0 bg-transparent">
          <code className="font-mono text-sm leading-relaxed">
            {lines.map((lineTokens, lineIndex) => (
              <div key={lineIndex} className="flex">
                {/* Line number */}
                {showLineNumbers && (
                  <span
                    className={cn(
                      "select-none pr-4 text-right min-w-[3ch]",
                      "text-muted-foreground/50"
                    )}
                    aria-hidden="true"
                  >
                    {lineIndex + 1}
                  </span>
                )}

                {/* Line content */}
                <span className="flex-1">
                  {lineTokens.length === 0 ? (
                    // Empty line - render a space to maintain height
                    <span>&nbsp;</span>
                  ) : (
                    lineTokens.map((token, tokenIndex) => (
                      <span key={tokenIndex} className={getTokenClass(token.type)}>
                        {token.content}
                      </span>
                    ))
                  )}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default CodeBlock;
