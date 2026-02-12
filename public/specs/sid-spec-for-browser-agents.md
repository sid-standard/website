# SID Specification for Browser Agents

## Overview

This document is the complete Semantic Interaction Description (SID) specification for AI agents that interact with websites. It provides everything needed to discover, understand, and interact with SID-enabled web applications, including discovery procedures, interaction execution, operation tracking, and integration guidance.

SID (Semantic Interaction Description) is an accessibility standard for AI agents, enabing AI agents to navigate and interact with web applications effectively. Instead of parsing DOM text, ARIA attributes, or screenshots, agents can query structured metadata that explicitly describes what each element does.

## Version

SID Version: 1.0.0

---

## Part 1: Discovery Procedures

### Step 1: Check SID Support

```javascript
// In browser context (Playwright, Puppeteer, etc.)
const isSupported = await page.evaluate(() => {
  return window.SID?.isSupported() === true;
});

if (!isSupported) {
  // Fall back to traditional DOM parsing
}
```

### Step 2: Get Context

```javascript
const context = await page.evaluate(() => ({
  app: window.SID.getAppContext(),
  page: window.SID.getPageContext()
}));

// context.app: "Acme Project Manager - A project management tool for teams..."
// context.page: "Project Dashboard for 'My Project'. Shows overview, activity..."
```

### Step 3: Discover Elements

```javascript
// Get all elements with short descriptions (efficient overview)
const elements = await page.evaluate(() => window.SID.getElements());

// elements is an array of SIDElement objects:
// [
//   { id: "btn-save", description: "Saves the current document", actions: [...] },
//   { id: "input-title", description: "Document title", actions: [...] },
//   ...
// ]
```

### Step 4: Get Detailed Information

```javascript
// When you need full details about a specific element
const element = await page.evaluate((id) => window.SID.getElement(id), 'btn-save');

// element.descriptionLong contains detailed information:
// "Saves the current document to the server. Validates all required fields..."
```

---

## Part 2: Element Structure

### SIDElement Interface

```typescript
interface SIDElement {
  id: string;              // Unique identifier
  selector: string;        // CSS selector to find the DOM element
  description: string;     // Short description (always present)
  descriptionLong?: string; // Detailed description (from getElement())
  actions: ActionDefinition[];
  state?: {
    visible: boolean;
    enabled: boolean;
    value?: string;
  };
  disabled: boolean;       // Whether the element is disabled
  disabledDescription?: string; // Why the element is disabled (when disabled is true)
  humanInput?: HumanInputRequirement;
}
```

### ActionDefinition Interface

```typescript
interface ActionDefinition {
  type: "click" | "fill" | "select" | "check" | "hover" | "upload";
  input?: {
    dataType: "text" | "number" | "date" | "email" | "password" | "file";
    required: boolean;
    options?: string[];  // For select/radio only
  };
  tracked: boolean;      // Whether this produces a trackable operation
  description: string;   // What this action does
}
```

---

## Part 3: Interaction Execution

### Basic Interaction

```javascript
// Interact and wait for completion - no polling needed!
const result = await page.evaluate(async (id, action) => {
  return await window.SID.interact(id, action, { timeout: 10000 });
}, 'btn-save', { type: 'click' });

// result: { success: true, status: 'completed', message: 'Document saved' }
```

### Interaction Types

| Action Type | Value Parameter | Example |
|-------------|-----------------|---------|
| `click` | Not needed | `{ type: 'click' }` |
| `fill` | String value | `{ type: 'fill', value: 'hello@example.com' }` |
| `select` | Option value | `{ type: 'select', value: 'pro' }` |
| `check` | Boolean | `{ type: 'check', value: true }` |
| `hover` | Not needed | `{ type: 'hover' }` |
| `upload` | File object | `{ type: 'upload', value: fileObject }` |

### InteractionResult Interface

```typescript
interface InteractionResult {
  success: boolean;        // Whether interaction was triggered
  status: 'completed' | 'error' | 'timeout' | 'navigation' | 'external';
  error?: string;          // Error if interaction failed
  message?: string;        // Description of what happened
  effects?: {              // What changed (for 'completed' status)
    navigatedTo?: string;
    elementsAdded?: string[];
    elementsRemoved?: string[];
    changes?: string;
  };
}
```

### Handling Different Status Values

```javascript
const result = await page.evaluate(async () => {
  return await window.SID.interact('btn-save', { type: 'click' }, { timeout: 15000 });
});

switch (result.status) {
  case 'completed':
    console.log('Success:', result.message);
    if (result.effects?.elementsAdded) {
      console.log('New elements:', result.effects.elementsAdded);
    }
    break;
    
  case 'error':
    console.error('Failed:', result.error || result.message);
    break;
    
  case 'timeout':
    console.log('Operation timed out - may still complete');
    break;
    
  case 'navigation':
    // Page will navigate; wait for page load
    console.log('Navigating to:', result.message);
    await page.waitForNavigation();
    break;
    
  case 'external':
    // Leaving SID context (OAuth, payment, etc.)
    console.log('External operation:', result.message);
    break;
}
```

---

## Part 4: Operation Tracking

### Tracking Types

| Type | When Used | How to Handle |
|------|-----------|---------------|
| `async` | Async operations (API calls, form submissions) | `interact()` waits automatically |
| `navigation` | Full page navigation | Wait for page load after `interact()` |
| `external` | OAuth, payment gateways | Read `result.message` for guidance |
| `none` | Instant actions (hover, focus) | Returns immediately with `completed` |

### Simplified Flow (No Polling Required)

The `interact()` method handles waiting internally:

```javascript
// interact waits for completion:
const result = await page.evaluate(async () => {
  return await window.SID.interact('btn-save', { type: 'click' }, { timeout: 10000 });
});

if (result.status === 'completed') {
  console.log('Done:', result.message);
}
```

### Handling Navigation

```javascript
const result = await page.evaluate(async () => {
  return await window.SID.interact('link-dashboard', { type: 'click' });
});

if (result.status === 'navigation') {
  // Don't wait for completion - page will navigate
  console.log('Expected destination:', result.message);
  await page.waitForNavigation();
  
  // Check if new page supports SID
  const newPageSupported = await page.evaluate(() => 
    window.SID?.isSupported() === true
  );
}
```

### Handling External Context

```javascript
const result = await page.evaluate(async () => {
  return await window.SID.interact('btn-google-login', { type: 'click' });
});

if (result.status === 'external') {
  // Read the message for guidance
  console.log(result.message);
  // "Redirects to Google OAuth. On success, returns to /auth/callback..."
  
  // Handle OAuth flow based on message
}
```

### Timeout Behavior

```javascript
const result = await page.evaluate(async () => {
  return await window.SID.interact('btn-slow-operation', { type: 'click' }, { timeout: 5000 });
});

if (result.status === 'timeout') {
  // Operation didn't complete within timeout
  // It may still complete in the background
  console.log('Operation timed out:', result.message);
  
  // Options:
  // 1. Retry the operation
  // 2. Report to user that action is taking longer than expected
  // 3. Continue with other tasks
}
```

---

## Part 5: Human Input Handling

Some elements require sensitive data that agents should not provide autonomously.

### Detecting Human Input Requirements

```javascript
const element = await page.evaluate((id) => 
  window.SID.getElement(id), 'btn-checkout'
);

if (element.humanInput) {
  // This element requires human input before interaction
  console.log('Reason:', element.humanInput.reason);
  console.log('Schema:', element.humanInput.schema);
}
```

### Human Input Flow

1. Detect `humanInput` requirement on element
2. Present form to user based on JSON Schema
3. Collect user input
4. Trigger the interaction
5. Use collected data to fill revealed form fields

```javascript
// 1. Check for human input requirement
const checkoutBtn = await page.evaluate(() => 
  window.SID.getElement('btn-checkout')
);

if (checkoutBtn.humanInput) {
  // 2. Prompt user for input (agent-specific implementation)
  const userInput = await agent.promptUser({
    reason: checkoutBtn.humanInput.reason,
    schema: checkoutBtn.humanInput.schema
  });
  
  // 3. Trigger the interaction (opens payment modal)
  await page.evaluate(async () => 
    await window.SID.interact('btn-checkout', { type: 'click' })
  );
  
  // 4. Fill revealed form fields with collected data
  await page.evaluate(async (data) => {
    await window.SID.interact('input-card-number', { type: 'fill', value: data.cardNumber });
    await window.SID.interact('input-expiry', { type: 'fill', value: data.expiry });
    await window.SID.interact('input-cvv', { type: 'fill', value: data.cvv });
  }, userInput);
}
```

### Sensitive Field Handling

Fields marked with `"x-sid-sensitive": true` should be:
- Masked in any UI shown to users
- Not logged or stored
- Transmitted securely

---

## Part 6: Complete Interaction Flow Example

```javascript
async function interactWithSIDPage(page) {
  // 1. Check SID support
  const supported = await page.evaluate(() => 
    window.SID?.isSupported() === true
  );
  if (!supported) return { error: 'SID not supported' };
  
  // 2. Get context
  const context = await page.evaluate(() => ({
    app: window.SID.getAppContext(),
    page: window.SID.getPageContext()
  }));
  console.log('App:', context.app);
  console.log('Page:', context.page);
  
  // 3. Discover elements
  const elements = await page.evaluate(() => window.SID.getElements());
  console.log('Found elements:', elements.map(e => e.id));
  
  // 4. Get detailed info for target element
  const saveBtn = await page.evaluate(() => 
    window.SID.getElement('btn-save')
  );
  console.log('Save button details:', saveBtn.descriptionLong);
  
  // 5. Check if element is disabled
  if (saveBtn.disabled) {
    return { error: saveBtn.disabledDescription };
  }
  
  // 6. Trigger interaction and wait for completion
  const result = await page.evaluate(async () => 
    await window.SID.interact('btn-save', { type: 'click' }, { timeout: 15000 })
  );
  
  if (!result.success) {
    return { error: result.error };
  }
  
  // 7. Handle based on status
  switch (result.status) {
    case 'completed':
      return { 
        status: 'success', 
        message: result.message,
        effects: result.effects
      };
      
    case 'error':
      return { status: 'error', message: result.message };
      
    case 'timeout':
      return { status: 'timeout', message: 'Operation timed out' };
      
    case 'navigation':
      await page.waitForNavigation();
      return { status: 'navigated', destination: result.message };
      
    case 'external':
      return { status: 'external', description: result.message };
      
    default:
      return { status: 'unknown' };
  }
}
```

---

## Part 7: Form Filling Example

```javascript
async function fillForm(page, formData) {
  // Get all form elements
  const elements = await page.evaluate(() => window.SID.getElements());
  
  // Fill each field (these are typically instant, no waiting needed)
  for (const [fieldId, value] of Object.entries(formData)) {
    const element = elements.find(e => e.id === fieldId);
    if (!element) continue;
    
    const action = element.actions[0];
    
    const result = await page.evaluate(async (id, actionType, val) => {
      return await window.SID.interact(id, { type: actionType, value: val });
    }, fieldId, action.type, value);
    
    if (!result.success) {
      console.error(`Failed to fill ${fieldId}:`, result.error);
    }
  }
  
  // Submit form and wait for completion
  const result = await page.evaluate(async () => 
    await window.SID.interact('btn-submit', { type: 'click' }, { timeout: 10000 })
  );
  
  return result;
}

// Usage
const result = await fillForm(page, {
  'input-email': 'user@example.com',
  'input-name': 'John Doe',
  'select-plan': 'pro'
});

if (result.status === 'completed') {
  console.log('Form submitted successfully');
}
```

---

## Part 8: Handling Disabled Elements

Elements may be disabled even though they exist in the DOM. SID provides explicit disabled state information so agents can understand why an element cannot be interacted with.

### Checking Disabled State

```javascript
const element = await page.evaluate((id) => 
  window.SID.getElement(id), 'btn-delete'
);

if (element.disabled) {
  // Element exists but cannot be interacted with
  console.log('Disabled:', element.disabledDescription);
  // "You need Owner role to delete this project."
  
  // Agent can inform user or take alternative action
}
```

### Filtering Disabled Elements

```javascript
// Get all elements and filter to only enabled ones
const elements = await page.evaluate(() => window.SID.getElements());
const enabledElements = elements.filter(el => !el.disabled);

// Or find disabled elements to explain limitations
const disabledElements = elements.filter(el => el.disabled);
for (const el of disabledElements) {
  console.log(`${el.id} is disabled: ${el.disabledDescription}`);
}
```

### Common Disabled Reasons

| Reason | Example Description |
|--------|---------------------|
| Permission | "You need Admin role to access this feature" |
| Prerequisite | "Save your changes before publishing" |
| State | "No items selected. Select at least one item to continue" |
| Quota | "You've reached the maximum of 5 projects on the free plan" |
| Temporal | "This action is only available during business hours" |

### Interaction with Disabled Elements

Attempting to interact with a disabled element will fail:

```javascript
const result = await page.evaluate(async () => 
  await window.SID.interact('btn-disabled', { type: 'click' })
);

// result.success will be false
// result.error will explain why (e.g., "Element is disabled")
```

Always check `disabled` before attempting interaction to provide better user feedback.

---

## Part 9: Error Handling

### Interaction Errors

```javascript
const result = await page.evaluate(async () => 
  await window.SID.interact('btn-disabled', { type: 'click' })
);

if (!result.success) {
  // Element might be disabled, not found, or not visible
  console.error('Interaction failed:', result.error);
}

if (result.status === 'error') {
  // Operation was triggered but failed (e.g., server error)
  console.error('Operation failed:', result.message);
}
```

### Timeout Handling

```javascript
const result = await page.evaluate(async () => 
  await window.SID.interact('btn-slow', { type: 'click' }, { timeout: 5000 })
);

if (result.status === 'timeout') {
  // Operation didn't complete within timeout
  // It may still complete in the background
  console.log('Operation timed out');
  
  // Options:
  // 1. Retry the operation
  // 2. Report to user that action is taking longer than expected
  // 3. Continue with other tasks
}
```

---

## Part 10: Authentication

### Check Auth Support

```javascript
const authInfo = await page.evaluate(() => ({
  supported: !!window.SID.auth,
  description: window.SID.auth?.description
}));

// authInfo.description: "Supports token-based auth. Provide a SID token to authenticate..."
```

### Authenticate

```javascript
// Authenticate with a SID token (provided to the agent)
const authenticated = await page.evaluate(async (token) => 
  await window.SID.auth.authenticate(token),
  'sk-your-api-key'
);

if (authenticated) {
  // Session established - agent is now authenticated
  // Subsequent interactions use this auth context
}
```

---

## Part 11: MCP Server Integration

SID is designed to work with Model Context Protocol (MCP) servers that provide browser access. A future MCP server could expose SID operations as tools:

```typescript
// Conceptual MCP tool definitions
tools: [
  {
    name: "sid_discover",
    description: "Discover SID elements on current page",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "sid_interact",
    description: "Interact with a SID element",
    inputSchema: {
      type: "object",
      properties: {
        elementId: { type: "string" },
        action: { type: "string" },
        value: { type: "string" }
      }
    }
  }
]
```

---

## Part 12: Best Practices

### Discovery

1. Always check `isSupported()` first
2. Use `getElements()` for overview, `getElement(id)` for details
3. Read `descriptionLong` before complex interactions
4. Check element `state` before interacting

### Interaction

1. Verify element is visible and enabled before interacting
2. Check `disabled` property and inform user of `disabledDescription` if disabled
3. Use appropriate action type for each element
4. Handle all tracking types appropriately
5. Always check `result.success` before proceeding

### Operation Tracking

1. Set reasonable timeouts (10-30 seconds typical)
2. Handle timeout gracefully - operation may still complete
3. Check `effects` for state changes after completion

### Human Input

1. Never guess or auto-fill sensitive data
2. Present clear UI based on JSON Schema
3. Respect `x-sid-sensitive` field marking
4. Validate input before submission

---

## Quick Reference

### Check Support
```javascript
window.SID?.isSupported() === true
```

### Get All Elements
```javascript
window.SID.getElements()
```

### Get Element Details
```javascript
window.SID.getElement('element-id')
```

### Check Disabled State
```javascript
const el = window.SID.getElement('element-id');
if (el.disabled) console.log(el.disabledDescription);
```

### Interact and Wait for Completion
```javascript
// Click and wait
const result = await window.SID.interact('element-id', { type: 'click' }, { timeout: 10000 });

// Fill input
await window.SID.interact('input-id', { type: 'fill', value: 'text' });

// Select option
await window.SID.interact('select-id', { type: 'select', value: 'option' });

// Check result
if (result.status === 'completed') {
  console.log('Success:', result.message);
} else if (result.status === 'error') {
  console.error('Failed:', result.error);
} else if (result.status === 'timeout') {
  console.log('Timed out');
}
```

### Authenticate
```javascript
await window.SID.auth.authenticate('token')
```

---

## Reference

Full specification: https://sid-standard.github.io
