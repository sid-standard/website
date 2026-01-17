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
const result = await page.evaluate(async (id, action) => {
  return await window.SID.interact(id, action);
}, 'btn-save', { type: 'click' });

// result: { success: true, operation: { id: "op-123", tracking: { type: "poll" } } }
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
  error?: string;          // Error if interaction failed
  message?: string;        // Description of what happened
  operation?: {
    id: string;
    tracking: OperationTracking;
  };
}
```

---

## Part 4: Operation Tracking

### Tracking Types

| Type | When Used | How to Handle |
|------|-----------|---------------|
| `poll` | Async operations (API calls, form submissions) | Use `pollOperation()` |
| `navigation` | Full page navigation | Wait for page load |
| `external` | OAuth, payment gateways | Read description for guidance |
| `none` | Instant actions (hover, focus) | No tracking needed |

### Polling for Completion

```javascript
// Using pollOperation (recommended)
const operation = await page.evaluate(async (opId) => {
  return await window.SID.pollOperation(opId, 10000, 500);
  // Polls every 500ms, times out after 10s
}, result.operation.id);

if (operation.status === 'success') {
  console.log('Operation completed:', operation.message);
  // Check effects
  if (operation.effects?.elementsAdded) {
    console.log('New elements available:', operation.effects.elementsAdded);
  }
} else if (operation.status === 'error') {
  console.error('Operation failed:', operation.message);
}
```

### Manual Polling

```javascript
// If you need more control
const operation = await page.evaluate(async (opId) => {
  const startTime = Date.now();
  while (Date.now() - startTime < 10000) {
    const op = window.SID.getOperation(opId);
    if (op.status !== 'pending') return op;
    await new Promise(r => setTimeout(r, 500));
  }
  return window.SID.getOperation(opId);
}, result.operation.id);
```

### Handling Navigation

```javascript
const result = await page.evaluate(async () => {
  return await window.SID.interact('link-dashboard', { type: 'click' });
});

if (result.operation?.tracking.type === 'navigation') {
  // Don't poll - wait for page load instead
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

if (result.operation?.tracking.type === 'external') {
  // Read the description for guidance
  const description = result.operation.tracking.description;
  // "Redirects to Google OAuth. On success, returns to /auth/callback..."
  
  // Handle OAuth flow based on description
}
```

### Operation Interface

```typescript
interface Operation {
  id: string;
  elementId: string;
  actionType: string;
  status: "pending" | "success" | "error";
  message?: string;
  startedAt: number;
  completedAt?: number;
  effects?: {
    navigatedTo?: string;
    elementsAdded?: string[];
    elementsRemoved?: string[];
    changes?: string;
  };
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
  
  // 5. Check if action is tracked
  const clickAction = saveBtn.actions.find(a => a.type === 'click');
  
  // 6. Trigger interaction
  const result = await page.evaluate(async () => 
    await window.SID.interact('btn-save', { type: 'click' })
  );
  
  if (!result.success) {
    return { error: result.error };
  }
  
  // 7. Handle based on tracking type
  switch (result.operation?.tracking.type) {
    case 'poll':
      const op = await page.evaluate(async (opId) => 
        await window.SID.pollOperation(opId, 15000), 
        result.operation.id
      );
      return { status: op.status, message: op.message };
      
    case 'navigation':
      await page.waitForNavigation();
      return { status: 'navigated' };
      
    case 'external':
      return { 
        status: 'external', 
        description: result.operation.tracking.description 
      };
      
    case 'none':
    default:
      return { status: 'completed' };
  }
}
```

---

## Part 7: Form Filling Example

```javascript
async function fillForm(page, formData) {
  // Get all form elements
  const elements = await page.evaluate(() => window.SID.getElements());
  
  // Fill each field
  for (const [fieldId, value] of Object.entries(formData)) {
    const element = elements.find(e => e.id === fieldId);
    if (!element) continue;
    
    const action = element.actions[0];
    
    await page.evaluate(async (id, actionType, val) => {
      await window.SID.interact(id, { type: actionType, value: val });
    }, fieldId, action.type, value);
  }
  
  // Submit form
  const result = await page.evaluate(async () => 
    await window.SID.interact('btn-submit', { type: 'click' })
  );
  
  // Wait for completion
  if (result.operation?.tracking.type === 'poll') {
    return await page.evaluate(async (opId) => 
      await window.SID.pollOperation(opId, 10000),
      result.operation.id
    );
  }
  
  return result;
}

// Usage
await fillForm(page, {
  'input-email': 'user@example.com',
  'input-name': 'John Doe',
  'select-plan': 'pro'
});
```

---

## Part 8: Error Handling

### Interaction Errors

```javascript
const result = await page.evaluate(async () => 
  await window.SID.interact('btn-disabled', { type: 'click' })
);

if (!result.success) {
  // Element might be disabled, not found, or not visible
  console.error('Interaction failed:', result.error);
}
```

### Operation Errors

```javascript
const operation = await page.evaluate(async (opId) => 
  await window.SID.pollOperation(opId, 10000),
  operationId
);

if (operation.status === 'error') {
  // Server-side error, validation failure, etc.
  console.error('Operation failed:', operation.message);
}
```

### Timeout Handling

```javascript
try {
  const operation = await page.evaluate(async (opId) => 
    await window.SID.pollOperation(opId, 5000), // 5 second timeout
    operationId
  );
} catch (e) {
  // Operation timed out - still pending
  // Decide: retry, report failure, or ask user
}
```

---

## Part 9: Authentication

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

## Part 10: MCP Server Integration (Future)

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
  },
  {
    name: "sid_poll_operation",
    description: "Wait for an operation to complete",
    inputSchema: {
      type: "object",
      properties: {
        operationId: { type: "string" },
        timeoutMs: { type: "number" }
      }
    }
  }
]
```

---

## Part 11: Best Practices

### Discovery

1. Always check `isSupported()` first
2. Use `getElements()` for overview, `getElement(id)` for details
3. Read `descriptionLong` before complex interactions
4. Check element `state` before interacting

### Interaction

1. Verify element is visible and enabled before interacting
2. Use appropriate action type for each element
3. Handle all tracking types appropriately
4. Always check `result.success` before proceeding

### Operation Tracking

1. Use `pollOperation()` for async operations
2. Set reasonable timeouts (10-30 seconds typical)
3. Handle timeout gracefully - operation may still complete
4. Check `effects` for state changes after completion

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

### Interact
```javascript
await window.SID.interact('element-id', { type: 'click' })
await window.SID.interact('input-id', { type: 'fill', value: 'text' })
await window.SID.interact('select-id', { type: 'select', value: 'option' })
```

### Poll Operation
```javascript
await window.SID.pollOperation('operation-id', 10000, 500)
```

### Authenticate
```javascript
await window.SID.auth.authenticate('token')
```

---

## Reference

Full specification: https://sid-standard.org
