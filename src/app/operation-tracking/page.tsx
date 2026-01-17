import { Metadata } from "next";
import { DocLayout } from "@/components/layout/doc-layout";
import { PageNavigation } from "@/components/layout/page-navigation";
import { CodeBlock } from "@/components/content/code-block";

/**
 * SEO metadata for the Operation Tracking page.
 * Requirements: 10.1, 10.2, 10.3, 10.4
 */
export const metadata: Metadata = {
  title: "Operation Tracking | SID - Semantic Interaction Description",
  description:
    "Learn how SID tracks operation completion with four tracking types: poll, navigation, external, and none. Includes polling API documentation and complete interaction flow examples.",
  openGraph: {
    title: "Operation Tracking | SID",
    description:
      "How to signal interaction completion to agents using SID's operation tracking system.",
    type: "article",
  },
};

/**
 * Operation Tracking page - explains how to track interaction completion.
 *
 * This page covers:
 * - The four tracking types (poll, navigation, external, none)
 * - When to use each tracking type
 * - The polling API (getOperation, pollOperation)
 * - Complete interaction flow examples
 *
 * Requirements: 10.1, 10.2, 10.3, 10.4
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
          has completed and whether it succeeded. Visual indicators like
          loaders, toasts, and spinners are designed for humans, not agents. SID
          provides explicit operation tracking to solve this.
        </p>
      </header>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Section: The Four Tracking Types */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            The Four Tracking Types
          </h2>

          <p className="text-base leading-7 mb-6">
            Different interactions have different completion semantics. SID
            defines four tracking types to handle these variations:
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
                    How Agent Determines Completion
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <code className="bg-muted px-1 rounded">poll</code>
                  </td>
                  <td className="border border-border px-4 py-2">
                    Async operations (API calls, form submissions)
                  </td>
                  <td className="border border-border px-4 py-2">
                    Call{" "}
                    <code className="bg-muted px-1 rounded">
                      SID.pollOperation(id)
                    </code>{" "}
                    or poll{" "}
                    <code className="bg-muted px-1 rounded">
                      SID.getOperation(id)
                    </code>
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <code className="bg-muted px-1 rounded">navigation</code>
                  </td>
                  <td className="border border-border px-4 py-2">
                    Full page navigation (server-side or hard navigation)
                  </td>
                  <td className="border border-border px-4 py-2">
                    Page load completes; success = new page loaded
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <code className="bg-muted px-1 rounded">external</code>
                  </td>
                  <td className="border border-border px-4 py-2">
                    Leaves SID context (OAuth, external site, payment gateway)
                  </td>
                  <td className="border border-border px-4 py-2">
                    Described in{" "}
                    <code className="bg-muted px-1 rounded">description</code>{" "}
                    field; often return URL based
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
                    No tracking needed; always succeeds if triggered
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Poll Tracking */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Poll Tracking
          </h2>

          <p className="text-base leading-7 mb-4">
            The <code className="bg-muted px-1 rounded">poll</code> tracking
            type is used for asynchronous operations like API calls, form
            submissions, and any action that takes time to complete. The agent
            uses the polling API to check the operation status.
          </p>

          <CodeBlock
            language="javascript"
            code={`// Trigger an async operation
const result = await SID.interact('btn-save', { type: 'click' });

if (result.operation?.tracking.type === 'poll') {
  // Wait for the operation to complete
  const op = await SID.pollOperation(result.operation.id, 15000);
  
  if (op.status === 'success') {
    console.log('Operation succeeded:', op.message);
    
    // Check what changed
    if (op.effects?.elementsAdded) {
      console.log('New elements available:', op.effects.elementsAdded);
    }
  } else if (op.status === 'error') {
    console.error('Operation failed:', op.message);
  }
}`}
          />
        </section>

        {/* Section: The Navigation Problem */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            The Navigation Problem
          </h2>

          <p className="text-base leading-7 mb-4">
            When a full page navigation occurs (not client-side routing), the
            JavaScript context is destroyed. The operation cannot be tracked
            because the SID instance no longer exists. The spec handles this by:
          </p>

          <ol className="list-decimal list-inside space-y-2 text-base leading-7 ml-4 mb-6">
            <li>
              <strong>Declaring intent upfront:</strong> The{" "}
              <code className="bg-muted px-1 rounded">InteractionResult</code>{" "}
              tells the agent that navigation will occur
            </li>
            <li>
              <strong>Success = page load:</strong> If the browser successfully
              loads a new page, the operation succeeded
            </li>
            <li>
              <strong>Failure stays on page:</strong> If the operation fails,
              the user typically stays on the current page with an error, which
              the agent can detect via{" "}
              <code className="bg-muted px-1 rounded">SID.getOperation(id)</code>
            </li>
          </ol>

          <CodeBlock
            language="javascript"
            code={`// Example: Link that navigates to another page
const result = await SID.interact('link-dashboard', { type: 'click' });

if (result.operation?.tracking.type === 'navigation') {
  // Agent knows: don't poll, just wait for page load
  // If page loads successfully, operation succeeded
  // The destination hint helps agent know what to expect
  console.log('Expected destination:', result.operation.tracking.destination);
  // "/dashboard"
}`}
          />

          <p className="text-base leading-7 mt-4">
            The{" "}
            <code className="bg-muted px-1 rounded">
              tracking.destination
            </code>{" "}
            field provides a hint about where the navigation will go, helping
            the agent verify it arrived at the expected page.
          </p>
        </section>

        {/* Section: External Context */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            External Context (OAuth, Payment Gateways)
          </h2>

          <p className="text-base leading-7 mb-4">
            Some interactions take the user completely outside the
            application—to OAuth providers, payment gateways, or external sites.
            These may or may not return to a SID-enabled page.
          </p>

          <CodeBlock
            language="javascript"
            code={`// Example: OAuth login button
const result = await SID.interact('btn-google-login', { type: 'click' });

if (result.operation?.tracking.type === 'external') {
  // Agent reads the description to understand what happens
  console.log(result.operation.tracking.description);
  // "Redirects to Google OAuth. On success, returns to /auth/callback 
  //  which redirects to dashboard. On cancel, returns to /login with 
  //  error=cancelled parameter."
}`}
          />

          <p className="text-base leading-7 mt-4">
            The{" "}
            <code className="bg-muted px-1 rounded">
              tracking.description
            </code>{" "}
            field is crucial here—it tells the agent in plaintext what to expect
            and how to detect success or failure. This might include:
          </p>

          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4 mt-4">
            <li>Where the user will be redirected</li>
            <li>What URL parameters indicate success or failure</li>
            <li>What page the user returns to after completion</li>
            <li>Any timeout considerations</li>
          </ul>
        </section>

        {/* Section: Untracked Actions */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Untracked Actions (Hover, Focus)
          </h2>

          <p className="text-base leading-7 mb-4">
            Some actions are instant and always succeed if triggered. These
            don&apos;t need operation tracking:
          </p>

          <CodeBlock
            language="javascript"
            code={`// Hover to reveal tooltip or dropdown
const result = await SID.interact('menu-trigger', { type: 'hover' });

// tracking.type === 'none' means no operation to track
// The action either worked (success: true) or didn't (success: false)
// No async completion to wait for

if (result.success) {
  // The hover was triggered, any UI changes are immediate
  // Re-query elements to see what's now available
  const elements = SID.getElements();
}`}
          />

          <p className="text-base leading-7 mt-4">
            For untracked actions, the{" "}
            <code className="bg-muted px-1 rounded">result.success</code> field
            tells you immediately whether the action was triggered. There&apos;s
            no need to poll or wait.
          </p>
        </section>

        {/* Section: The Polling API */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            The Polling API
          </h2>

          <p className="text-base leading-7 mb-4">
            SID provides two methods for tracking operations:
          </p>

          {/* getOperation */}
          <div className="border rounded-lg p-4 mb-6">
            <h3 className="font-mono font-semibold mb-2">
              getOperation(id: string): Operation | null
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Returns the current status of an operation. Use this for manual
              polling or one-time status checks.
            </p>
            <CodeBlock
              language="javascript"
              code={`const operation = SID.getOperation('op-123');

if (operation) {
  console.log('Status:', operation.status);  // 'pending' | 'success' | 'error'
  console.log('Message:', operation.message);
  console.log('Started at:', operation.startedAt);
  
  if (operation.status !== 'pending') {
    console.log('Completed at:', operation.completedAt);
  }
}`}
            />
          </div>

          {/* pollOperation */}
          <div className="border rounded-lg p-4 mb-6">
            <h3 className="font-mono font-semibold mb-2">
              pollOperation(id: string, timeoutMs?: number, intervalMs?:
              number): Promise&lt;Operation&gt;
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Polls an operation until it completes or times out. Returns the
              final operation state.
            </p>
            <CodeBlock
              language="javascript"
              code={`// Using pollOperation (recommended for browser automation)
const operation = await SID.pollOperation(operationId, 10000, 500);
// Polls every 500ms, times out after 10s

// Manual polling (if more control needed)
const startTime = Date.now();
while (Date.now() - startTime < 10000) {
  const op = SID.getOperation(operationId);
  if (op.status !== 'pending') break;
  await new Promise(r => setTimeout(r, 500));
}`}
            />
          </div>

          {/* Why Polling vs Await */}
          <h3 className="text-xl font-medium mt-8 mb-4">
            Why Polling Instead of Await?
          </h3>

          <p className="text-base leading-7 mb-4">
            The API uses{" "}
            <code className="bg-muted px-1 rounded">pollOperation</code> instead
            of <code className="bg-muted px-1 rounded">awaitOperation</code>{" "}
            because:
          </p>

          <ol className="list-decimal list-inside space-y-2 text-base leading-7 ml-4">
            <li>
              <strong>Playwright/Puppeteer compatibility:</strong> Top-level
              await in{" "}
              <code className="bg-muted px-1 rounded">evaluate()</code> can be
              problematic. Polling with explicit intervals works reliably across
              browser automation tools.
            </li>
            <li>
              <strong>Timeout control:</strong> Agent controls both total
              timeout and poll interval.
            </li>
            <li>
              <strong>Interruptibility:</strong> Agent can stop polling if
              needed (e.g., user cancels).
            </li>
          </ol>
        </section>

        {/* Section: Complete Interaction Flow */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Complete Interaction Flow
          </h2>

          <p className="text-base leading-7 mb-4">
            Here&apos;s a complete example showing how an agent handles all
            tracking types:
          </p>

          <CodeBlock
            language="javascript"
            code={`// 1. Get element with full description
const saveBtn = SID.getElement('btn-save');
console.log(saveBtn.descriptionLong);
// "Saves the current document to the server. Shows inline validation 
//  errors if any fields are invalid. On success, shows a toast and 
//  updates the 'Last saved' timestamp. On network error, shows retry option."

// 2. Check if action is tracked
const clickAction = saveBtn.actions.find(a => a.type === 'click');
if (clickAction.tracked) {
  // This action produces an operation we can track
}

// 3. Trigger interaction
const result = await SID.interact('btn-save', { type: 'click' });

if (!result.success) {
  // Interaction couldn't be triggered (element disabled, not found, etc.)
  console.error(result.error);
  return;
}

// 4. Handle based on tracking type
switch (result.operation?.tracking.type) {
  case 'poll':
    // Wait for async operation to complete
    const op = await SID.pollOperation(result.operation.id, 15000);
    if (op.status === 'success') {
      console.log('Saved:', op.message);
      // Check what changed
      if (op.effects?.elementsAdded) {
        console.log('New elements:', op.effects.elementsAdded);
      }
    } else {
      console.error('Save failed:', op.message);
    }
    break;
    
  case 'navigation':
    // Page will navigate; success = new page loads
    // Agent should wait for page load, then re-query SID on new page
    break;
    
  case 'external':
    // Leaving SID context; read description for guidance
    console.log(result.operation.tracking.description);
    break;
    
  case 'none':
    // Instant action, already complete
    break;
}`}
          />
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
            code={`const op = await SID.pollOperation(result.operation.id);

if (op.status === 'success') {
  // Check if a modal opened
  if (op.effects?.elementsAdded?.includes('modal-confirm')) {
    // New modal is available, interact with it
    const modal = SID.getElement('modal-confirm');
    console.log(modal.descriptionLong);
  }
  
  // Check if we navigated
  if (op.effects?.navigatedTo) {
    console.log('Now on page:', op.effects.navigatedTo);
  }
  
  // Check what data changed
  if (op.effects?.changes) {
    console.log('Changes:', op.effects.changes);
    // "Document saved. Last modified timestamp updated."
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
            If an operation stays{" "}
            <code className="bg-muted px-1 rounded">pending</code> beyond the
            agent&apos;s timeout:
          </p>

          <ol className="list-decimal list-inside space-y-2 text-base leading-7 ml-4 mb-6">
            <li>
              <strong>Agent decides:</strong> The agent can retry, report
              failure, or ask for user intervention
            </li>
            <li>
              <strong>No auto-resolution:</strong> SID doesn&apos;t
              automatically mark operations as failed
            </li>
            <li>
              <strong>Stale operations:</strong> Apps should clean up operations
              older than a reasonable threshold (e.g., 5 minutes)
            </li>
          </ol>

          <CodeBlock
            language="javascript"
            code={`try {
  const op = await SID.pollOperation(result.operation.id, 10000);
  // Operation completed within timeout
} catch (error) {
  // Timeout exceeded - operation still pending
  // Agent can:
  // 1. Retry the operation
  // 2. Report to user that the action is taking longer than expected
  // 3. Check operation status one more time
  const finalStatus = SID.getOperation(result.operation.id);
  if (finalStatus?.status === 'pending') {
    console.log('Operation still in progress after timeout');
  }
}`}
          />
        </section>

        {/* Section: Implementation Notes */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Implementation Notes for App Developers
          </h2>

          <p className="text-base leading-7 mb-4">
            The SID library needs hooks for app code to signal operation
            completion:
          </p>

          <CodeBlock
            language="javascript"
            code={`// In app's save handler
async function handleSave() {
  const opId = SID.internal.startOperation('btn-save', 'click');
  
  try {
    await api.saveDocument(data);
    SID.internal.completeOperation(opId, 'success', 'Document saved', {
      changes: 'Document content and metadata updated'
    });
  } catch (error) {
    SID.internal.completeOperation(opId, 'error', \`Save failed: \${error.message}\`);
  }
}

// For navigation, declare it upfront in the element definition
// The library handles the rest`}
          />

          <p className="text-base leading-7 mt-4">
            The{" "}
            <code className="bg-muted px-1 rounded">data-sid-tracking</code>{" "}
            attribute on HTML elements declares the tracking type:
          </p>

          <CodeBlock
            language="html"
            code={`<!-- Async operation (default) -->
<button data-sid="btn-save" data-sid-action="click">
  Save
</button>

<!-- Navigation -->
<a href="/dashboard" 
   data-sid="link-dashboard" 
   data-sid-action="click"
   data-sid-tracking="navigation"
   data-sid-destination="/dashboard">
  Go to Dashboard
</a>

<!-- External -->
<button data-sid="btn-oauth" 
        data-sid-action="click"
        data-sid-tracking="external">
  Sign in with Google
</button>

<!-- Instant (no tracking) -->
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
