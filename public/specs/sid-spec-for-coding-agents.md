# SID Specification for Coding Agents

## Overview

This document is the complete Semantic Interaction Description (SID) specification for AI agents that build websites. It provides everything needed to implement SID support in web applications, including HTML attributes, JavaScript API implementation, and examples for common UI patterns.

SID (Semantic Interaction Description) is an accessibility standard for AI agents, enabing AI agents to navigate and interact with web applications effectively. It allows web applications to expose structured metadata about interactive elements so agents can understand and interact with them reliably.

## Version

SID Version: 1.0.0

---

## Part 1: HTML Attributes Reference

### Required Attributes

| Attribute | Format | Description |
|-----------|--------|-------------|
| `data-sid` | string | Unique element identifier. Must be unique within the page. |
| `data-sid-desc` | plaintext | Short description of what the element does (one line). |
| `data-sid-action` | `click\|fill\|select\|check\|hover\|upload` | The type of interaction this element supports. |

### Optional Attributes

| Attribute | Format | Description |
|-----------|--------|-------------|
| `data-sid-desc-long` | plaintext | Detailed description including outcomes, errors, and side effects. |
| `data-sid-input` | `{dataType},{required\|optional}` | Input metadata for fill/select actions. |
| `data-sid-options` | comma-separated | Available options for select elements. |
| `data-sid-tracking` | `async\|navigation\|external\|none` | How to track operation completion. Default: `async`. |
| `data-sid-destination` | URL/path | Expected destination for navigation tracking. |
| `data-sid-human-input` | JSON | Human input requirement with reason and JSON Schema. |
| `data-sid-disabled` | `true\|false` | Whether the element is disabled. Default: `false`. |
| `data-sid-disabled-desc` | plaintext | Explanation of why the element is disabled (when disabled). |

### Input Data Types

For `data-sid-input`, the dataType can be:
- `text` - General text input
- `number` - Numeric input
- `date` - Date input
- `email` - Email address
- `password` - Password field
- `file` - File upload

---

## Part 2: JavaScript API Implementation

### Global Object Structure

Implement the `window.SID` global object with the following interface:

```javascript
window.SID = {
  version: "1.0.0",
  
  // Discovery
  isSupported(): boolean,
  getPageContext(): string,
  getAppContext(): string,
  
  // Elements
  getElements(): SIDElement[],
  getElement(id: string): SIDElement | null,
  
  // Execution (waits for completion)
  interact(id: string, action: InteractionAction, options?: { timeout?: number }): Promise<InteractionResult>,
  
  // Completion signaling (called by app code)
  complete(elementId: string, result: CompletionResult): void,
  
  // Auth (optional)
  auth?: {
    description: string,
    authenticate(token: string): Promise<boolean>
  }
}
```

### Core Types

```typescript
interface SIDElement {
  id: string;
  selector: string;
  description: string;
  descriptionLong?: string;
  actions: ActionDefinition[];
  state?: {
    visible: boolean;
    enabled: boolean;
    value?: string;
  };
  disabled: boolean;              // Whether the element is disabled
  disabledDescription?: string;   // Why the element is disabled (when disabled is true)
  humanInput?: HumanInputRequirement;
}

interface ActionDefinition {
  type: "click" | "fill" | "select" | "check" | "hover" | "upload";
  input?: {
    dataType: "text" | "number" | "date" | "email" | "password" | "file";
    required: boolean;
    options?: string[];
  };
  tracked: boolean;
  description: string;
}

interface InteractionAction {
  type: string;
  value?: string | number | boolean | File;
}

interface InteractionResult {
  success: boolean;
  status: "completed" | "error" | "timeout" | "navigation" | "external";
  error?: string;
  message?: string;
  effects?: OperationEffects;
}

interface CompletionResult {
  status: "completed" | "error";
  message?: string;
  effects?: OperationEffects;
}

interface OperationEffects {
  navigatedTo?: string;
  elementsAdded?: string[];
  elementsRemoved?: string[];
  changes?: string;
}
```

### Human Input Types

```typescript
interface HumanInputRequirement {
  reason: string;
  schema: JSONSchema;
  uiHints?: {
    title?: string;
    sections?: Array<{
      title: string;
      fields: string[];
    }>;
  };
}
```

---

## Part 3: Page and App Context

Include a script tag with SID metadata:

```html
<script type="application/sid+json">
{
  "version": "1.0.0",
  "app": "Description of the entire application and its main features",
  "page": "Description of the current page and what can be done here",
  "auth": "Description of how authentication works for agents"
}
</script>
```

---

## Part 4: Common UI Pattern Examples

### Simple Button

```html
<button 
  data-sid="btn-save"
  data-sid-desc="Saves the current document"
  data-sid-action="click"
>
  Save
</button>
```

### Button with Detailed Description

```html
<button 
  data-sid="btn-save-detailed"
  data-sid-desc="Saves the current document"
  data-sid-desc-long="Saves the current document to the server. Validates all 
                      required fields before saving. Shows inline validation 
                      errors if any fields are invalid. On success, displays 
                      a toast notification and updates the 'Last saved' timestamp 
                      in the header. On network error, shows a retry button."
  data-sid-action="click"
>
  Save
</button>
```

### Navigation Link

```html
<a 
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
</a>
```

### Text Input

```html
<input 
  type="email"
  data-sid="input-email"
  data-sid-desc="Email address for registration"
  data-sid-desc-long="Email address for account registration. Must be a valid 
                      email format. We'll send a verification link to this 
                      address within 5 minutes."
  data-sid-action="fill"
  data-sid-input="email,required"
/>
```

### Select Dropdown

```html
<select
  data-sid="select-plan"
  data-sid-desc="Choose your subscription plan"
  data-sid-desc-long="Choose your subscription plan. Options:
                      - Free: Basic features, 1 project, no support
                      - Pro ($10/mo): Unlimited projects, email support
                      - Enterprise ($50/mo): Everything + SSO, priority support"
  data-sid-action="select"
  data-sid-input="text,required"
  data-sid-options="free,pro,enterprise"
>
  <option value="free">Free</option>
  <option value="pro">Pro</option>
  <option value="enterprise">Enterprise</option>
</select>
```

### Checkbox

```html
<input 
  type="checkbox"
  data-sid="checkbox-terms"
  data-sid-desc="Accept terms and conditions"
  data-sid-action="check"
  data-sid-input="boolean,required"
/>
```

### Hover Menu Trigger

```html
<div
  data-sid="menu-user"
  data-sid-desc="User menu dropdown"
  data-sid-desc-long="Hover or click to reveal user menu with options:
                      Profile, Settings, Billing, Help, Sign Out"
  data-sid-action="hover"
  data-sid-tracking="none"
>
  <span>User Menu</span>
</div>
```

### File Upload

```html
<input
  type="file"
  data-sid="upload-avatar"
  data-sid-desc="Upload profile picture"
  data-sid-desc-long="Upload a profile picture. Accepts JPG, PNG, or GIF. 
                      Maximum file size 5MB. Image will be cropped to square."
  data-sid-action="upload"
  data-sid-input="file,optional"
/>
```

### Modal Trigger

```html
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
>
  + Add Item
</button>
```

### External OAuth Button

```html
<button
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
</button>
```

### Disabled Button (Permission)

```html
<button
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
</button>
```

### Disabled Button (Prerequisite)

```html
<button
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
</button>
```

### Disabled Input (Read-only)

```html
<input
  type="text"
  data-sid="input-account-id"
  data-sid-desc="Your account ID"
  data-sid-action="fill"
  data-sid-input="text,required"
  data-sid-disabled="true"
  data-sid-disabled-desc="Account ID is system-generated and cannot be changed."
  disabled
  value="ACC-12345"
/>
```

### Payment Button with Human Input

```html
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
          "format": "card-expiry"
        },
        "cvv": {
          "type": "string",
          "title": "Security Code",
          "format": "card-cvv",
          "x-sid-sensitive": true
        },
        "nameOnCard": {
          "type": "string",
          "title": "Name on Card"
        }
      },
      "required": ["cardNumber", "expiry", "cvv", "nameOnCard"]
    }
  }'
>
  Pay Now
</button>
```

---

## Part 5: Writing Good Descriptions

### Short Descriptions

Keep these concise — one line that captures the primary action:

**Good:**
- "Saves the current document"
- "Opens user profile page"
- "Submits the registration form"
- "Exports data as CSV"

**Bad:**
- "Save button" (doesn't say what it saves)
- "Click here" (meaningless)
- "Submit" (submit what?)

### Long Descriptions

Include everything an agent needs to understand outcomes and handle edge cases:

**Template:**
```
[What it does]. [What happens on success]. [What happens on error/failure]. 
[Any preconditions or requirements]. [If reveals content: what appears and 
what can be done with it].
```

**Example:**
```
Saves the current document to the server. Validates all required fields 
first. On success, shows a toast and updates the 'Last saved' timestamp. 
On validation error, highlights invalid fields with messages. On network 
error, shows retry option and preserves unsaved changes locally.
```

---

## Part 6: Operation Tracking Implementation

### Signaling Completion with SID.complete()

When an async operation completes, call `SID.complete()` to signal the result:

```javascript
// In your app's event handler
async function handleSave() {
  try {
    await api.saveDocument(data);
    
    // Signal success to SID
    window.SID.complete('btn-save', {
      status: 'completed',
      message: 'Document saved',
      effects: { changes: 'Document content and metadata updated' }
    });
  } catch (error) {
    // Signal error to SID
    window.SID.complete('btn-save', {
      status: 'error',
      message: `Save failed: ${error.message}`
    });
  }
}
```

### How It Works

1. Agent calls `SID.interact('btn-save', { type: 'click' }, { timeout: 10000 })`
2. SID triggers the click event on the button
3. Your `handleSave()` function runs
4. When the async work completes, you call `SID.complete()`
5. The `interact()` Promise resolves with the result
6. Agent receives the final status without polling

### Tracking Types

| Type | When to Use | Agent Behavior |
|------|-------------|----------------|
| `async` | Async operations (API calls, form submissions) | `interact()` waits for `complete()` |
| `navigation` | Full page navigation | `interact()` returns immediately with `navigation` status |
| `external` | OAuth, payment gateways, external sites | `interact()` returns immediately with `external` status |
| `none` | Instant actions (hover, focus) | `interact()` returns immediately with `completed` status |

---

## Part 7: Extended JSON Schema Formats

SID extends JSON Schema's `format` keyword for sensitive data:

| Format | Description | Example |
|--------|-------------|---------|
| `credit-card` | Credit/debit card number | 4111111111111111 |
| `card-expiry` | Card expiration (MM/YY) | 12/25 |
| `card-cvv` | Card security code | 123 |
| `ssn` | Social Security Number | 123-45-6789 |
| `phone` | Phone number | +1-555-123-4567 |
| `postal-code` | Postal/ZIP code | 94102 |

Fields marked with `"x-sid-sensitive": true` should be masked in UI and not logged.

---

## Part 8: Implementation Checklist

1. [ ] Add `window.SID` global object with all required methods
2. [ ] Implement `isSupported()` to return `true`
3. [ ] Add page/app context via `<script type="application/sid+json">`
4. [ ] Add `data-sid` attributes to all interactive elements
5. [ ] Write short descriptions for all elements
6. [ ] Add long descriptions for complex elements
7. [ ] Implement operation tracking for async actions
8. [ ] Add human input requirements for sensitive data collection
9. [ ] Mark disabled elements with `data-sid-disabled` and `data-sid-disabled-desc`
10. [ ] Test with an AI agent to verify discoverability

---

## Reference

Full specification: https://sid-standard.github.io
