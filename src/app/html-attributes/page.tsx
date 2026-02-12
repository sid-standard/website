import { Metadata } from "next";
import { DocLayout } from "@/components/layout/doc-layout";
import { PageNavigation } from "@/components/layout/page-navigation";
import { CodeBlock } from "@/components/content/code-block";
import { AttributeTable } from "@/components/content/attribute-table";

/**
 * SEO metadata for the HTML Attributes page.
 * Requirements: 9.1, 9.2, 9.3, 9.4
 */
export const metadata: Metadata = {
  title: "HTML Attributes | SID - Semantic Interaction Description",
  description:
    "Complete reference for all SID HTML data-sid-* attributes, including examples and best practices for writing effective descriptions.",
  openGraph: {
    title: "HTML Attributes | SID",
    description:
      "Complete reference for SID HTML attributes: data-sid, data-sid-desc, data-sid-action, and more.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "HTML Attributes | SID",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML Attributes | SID",
    description:
      "Complete reference for SID HTML attributes: data-sid, data-sid-desc, data-sid-action, and more.",
    images: ["/og.png"],
  },
};

/**
 * Attribute data for the reference table.
 */
const sidAttributes = [
  {
    attribute: "data-sid",
    required: true,
    format: "string",
    description: "Unique element ID used to identify and interact with the element via the SID API.",
  },
  {
    attribute: "data-sid-desc",
    required: true,
    format: "plaintext",
    description: "Short description of what the element does. Returned by getElements().",
  },
  {
    attribute: "data-sid-desc-long",
    required: false,
    format: "plaintext",
    description: "Detailed description including outcomes, errors, and side effects. Returned by getElement(id).",
  },
  {
    attribute: "data-sid-action",
    required: true,
    format: "click|fill|select|check|hover|upload",
    description: "The type of interaction that can be performed on this element.",
  },
  {
    attribute: "data-sid-input",
    required: false,
    format: "{dataType},{required|optional}",
    description: "Input metadata for fill/select actions. Specifies the data type and whether input is required.",
  },
  {
    attribute: "data-sid-options",
    required: false,
    format: "comma-separated",
    description: "Available options for select/radio elements. Values should match what the user can choose.",
  },
  {
    attribute: "data-sid-tracking",
    required: false,
    format: "async|navigation|external|none",
    description: "How to track operation completion. Defaults to 'async' if not specified.",
  },
  {
    attribute: "data-sid-destination",
    required: false,
    format: "URL/path",
    description: "Expected destination for navigation tracking. Helps agents know where the user will end up.",
  },
  {
    attribute: "data-sid-human-input",
    required: false,
    format: "JSON",
    description: "Human input requirement with reason and JSON Schema. Used when sensitive data collection is needed.",
  },
  {
    attribute: "data-sid-disabled",
    required: false,
    format: "true|false",
    description: "Whether the element is disabled. Defaults to false. Use when an element exists but cannot be interacted with.",
  },
  {
    attribute: "data-sid-disabled-desc",
    required: false,
    format: "plaintext",
    description: "Explanation of why the element is disabled. Only used when data-sid-disabled is true.",
  },
];

/**
 * HTML Attributes page - complete reference for SID HTML attributes.
 *
 * This page covers:
 * - All data-sid-* attributes
 * - Attribute reference table
 * - Examples for each attribute
 * - Best practices for writing descriptions
 *
 * Requirements: 9.1, 9.2, 9.3, 9.4
 */
export default function HTMLAttributesPage() {
  return (
    <DocLayout>
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          HTML Attributes
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Complete reference for adding SID metadata to your HTML elements using
          data attributes. Learn how to annotate elements so AI agents can
          understand and interact with your application.
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
            SID uses HTML data attributes to annotate interactive elements. This
            approach keeps metadata close to the elements it describes and
            requires no build step or framework integration. Simply add the
            appropriate <code className="bg-muted px-1 rounded">data-sid-*</code>{" "}
            attributes to your HTML elements.
          </p>

          <p className="text-base leading-7 mb-4">
            The philosophy is <strong>plaintext first</strong>: descriptions are
            natural language that both agents and developers can easily
            understand. Only structure what machines truly need (IDs, action
            types, input metadata).
          </p>
        </section>

        {/* Section: Attribute Reference Table */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Attribute Reference
          </h2>

          <p className="text-base leading-7 mb-4">
            The following table lists all SID HTML attributes. Required
            attributes must be present for the element to be recognized by SID.
          </p>

          <AttributeTable attributes={sidAttributes} />
        </section>

        {/* Section: Core Attributes */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Core Attributes
          </h2>

          {/* data-sid */}
          <h3 className="text-xl font-medium mt-8 mb-4">data-sid</h3>

          <p className="text-base leading-7 mb-4">
            The unique identifier for the element. This ID is used to reference
            the element in the JavaScript API (e.g.,{" "}
            <code className="bg-muted px-1 rounded">SID.getElement(&apos;btn-save&apos;)</code>
            ). IDs should be descriptive and follow a consistent naming
            convention.
          </p>

          <CodeBlock
            language="html"
            code={`<!-- Good: descriptive, consistent naming -->
<button data-sid="btn-save">Save</button>
<button data-sid="btn-delete-project">Delete Project</button>
<input data-sid="input-email" />
<select data-sid="select-plan">...</select>

<!-- Avoid: generic or unclear names -->
<button data-sid="button1">Save</button>
<button data-sid="x">Delete</button>`}
          />

          {/* data-sid-desc */}
          <h3 className="text-xl font-medium mt-8 mb-4">data-sid-desc</h3>

          <p className="text-base leading-7 mb-4">
            A short, one-line description of what the element does. This is
            returned by{" "}
            <code className="bg-muted px-1 rounded">getElements()</code> and
            should give agents a quick understanding of the element&apos;s purpose.
          </p>

          <CodeBlock
            language="html"
            code={`<!-- Good: clear, action-oriented descriptions -->
<button 
  data-sid="btn-save"
  data-sid-desc="Saves the current document"
>Save</button>

<button 
  data-sid="btn-export"
  data-sid-desc="Exports project data"
>Export</button>

<a 
  data-sid="nav-settings"
  data-sid-desc="Opens the Settings page"
  href="/settings"
>Settings</a>

<!-- Avoid: vague or unhelpful descriptions -->
<button data-sid="btn-save" data-sid-desc="Save button">Save</button>
<button data-sid="btn-click" data-sid-desc="Click here">Submit</button>
<button data-sid="btn-submit" data-sid-desc="Submit">Submit</button>`}
          />

          {/* data-sid-desc-long */}
          <h3 className="text-xl font-medium mt-8 mb-4">data-sid-desc-long</h3>

          <p className="text-base leading-7 mb-4">
            A detailed description that includes everything an agent needs to
            understand outcomes and handle edge cases. This is only returned
            when calling{" "}
            <code className="bg-muted px-1 rounded">getElement(id)</code> to
            avoid loading unnecessary data.
          </p>

          <CodeBlock
            language="html"
            code={`<button 
  data-sid="btn-save"
  data-sid-desc="Saves the current document"
  data-sid-desc-long="Saves the current document to the server. Validates all 
                      required fields before saving. Shows inline validation 
                      errors if any fields are invalid. On success, displays 
                      a toast notification and updates the 'Last saved' timestamp 
                      in the header. On network error, shows a retry button."
  data-sid-action="click"
>
  Save
</button>`}
          />

          {/* data-sid-action */}
          <h3 className="text-xl font-medium mt-8 mb-4">data-sid-action</h3>

          <p className="text-base leading-7 mb-4">
            Specifies the type of interaction that can be performed on the
            element. This tells agents how to interact with the element.
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-border rounded-lg">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-2 text-left border-b border-border">Action</th>
                  <th className="px-4 py-2 text-left border-b border-border">Use Case</th>
                  <th className="px-4 py-2 text-left border-b border-border">Example Elements</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b border-border"><code className="bg-muted px-1 rounded">click</code></td>
                  <td className="px-4 py-2 border-b border-border">Buttons, links, clickable elements</td>
                  <td className="px-4 py-2 border-b border-border">Submit button, navigation link</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border"><code className="bg-muted px-1 rounded">fill</code></td>
                  <td className="px-4 py-2 border-b border-border">Text inputs, textareas</td>
                  <td className="px-4 py-2 border-b border-border">Email field, search box</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border"><code className="bg-muted px-1 rounded">select</code></td>
                  <td className="px-4 py-2 border-b border-border">Dropdowns, radio buttons</td>
                  <td className="px-4 py-2 border-b border-border">Plan selector, country picker</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border"><code className="bg-muted px-1 rounded">check</code></td>
                  <td className="px-4 py-2 border-b border-border">Checkboxes, toggles</td>
                  <td className="px-4 py-2 border-b border-border">Terms checkbox, notification toggle</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border"><code className="bg-muted px-1 rounded">hover</code></td>
                  <td className="px-4 py-2 border-b border-border">Hover-triggered elements</td>
                  <td className="px-4 py-2 border-b border-border">Tooltip trigger, dropdown menu</td>
                </tr>
                <tr>
                  <td className="px-4 py-2"><code className="bg-muted px-1 rounded">upload</code></td>
                  <td className="px-4 py-2">File inputs</td>
                  <td className="px-4 py-2">Avatar upload, document import</td>
                </tr>
              </tbody>
            </table>
          </div>

          <CodeBlock
            language="html"
            code={`<!-- Click action -->
<button data-sid="btn-submit" data-sid-action="click">Submit</button>

<!-- Fill action -->
<input data-sid="input-email" data-sid-action="fill" type="email" />

<!-- Select action -->
<select data-sid="select-country" data-sid-action="select">
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
</select>

<!-- Check action -->
<input data-sid="checkbox-terms" data-sid-action="check" type="checkbox" />

<!-- Hover action -->
<div data-sid="menu-trigger" data-sid-action="hover">Menu</div>

<!-- Upload action -->
<input data-sid="input-avatar" data-sid-action="upload" type="file" />`}
          />
        </section>

        {/* Section: Input Attributes */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Input Attributes
          </h2>

          {/* data-sid-input */}
          <h3 className="text-xl font-medium mt-8 mb-4">data-sid-input</h3>

          <p className="text-base leading-7 mb-4">
            Provides metadata about input fields, including the expected data
            type and whether the field is required. Format:{" "}
            <code className="bg-muted px-1 rounded">{"{dataType},{required|optional}"}</code>
          </p>

          <p className="text-base leading-7 mb-4">
            Supported data types:{" "}
            <code className="bg-muted px-1 rounded">text</code>,{" "}
            <code className="bg-muted px-1 rounded">number</code>,{" "}
            <code className="bg-muted px-1 rounded">date</code>,{" "}
            <code className="bg-muted px-1 rounded">email</code>,{" "}
            <code className="bg-muted px-1 rounded">password</code>,{" "}
            <code className="bg-muted px-1 rounded">file</code>
          </p>

          <CodeBlock
            language="html"
            code={`<!-- Required email input -->
<input 
  data-sid="input-email"
  data-sid-desc="Email address for registration"
  data-sid-action="fill"
  data-sid-input="email,required"
  type="email"
/>

<!-- Optional number input -->
<input 
  data-sid="input-quantity"
  data-sid-desc="Quantity to order"
  data-sid-action="fill"
  data-sid-input="number,optional"
  type="number"
/>

<!-- Required date input -->
<input 
  data-sid="input-birthdate"
  data-sid-desc="Your date of birth"
  data-sid-action="fill"
  data-sid-input="date,required"
  type="date"
/>`}
          />

          {/* data-sid-options */}
          <h3 className="text-xl font-medium mt-8 mb-4">data-sid-options</h3>

          <p className="text-base leading-7 mb-4">
            Lists the available options for select/radio elements as a
            comma-separated list. This helps agents know what values are valid.
          </p>

          <CodeBlock
            language="html"
            code={`<!-- Dropdown with options -->
<select
  data-sid="select-plan"
  data-sid-desc="Choose your subscription plan"
  data-sid-desc-long="Choose your subscription plan. Options:
                      - Free: Basic features, 1 project, no support
                      - Pro ($10/mo): Unlimited projects, email support
                      - Enterprise ($50/mo): Everything + SSO, priority support
                      Changing plans takes effect at the next billing cycle."
  data-sid-action="select"
  data-sid-input="text,required"
  data-sid-options="free,pro,enterprise"
>
  <option value="free">Free</option>
  <option value="pro">Pro - $10/mo</option>
  <option value="enterprise">Enterprise - $50/mo</option>
</select>

<!-- Radio buttons with options -->
<div
  data-sid="radio-priority"
  data-sid-desc="Task priority level"
  data-sid-action="select"
  data-sid-options="low,medium,high,urgent"
>
  <label><input type="radio" name="priority" value="low" /> Low</label>
  <label><input type="radio" name="priority" value="medium" /> Medium</label>
  <label><input type="radio" name="priority" value="high" /> High</label>
  <label><input type="radio" name="priority" value="urgent" /> Urgent</label>
</div>`}
          />
        </section>

        {/* Section: Tracking Attributes */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Tracking Attributes
          </h2>

          {/* data-sid-tracking */}
          <h3 className="text-xl font-medium mt-8 mb-4">data-sid-tracking</h3>

          <p className="text-base leading-7 mb-4">
            Specifies how the agent should track the completion of an
            interaction. Different tracking types have different completion
            semantics.
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-border rounded-lg">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-2 text-left border-b border-border">Type</th>
                  <th className="px-4 py-2 text-left border-b border-border">When to Use</th>
                  <th className="px-4 py-2 text-left border-b border-border">How Agent Tracks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b border-border"><code className="bg-muted px-1 rounded">async</code></td>
                  <td className="px-4 py-2 border-b border-border">Async operations (API calls, form submissions)</td>
                  <td className="px-4 py-2 border-b border-border">interact() waits for SID.complete()</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border"><code className="bg-muted px-1 rounded">navigation</code></td>
                  <td className="px-4 py-2 border-b border-border">Full page navigation</td>
                  <td className="px-4 py-2 border-b border-border">Page load = success</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border"><code className="bg-muted px-1 rounded">external</code></td>
                  <td className="px-4 py-2 border-b border-border">OAuth, payment gateways, external sites</td>
                  <td className="px-4 py-2 border-b border-border">Read description for guidance</td>
                </tr>
                <tr>
                  <td className="px-4 py-2"><code className="bg-muted px-1 rounded">none</code></td>
                  <td className="px-4 py-2">Instant actions (hover, focus)</td>
                  <td className="px-4 py-2">No tracking needed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <CodeBlock
            language="html"
            code={`<!-- Default: async tracking (can be omitted) -->
<button
  data-sid="btn-save"
  data-sid-desc="Saves the document"
  data-sid-action="click"
  data-sid-tracking="async"
>Save</button>

<!-- Navigation tracking -->
<a 
  href="/settings"
  data-sid="nav-settings"
  data-sid-desc="Opens the Settings page"
  data-sid-action="click"
  data-sid-tracking="navigation"
  data-sid-destination="/settings"
>Settings</a>

<!-- External tracking (OAuth) -->
<button
  data-sid="btn-google-login"
  data-sid-desc="Sign in with Google"
  data-sid-desc-long="Redirects to Google OAuth consent screen. On success, 
                      returns to /auth/callback which redirects to dashboard. 
                      On cancel, returns to /login with error=cancelled."
  data-sid-action="click"
  data-sid-tracking="external"
>Sign in with Google</button>

<!-- No tracking (instant action) -->
<div
  data-sid="menu-user"
  data-sid-desc="User menu dropdown"
  data-sid-action="hover"
  data-sid-tracking="none"
>User Menu</div>`}
          />

          {/* data-sid-destination */}
          <h3 className="text-xl font-medium mt-8 mb-4">data-sid-destination</h3>

          <p className="text-base leading-7 mb-4">
            For navigation tracking, specifies the expected destination URL or
            path. This helps agents know where the user will end up after the
            interaction.
          </p>

          <CodeBlock
            language="html"
            code={`<a 
  href="/settings"
  data-sid="nav-settings"
  data-sid-desc="Opens the Settings page"
  data-sid-desc-long="Opens the Settings page where you can:
                      - Update your profile (name, avatar, bio)
                      - Change password and enable 2FA
                      - Manage billing and subscription
                      - Configure notification preferences
                      The page has a tabbed interface with these sections."
  data-sid-action="click"
  data-sid-tracking="navigation"
  data-sid-destination="/settings"
>
  Settings
</a>`}
          />
        </section>

        {/* Section: Advanced Attributes */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Advanced Attributes
          </h2>

          {/* data-sid-disabled */}
          <h3 className="text-xl font-medium mt-8 mb-4">data-sid-disabled</h3>

          <p className="text-base leading-7 mb-4">
            Indicates that an element exists but cannot be interacted with. This
            is useful when an element is visible but disabled due to permissions,
            prerequisites, or other conditions. The disabled state is always
            returned by both{" "}
            <code className="bg-muted px-1 rounded">getElements()</code> and{" "}
            <code className="bg-muted px-1 rounded">getElement(id)</code>.
          </p>

          <CodeBlock
            language="html"
            code={`<!-- Disabled due to permissions -->
<button
  data-sid="btn-admin-settings"
  data-sid-desc="Opens admin settings"
  data-sid-action="click"
  data-sid-disabled="true"
  data-sid-disabled-desc="You need Admin role to access this feature."
  disabled
>
  Admin Settings
</button>

<!-- Disabled due to prerequisite -->
<button
  data-sid="btn-checkout"
  data-sid-desc="Proceeds to checkout"
  data-sid-action="click"
  data-sid-disabled="true"
  data-sid-disabled-desc="Add at least one item to your cart before checkout."
  disabled
>
  Checkout
</button>`}
          />

          {/* data-sid-disabled-desc */}
          <h3 className="text-xl font-medium mt-8 mb-4">data-sid-disabled-desc</h3>

          <p className="text-base leading-7 mb-4">
            A plaintext explanation of why the element is disabled. This helps
            agents understand what conditions need to be met for the element to
            become enabled, and allows them to inform users appropriately.
          </p>

          <p className="text-base leading-7 mb-4">
            Common reasons for disabled elements include:
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-border rounded-lg">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-2 text-left border-b border-border">Reason</th>
                  <th className="px-4 py-2 text-left border-b border-border">Example Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b border-border">Permission</td>
                  <td className="px-4 py-2 border-b border-border">&quot;You need Admin role to access this feature&quot;</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border">Prerequisite</td>
                  <td className="px-4 py-2 border-b border-border">&quot;Save your changes before publishing&quot;</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border">State</td>
                  <td className="px-4 py-2 border-b border-border">&quot;No items selected. Select at least one item to continue&quot;</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border">Quota</td>
                  <td className="px-4 py-2 border-b border-border">&quot;You&apos;ve reached the maximum of 5 projects on the free plan&quot;</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Temporal</td>
                  <td className="px-4 py-2">&quot;This action is only available during business hours&quot;</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* data-sid-human-input */}
          <h3 className="text-xl font-medium mt-8 mb-4">data-sid-human-input</h3>

          <p className="text-base leading-7 mb-4">
            Declares that an interaction requires sensitive human input (credit
            cards, passwords, personal identification). The agent must collect
            this data from the user before proceeding. See the{" "}
            <a href="/human-input" className="text-foreground underline hover:no-underline">
              Human Input
            </a>{" "}
            page for complete documentation.
          </p>

          <CodeBlock
            language="html"
            code={`<button
  data-sid="btn-pay"
  data-sid-desc="Completes payment"
  data-sid-desc-long="Processes payment using the provided card details. 
                      Charges the card immediately. On success, shows 
                      confirmation and redirects to receipt page."
  data-sid-action="click"
  data-sid-human-input='{
    "reason": "Payment card details required to complete this purchase",
    "schema": {
      "type": "object",
      "properties": {
        "cardNumber": {
          "type": "string",
          "title": "Card Number",
          "format": "credit-card",
          "x-sid-sensitive": true
        },
        "expiry": {
          "type": "string",
          "title": "Expiration Date",
          "format": "card-expiry"
        },
        "cvv": {
          "type": "string",
          "title": "Security Code",
          "format": "card-cvv",
          "x-sid-sensitive": true
        }
      },
      "required": ["cardNumber", "expiry", "cvv"]
    }
  }'
>
  Pay $99.00
</button>`}
          />
        </section>

        {/* Section: Best Practices */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Best Practices for Writing Descriptions
          </h2>

          <p className="text-base leading-7 mb-4">
            Good descriptions are the key to effective SID implementation. Write
            descriptions like you&apos;re explaining to a colleague who needs to
            understand what the element does and what happens when they interact
            with it.
          </p>

          {/* Short Descriptions */}
          <h3 className="text-xl font-medium mt-8 mb-4">Short Descriptions (data-sid-desc)</h3>

          <p className="text-base leading-7 mb-4">
            Keep these concise—one line that captures the primary action:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="border border-green-500/30 bg-green-500/5 rounded-lg p-4">
              <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">✓ Good</h4>
              <ul className="space-y-1 text-sm">
                <li>&quot;Saves the current document&quot;</li>
                <li>&quot;Opens user profile page&quot;</li>
                <li>&quot;Submits the registration form&quot;</li>
                <li>&quot;Exports data as CSV&quot;</li>
              </ul>
            </div>
            <div className="border border-red-500/30 bg-red-500/5 rounded-lg p-4">
              <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">✗ Avoid</h4>
              <ul className="space-y-1 text-sm">
                <li>&quot;Save button&quot; (doesn&apos;t say what it saves)</li>
                <li>&quot;Click here&quot; (meaningless)</li>
                <li>&quot;Submit&quot; (submit what?)</li>
                <li>&quot;Button&quot; (no information)</li>
              </ul>
            </div>
          </div>

          {/* Long Descriptions */}
          <h3 className="text-xl font-medium mt-8 mb-4">Long Descriptions (data-sid-desc-long)</h3>

          <p className="text-base leading-7 mb-4">
            Include everything an agent needs to understand outcomes and handle
            edge cases. A good long description answers:
          </p>

          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4 mb-4">
            <li>What does this element do?</li>
            <li>What happens on success?</li>
            <li>What happens on error/failure?</li>
            <li>Are there any preconditions or requirements?</li>
            <li>If it reveals content, what appears and what can be done with it?</li>
          </ul>

          <CodeBlock
            language="html"
            code={`<!-- Good: comprehensive long description -->
<button
  data-sid="btn-save"
  data-sid-desc="Saves the current document"
  data-sid-desc-long="Saves the current document to the server. Validates all 
                      required fields first. On success, shows a toast and 
                      updates the 'Last saved' timestamp. On validation error, 
                      highlights invalid fields with messages. On network error, 
                      shows retry option and preserves unsaved changes locally."
  data-sid-action="click"
>Save</button>

<!-- Good: describes what's revealed -->
<button
  data-sid="btn-add-item"
  data-sid-desc="Opens the Add Item form"
  data-sid-desc-long="Opens an 'Add Item' modal with a form containing:
                      - Item name (text, required, max 100 chars)
                      - Category (dropdown: Electronics, Clothing, Books, Other)
                      - Price (number, required, min 0, max 999999)
                      - Description (text, optional, max 500 chars)
                      Submit creates the item and closes the modal, adding the 
                      new item to the list. Cancel discards changes and closes."
  data-sid-action="click"
>+ Add Item</button>`}
          />

          {/* Description Template */}
          <h3 className="text-xl font-medium mt-8 mb-4">Description Template</h3>

          <p className="text-base leading-7 mb-4">
            Use this template as a guide for writing comprehensive descriptions:
          </p>

          <div className="bg-muted rounded-lg p-4 mb-4">
            <p className="font-mono text-sm">
              <strong>Short:</strong> [Primary action in present tense]
            </p>
            <p className="font-mono text-sm mt-2">
              <strong>Long:</strong> [What it does]. [What happens on success]. 
              [What happens on error/failure]. [Any preconditions or requirements]. 
              [If reveals content: what appears and what can be done with it].
            </p>
          </div>
        </section>

        {/* Section: Complete Examples */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Complete Examples
          </h2>

          <p className="text-base leading-7 mb-4">
            Here are complete examples showing how to annotate common UI
            patterns with SID attributes.
          </p>

          {/* Simple Button */}
          <h3 className="text-xl font-medium mt-8 mb-4">Simple Button</h3>

          <CodeBlock
            language="html"
            code={`<button 
  data-sid="btn-save"
  data-sid-desc="Saves the current document"
  data-sid-action="click"
>
  Save
</button>`}
          />

          {/* Button with Full Details */}
          <h3 className="text-xl font-medium mt-8 mb-4">Button with Full Details</h3>

          <CodeBlock
            language="html"
            code={`<button 
  data-sid="btn-checkout"
  data-sid-desc="Completes the purchase"
  data-sid-desc-long="Completes the purchase. Opens a Stripe payment modal where 
                      you'll enter card details. After successful payment:
                      - Order confirmation email is sent immediately
                      - Redirects to /orders/{orderId} confirmation page
                      - Digital products are available immediately in Downloads
                      If payment fails, you stay on this page with an error 
                      message and can retry. Card is not charged on failure."
  data-sid-action="click"
>
  Complete Purchase
</button>`}
          />

          {/* Navigation Link */}
          <h3 className="text-xl font-medium mt-8 mb-4">Navigation Link</h3>

          <CodeBlock
            language="html"
            code={`<a 
  href="/settings"
  data-sid="nav-settings"
  data-sid-desc="Opens the Settings page"
  data-sid-desc-long="Opens the Settings page where you can:
                      - Update your profile (name, avatar, bio)
                      - Change password and enable 2FA
                      - Manage billing and subscription
                      - Configure notification preferences
                      - Download or delete your data
                      The page has a tabbed interface with these sections."
  data-sid-action="click"
  data-sid-tracking="navigation"
  data-sid-destination="/settings"
>
  Settings
</a>`}
          />

          {/* Form Input */}
          <h3 className="text-xl font-medium mt-8 mb-4">Form Input</h3>

          <CodeBlock
            language="html"
            code={`<input 
  type="email"
  data-sid="input-email"
  data-sid-desc="Email address for registration"
  data-sid-desc-long="Email address for account registration. Must be a valid 
                      email format (user@domain.com). We'll send a verification 
                      link to this address within 5 minutes. Check spam folder 
                      if not received."
  data-sid-action="fill"
  data-sid-input="email,required"
/>`}
          />

          {/* Select Dropdown */}
          <h3 className="text-xl font-medium mt-8 mb-4">Select Dropdown</h3>

          <CodeBlock
            language="html"
            code={`<select
  data-sid="select-plan"
  data-sid-desc="Choose your subscription plan"
  data-sid-desc-long="Choose your subscription plan. Options:
                      - Free: Basic features, 1 project, no support
                      - Pro ($10/mo): Unlimited projects, email support
                      - Enterprise ($50/mo): Everything + SSO, priority support
                      Changing plans takes effect at the next billing cycle. 
                      Downgrading may disable some features immediately."
  data-sid-action="select"
  data-sid-input="text,required"
  data-sid-options="free,pro,enterprise"
>
  <option value="free">Free</option>
  <option value="pro">Pro - $10/mo</option>
  <option value="enterprise">Enterprise - $50/mo</option>
</select>`}
          />

          {/* OAuth Button */}
          <h3 className="text-xl font-medium mt-8 mb-4">OAuth Button</h3>

          <CodeBlock
            language="html"
            code={`<button
  data-sid="btn-google-login"
  data-sid-desc="Sign in with Google"
  data-sid-desc-long="Redirects to Google OAuth consent screen. You'll be asked 
                      to grant access to your email and basic profile. On success, 
                      returns to /auth/callback which then redirects to your 
                      dashboard. On cancel or error, returns to /login with an 
                      error parameter."
  data-sid-action="click"
  data-sid-tracking="external"
>
  Sign in with Google
</button>`}
          />

          {/* Hover Menu */}
          <h3 className="text-xl font-medium mt-8 mb-4">Hover Menu</h3>

          <CodeBlock
            language="html"
            code={`<div
  data-sid="menu-user"
  data-sid-desc="User menu dropdown"
  data-sid-desc-long="Hover or click to reveal user menu with options:
                      Profile, Settings, Billing, Help, Sign Out"
  data-sid-action="hover"
  data-sid-tracking="none"
>
  <span>User Menu</span>
</div>`}
          />

          {/* Disabled Button - Permission */}
          <h3 className="text-xl font-medium mt-8 mb-4">Disabled Button (Permission)</h3>

          <CodeBlock
            language="html"
            code={`<button
  data-sid="btn-delete-project"
  data-sid-desc="Deletes the current project"
  data-sid-desc-long="Permanently deletes the project and all associated data.
                      This action cannot be undone. Requires Owner role."
  data-sid-action="click"
  data-sid-disabled="true"
  data-sid-disabled-desc="You need Owner role to delete this project. 
                          Contact the project owner to request access."
  disabled
>
  Delete Project
</button>`}
          />

          {/* Disabled Button - Prerequisite */}
          <h3 className="text-xl font-medium mt-8 mb-4">Disabled Button (Prerequisite)</h3>

          <CodeBlock
            language="html"
            code={`<button
  data-sid="btn-publish"
  data-sid-desc="Publishes the document"
  data-sid-desc-long="Makes the document publicly accessible. Generates a 
                      shareable link and notifies subscribers."
  data-sid-action="click"
  data-sid-disabled="true"
  data-sid-disabled-desc="Document must be saved before publishing. 
                          Save your changes first."
  disabled
>
  Publish
</button>`}
          />

          {/* Disabled Input - Read-only */}
          <h3 className="text-xl font-medium mt-8 mb-4">Disabled Input (Read-only)</h3>

          <CodeBlock
            language="html"
            code={`<input
  type="text"
  data-sid="input-account-id"
  data-sid-desc="Your account ID"
  data-sid-action="fill"
  data-sid-input="text,required"
  data-sid-disabled="true"
  data-sid-disabled-desc="Account ID is system-generated and cannot be changed."
  disabled
  value="ACC-12345"
/>`}
          />
        </section>

        {/* Section: Page and App Context */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Page and App Context
          </h2>

          <p className="text-base leading-7 mb-4">
            In addition to element attributes, you can provide page-level and
            app-level context using a JSON script block. This helps agents
            understand the bigger picture.
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
          the user who created them.",
  
  "descriptionEndpoint": "/api/sid/descriptions"
}
</script>`}
          />
        </section>

        {/* Section: Next Steps */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Next Steps
          </h2>

          <p className="text-base leading-7 mb-4">
            Now that you understand HTML attributes, continue with:
          </p>

          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4">
            <li>
              <strong>Operation Tracking</strong> — Deep dive into tracking
              types and completion semantics
            </li>
            <li>
              <strong>Human Input</strong> — Declaring when sensitive data
              collection is needed
            </li>
            <li>
              <strong>Authentication</strong> — Enabling agent authentication in
              your application
            </li>
          </ul>
        </section>
      </div>

      {/* Page Navigation */}
      <PageNavigation />
    </DocLayout>
  );
}
