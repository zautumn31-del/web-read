# Authenticated Web Reading Protocol

This is the platform-agnostic version of the workflow.

## Objective

Read useful content from a login-gated or approval-gated website after the user completes the required step, with minimum back-and-forth and without false negatives caused by session confusion.

## Protocol

### A. Session Check

Always answer these first:
- Which browser session is controllable?
- Did the user's login happen in that same session?
- If not, can the user repeat login inside the controllable session?

### B. Page Classification

Classify the current page as one of:
- login
- approval
- shell only
- content loaded

### C. Extraction Order

Always prefer this order:
1. Visible rendered content
2. Page-observed requests
3. Page-context deeper reads
4. DOM scrolling / pagination
5. External replay
6. User-supplied HAR / cURL / export

### D. Evidence Model

Report findings as:
- visible facts
- inferred facts
- blocked paths
- remaining gaps

### E. Stop Conditions

You may stop only if:
- the needed content is fully extracted
- or every higher-priority extraction path has failed and a precise user action is required

## Typical Sites

- Meeting recordings and transcripts
- Google Docs / Forms / Sheets
- Figma
- Jira / Confluence
- Internal dashboards
- CRM / admin systems

## What This Protocol Is Not

This protocol does not authorize bypassing access control.
It assumes the user has legitimate access and only needs the agent to continue correctly after login or approval.

