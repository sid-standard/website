import { Metadata } from "next";
import { DocLayout } from "@/components/layout/doc-layout";
import { PageNavigation } from "@/components/layout/page-navigation";
import { ExternalLink, Github, Package } from "lucide-react";
import Link from "next/link";

/**
 * SEO metadata for the SDKs page.
 */
export const metadata: Metadata = {
  title: "SDKs | SID - Semantic Interaction Description",
  description:
    "Official SDKs for implementing SID in your applications. Includes libraries for vanilla JavaScript and React.",
  openGraph: {
    title: "SDKs | SID",
    description:
      "Official SDKs for implementing SID in your applications.",
    type: "article",
  },
};

/**
 * SDKs page - provides information and links to official SID SDKs.
 */
export default function SDKsPage() {
  return (
    <DocLayout>
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Official SDKs
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We provide official SDKs to make SID implementation easier. These
          libraries provide type-safe APIs, framework integrations, and
          utility functions to help you build SID-enabled applications quickly.
        </p>
      </header>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Section: Available SDKs */}
        <section>
          <div className="grid gap-6 sm:grid-cols-2 mt-4">
            {/* Runtime SDK */}
            <div className="border rounded-lg p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold m-0">@sid-standard/runtime</h3>
              </div>
              
              <p className="text-muted-foreground mb-6 flex-1">
                The core library for implementing the SID JavaScript API in any
                web application. Provides the base implementation of the 
                <code>window.SID</code> object and interaction handling.
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href="https://github.com/sid-standard/sdk/tree/main/sid-runtime"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </Link>
                <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded w-fit">
                  npm install @sid-standard/runtime
                </div>
              </div>
            </div>

            {/* React SDK */}
            <div className="border rounded-lg p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold m-0">@sid-standard/react</h3>
              </div>
              
              <p className="text-muted-foreground mb-6 flex-1">
                React-specific hooks and components for SID. Includes 
                <code>useSID</code> hooks for easy integration with React 
                state and lifecycle.
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href="https://github.com/sid-standard/sdk/tree/main/sid-react"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </Link>
                <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded w-fit">
                  npm install @sid-standard/react
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Why use an SDK? */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Why use an SDK?
          </h2>
          <p className="text-base leading-7 mb-4">
            While you can implement SID manually by adding HTML attributes and 
            defining the <code>window.SID</code> object yourself, our SDKs 
            provide several advantages:
          </p>
          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4">
            <li><strong>Type Safety:</strong> Full TypeScript support for SID metadata and API calls.</li>
            <li><strong>Consistency:</strong> Ensures your implementation follows the latest version of the spec.</li>
            <li><strong>Ease of Use:</strong> Simple APIs for complex tasks like operation tracking and human input requirements.</li>
            <li><strong>Framework Integration:</strong> Native support for popular frameworks like React.</li>
          </ul>
        </section>

        {/* Section: Repository */}
        <section className="bg-muted/30 rounded-xl p-8 border border-border">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background border shadow-sm">
              <Github className="h-8 w-8" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold mb-2 mt-0">Monorepo</h3>
              <p className="text-muted-foreground mb-4">
                All official SDKs are maintained in our central GitHub repository. 
                Contributions, bug reports, and feature requests are welcome!
              </p>
              <Link
                href="https://github.com/sid-standard/sdk"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                <ExternalLink className="h-4 w-4" />
                sid-standard/sdk
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Page Navigation */}
      <PageNavigation />
    </DocLayout>
  );
}
