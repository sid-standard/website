import { Metadata } from "next";
import { DocLayout } from "@/components/layout/doc-layout";
import { PageNavigation } from "@/components/layout/page-navigation";
import { CodeBlock } from "@/components/content/code-block";
import { TypeDefinition } from "@/components/content/type-definition";

/**
 * SEO metadata for the Authentication page.
 * Requirements: 12.1, 12.2, 12.3, 12.4
 */
export const metadata: Metadata = {
  title: "Authentication | SID - Semantic Interaction Description",
  description:
    "Learn how SID handles token-based authentication for AI agents. Covers the auth API methods, security considerations, and implementation guidance.",
  openGraph: {
    title: "Authentication | SID",
    description:
      "Token-based authentication for AI agents using SID's optional auth API.",
    type: "article",
  },
};

/**
 * Authentication page - explains token-based authentication for AI agents.
 *
 * This page covers:
 * - Why token-based authentication for agents
 * - The auth API interface (auth.description, auth.authenticate)
 * - Security considerations
 * - Implementation guidance
 *
 * Requirements: 12.1, 12.2, 12.3, 12.4
 */
export default function AuthenticationPage() {
  return (
    <DocLayout>
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Authentication
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          AI agents need a way to authenticate with applications that goes
          beyond human-focused interfaces like username/password forms or social
          logins. SID provides an optional token-based authentication mechanism
          that allows agents to authenticate programmatically while inheriting
          the permissions of the user who created the token.
        </p>
      </header>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Section: Why Token-Based Auth for Agents */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Why Token-Based Authentication for Agents
          </h2>

          <p className="text-base leading-7 mb-4">
            Traditional authentication methods present challenges for AI agents:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-2 text-left font-semibold">
                    Method
                  </th>
                  <th className="border border-border px-4 py-2 text-left font-semibold">
                    Challenge for Agents
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2">
                    Username/Password
                  </td>
                  <td className="border border-border px-4 py-2">
                    Requires users to share credentials with the agent—a
                    significant security risk. Forms may have CAPTCHAs or other
                    bot-detection measures.
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    OAuth/Social Login
                  </td>
                  <td className="border border-border px-4 py-2">
                    Redirects to external providers, requires human interaction
                    for consent screens, and may involve complex multi-step
                    flows.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-base leading-7 mb-4">
            Token-based authentication solves these problems:
          </p>

          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4">
            <li>
              <strong>No credential sharing:</strong> Users generate API tokens
              from their account settings—the agent never sees the user&apos;s
              password
            </li>
            <li>
              <strong>Programmatic access:</strong> Tokens can be passed
              directly to the SID API without navigating login forms
            </li>
            <li>
              <strong>Scoped permissions:</strong> Tokens inherit the
              user&apos;s permissions, and can potentially be scoped to specific
              actions
            </li>
            <li>
              <strong>Revocable:</strong> Users can revoke tokens at any time
              without changing their password
            </li>
            <li>
              <strong>Auditable:</strong> Applications can track which actions
              were performed via which token
            </li>
          </ul>
        </section>

        {/* Section: The Auth API */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            The Auth API
          </h2>

          <p className="text-base leading-7 mb-4">
            The <code className="bg-muted px-1 rounded">window.SID.auth</code>{" "}
            object is <strong>optional</strong>. Applications that don&apos;t
            require authentication simply don&apos;t expose it. When present, it
            provides two members:
          </p>

          <TypeDefinition
            name="SIDAuth"
            description="The optional authentication interface exposed on window.SID. Provides a method for token-based authentication and a plaintext description of how auth works."
            code={`interface SIDAuth {
  // Plaintext description of how authentication works
  description: string;
  
  // Authenticate with a token
  authenticate(token: string): Promise<boolean>;
}`}
          />

          {/* auth.description */}
          <div className="border rounded-lg p-4 mb-6 mt-6">
            <h3 className="font-mono font-semibold mb-2 mt-0">auth.description</h3>
            <p className="text-muted-foreground text-sm mb-4">
              A plaintext description explaining how authentication works for
              this application. This helps agents understand what tokens are
              needed, what permissions they grant, and any special
              considerations.
            </p>
            <CodeBlock
              language="javascript"
              code={`console.log(SID.auth.description);
// "Supports token-based auth for agents. Call SID.auth.authenticate(token) 
//  with a SID token. Tokens have the same permissions as the user who 
//  created them."`}
            />
          </div>

          {/* auth.authenticate */}
          <div className="border rounded-lg p-4 mb-6">
            <h3 className="font-mono font-semibold mb-2 mt-0">
              auth.authenticate(token: string): Promise&lt;boolean&gt;
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Authenticates the agent with the provided SID token. Returns{" "}
              <code className="bg-muted px-1 rounded">true</code> if
              authentication succeeded and a session was established,{" "}
              <code className="bg-muted px-1 rounded">false</code> otherwise.
              On success, the application creates a session for the agent.
            </p>
            <CodeBlock
              language="javascript"
              code={`// SID token provided to the agent (similar to an API token)
const token = 'sk_live_abc123...';

const success = await SID.auth.authenticate(token);

if (success) {
  console.log('Session established');
  // Agent can now perform actions as the authenticated user
  // The application has created a session internally
} else {
  console.log('Authentication failed - invalid or expired token');
}`}
            />
          </div>
        </section>

        {/* Section: Checking for Auth Support */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Checking for Auth Support
          </h2>

          <p className="text-base leading-7 mb-4">
            Since <code className="bg-muted px-1 rounded">auth</code> is
            optional, agents should check for its presence before attempting to
            authenticate:
          </p>

          <CodeBlock
            language="javascript"
            code={`// Check if the application supports SID authentication
if (SID.auth) {
  // Read how auth works for this application
  console.log('Auth info:', SID.auth.description);
  
  // Attempt authentication with the provided SID token
  const success = await SID.auth.authenticate(token);
  
  if (success) {
    // Session established - proceed with authenticated actions
    console.log('Session established');
  }
} else {
  // Application doesn't require authentication
  // or uses a different auth mechanism
  console.log('No SID auth available');
}`}
          />
        </section>

        {/* Section: Token Sources */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            SID Tokens
          </h2>

          <p className="text-base leading-7 mb-4">
            SID tokens are similar to API tokens—they allow agents to authenticate
            programmatically. The agent should be provided a SID token before
            attempting to interact with authenticated applications.
          </p>

          <p className="text-base leading-7 mb-4">
            How tokens are generated and managed is up to the application. Common
            patterns include API key pages in user settings, developer portals,
            or integration dashboards. The{" "}
            <code className="bg-muted px-1 rounded">auth.description</code>{" "}
            field provides guidance on what kind of token is expected:
          </p>

          <CodeBlock
            language="javascript"
            code={`// Example auth descriptions from different applications

// E-commerce platform
"Supports token-based auth for agents. Provide a SID token to authenticate. 
 Tokens can be scoped to read-only or full access."

// Project management tool
"Token-based authentication. Provide your SID token to establish a session. 
 Tokens inherit your workspace permissions."

// Analytics dashboard
"Authenticate with a SID token. Tokens require the Developer role."`}
          />
        </section>

        {/* Section: Token Permissions */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Token Permissions
          </h2>

          <p className="text-base leading-7 mb-4">
            A key principle of SID authentication:{" "}
            <strong>tokens inherit the permissions of the user who created them</strong>.
            This means:
          </p>

          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4 mb-6">
            <li>
              If a user can view but not edit a resource, their token can only
              view it
            </li>
            <li>
              Admin users&apos; tokens have admin-level access
            </li>
            <li>
              When a user&apos;s permissions change, their tokens&apos;
              permissions change too
            </li>
            <li>
              Revoking a user&apos;s access should invalidate their tokens
            </li>
          </ul>

          <p className="text-base leading-7 mb-4">
            Applications may also support scoped tokens with reduced permissions:
          </p>

          <CodeBlock
            language="javascript"
            code={`// Example: Application with scoped tokens
// auth.description might say:
"Tokens can be created with specific scopes:
 - read: View data only
 - write: Create and modify data
 - admin: Full access including user management
 
 Select scopes when creating a token in Settings > API Keys."`}
          />
        </section>

        {/* Section: Security Considerations */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Security Considerations
          </h2>

          {/* For Agent Developers */}
          <h3 className="text-xl font-medium mt-6 mb-4">For Agent Developers</h3>

          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4 mb-6">
            <li>
              <strong>Never log tokens:</strong> Treat tokens like passwords—don&apos;t
              write them to logs, console output, or error messages
            </li>
            <li>
              <strong>Secure storage:</strong> Store tokens in secure credential
              stores, not in plain text files or environment variables in shared
              environments
            </li>
            <li>
              <strong>Minimal scope:</strong> Request tokens with the minimum
              permissions needed for the task
            </li>
            <li>
              <strong>Token rotation:</strong> Support token rotation and handle
              expired tokens gracefully
            </li>
            <li>
              <strong>User consent:</strong> Always get explicit user consent
              before using their tokens
            </li>
          </ul>

          {/* For Application Developers */}
          <h3 className="text-xl font-medium mt-6 mb-4">
            For Application Developers
          </h3>

          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4 mb-6">
            <li>
              <strong>Token generation:</strong> Use cryptographically secure
              random generation for tokens
            </li>
            <li>
              <strong>Token storage:</strong> Store only hashed tokens in your
              database—never plaintext
            </li>
            <li>
              <strong>Rate limiting:</strong> Apply rate limits to prevent abuse
              via automated access
            </li>
            <li>
              <strong>Audit logging:</strong> Log all actions performed via
              tokens for security auditing
            </li>
            <li>
              <strong>Expiration:</strong> Consider automatic token expiration
              (e.g., 90 days) with renewal options
            </li>
            <li>
              <strong>Revocation:</strong> Provide easy token revocation and
              immediately invalidate revoked tokens
            </li>
            <li>
              <strong>Scope support:</strong> Consider supporting scoped tokens
              for principle of least privilege
            </li>
          </ul>
        </section>

        {/* Section: Implementation Guidance */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Implementation Guidance
          </h2>

          <p className="text-base leading-7 mb-4">
            Here&apos;s how to implement SID authentication in your application:
          </p>

          {/* Step 1: Define the auth object */}
          <h3 className="text-xl font-medium mt-6 mb-4">
            1. Define the Auth Object
          </h3>

          <CodeBlock
            language="javascript"
            code={`// In your SID initialization
window.SID = {
  version: "1.0.0",
  // ... other SID methods ...
  
  auth: {
    description: \`Supports token-based auth for agents. 
      Call SID.auth.authenticate(token) with a SID token.
      Tokens have the same permissions as the user who created them.\`,
    
    authenticate: async (token) => {
      // Validate token with your backend
      try {
        const response = await fetch('/api/auth/sid-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });
        
        if (response.ok) {
          const data = await response.json();
          // Create a session for the authenticated user
          // This could set cookies, update app state, etc.
          await createSession(data.userId, data.scopes);
          return true;
        }
        return false;
      } catch (error) {
        console.error('Auth error:', error);
        return false;
      }
    }
  }
};`}
          />

          {/* Step 2: Backend validation */}
          <h3 className="text-xl font-medium mt-6 mb-4">
            2. Backend Token Validation
          </h3>

          <CodeBlock
            language="javascript"
            code={`// Example: Express.js token validation endpoint
app.post('/api/auth/sid-token', async (req, res) => {
  const { token } = req.body;
  
  if (!token) {
    return res.status(400).json({ error: 'Token required' });
  }
  
  try {
    // Hash the token and look it up
    const hashedToken = hashToken(token);
    const tokenRecord = await db.tokens.findOne({ 
      hashedToken,
      revokedAt: null,
      expiresAt: { $gt: new Date() }
    });
    
    if (!tokenRecord) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    
    // Log the authentication for auditing
    await db.auditLog.insert({
      type: 'sid_token_auth',
      tokenId: tokenRecord.id,
      userId: tokenRecord.userId,
      timestamp: new Date(),
      ip: req.ip
    });
    
    // Create session (set cookies, JWT, etc.)
    const sessionToken = await createUserSession(tokenRecord.userId);
    res.cookie('session', sessionToken, { httpOnly: true, secure: true });
    
    // Return success with user info
    res.json({ 
      success: true,
      userId: tokenRecord.userId,
      scopes: tokenRecord.scopes
    });
    
  } catch (error) {
    console.error('Token validation error:', error);
    res.status(500).json({ error: 'Internal error' });
  }
});`}
          />

          {/* Step 3: Include auth in page context */}
          <h3 className="text-xl font-medium mt-6 mb-4">
            3. Include Auth Info in Page Context
          </h3>

          <p className="text-base leading-7 mb-4">
            Include authentication information in your SID page context so
            agents know auth is available:
          </p>

          <CodeBlock
            language="html"
            code={`<script type="application/sid+json">
{
  "version": "1.0.0",
  
  "app": "Acme Project Manager - A project management tool for teams.",
  
  "page": "Dashboard showing your projects and recent activity.",
  
  "auth": "Supports token-based auth for agents. Call SID.auth.authenticate(token) 
          with a SID token. Tokens have same permissions as the user who created them."
}
</script>`}
          />
        </section>

        {/* Section: Complete Agent Flow */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Complete Agent Authentication Flow
          </h2>

          <p className="text-base leading-7 mb-4">
            Here&apos;s a complete example of how an agent authenticates and
            performs actions:
          </p>

          <CodeBlock
            language="javascript"
            code={`// Agent authentication flow

async function authenticateAndPerformTask(token, taskDescription) {
  // 1. Check if SID is supported
  if (!window.SID?.isSupported()) {
    throw new Error('SID not supported on this page');
  }
  
  // 2. Check if auth is available
  if (!SID.auth) {
    console.log('No authentication required for this application');
    // Proceed without auth
    return performTask(taskDescription);
  }
  
  // 3. Read auth description to understand requirements
  console.log('Auth info:', SID.auth.description);
  
  // 4. Authenticate with provided SID token
  console.log('Authenticating...');
  const success = await SID.auth.authenticate(token);
  
  if (!success) {
    throw new Error('Authentication failed - check token validity');
  }
  
  console.log('Session established');
  
  // 5. Perform the task as authenticated user
  return performTask(taskDescription);
}

async function performTask(taskDescription) {
  // Get available elements
  const elements = SID.getElements();
  
  // Find relevant element based on task
  // ... agent logic to determine which element to interact with ...
  
  // Perform interaction
  const result = await SID.interact(elementId, { type: 'click' });
  
  // Handle result
  if (result.success) {
    console.log('Task completed:', result.message);
  } else {
    console.error('Task failed:', result.error);
  }
  
  return result;
}`}
          />
        </section>

        {/* Section: Error Handling */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Error Handling
          </h2>

          <p className="text-base leading-7 mb-4">
            Agents should handle common authentication errors gracefully:
          </p>

          <CodeBlock
            language="javascript"
            code={`async function safeAuthenticate(token) {
  try {
    // Check auth availability
    if (!SID.auth) {
      return { success: true, message: 'No auth required' };
    }
    
    // Attempt authentication
    const success = await SID.auth.authenticate(token);
    
    if (success) {
      return { success: true, message: 'Authenticated' };
    } else {
      return { 
        success: false, 
        error: 'invalid_token',
        message: 'Token is invalid or expired. Please generate a new token.'
      };
    }
    
  } catch (error) {
    // Network or server error
    return {
      success: false,
      error: 'auth_error',
      message: \`Authentication error: \${error.message}\`
    };
  }
}

// Usage
const authResult = await safeAuthenticate(userToken);

if (!authResult.success) {
  switch (authResult.error) {
    case 'invalid_token':
      // Prompt user to provide a new token
      console.log('Please provide a valid API token');
      break;
    case 'auth_error':
      // Retry or report error
      console.log('Authentication service unavailable');
      break;
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
            Now that you understand SID authentication, continue with:
          </p>

          <ul className="list-disc list-inside space-y-2 text-base leading-7 ml-4">
            <li>
              <strong>Agent Docs</strong> — Specification documents for AI agents
              implementing or consuming SID
            </li>
          </ul>

          <p className="text-base leading-7 mt-6">
            For a complete reference, download the specification documents from
            the Agent Docs page.
          </p>
        </section>
      </div>

      {/* Page Navigation */}
      <PageNavigation />
    </DocLayout>
  );
}
