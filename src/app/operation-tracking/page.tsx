import { Metadata } from "next";
import { DocLayout } from "@/components/layout/doc-layout";
import { PageNavigation } from "@/components/layout/page-navigation";
import { CodeBlock } from "@/components/content/code-block";

/**
 * SEO metadata for the Operation Tracking page.
 */
export const metadata: Metadata = {
  title: "Operation Tracking | SID - Semantic Interaction Description",
  description:
    "Learn how SID tracks operation completion. The interact() method now waits for completion automatically - no polling required.",
  openGraph: {
    title: "Operation Tracking | SID",
    description:
      "How to signal interaction completion to agents using SID's simplified operation tracking system.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Operation Tracking | SID",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Operation Tracking | SID",
    description:
      "How to signal interaction completion to agents using SID's simplified operation tracking system.",
    images: ["/og.png"],
  },
};

/**
 * Operation Tracking page - explains how to track interaction completion.
 */
export default function OperationTrackingPage() {
  return (
    <DocLayout>
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Operation Tracking
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          One of the key challenges for agents is knowing when an interaction
          has completed and whether it succeeded. SID solves this with a
          simplified approach: the <code>interact()</code> method waits for
          completion automatically and returns the final result.
        </p>
      </header>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Section: Simplified API */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Simplified API - No Polling Required
          </h2>

          <p className="text-base leading-7 mb-4">
            The <code className="bg-muted px-1 rounded">interact()</code> method
            now handles waiting internally. When you trigger an interaction, it
            returns a Promise that resolves when the operation completes (or
            times out).
          </p>

          <CodeBlock
            language="javascript"
            code={`// Simple! No polling needed
const result = await SID.interact('btn-save', { type: 'click' }, { timeout: 10000 });

if (result.status === 'completed') {
  console.log('Success:', result.message);
  
  // Check what changed
  if (result.effects?.elementsAdded) {
    console.log('New elements:', result.effects.elementsAdded);
  }
} else if (result.status === 'error') {
  console.error('Failed:', result.message);
} else if (result.status === 'timeout') {
  console.log('Operation timed out');
}`}
          />
        </section>

        {/* Section: The Four Tracking Types */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            The Four Tracking Types
          </h2>

          <p className="text-base leading-7 mb-6">
            Different interactions have different completion semantics. SID
            defines four tracking types, but agents don&apos;t need to handle them
            differently - the <code>interact()</code> method returns the
            appropriate status automatically.
          </p>

          {/* Tracking Types Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-2 text-left font-semibold">
                    Tracking Type
                  </th>
                  <th className="border border-border px-4 py-2 text-left font-semibold">
                    When Used
                  </th>
                  <th className="border border-border px-4 py-2 text-left font-semibold">
                    Result Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <code className="bg-muted px-1 rounded">async</code>
                  </td>
                  <td className="border border-border px-4 py-2">
                    Async operations (API calls, form submissions)
                  </td>
                  <td className="border border-border px-4 py-2">
                    <code className="bg-muted px-1 rounded">completed</code>,{" "}
                    <code className="bg-muted px-1 rounded">error</code>, or{" "}
                    <code className="bg-muted px-1 rounded">timeout</code>
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <code className="bg-muted px-1 rounded">navigation</code>
                  </td>
                  <td className="border border-border px-4 py-2">
                    Full page navigation
                  </td>
                  <td className="border border-border px-4 py-2">
                    <code className="bg-muted px-1 rounded">navigation</code>{" "}
                    (returns immediately)
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <code className="bg-muted px-1 rounded">external</code>
                  </td>
                  <td className="border border-border px-4 py-2">
                    OAuth, payment gateways
                  </td>
                  <td className="border border-border px-4 py-2">
                    <code className="bg-muted px-1 rounded">external</code>{" "}
                    (returns immediately)
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <code className="bg-muted px-1 rounded">none</code>
                  </td>
                  <td className="border border-border px-4 py-2">
                    Instant actions (hover, focus)
                  </td>
                  <td className="border border-border px-4 py-2">
                    <code className="bg-muted px-1 rounded">completed</code>{" "}
                    (returns immediately)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Handling Different Statuses */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Handling Different Statuses
          </h2>

          <p className="text-base leading-7 mb-4">
            The result&apos;s <code className="bg-muted px-1 rounded">status</code>{" "}
            field tells you what happened:
          </p>

          <CodeBlock
            language="javascript"
            code={`const result = await SID.interact('btn-save', { type: 'click' }, { timeout: 15000 });

switch (result.status) {
  case 'completed':
    // Operation finished successfully
    console.log('Success:', result.message);
    if (result.effects?.elementsAdded) {
      console.log('New elements:', result.effects.elementsAdded);
    }
    break;
    
  case 'error':
    // Operation failed
    console.error('Failed:', result.error || result.message);
    break;
    
  case 'timeout':
    // Operation didn't complete within timeout
    console.log('Timed out - operation may still complete');
    break;
    
  case 'navigation':
    // Page will navigate - wait for page load
    console.log('Navigating to:', result.message);
    // In Playwright: await page.waitForNavigation();
    break;
    
  case 'external':
    // Leaving SID context (OAuth, payment, etc.)
    console.log('External operation:', result.message);
    break;
}`}
          />
        </section>

        {/* Section: For App Developers */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            For App Developers: Signaling Completion
          </h2>

          <p className="text-base leading-7 mb-4">
            When an async operation completes, call{" "}
            <code className="bg-muted px-1 rounded">SID.complete()</code> to
            signal the result. This resolves the Promise that the agent is
            waiting on.
          </p>

          <CodeBlock
            language="javascript"
            code={`// In your app's click handler
async function handleSave() {
  try {
    await api.saveDocument(data);
    
    // Signal success to SID
    SID.complete('btn-save', {
      status: 'completed',
      message: 'Document saved',
      effects: { changes: 'Content updated' }
    });
  } catch (error) {
    // Signal error to SID
    SID.complete('btn-save', {
      status: 'error',
      message: error.message
    });
  }
}`}
          />

          <h3 className="text-xl font-medium mt-8 mb-4">
            How It Works
          </h3>

          <ol className="list-decimal list-inside space-y-2 text-base leading-7 ml-4">
            <li>
              Agent calls{" "}
              <code className="bg-muted px-1 rounded">
                SID.interact(&apos;btn-save&apos;, &#123; type: &apos;click&apos; &#125;)
              </code>
            </li>
            <li>SID triggers the click event on the button</li>
            <li>Your click handler runs and starts async work</li>
            <li>
              When done, you call{" "}
              <code className="bg-muted px-1 rounded">SID.complete()</code>
            </li>
            <li>
              The <code className="bg-muted px-1 rounded">interact()</code>{" "}
              Promise resolves with the result
            </li>
            <li>Agent receives the final status - no polling needed!</li>
          </ol>
        </section>

        {/* Section: Operation Effects */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Operation Effects
          </h2>

          <p className="text-base leading-7 mb-4">
            When an operation completes, the{" "}
            <code className="bg-muted px-1 rounded">effects</code> field
            describes what changed:
          </p>

          <CodeBlock
            language="typescript"
            code={`interface OperationEffects {
  // Client-side navigation occurred
  navigatedTo?: string;
  
  // New SID elements now available (e.g., modal opened)
  elementsAdded?: string[];
  
  // SID elements no longer available (e.g., modal closed)
  elementsRemoved?: string[];
  
  // Plaintext description of data/state changes
  changes?: string;
}`}
          />

          <p className="text-base leading-7 mt-4">
            This helps agents understand what happened without needing to
            re-scan the entire page:
          </p>

          <CodeBlock
            language="javascript"
            code={`const result = await SID.interact('btn-add-item', { type: 'click' });

if (result.status === 'completed') {
  // Check if a modal opened
  if (result.effects?.elementsAdded?.includes('modal-add-item')) {
    // New modal is available, interact with it
    const modal = SID.getElement('modal-add-item');
    console.log(modal.descriptionLong);
  }
  
  // Check what data changed
  if (result.effects?.changes) {
    console.log('Changes:', result.effects.changes);
  }
}`}
          />
        </section>

        {/* Section: Timeout Behavior */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Timeout Behavior
          </h2>

          <p className="text-base leading-7 mb-4">
            If an operation doesn&apos;t complete within the specified timeout, the
            result will have <code className="bg-muted px-1 rounded">status: &apos;timeout&apos;</code>.
            The operation may still complete in the background.
          </p>

          <CodeBlock
            language="javascript"
            code={`const result = await SID.interact('btn-slow-operation', { type: 'click' }, { timeout: 5000 });

if (result.status === 'timeout') {
  // Operation didn't complete within 5 seconds
  // Options:
  // 1. Retry the operation
  // 2. Report to user that action is taking longer than expected
  // 3. Continue with other tasks
  console.log('Operation timed out:', result.message);
}`}
          />
        </section>

        {/* Section: HTML Attributes */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            HTML Attributes for Tracking
          </h2>

          <p className="text-base leading-7 mb-4">
            The{" "}
            <code className="bg-muted px-1 rounded">data-sid-tracking</code>{" "}
            attribute declares the tracking type:
          </p>

          <CodeBlock
            language="html"
            code={`<!-- Async operation (default) - waits for SID.complete() -->
<button data-sid="btn-save" data-sid-action="click">
  Save
</button>

<!-- Navigation - returns immediately with 'navigation' status -->
<a href="/dashboard" 
   data-sid="link-dashboard" 
   data-sid-action="click"
   data-sid-tracking="navigation"
   data-sid-destination="/dashboard">
  Go to Dashboard
</a>

<!-- External - returns immediately with 'external' status -->
<button data-sid="btn-oauth" 
        data-sid-action="click"
        data-sid-tracking="external">
  Sign in with Google
</button>

<!-- Instant (no tracking) - returns immediately with 'completed' status -->
<div data-sid="menu-trigger" 
     data-sid-action="hover"
     data-sid-tracking="none">
  Menu
</div>`}
          />
        </section>

        {/* Section: Next Steps */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Next Steps
          </h2>

          <p className="text-base leading-7 mb-4">
            Now that you understand operation tracking, continue with:
          </p>

          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4">
            <li>
              <strong>Human Input</strong> — How to declare when sensitive data
              collection is needed
            </li>
            <li>
              <strong>Authentication</strong> — Token-based authentication for
              AI agents
            </li>
          </ul>
        </section>
      </div>

      {/* Page Navigation */}
      <PageNavigation />
    </DocLayout>
  );
}
