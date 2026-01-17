import { Metadata } from "next";
import { DocLayout } from "@/components/layout/doc-layout";
import { PageNavigation } from "@/components/layout/page-navigation";
import { FileText, ExternalLink } from "lucide-react";
import Link from "next/link";

/**
 * SEO metadata for the Agent Docs page.
 */
export const metadata: Metadata = {
  title: "Agent Docs | SID - Semantic Interaction Description",
  description:
    "Specification documents for AI agents implementing or consuming SID. Includes guides for coding agents building websites and browser agents interacting with websites.",
  openGraph: {
    title: "Agent Docs | SID",
    description:
      "Specification documents for AI agents implementing or consuming SID.",
    type: "article",
  },
};

/**
 * Agent Docs page - provides links to specification documents for AI agents.
 */
export default function AgentDocsPage() {
  return (
    <DocLayout>
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Agent Docs
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Self-contained specification documents designed to be fed directly to
          AI agents. Choose the appropriate document based on what the agent
          needs to do.
        </p>
      </header>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Section: Overview */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Overview
          </h2>

          <p className="text-base leading-7 mb-4">
            We provide two specification documents optimized for different AI
            agent use cases. Each document is self-contained and includes all
            the information an agent needs without requiring additional context.
          </p>

          <div className="bg-muted/50 rounded-lg p-4 mt-6">
            <p className="text-sm text-muted-foreground mb-0">
              <strong>Tip:</strong> These documents are written in Markdown and
              can be included directly in an agent&apos;s context or system
              prompt. They&apos;re designed to be concise yet complete.
            </p>
          </div>
        </section>

        {/* Section: Specification Documents */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Specification Documents
          </h2>

          <div className="space-y-6 mt-4">
            {/* Coding Agent Spec */}
            <div className="border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 mt-0">
                    Coding Agent Specification
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    For AI agents that <strong>build websites</strong>. Includes
                    HTML attribute reference, JavaScript API implementation
                    guidance, and examples for common UI patterns.
                  </p>

                  <h4 className="font-medium mb-2 text-sm">When to use:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2 mb-4">
                    <li>Agent is generating HTML/JSX code</li>
                    <li>Agent is implementing SID support in an application</li>
                    <li>Agent needs to add SID attributes to existing code</li>
                    <li>Agent is building components with SID metadata</li>
                  </ul>

                  <Link
                    href="/specs/sid-spec-for-coding-agents.md"
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View sid-spec-for-coding-agents.md
                  </Link>
                </div>
              </div>
            </div>

            {/* Browser Agent Spec */}
            <div className="border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 mt-0">
                    Browser Agent Specification
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    For AI agents that <strong>interact with websites</strong>.
                    Includes discovery procedures, interaction execution,
                    operation tracking, and integration guidance.
                  </p>

                  <h4 className="font-medium mb-2 text-sm">When to use:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2 mb-4">
                    <li>Agent is automating browser interactions</li>
                    <li>Agent is using Playwright, Puppeteer, or similar</li>
                    <li>Agent needs to discover and interact with SID elements</li>
                    <li>Agent is building an MCP server for browser control</li>
                  </ul>

                  <Link
                    href="/specs/sid-spec-for-browser-agents.md"
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View sid-spec-for-browser-agents.md
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Usage Guidelines */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Usage Guidelines
          </h2>

          <div className="space-y-4">
            <div className="border-l-4 border-muted pl-4">
              <h4 className="font-semibold mb-1">Include in System Prompt</h4>
              <p className="text-muted-foreground text-sm">
                For best results, include the relevant specification document in
                the agent&apos;s system prompt or initial context. This ensures
                the agent has complete information before starting work.
              </p>
            </div>

            <div className="border-l-4 border-muted pl-4">
              <h4 className="font-semibold mb-1">Choose the Right Document</h4>
              <p className="text-muted-foreground text-sm">
                Don&apos;t include both documents unless the agent needs to both
                build and interact with SID-enabled applications. Each document
                is optimized for its specific use case.
              </p>
            </div>

            <div className="border-l-4 border-muted pl-4">
              <h4 className="font-semibold mb-1">Keep Updated</h4>
              <p className="text-muted-foreground text-sm">
                These documents are versioned alongside the SID specification.
                Check back periodically for updates when the spec evolves.
              </p>
            </div>
          </div>
        </section>

        {/* Section: SDKs Coming Soon */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            SDKs (Coming Soon)
          </h2>

          <p className="text-base leading-7 mb-4">
            We&apos;re developing official SDKs to make SID implementation
            easier. These will provide type-safe APIs and framework
            integrations:
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            <div className="rounded-lg border border-dashed border-border p-4">
              <h3 className="font-medium mb-1 mt-0">@sid-standard/core</h3>
              <p className="text-sm text-muted-foreground">
                Lightweight JavaScript library for any web application
              </p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                In Development
              </div>
            </div>
            <div className="rounded-lg border border-dashed border-border p-4">
              <h3 className="font-medium mb-1 mt-0">@sid-standard/react</h3>
              <p className="text-sm text-muted-foreground">
                React hooks and components for SID integration
              </p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                In Development
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Page Navigation */}
      <PageNavigation />
    </DocLayout>
  );
}
