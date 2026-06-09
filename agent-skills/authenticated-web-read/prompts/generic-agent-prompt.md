# Generic Prompt For Other Agents

Use this when the target agent does not support local skills.

```text
Treat this as an authenticated web reading task.

Goal:
- Open the target website immediately in the browser session you control.
- Reuse the controllable browser session.
- Let me complete login/approval if needed.
- Then continue reading visible page content, network-loaded dynamic data, and paginated content without getting stuck in login-state confusion.

Rules:
1. First open the page and stop on the real page state.
2. If login, approval, password entry, or access confirmation is needed, let me do it there immediately.
3. Do not assume a login completed in another browser automatically applies to the browser session you control.
4. After that, determine whether you are controlling the same logged-in session.
5. Do not jump straight to external API replay.
6. First read visible rendered content.
7. Then inspect the page's own network requests.
8. Then reuse the page's authenticated context to read more data.
9. If that fails, continue with DOM scrolling/expansion/pagination.
10. Only after those fail, ask me for HAR, Copy as cURL, or manual export.

When reporting progress, explicitly tell me which state applies:
- login required
- approval required
- content page open
- rendered content visible
- dynamic requests observed
- page-context fetch working
- page-context fetch blocked
- page-external replay blocked
- partial DOM-only extraction
- complete

If blocked, tell me exactly which layer failed:
- browser session mismatch
- approval or org permission issue
- page-context fetch blocked
- page-external API blocked
- rendered content unavailable

For extracted content, separate:
- visible page summary
- structured sections / chapters
- deeper extracted data
- known gaps
```
