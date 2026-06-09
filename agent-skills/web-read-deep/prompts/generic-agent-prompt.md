# Generic Prompt For Other Agents

Use this when the target agent does not support local skills.

```text
Treat this as an authenticated web reading task.

Goal:
- Open the target website.
- Reuse the controllable browser session.
- Let me complete login/approval if needed.
- Then continue reading visible page content, network-loaded dynamic data, and paginated content without getting stuck in login-state confusion.

Rules:
1. Do not assume a login completed in another browser automatically applies to the browser session you control.
2. First determine whether you are controlling the same logged-in session.
3. Do not jump straight to external API replay.
4. First read visible rendered content.
5. Then inspect the page's own network requests.
6. Then reuse the page's authenticated context to read more data.
7. If that fails, continue with DOM scrolling/expansion/pagination.
8. Only after those fail, ask me for HAR, Copy as cURL, or manual export.

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

