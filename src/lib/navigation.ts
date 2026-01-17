/**
 * Navigation configuration for the SID documentation website.
 * This is the single source of truth for all navigation items.
 */

/**
 * Represents a navigation item in the documentation sidebar.
 */
export interface NavItem {
  /** Display title for the navigation link */
  title: string;
  /** URL path for the page (e.g., "/introduction") */
  href: string;
  /** Optional description for the page */
  description?: string;
}

/**
 * Navigation items in reading order.
 * This array defines the sequence of documentation pages.
 * 
 * Requirements: 1.4, 2.4
 */
export const navigationItems: NavItem[] = [
  {
    title: "Introduction",
    href: "/introduction",
    description: "What is SID and why it matters",
  },
  {
    title: "Core Concepts",
    href: "/core-concepts",
    description: "Fundamental concepts and design philosophy of SID",
  },
  {
    title: "JavaScript API",
    href: "/javascript-api",
    description: "Complete JavaScript API documentation for implementing SID",
  },
  {
    title: "HTML Attributes",
    href: "/html-attributes",
    description: "Reference for all data-sid-* HTML attributes",
  },
  {
    title: "Operation Tracking",
    href: "/operation-tracking",
    description: "How to signal interaction completion to agents",
  },
  {
    title: "Human Input",
    href: "/human-input",
    description: "Declaring sensitive data collection requirements",
  },
  {
    title: "Authentication",
    href: "/authentication",
    description: "Token-based authentication for AI agents",
  },
  {
    title: "Agent Docs",
    href: "/agent-docs",
    description: "Specification documents for AI agents",
  },
];

/**
 * Normalize a path by removing trailing slashes for consistent comparison.
 * @param path - The path to normalize
 * @returns The path without trailing slash
 */
function normalizePath(path: string): string {
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

/**
 * Get the navigation item for a given path.
 * @param path - The current page path
 * @returns The matching NavItem or undefined
 */
export function getNavItem(path: string): NavItem | undefined {
  const normalizedPath = normalizePath(path);
  return navigationItems.find((item) => item.href === normalizedPath);
}

/**
 * Get the index of a navigation item by path.
 * @param path - The current page path
 * @returns The index of the item or -1 if not found
 */
export function getNavItemIndex(path: string): number {
  const normalizedPath = normalizePath(path);
  return navigationItems.findIndex((item) => item.href === normalizedPath);
}

/**
 * Get the previous navigation item for a given path.
 * @param path - The current page path
 * @returns The previous NavItem or undefined if at the first page
 */
export function getPreviousNavItem(path: string): NavItem | undefined {
  const index = getNavItemIndex(path);
  if (index > 0) {
    return navigationItems[index - 1];
  }
  return undefined;
}

/**
 * Get the next navigation item for a given path.
 * @param path - The current page path
 * @returns The next NavItem or undefined if at the last page
 */
export function getNextNavItem(path: string): NavItem | undefined {
  const index = getNavItemIndex(path);
  if (index >= 0 && index < navigationItems.length - 1) {
    return navigationItems[index + 1];
  }
  return undefined;
}
