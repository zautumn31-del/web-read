---
name: web-read-deep
description: Open a link in the controllable browser first, let the user log in or approve access there if needed, then deeply read authenticated websites with structured diagnosis and fallback handling. Use this when normal website reading is blocked by browser-session mismatch, dynamic rendering, pagination, approval flow, or page-context/API extraction issues.
---

Use this skill for difficult authenticated websites when a lightweight page read is not enough.

## Use This Skill When

- A normal `web-read` flow is blocked.
- The user says login already succeeded but the agent still cannot read content.
- The page is a shell app with dynamic rendering, pagination, or hidden transcript/data sections.
- You need a precise diagnosis of where extraction is failing.
- You need to decide between page-context reads, DOM extraction, or asking the user for HAR/cURL/export.

## Deep Workflow

1. Open the target page in the controllable browser session immediately.
2. If login, approval, password entry, or access confirmation is needed, stop and let the user complete it there.
3. Identify the controllable browser session and determine whether the user's action happened in that same session.
4. Classify the current page:
   - login
   - approval
   - shell only
   - content page
5. Extract visible rendered content first.
6. Observe the page's own network requests.
7. Reuse the page context for deeper reads or pagination.
8. If page-context extraction fails, continue with DOM extraction.
9. Only after these fail, request HAR, cURL, or export.

## Non-Negotiable Rules

- Default to opening the page first, not analyzing from the URL alone.
- Never assume Chrome login applies to the browser session you control.
- Never report "no data" solely because page-external API replay fails.
- If summary, chapters, table rows, or transcript fragments are visible, treat that as partial success.
- Always separate:
  - browser-session mismatch
  - access approval issues
  - page-context extraction failure
  - page-external replay failure

## Required Output Structure

Before content analysis, provide:
- access state
- visible content state
- network observation state
- extraction mode
- exact blocker, if any

When partially blocked, provide:
- what is already readable
- what is still blocked
- smallest next user action

## Required Status Labels

- `browser_session_mismatch`
- `login_required`
- `approval_required`
- `content_page_open`
- `rendered_content_visible`
- `dynamic_requests_observed`
- `page_context_fetch_working`
- `page_context_fetch_blocked`
- `page_external_api_blocked`
- `dom_only_extraction`
- `complete`

## Read Next

- Protocol: [references/protocol.md](references/protocol.md)
- Failure tree and output templates: [references/decision-tree.md](references/decision-tree.md)
- Site examples: [references/examples.md](references/examples.md)
- Reusable prompt for other agents: [prompts/generic-agent-prompt.md](prompts/generic-agent-prompt.md)
