import { Metadata } from "next";
import { DocLayout } from "@/components/layout/doc-layout";
import { PageNavigation } from "@/components/layout/page-navigation";
import { CodeBlock } from "@/components/content/code-block";
import { TypeDefinition } from "@/components/content/type-definition";
import Link from "next/link";

/**
 * SEO metadata for the Human Input page.
 * Requirements: 11.1, 11.2, 11.3, 11.4
 */
export const metadata: Metadata = {
  title: "Human Input Requirements | SID - Semantic Interaction Description",
  description:
    "Learn how SID handles sensitive data collection with human input requirements. Covers JSON Schema format, extended formats for payment and identity data, and security considerations.",
  openGraph: {
    title: "Human Input Requirements | SID",
    description:
      "How to declare when sensitive data collection is needed using SID's human input requirements.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Human Input Requirements | SID",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Human Input Requirements | SID",
    description:
      "How to declare when sensitive data collection is needed using SID's human input requirements.",
    images: ["/og.png"],
  },
};

/**
 * Human Input page - explains how to declare human input requirements.
 *
 * This page covers:
 * - When to use humanInput vs regular input
 * - The JSON Schema format for human input requirements
 * - Extended formats (credit-card, ssn, etc.)
 * - Examples for payment, identity verification, and other scenarios
 *
 * Requirements: 11.1, 11.2, 11.3, 11.4
 */
export default function HumanInputPage() {
  return (
    <DocLayout>
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Human Input Requirements
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Some interactions require sensitive information that an agent cannot
          and should not provide autonomously—credit card details, passwords,
          personal identification, or other data that requires explicit human
          consent and input. SID provides a structured way for elements to
          declare these requirements so agents can prompt the user before
          proceeding.
        </p>
      </header>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Section: Design Rationale */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Design Rationale
          </h2>

          <p className="text-base leading-7 mb-4">
            While SID generally favors plaintext over rigid schemas, human input
            requirements are an exception. Here&apos;s why:
          </p>

          <ol className="list-decimal list-inside space-y-2 text-base leading-7 ml-4 mb-6">
            <li>
              <strong>Agent must render a form:</strong> The agent needs to
              present a UI to the human, which requires knowing exact field
              types, validation rules, and structure
            </li>
            <li>
              <strong>Security-sensitive:</strong> Ambiguity in what&apos;s
              being collected is unacceptable for payment/identity data
            </li>
            <li>
              <strong>Machine-to-machine:</strong> This data flows from agent UI
              → agent → SID, not through human interpretation
            </li>
            <li>
              <strong>Standard exists:</strong> JSON Schema is well-established
              and widely supported
            </li>
          </ol>
        </section>

        {/* Section: When to Use Human Input */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            When to Use Human Input vs. Regular Input
          </h2>

          <p className="text-base leading-7 mb-6">
            The key distinction: use{" "}
            <code className="bg-muted px-1 rounded">humanInput</code> when the
            data is sensitive, requires explicit human consent, or when the
            agent should not autonomously provide or guess the value.
          </p>

          {/* Comparison Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-2 text-left font-semibold">
                    Scenario
                  </th>
                  <th className="border border-border px-4 py-2 text-center font-semibold">
                    Use humanInput
                  </th>
                  <th className="border border-border px-4 py-2 text-center font-semibold">
                    Use regular data-sid-input
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2">
                    Credit card details
                  </td>
                  <td className="border border-border px-4 py-2 text-center">
                    ✓
                  </td>
                  <td className="border border-border px-4 py-2 text-center"></td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    Password/PIN
                  </td>
                  <td className="border border-border px-4 py-2 text-center">
                    ✓
                  </td>
                  <td className="border border-border px-4 py-2 text-center"></td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    SSN/Government ID
                  </td>
                  <td className="border border-border px-4 py-2 text-center">
                    ✓
                  </td>
                  <td className="border border-border px-4 py-2 text-center"></td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    Confirmation for destructive action
                  </td>
                  <td className="border border-border px-4 py-2 text-center">
                    ✓
                  </td>
                  <td className="border border-border px-4 py-2 text-center"></td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    Email address (non-sensitive context)
                  </td>
                  <td className="border border-border px-4 py-2 text-center"></td>
                  <td className="border border-border px-4 py-2 text-center">
                    ✓
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    Search query
                  </td>
                  <td className="border border-border px-4 py-2 text-center"></td>
                  <td className="border border-border px-4 py-2 text-center">
                    ✓
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    Quantity selector
                  </td>
                  <td className="border border-border px-4 py-2 text-center"></td>
                  <td className="border border-border px-4 py-2 text-center">
                    ✓
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    Text content (comments, posts)
                  </td>
                  <td className="border border-border px-4 py-2 text-center"></td>
                  <td className="border border-border px-4 py-2 text-center">
                    ✓
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: TypeScript Interfaces */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            TypeScript Interfaces
          </h2>

          <p className="text-base leading-7 mb-6">
            Elements can declare human input requirements via the{" "}
            <code className="bg-muted px-1 rounded">humanInput</code> property
            (in TypeScript) or{" "}
            <code className="bg-muted px-1 rounded">data-sid-human-input</code>{" "}
            attribute (in HTML).
          </p>

          <div className="space-y-6">
            <TypeDefinition
              name="HumanInputRequirement"
              description="Declares that an element requires human input before interaction. Contains the reason for requiring input, a JSON Schema defining the structure, and optional UI hints."
              code={`interface HumanInputRequirement {
  // Why human input is needed (shown to user)
  reason: string;
  
  // JSON Schema defining the required input structure
  schema: JSONSchema;
  
  // Optional: UI hints for the agent's form rendering
  uiHints?: {
    // Suggested form title
    title?: string;
    // Group fields into sections
    sections?: Array<{
      title: string;
      fields: string[];  // Property names from schema
    }>;
  };
}`}
            />

            <TypeDefinition
              name="JSONSchema"
              description="Standard JSON Schema (draft-07 or later) defining the structure of required input. Must be an object type with properties."
              code={`interface JSONSchema {
  type: "object";
  properties: Record<string, JSONSchemaProperty>;
  required?: string[];
}`}
            />

            <TypeDefinition
              name="JSONSchemaProperty"
              description="Defines a single field in the human input schema. Includes type, validation rules, and the SID-specific x-sid-sensitive extension for marking fields that should be masked."
              code={`interface JSONSchemaProperty {
  type: "string" | "number" | "integer" | "boolean";
  title?: string;           // Human-readable field label
  description?: string;     // Help text for the field
  format?: string;          // e.g., "email", "date", "uri", "credit-card"
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  pattern?: string;         // Regex validation
  enum?: string[];          // Allowed values
  default?: any;
  
  // SID extension: marks field as sensitive (should be masked in UI)
  "x-sid-sensitive"?: boolean;
}`}
            />
          </div>
        </section>

        {/* Section: Extended Formats */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Extended Formats
          </h2>

          <p className="text-base leading-7 mb-6">
            SID extends JSON Schema&apos;s{" "}
            <code className="bg-muted px-1 rounded">format</code> keyword with
            additional values for common sensitive data. Agents should use these
            format hints to render appropriate input controls and apply
            client-side validation.
          </p>

          {/* Extended Formats Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-2 text-left font-semibold">
                    Format
                  </th>
                  <th className="border border-border px-4 py-2 text-left font-semibold">
                    Description
                  </th>
                  <th className="border border-border px-4 py-2 text-left font-semibold">
                    Example
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <code className="bg-muted px-1 rounded">credit-card</code>
                  </td>
                  <td className="border border-border px-4 py-2">
                    Credit/debit card number
                  </td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">
                    4111111111111111
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <code className="bg-muted px-1 rounded">card-expiry</code>
                  </td>
                  <td className="border border-border px-4 py-2">
                    Card expiration (MM/YY or MM/YYYY)
                  </td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">
                    12/25
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <code className="bg-muted px-1 rounded">card-cvv</code>
                  </td>
                  <td className="border border-border px-4 py-2">
                    Card security code
                  </td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">
                    123
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <code className="bg-muted px-1 rounded">ssn</code>
                  </td>
                  <td className="border border-border px-4 py-2">
                    Social Security Number
                  </td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">
                    123-45-6789
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <code className="bg-muted px-1 rounded">phone</code>
                  </td>
                  <td className="border border-border px-4 py-2">
                    Phone number
                  </td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">
                    +1-555-123-4567
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <code className="bg-muted px-1 rounded">postal-code</code>
                  </td>
                  <td className="border border-border px-4 py-2">
                    Postal/ZIP code
                  </td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">
                    94102
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Agent Flow with Human Input */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Agent Flow with Human Input
          </h2>

          <p className="text-base leading-7 mb-4">
            The <code className="bg-muted px-1 rounded">humanInput</code>{" "}
            metadata tells the agent what data to collect from the user{" "}
            <em>before</em> triggering the interaction. The agent then uses this
            data to fill form fields or interact with elements that appear after
            the initial interaction.
          </p>

          <CodeBlock
            language="javascript"
            code={`// 1. Agent discovers element requires human input
const checkoutBtn = SID.getElement('btn-checkout');

if (checkoutBtn.humanInput) {
  // 2. Agent reads the requirement
  console.log('Human input needed:', checkoutBtn.humanInput.reason);
  // "Payment details required to complete purchase"
  
  // 3. Agent renders a form based on the schema and collects from user
  const schema = checkoutBtn.humanInput.schema;
  const userInput = await agent.promptUser({
    title: checkoutBtn.humanInput.uiHints?.title || 'Input Required',
    reason: checkoutBtn.humanInput.reason,
    schema: schema
  });
  // userInput = { cardNumber: "4111...", expiry: "12/25", cvv: "123", nameOnCard: "John Doe" }
  
  // 4. Agent triggers the interaction (opens payment modal)
  const result = await SID.interact('btn-checkout', { type: 'click' });
  
  // 5. Agent uses collected data to fill the revealed form fields
  // The modal now has SID elements for each payment field
  await SID.interact('input-card-number', { type: 'fill', value: userInput.cardNumber });
  await SID.interact('input-expiry', { type: 'fill', value: userInput.expiry });
  await SID.interact('input-cvv', { type: 'fill', value: userInput.cvv });
  await SID.interact('input-name', { type: 'fill', value: userInput.nameOnCard });
  
  // 6. Submit the form
  await SID.interact('btn-submit-payment', { type: 'click' });
}`}
          />

          <p className="text-base leading-7 mt-6 mb-4">
            The key insight:{" "}
            <code className="bg-muted px-1 rounded">humanInput</code> is purely
            informational metadata. It tells the agent:
          </p>

          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4">
            <li>
              &quot;You&apos;ll need this data from the user&quot;
            </li>
            <li>
              &quot;Here&apos;s the exact schema so you can render a proper
              form&quot;
            </li>
            <li>
              &quot;Collect it now, before you click this button&quot;
            </li>
          </ul>

          <p className="text-base leading-7 mt-4">
            The agent is responsible for knowing how to use the collected data
            based on the element&apos;s{" "}
            <code className="bg-muted px-1 rounded">descriptionLong</code> and
            the SID elements that appear after interaction.
          </p>
        </section>

        {/* Section: HTML Attribute */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            HTML Attribute
          </h2>

          <p className="text-base leading-7 mb-4">
            Human input requirements are specified via{" "}
            <code className="bg-muted px-1 rounded">data-sid-human-input</code>{" "}
            containing a JSON object:
          </p>

          <CodeBlock
            language="html"
            code={`<!-- Payment button requiring card details -->
<button
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
          "format": "card-expiry",
          "description": "MM/YY format"
        },
        "cvv": {
          "type": "string",
          "title": "Security Code",
          "format": "card-cvv",
          "minLength": 3,
          "maxLength": 4,
          "x-sid-sensitive": true
        },
        "nameOnCard": {
          "type": "string",
          "title": "Name on Card",
          "minLength": 1
        }
      },
      "required": ["cardNumber", "expiry", "cvv", "nameOnCard"]
    },
    "uiHints": {
      "title": "Enter Payment Details",
      "sections": [
        { "title": "Card Information", "fields": ["cardNumber", "expiry", "cvv"] },
        { "title": "Billing", "fields": ["nameOnCard"] }
      ]
    }
  }'
>
  Pay $99.00
</button>`}
          />
        </section>

        {/* Section: More Examples */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            More Examples
          </h2>

          {/* Identity Verification Example */}
          <h3 className="text-xl font-medium mt-8 mb-4">
            Identity Verification
          </h3>

          <CodeBlock
            language="html"
            code={`<button
  data-sid="btn-verify-identity"
  data-sid-desc="Verifies your identity"
  data-sid-action="click"
  data-sid-human-input='{
    "reason": "Identity verification required for account security",
    "schema": {
      "type": "object",
      "properties": {
        "ssn": {
          "type": "string",
          "title": "Social Security Number",
          "format": "ssn",
          "pattern": "^\\\\d{3}-?\\\\d{2}-?\\\\d{4}$",
          "x-sid-sensitive": true
        },
        "dateOfBirth": {
          "type": "string",
          "title": "Date of Birth",
          "format": "date"
        }
      },
      "required": ["ssn", "dateOfBirth"]
    }
  }'
>
  Verify Identity
</button>`}
          />

          {/* Password Confirmation Example */}
          <h3 className="text-xl font-medium mt-8 mb-4">
            Password Confirmation for Destructive Action
          </h3>

          <CodeBlock
            language="html"
            code={`<button
  data-sid="btn-delete-account"
  data-sid-desc="Permanently deletes your account"
  data-sid-action="click"
  data-sid-human-input='{
    "reason": "Please confirm your password to delete your account",
    "schema": {
      "type": "object",
      "properties": {
        "password": {
          "type": "string",
          "title": "Current Password",
          "format": "password",
          "x-sid-sensitive": true
        },
        "confirmation": {
          "type": "string",
          "title": "Type DELETE to confirm",
          "pattern": "^DELETE$",
          "description": "Type the word DELETE to confirm this action"
        }
      },
      "required": ["password", "confirmation"]
    }
  }'
>
  Delete Account
</button>`}
          />

          {/* Shipping Address Example */}
          <h3 className="text-xl font-medium mt-8 mb-4">
            Shipping Address (Non-Sensitive but Requires Human)
          </h3>

          <CodeBlock
            language="html"
            code={`<button
  data-sid="btn-add-address"
  data-sid-desc="Adds a new shipping address"
  data-sid-action="click"
  data-sid-human-input='{
    "reason": "Please provide your shipping address",
    "schema": {
      "type": "object",
      "properties": {
        "fullName": { "type": "string", "title": "Full Name" },
        "street": { "type": "string", "title": "Street Address" },
        "city": { "type": "string", "title": "City" },
        "state": { "type": "string", "title": "State/Province" },
        "postalCode": { "type": "string", "title": "Postal Code", "format": "postal-code" },
        "country": { 
          "type": "string", 
          "title": "Country",
          "enum": ["US", "CA", "UK", "DE", "FR", "AU"]
        }
      },
      "required": ["fullName", "street", "city", "postalCode", "country"]
    }
  }'
>
  Add Address
</button>`}
          />
        </section>

        {/* Section: Security Considerations */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Security Considerations
          </h2>

          {/* Sensitive Field Handling */}
          <h3 className="text-xl font-medium mt-6 mb-4">
            Sensitive Field Handling
          </h3>

          <p className="text-base leading-7 mb-4">
            Fields marked with{" "}
            <code className="bg-muted px-1 rounded">
              &quot;x-sid-sensitive&quot;: true
            </code>{" "}
            should be:
          </p>

          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4 mb-6">
            <li>
              Masked in the agent&apos;s UI (like password fields)
            </li>
            <li>Not logged or stored by the agent</li>
            <li>Transmitted securely to the SID interaction</li>
          </ul>

          {/* Agent Responsibility */}
          <h3 className="text-xl font-medium mt-6 mb-4">Agent Responsibility</h3>

          <p className="text-base leading-7 mb-4">
            The agent is responsible for:
          </p>

          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4 mb-6">
            <li>Rendering an appropriate form UI</li>
            <li>Validating input against the schema before submission</li>
            <li>Securely handling sensitive data</li>
            <li>
              Clearly showing the{" "}
              <code className="bg-muted px-1 rounded">reason</code> to the user
            </li>
          </ul>

          {/* App Responsibility */}
          <h3 className="text-xl font-medium mt-6 mb-4">App Responsibility</h3>

          <p className="text-base leading-7 mb-4">
            The application should:
          </p>

          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4 mb-6">
            <li>Never trust client-side validation alone</li>
            <li>Re-validate all human input server-side</li>
            <li>
              Use appropriate security measures (HTTPS, tokenization for
              payments)
            </li>
          </ul>
        </section>

        {/* Section: SIDElement with humanInput */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            SIDElement with humanInput
          </h2>

          <p className="text-base leading-7 mb-4">
            When an element has human input requirements, the{" "}
            <code className="bg-muted px-1 rounded">humanInput</code> property
            is populated on the{" "}
            <code className="bg-muted px-1 rounded">SIDElement</code>:
          </p>

          <CodeBlock
            language="typescript"
            code={`interface SIDElement {
  id: string;
  selector: string;
  description: string;
  descriptionLong?: string;
  actions: ActionDefinition[];
  state?: { visible: boolean; enabled: boolean; value?: string };
  
  // Human input requirements - if present, agent must collect this data
  // from the user before triggering the interaction
  humanInput?: HumanInputRequirement;
}`}
          />

          <p className="text-base leading-7 mt-4">
            Agents should check for the presence of{" "}
            <code className="bg-muted px-1 rounded">humanInput</code> before
            triggering any interaction:
          </p>

          <CodeBlock
            language="javascript"
            code={`const element = SID.getElement('btn-checkout');

if (element.humanInput) {
  // Must collect data from user first
  const userData = await collectFromUser(element.humanInput);
  
  // Then proceed with interaction
  await SID.interact(element.id, { type: 'click' });
  
  // Use collected data to fill revealed form fields
  // ...
} else {
  // No human input required, can interact directly
  await SID.interact(element.id, { type: 'click' });
}`}
          />
        </section>

        {/* Section: Next Steps */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Next Steps
          </h2>

          <p className="text-base leading-7 mb-4">
            Now that you understand human input requirements, continue with:
          </p>

          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4">
            <li>
              <strong>Authentication</strong> — Token-based authentication for
              AI agents
            </li>
            <li>
              <Link href="/agent-docs" className="font-semibold hover:underline">
                Agent Docs
              </Link>{" "}
              — Specification documents for AI agents
            </li>
          </ul>
        </section>
      </div>

      {/* Page Navigation */}
      <PageNavigation />
    </DocLayout>
  );
}
