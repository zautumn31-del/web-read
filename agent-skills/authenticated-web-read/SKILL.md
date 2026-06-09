---
name: web-read
description: Open a link in the controllable browser first, let the user log in or approve access there if needed, then continue reading visible page content and dynamic data. Use when the user asks to inspect a page, read website content, open a link, continue after login, or extract data from a web app.
---

Use this skill for authenticated websites and dynamic web apps.

## Default Order

1. Open the target page in the controllable browser session immediately.
2. If login, approval, password entry, or access confirmation is needed, stop and let the user complete it there.
3. Confirm which browser session is controllable and whether the user action happened in that same session.
4. Read visible rendered content first.
5. Inspect the page's own network requests.
6. Reuse the page context for deeper reads or pagination.
7. If needed, fall back to DOM scrolling and expansion.
8. Only then ask for HAR, cURL, or export.

## Critical Rules

- Default to opening the page first, not analyzing from the URL alone.
- Do not assume a login in another browser applies to the controllable session.
- Do not start with page-external API replay.
- Do not treat API auth failure as proof that no page data exists.
- If the page renders useful content, extract that before escalating.

## Required Status Labels

Use explicit status labels in progress updates:
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

## When Blocked

State the exact layer that failed:
- session mismatch
- login or approval missing
- page-context reads blocked
- page-external replay blocked

Ask for the smallest next user action.

## Read Next

- Protocol: [references/protocol.md](references/protocol.md)
- Failure tree and output templates: [references/decision-tree.md](references/decision-tree.md)
- Site examples: [references/examples.md](references/examples.md)
- Reusable prompt for other agents: [prompts/generic-agent-prompt.md](prompts/generic-agent-prompt.md)
