import { Metadata } from "next";
import { DocLayout } from "@/components/layout/doc-layout";
import { PageNavigation } from "@/components/layout/page-navigation";

/**
 * SEO metadata for the Introduction page.
 */
export const metadata: Metadata = {
  title: "Introduction | SID - Semantic Interaction Description",
  description:
    "SID (Semantic Interaction Description) is an accessibility standard for AI agents, enabing AI agents to navigate and interact with web applications effectively.",
  openGraph: {
    title: "Introduction | SID",
    description:
      "SID (Semantic Interaction Description) is an accessibility standard for AI agents, enabing AI agents to navigate and interact with web applications effectively.",
    type: "article",
  },
};

/**
 * Introduction page - the first page in the SID documentation.
 */
export default function IntroductionPage() {
  return (
    <DocLayout>
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Introduction
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          SID (Semantic Interaction Description) is an accessibility standard for AI agents, enabing AI agents to navigate and interact with web applications effectively.
        </p>
      </header>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Section: What is SID */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            What is SID?
          </h2>

          <p className="text-base leading-7 mb-4">
            Semantic Interaction Description (SID) is a standard that allows web
            applications to expose structured metadata about their interactive
            elements. This metadata tells AI agents exactly what each element
            does, what happens when you interact with it, and how to track the
            results.
          </p>

          <div className="bg-muted/50 rounded-lg p-6 my-6">
            <p className="text-base leading-7 italic">
              &ldquo;Think of SID as giving AI agents the same understanding of
              your application that a well-trained human user would have—but
              instantly and programmatically.&rdquo;
            </p>
          </div>

          <p className="text-base leading-7">
            Instead of parsing DOM text, accessibility attributes, or
            screenshots, agents can query SID metadata to understand your
            application&apos;s interface reliably and efficiently.
          </p>
        </section>

        {/* Section: The Challenge */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            The Challenge
          </h2>

          <p className="text-base leading-7 mb-4">
            AI agents are increasingly being used to automate web interactions.
            However, current approaches face significant challenges:
          </p>

          <div className="space-y-4 my-6">
            <div className="border-l-4 border-muted pl-4">
              <h4 className="font-semibold mb-1">DOM Text Extraction</h4>
              <p className="text-muted-foreground text-sm">
                Text is arranged for humans, not machines. The semantic meaning
                of elements and their relationships are often unclear.
              </p>
            </div>

            <div className="border-l-4 border-muted pl-4">
              <h4 className="font-semibold mb-1">Accessibility Attributes</h4>
              <p className="text-muted-foreground text-sm">
                Designed for assistive technologies, not AI agents. They
                don&apos;t describe what happens when you interact with an
                element.
              </p>
            </div>

            <div className="border-l-4 border-muted pl-4">
              <h4 className="font-semibold mb-1">Screenshots and Vision</h4>
              <p className="text-muted-foreground text-sm">
                Slow, expensive in tokens, and prone to errors when layouts
                change or elements look similar but behave differently.
              </p>
            </div>
          </div>

          <p className="text-base leading-7">
            These limitations lead to high costs, slow execution, brittle
            automation, and unreliable interactions.
          </p>
        </section>

        {/* Section: How SID Works */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            How SID Works
          </h2>

          <p className="text-base leading-7 mb-4">
            SID uses a combination of HTML attributes and a JavaScript API:
          </p>

          <div className="space-y-6 my-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">HTML Attributes</h4>
              <p className="text-muted-foreground text-sm mb-3">
                Add <code className="bg-muted px-1 rounded">data-sid-*</code>{" "}
                attributes to describe what elements do.
              </p>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                <code>{`<button 
  data-sid="btn-save"
  data-sid-desc="Saves the current document"
  data-sid-action="click"
>
  Save
</button>`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">JavaScript API</h4>
              <p className="text-muted-foreground text-sm mb-3">
                Agents query{" "}
                <code className="bg-muted px-1 rounded">window.SID</code> to
                discover and interact with elements.
              </p>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto mb-4">
                <code>{`// Discover all interactive elements
const elements = window.SID.getElements();

// Get detailed info about a specific element
const saveBtn = window.SID.getElement('btn-save');

// Trigger an interaction
const result = await window.SID.interact('btn-save', { type: 'click' });`}</code>
              </pre>

              <p className="text-muted-foreground text-sm mb-3">
                The result tells the agent exactly what happened:
              </p>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                <code>{`if (result.status === 'completed') {
  console.log('Success:', result.message);
  
  // Check what changed (e.g., new elements, data changes)
  if (result.effects?.changes) {
    console.log('Changes:', result.effects.changes);
  }
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Section: Key Benefits */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Key Benefits
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 my-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">🔌 Universal</h4>
              <p className="text-muted-foreground text-sm">
                Any agent that understands SID can interact with any SID-enabled
                application.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">⚡ Fast</h4>
              <p className="text-muted-foreground text-sm">
                Structured metadata via JavaScript—no vision processing or DOM
                parsing required.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">💰 Efficient</h4>
              <p className="text-muted-foreground text-sm">
                Minimal token usage compared to screenshot-based approaches.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">🎯 Reliable</h4>
              <p className="text-muted-foreground text-sm">
                Explicit operation tracking tells agents when actions complete.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Getting Started */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Getting Started
          </h2>

          <p className="text-base leading-7 mb-4">
            The following pages will guide you through implementing SID:
          </p>

          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4">
            <li>Core concepts and the plaintext-first philosophy</li>
            <li>The complete JavaScript API specification</li>
            <li>HTML attribute reference</li>
            <li>Operation tracking for async interactions</li>
            <li>Handling sensitive human input</li>
            <li>Authentication for AI agents</li>
          </ul>
        </section>
      </div>

      {/* Page Navigation */}
      <PageNavigation />
    </DocLayout>
  );
}
