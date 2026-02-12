import { Metadata } from "next";
import { DocLayout } from "@/components/layout/doc-layout";
import { PageNavigation } from "@/components/layout/page-navigation";
import { CodeBlock } from "@/components/content/code-block";
import { TypeDefinition } from "@/components/content/type-definition";

/**
 * SEO metadata for the JavaScript API page.
 * Requirements: 8.1, 8.2, 8.3, 8.4
 */
export const metadata: Metadata = {
  title: "JavaScript API | SID - Semantic Interaction Description",
  description:
    "Complete JavaScript API documentation for SID including the window.SID global object, all methods with signatures, TypeScript interfaces, and code examples.",
  openGraph: {
    title: "JavaScript API | SID",
    description:
      "Complete reference for the SID JavaScript API: window.SID object, methods, TypeScript interfaces, and usage examples.",
    type: "article",
  },
};

/**
 * JavaScript API page - complete API documentation for implementing SID.
 *
 * This page covers:
 * - The window.SID global object
 * - All methods with signatures and return types
 * - All TypeScript interfaces
 * - Code examples for each method
 *
 * Requirements: 8.1, 8.2, 8.3, 8.4
 */
export default function JavaScriptAPIPage() {
  return (
    <DocLayout>
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          JavaScript API
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Complete reference for the SID JavaScript API, including the global
          object, all methods, TypeScript interfaces, and usage examples.
        </p>
      </header>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Section: Global Object */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            The window.SID Global Object
          </h2>

          <p className="text-base leading-7 mb-4">
            SID exposes its functionality through a global{" "}
            <code className="bg-muted px-1 rounded">window.SID</code> object.
            This object provides methods for discovering elements, understanding
            application context, triggering interactions, and tracking
            operations.
          </p>

          <CodeBlock
            language="typescript"
            code={`window.SID = {
  version: "1.0.0",
  
  // Discovery
  isSupported(): boolean,
  getPageContext(): string,
  getAppContext(): string,
  
  // Elements
  getElements(): SIDElement[],
  getElement(id: string): SIDElement | null,
  
  // Execution
  interact(id: string, action: InteractionAction): Promise<InteractionResult>,
  
  // Operation tracking
  getOperation(id: string): Operation | null,
  pollOperation(id: string, timeoutMs?: number, intervalMs?: number): Promise<Operation>,
  
  // Auth (optional)
  auth?: {
    description: string,
    authenticate(token: string): Promise<boolean>
  }
}`}
          />
        </section>

        {/* Section: Methods */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Methods Reference
          </h2>

          {/* Discovery Methods */}
          <h3 className="text-xl font-medium mt-8 mb-4">Discovery Methods</h3>

          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-mono font-semibold mb-2">
                isSupported(): boolean
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                Checks if SID is available and properly initialized on the
                current page. Always call this before using other SID methods.
              </p>
              <CodeBlock
                language="javascript"
                code={`// Check if SID is available
if (window.SID?.isSupported()) {
  console.log('SID is available on this page');
} else {
  console.log('SID is not supported');
}`}
              />
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-mono font-semibold mb-2">
                getPageContext(): string
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                Returns a plaintext description of the current page, including
                what the page is for and what actions are available.
              </p>
              <CodeBlock
                language="javascript"
                code={`const pageContext = window.SID.getPageContext();
console.log(pageContext);
// "Project Dashboard for 'My Project'. Shows project overview, 
//  recent activity, and quick actions. From here you can access 
//  task list, team members, settings, and reports."`}
              />
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-mono font-semibold mb-2">
                getAppContext(): string
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                Returns a plaintext description of the entire application,
                including its purpose and main features.
              </p>
              <CodeBlock
                language="javascript"
                code={`const appContext = window.SID.getAppContext();
console.log(appContext);
// "Acme Project Manager - A project management tool for teams. 
//  Main features: create and manage projects, assign tasks, 
//  track time, generate reports, team collaboration."`}
              />
            </div>
          </div>

          {/* Element Methods */}
          <h3 className="text-xl font-medium mt-8 mb-4">Element Methods</h3>

          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-mono font-semibold mb-2">
                getElements(): SIDElement[]
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                Returns all SID-annotated elements on the page with their short
                descriptions. Use this for an efficient overview of available
                interactions.
              </p>
              <CodeBlock
                language="javascript"
                code={`const elements = window.SID.getElements();

for (const el of elements) {
  console.log(\`[\${el.id}] \${el.description}\`);
  console.log(\`  Actions: \${el.actions.map(a => a.type).join(', ')}\`);
  console.log(\`  Visible: \${el.state?.visible}, Enabled: \${el.state?.enabled}\`);
}

// Output:
// [btn-save] Saves the current document
//   Actions: click
//   Visible: true, Enabled: true
// [input-title] Document title
//   Actions: fill
//   Visible: true, Enabled: true`}
              />
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-mono font-semibold mb-2">
                getElement(id: string): SIDElement | null
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                Returns a single element by ID with its full long description
                populated. Returns null if the element is not found.
              </p>
              <CodeBlock
                language="javascript"
                code={`const saveBtn = window.SID.getElement('btn-save');

if (saveBtn) {
  console.log('Short:', saveBtn.description);
  // "Saves the current document"
  
  console.log('Long:', saveBtn.descriptionLong);
  // "Saves the current document to the server. Validates all 
  //  required fields before saving. Shows inline validation 
  //  errors if any fields are invalid. On success, displays 
  //  a toast notification and updates the 'Last saved' timestamp."
  
  // Check if element is disabled
  if (saveBtn.disabled) {
    console.log('Disabled:', saveBtn.disabledDescription);
    // "You need Editor role to save documents."
  }
}`}
              />
            </div>
          </div>

          {/* Execution Methods */}
          <h3 className="text-xl font-medium mt-8 mb-4">Execution Methods</h3>

          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-mono font-semibold mb-2">
                interact(id: string, action: InteractionAction):
                Promise&lt;InteractionResult&gt;
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                Triggers an interaction on the specified element. Returns a
                result indicating success/failure and optionally an operation
                handle for tracking async operations.
              </p>
              <CodeBlock
                language="javascript"
                code={`// Click a button
const result = await window.SID.interact('btn-save', { type: 'click' });

if (result.success) {
  console.log('Interaction triggered:', result.message);
  
  if (result.operation) {
    // Track the async operation
    const op = await window.SID.pollOperation(result.operation.id, 10000);
    console.log('Operation completed:', op.status);
  }
} else {
  console.error('Interaction failed:', result.error);
}

// Fill an input field
await window.SID.interact('input-email', { 
  type: 'fill', 
  value: 'user@example.com' 
});

// Select from a dropdown
await window.SID.interact('select-plan', { 
  type: 'select', 
  value: 'pro' 
});

// Check a checkbox
await window.SID.interact('checkbox-terms', { 
  type: 'check', 
  value: true 
});`}
              />
            </div>
          </div>

          {/* Operation Tracking Methods */}
          <h3 className="text-xl font-medium mt-8 mb-4">
            Operation Tracking Methods
          </h3>

          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-mono font-semibold mb-2">
                getOperation(id: string): Operation | null
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                Returns the current status of an operation by ID. Use this for
                manual polling or checking operation status.
              </p>
              <CodeBlock
                language="javascript"
                code={`const operation = window.SID.getOperation('op-123');

if (operation) {
  console.log('Status:', operation.status);  // 'pending' | 'success' | 'error'
  console.log('Message:', operation.message);
  
  if (operation.status !== 'pending') {
    console.log('Completed at:', operation.completedAt);
    console.log('Effects:', operation.effects);
  }
}`}
              />
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-mono font-semibold mb-2">
                pollOperation(id: string, timeoutMs?: number, intervalMs?:
                number): Promise&lt;Operation&gt;
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                Polls an operation until it completes or times out. Default
                timeout is 30 seconds, default interval is 500ms.
              </p>
              <CodeBlock
                language="javascript"
                code={`// Wait for operation to complete (default timeout: 30s)
const operation = await window.SID.pollOperation('op-123');

// Custom timeout and interval
const operation2 = await window.SID.pollOperation(
  'op-456',
  15000,  // 15 second timeout
  250     // Poll every 250ms
);

if (operation.status === 'success') {
  console.log('Operation succeeded:', operation.message);
  
  // Check what changed
  if (operation.effects?.elementsAdded) {
    console.log('New elements:', operation.effects.elementsAdded);
  }
} else if (operation.status === 'error') {
  console.error('Operation failed:', operation.message);
}`}
              />
            </div>
          </div>

          {/* Auth Methods */}
          <h3 className="text-xl font-medium mt-8 mb-4">
            Authentication Methods
          </h3>

          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-mono font-semibold mb-2">
                auth.authenticate(token: string): Promise&lt;boolean&gt;
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                Authenticates the agent with the provided SID token. Returns true if
                authentication succeeded and a session was established.
              </p>
              <CodeBlock
                language="javascript"
                code={`// Check how auth works
console.log(window.SID.auth?.description);
// "Supports token-based auth. Provide a SID token to authenticate."

// Authenticate with a SID token (provided to the agent)
const success = await window.SID.auth?.authenticate('sk-abc123');

if (success) {
  console.log('Session established');
  // Agent can now perform actions as the authenticated user
} else {
  console.error('Authentication failed');
}`}
              />
            </div>
          </div>
        </section>

        {/* Section: TypeScript Interfaces */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            TypeScript Interfaces
          </h2>

          <p className="text-base leading-7 mb-6">
            SID provides TypeScript interfaces for type-safe development. These
            interfaces define the structure of elements, actions, results, and
            operations.
          </p>

          <div className="space-y-6">
            <TypeDefinition
              name="SIDElement"
              description="Represents an element annotated with SID metadata. Contains identification, descriptions, available actions, and current state."
              code={`interface SIDElement {
  id: string;
  selector: string;
  
  // Short description - returned by getElements()
  description: string;
  
  // Long description - only populated when calling getElement(id)
  // Contains detailed information about outcomes, forms revealed, etc.
  descriptionLong?: string;
  
  // What actions can be performed
  actions: ActionDefinition[];
  
  // Current state (only what's needed for interaction)
  state?: {
    visible: boolean;
    enabled: boolean;
    value?: string;
  };
  
  // Disabled state - indicates the element exists but cannot be interacted with
  // Always returned by both getElements() and getElement()
  disabled: boolean;
  
  // Plaintext explanation of why the element is disabled
  // Only present when disabled is true
  disabledDescription?: string;
  
  // Human input requirements (if present, agent must collect data from user)
  humanInput?: HumanInputRequirement;
}`}
            />

            <TypeDefinition
              name="ActionDefinition"
              description="Defines an action that can be performed on an element, including its type, input requirements, and whether it produces a trackable operation."
              code={`interface ActionDefinition {
  type: "click" | "fill" | "select" | "check" | "hover" | "upload";
  
  // For fill/select actions
  input?: {
    dataType: "text" | "number" | "date" | "email" | "password" | "file";
    required: boolean;
    options?: string[];    // For select/radio only
  };
  
  // Whether this action produces a trackable operation
  // false for hover, focus, and other instant/guaranteed actions
  tracked: boolean;
  
  // Everything else is plaintext
  description: string;     // What this action does, outcomes, side effects
}`}
            />

            <TypeDefinition
              name="InteractionAction"
              description="The action to perform when calling interact(). Specifies the action type and optional value for fill/select/check actions."
              code={`interface InteractionAction {
  type: string;
  value?: string | number | boolean | File;
}`}
            />

            <TypeDefinition
              name="InteractionResult"
              description="The result of calling interact(). Indicates whether the interaction was triggered and provides an optional operation handle for tracking."
              code={`interface InteractionResult {
  success: boolean;              // Whether the interaction was triggered
  error?: string;                // Error if interaction couldn't be triggered
  message?: string;              // Plaintext description of what happened
  operation?: OperationHandle;   // Handle to track the resulting operation
}`}
            />

            <TypeDefinition
              name="OperationHandle"
              description="Returned when an interaction triggers a trackable operation. Contains the operation ID and tracking information."
              code={`interface OperationHandle {
  id: string;
  
  // How the agent should determine completion
  tracking: OperationTracking;
}`}
            />

            <TypeDefinition
              name="OperationTracking"
              description="Specifies how an operation's completion should be tracked. Different tracking types have different completion semantics."
              code={`type OperationTracking = 
  | { type: "async" }                              // interact() waits for SID.complete()
  | { type: "navigation"; destination?: string }  // Page navigation = success
  | { type: "external"; description: string }     // Leaves SID context
  | { type: "none" }                              // No tracking needed (instant actions)`}
            />

            <TypeDefinition
              name="Operation"
              description="Represents the full state of an operation, including its status, timing, and effects."
              code={`interface Operation {
  id: string;
  elementId: string;              // SID element that triggered this
  actionType: string;             // The action that was performed
  status: "pending" | "success" | "error";
  message?: string;               // Plaintext: what happened or error details
  startedAt: number;              // Timestamp
  completedAt?: number;           // Timestamp when status changed from pending
  
  // What changed as a result (populated on completion)
  effects?: OperationEffects;
}`}
            />

            <TypeDefinition
              name="OperationEffects"
              description="Describes what changed as a result of an operation completing. Includes navigation, element changes, and state changes."
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
          </div>
        </section>

        {/* Section: Complete Example */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Complete Interaction Flow
          </h2>

          <p className="text-base leading-7 mb-4">
            Here&apos;s a complete example showing how an agent would discover
            elements, trigger an interaction, and track the resulting operation:
          </p>

          <CodeBlock
            language="javascript"
            code={`// 1. Get element with full description
const saveBtn = window.SID.getElement('btn-save');
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
const result = await window.SID.interact('btn-save', { type: 'click' });

if (!result.success) {
  // Interaction couldn't be triggered (element disabled, not found, etc.)
  console.error(result.error);
  return;
}

// 4. Handle based on tracking type
switch (result.operation?.tracking.type) {
  case 'async':
    // Wait for async operation to complete
    const op = await window.SID.pollOperation(result.operation.id, 15000);
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

        {/* Section: Form Filling Example */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Form Filling Example
          </h2>

          <p className="text-base leading-7 mb-4">
            Here&apos;s how an agent would fill out a form using SID:
          </p>

          <CodeBlock
            language="javascript"
            code={`// Get all form elements
const elements = window.SID.getElements();

// Find and fill the email field
const emailField = elements.find(el => el.id === 'input-email');
if (emailField) {
  await window.SID.interact('input-email', { 
    type: 'fill', 
    value: 'user@example.com' 
  });
}

// Find and select a plan
const planSelect = elements.find(el => el.id === 'select-plan');
if (planSelect) {
  // Check available options from the action definition
  const selectAction = planSelect.actions.find(a => a.type === 'select');
  console.log('Available plans:', selectAction?.input?.options);
  // ['free', 'pro', 'enterprise']
  
  await window.SID.interact('select-plan', { 
    type: 'select', 
    value: 'pro' 
  });
}

// Check the terms checkbox
await window.SID.interact('checkbox-terms', { 
  type: 'check', 
  value: true 
});

// Submit the form
const result = await window.SID.interact('btn-submit', { type: 'click' });

if (result.success && result.operation) {
  const op = await window.SID.pollOperation(result.operation.id);
  
  if (op.status === 'success') {
    console.log('Form submitted successfully');
    
    // Check if we navigated somewhere
    if (op.effects?.navigatedTo) {
      console.log('Redirected to:', op.effects.navigatedTo);
    }
  } else {
    console.error('Form submission failed:', op.message);
  }
}`}
          />
        </section>

        {/* Section: Next Steps */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Next Steps
          </h2>

          <p className="text-base leading-7 mb-4">
            Now that you understand the JavaScript API, continue with:
          </p>

          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4">
            <li>
              <strong>HTML Attributes</strong> — How to add SID metadata to your
              HTML elements
            </li>
            <li>
              <strong>Operation Tracking</strong> — Deep dive into tracking
              types and completion semantics
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
