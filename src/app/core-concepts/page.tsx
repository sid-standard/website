import { Metadata } from "next";
import { DocLayout } from "@/components/layout/doc-layout";
import { PageNavigation } from "@/components/layout/page-navigation";
import { CodeBlock } from "@/components/content/code-block";

/**
 * SEO metadata for the Core Concepts page.
 * Requirements: 7.1, 7.2, 7.3, 7.4
 */
export const metadata: Metadata = {
  title: "Core Concepts | SID - Semantic Interaction Description",
  description:
    "Learn the fundamental concepts of SID including the plaintext-first philosophy, what needs structure vs plaintext, the global API overview, and element discovery model.",
  openGraph: {
    title: "Core Concepts | SID",
    description:
      "Understand SID's design philosophy: plaintext-first descriptions, minimal structure, and LLM-native design for AI agent accessibility.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Core Concepts | SID",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Core Concepts | SID",
    description:
      "Understand SID's design philosophy: plaintext-first descriptions, minimal structure, and LLM-native design for AI agent accessibility.",
    images: ["/og.png"],
  },
};

/**
 * Core Concepts page - explains the fundamental concepts and design philosophy of SID.
 *
 * This page covers:
 * - The plaintext-first philosophy
 * - What needs structure vs plaintext
 * - Global API overview (window.SID)
 * - Element discovery model (getElements, getElement)
 *
 * Requirements: 7.1, 7.2, 7.3, 7.4
 */
export default function CoreConceptsPage() {
  return (
    <DocLayout>
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Core Concepts
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Understanding SID&apos;s design philosophy and fundamental concepts
          for building agent-accessible web applications.
        </p>
      </header>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Section: Design Philosophy */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            The Plaintext-First Philosophy
          </h2>

          <p className="text-base leading-7 mb-4">
            SID prioritizes human-readable plaintext descriptions over rigid
            schemas. The core philosophy is simple:{" "}
            <strong>if an LLM can understand it, don&apos;t over-structure it</strong>.
          </p>

          <p className="text-base leading-7 mb-4">
            This approach recognizes that Large Language Models excel at
            interpreting natural language. Rather than forcing developers to
            learn complex schemas with predefined outcome types and rigid
            taxonomies, SID lets you write descriptions like you&apos;re
            explaining to a colleague.
          </p>

          <div className="space-y-4 my-6">
            <div className="border-l-4 border-muted pl-4">
              <h4 className="font-semibold mb-2">Plaintext First</h4>
              <p className="text-muted-foreground">
                Descriptions are natural language, not rigid schemas. Write what
                the element does, what happens after interaction, and any
                important context—all in plain English.
              </p>
            </div>

            <div className="border-l-4 border-muted pl-4">
              <h4 className="font-semibold mb-2">Minimal Structure</h4>
              <p className="text-muted-foreground">
                Only structure what machines truly need: element IDs, CSS
                selectors, action types. Everything else can be plaintext that
                both humans and AI can read.
              </p>
            </div>

            <div className="border-l-4 border-muted pl-4">
              <h4 className="font-semibold mb-2">Developer Friendly</h4>
              <p className="text-muted-foreground">
                No complex schemas to learn. Write descriptions like
                documentation. Start simple and improve over time.
              </p>
            </div>

            <div className="border-l-4 border-muted pl-4">
              <h4 className="font-semibold mb-2">Agent Friendly</h4>
              <p className="text-muted-foreground">
                LLMs excel at interpreting natural language. Plaintext
                descriptions play to AI strengths rather than forcing rigid
                parsing.
              </p>
            </div>

            <div className="border-l-4 border-muted pl-4">
              <h4 className="font-semibold mb-2">Flexible</h4>
              <p className="text-muted-foreground">
                No predefined outcome types or rigid taxonomies. New interaction
                patterns don&apos;t require schema changes—just describe them.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Structure vs Plaintext */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            What Needs Structure vs. Plaintext
          </h2>

          <p className="text-base leading-7 mb-4">
            SID carefully distinguishes between what must be structured for
            machine processing and what can remain as natural language. This
            balance keeps the specification simple while ensuring agents can
            reliably interact with elements.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">
                    Structured
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Plaintext
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">
                    <code className="bg-muted px-1 rounded text-sm">
                      Element ID
                    </code>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    What the element does
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">
                    <code className="bg-muted px-1 rounded text-sm">
                      CSS selector
                    </code>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    What happens after interaction
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">
                    <code className="bg-muted px-1 rounded text-sm">
                      Action type
                    </code>
                    <span className="text-muted-foreground text-sm ml-2">
                      (click, fill, select)
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Form field requirements
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">
                    <code className="bg-muted px-1 rounded text-sm">
                      Input data type
                    </code>
                    <span className="text-muted-foreground text-sm ml-2">
                      (string, number, date)
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Navigation destinations
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">
                    <code className="bg-muted px-1 rounded text-sm">
                      Required/optional flag
                    </code>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Preconditions and side effects
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">
                    <code className="bg-muted px-1 rounded text-sm">
                      Version number
                    </code>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Page and app context
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">
                    <code className="bg-muted px-1 rounded text-sm">
                      Human input schema
                    </code>
                    <span className="text-muted-foreground text-sm ml-2">
                      (JSON Schema)
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Why human input is needed
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">
                    <code className="bg-muted px-1 rounded text-sm">
                      Disabled flag
                    </code>
                    <span className="text-muted-foreground text-sm ml-2">
                      (boolean)
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    Why the element is disabled
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-base leading-7 mb-4">
            The structured data enables reliable machine interaction—agents need
            exact selectors and action types to trigger interactions. The
            plaintext descriptions provide context and understanding—agents use
            natural language processing to interpret what elements do and decide
            how to use them.
          </p>
        </section>

        {/* Section: Global API Overview */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Global API Overview
          </h2>

          <p className="text-base leading-7 mb-4">
            SID exposes a minimal global API through the{" "}
            <code className="bg-muted px-1 rounded">window.SID</code> object.
            This API provides everything an agent needs to discover elements,
            understand the application context, and trigger interactions.
          </p>

          <CodeBlock
            language="javascript"
            code={`window.SID = {
  version: "1.0.0",
  
  // Discovery
  isSupported(): boolean,
  getPageContext(): string,           // Plaintext description of the page
  getAppContext(): string,            // Plaintext description of the entire app
  
  // Elements
  getElements(): SIDElement[],        // Returns elements with short descriptions only
  getElement(id: string): SIDElement | null,  // Returns element with long description
  
  // Execution (waits for completion)
  interact(id: string, action: InteractionAction): Promise<InteractionResult>,
  
  // Completion signaling (called by app code)
  complete(elementId: string, result: CompletionResult): void,
  
  // Auth (optional)
  auth?: {
    description: string,              // How auth works, plaintext
    authenticate(token: string): Promise<boolean>
  }
}`}
          />

          <div className="space-y-6 my-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Discovery Methods</h4>
              <p className="text-muted-foreground text-sm">
                <code className="bg-muted px-1 rounded">isSupported()</code>{" "}
                checks if SID is available.{" "}
                <code className="bg-muted px-1 rounded">getPageContext()</code>{" "}
                and{" "}
                <code className="bg-muted px-1 rounded">getAppContext()</code>{" "}
                return plaintext descriptions of the current page and overall
                application.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Element Methods</h4>
              <p className="text-muted-foreground text-sm">
                <code className="bg-muted px-1 rounded">getElements()</code>{" "}
                returns all interactive elements with short descriptions for
                efficient overview.{" "}
                <code className="bg-muted px-1 rounded">getElement(id)</code>{" "}
                returns a single element with its full long description.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Execution Methods</h4>
              <p className="text-muted-foreground text-sm">
                <code className="bg-muted px-1 rounded">interact()</code>{" "}
                triggers an interaction on an element and waits for completion.
                Applications signal completion using{" "}
                <code className="bg-muted px-1 rounded">complete()</code>.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Element Discovery Model */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Element Discovery Model
          </h2>

          <p className="text-base leading-7 mb-4">
            SID uses a two-tier description model to balance efficiency with
            detail. This allows agents to quickly scan all available elements
            and then dive deeper into specific elements when needed.
          </p>

          <h3 className="text-xl font-medium mt-8 mb-4">
            Short vs. Long Descriptions
          </h3>

          <p className="text-base leading-7 mb-4">
            Every SID element has a short description that summarizes what it
            does. Elements can optionally have a long description with detailed
            information about outcomes, errors, and context.
          </p>

          <div className="space-y-4 my-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">
                Short Description{" "}
                <code className="bg-muted px-1 rounded text-sm font-normal">
                  description
                </code>
              </h4>
              <p className="text-muted-foreground text-sm mb-2">
                Returned by{" "}
                <code className="bg-muted px-1 rounded">getElements()</code>.
                One line that captures the primary action.
              </p>
              <p className="text-sm italic">
                &ldquo;Saves the current document&rdquo;
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">
                Long Description{" "}
                <code className="bg-muted px-1 rounded text-sm font-normal">
                  descriptionLong
                </code>
              </h4>
              <p className="text-muted-foreground text-sm mb-2">
                Only populated when calling{" "}
                <code className="bg-muted px-1 rounded">getElement(id)</code>.
                Contains detailed information about outcomes, forms revealed,
                error handling, etc.
              </p>
              <p className="text-sm italic">
                &ldquo;Saves the current document to the server. Validates all
                required fields before saving. Shows inline validation errors if
                any fields are invalid. On success, displays a toast
                notification and updates the &apos;Last saved&apos; timestamp in
                the header. On network error, shows a retry button.&rdquo;
              </p>
            </div>
          </div>

          <h3 className="text-xl font-medium mt-8 mb-4">
            Discovery Flow
          </h3>

          <p className="text-base leading-7 mb-4">
            Here&apos;s how an agent typically discovers and interacts with SID
            elements:
          </p>

          <CodeBlock
            language="javascript"
            code={`// 1. Check support and get context
if (window.SID?.isSupported()) {
  console.log('App:', window.SID.getAppContext());
  console.log('Page:', window.SID.getPageContext());
}

// 2. Get all elements with SHORT descriptions (efficient overview)
const elements = window.SID.getElements();

for (const el of elements) {
  console.log(\`[\${el.id}] \${el.description}\`);  // Short description
  console.log(\`  Actions: \${el.actions.map(a => a.type).join(', ')}\`);
}

// 3. Get detailed info for specific element when needed
const saveBtn = window.SID.getElement('btn-save');
console.log(saveBtn.descriptionLong);  // Full details about outcomes, errors, etc.`}
          />

          <h3 className="text-xl font-medium mt-8 mb-4">
            Example: Agent Interpretation
          </h3>

          <p className="text-base leading-7 mb-4">
            Consider this element definition:
          </p>

          <CodeBlock
            language="html"
            code={`<button
  data-sid="btn-export"
  data-sid-desc="Exports project data"
  data-sid-desc-long="Exports project data. Opens a modal to choose format 
                      (CSV, JSON, PDF) and date range. Large exports (>10MB) 
                      are processed async and emailed; small ones download 
                      immediately. Requires at least Viewer role."
  data-sid-action="click"
>
  Export
</button>`}
          />

          <p className="text-base leading-7 mt-4 mb-4">
            From{" "}
            <code className="bg-muted px-1 rounded">getElements()</code>, the
            agent sees: <em>&ldquo;Exports project data&rdquo;</em>—enough to
            know what this does.
          </p>

          <p className="text-base leading-7 mb-4">
            From{" "}
            <code className="bg-muted px-1 rounded">
              getElement(&apos;btn-export&apos;)
            </code>
            , the agent learns:
          </p>

          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4">
            <li>It will open a modal (not navigate away)</li>
            <li>There will be format and date range options</li>
            <li>Behavior varies by export size</li>
            <li>There&apos;s a permission requirement</li>
          </ul>

          <p className="text-base leading-7 mt-4">
            No rigid schema needed—the LLM parses this naturally.
          </p>
        </section>

        {/* Section: Page and App Context */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Page and App Context
          </h2>

          <p className="text-base leading-7 mb-4">
            Beyond individual elements, SID provides plaintext context that
            describes the bigger picture. This helps agents understand where
            they are in the application and what&apos;s possible.
          </p>

          <CodeBlock
            language="html"
            code={`<script type="application/sid+json">
{
  "version": "1.0.0",
  
  "app": "Acme Project Manager - A project management tool for teams. 
         Main features: create and manage projects, assign tasks, 
         track time, generate reports, team collaboration via 
         comments and mentions.",
  
  "page": "Project Dashboard for '{projectName}'. Shows project overview, 
          recent activity, and quick actions. From here you can access 
          task list, team members, settings, and reports. The sidebar 
          navigation is consistent across all project pages.",
  
  "auth": "Supports token-based auth for agents. Call 
          SID.auth.authenticate(token) with an API key from 
          Settings > API Keys. Tokens have same permissions as 
          the user who created them."
}
</script>`}
          />

          <p className="text-base leading-7 mt-4">
            The app context gives agents a high-level understanding of the
            application&apos;s purpose and capabilities. The page context
            describes the current view and what actions are available. Both are
            plaintext—no rigid structure, just natural language that agents can
            interpret.
          </p>
        </section>

        {/* Section: Next Steps */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Next Steps
          </h2>

          <p className="text-base leading-7 mb-4">
            Now that you understand SID&apos;s core concepts, you&apos;re ready
            to dive into the details:
          </p>

          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4">
            <li>
              <strong>JavaScript API</strong> — Complete reference for all
              methods, types, and interfaces
            </li>
            <li>
              <strong>HTML Attributes</strong> — How to add SID metadata to your
              HTML elements
            </li>
            <li>
              <strong>Operation Tracking</strong> — How agents know when
              interactions complete
            </li>
            <li>
              <strong>Human Input</strong> — Declaring when sensitive data
              collection is needed
            </li>
          </ul>
        </section>
      </div>

      {/* Page Navigation */}
      <PageNavigation />
    </DocLayout>
  );
}
