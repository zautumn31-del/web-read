# Failure Tree And Output Templates

## Failure Tree

Follow this tree in order.

### Step 1: Is the page open?

- No:
  - Status: `not_opened`
  - Action: open the target URL

- Yes:
  - Continue to Step 2

### Step 2: Is the controllable session the logged-in session?

- No:
  - Status: `browser_session_mismatch`
  - Action:
    - tell the user which browser/session you control
    - ask them to log in there
    - do not continue with API speculation

- Yes or likely yes:
  - Continue to Step 3

### Step 3: What page type is visible?

- Login page:
  - Status: `login_required`
  - Action: ask the user to log in in this same session

- Approval page:
  - Status: `approval_required`
  - Action: ask the user to complete approval in this same session

- Content page:
  - Status: `content_page_open`
  - Continue to Step 4

### Step 4: Is visible content already rendered?

- No:
  - Status: `content_page_open`
  - Action:
    - wait for render
    - inspect network requests
    - check whether content is delayed behind interactions

- Yes:
  - Status: `rendered_content_visible`
  - Action:
    - capture visible summary/structure first
    - continue to Step 5

### Step 5: Are useful dynamic requests visible?

- No:
  - Status: `rendered_content_visible`
  - Action:
    - continue with DOM extraction
    - try scrolling/expanding

- Yes:
  - Status: `dynamic_requests_observed`
  - Continue to Step 6

### Step 6: Does page-context deeper fetching work?

- Yes:
  - Status: `page_context_fetch_working`
  - Action:
    - paginate
    - collect structured data
    - finish extraction

- No:
  - Continue to Step 7

### Step 7: Is page-external replay blocked?

- Yes:
  - Status: `page_external_api_blocked`
  - Action:
    - do not misreport this as "no data"
    - continue with DOM-only extraction if rendered content exists

- No:
  - Action:
    - keep testing in-page or page-context paths

### Step 8: Is DOM-only extraction still useful?

- Yes:
  - Status: `dom_only_extraction`
  - Action:
    - scroll
    - expand
    - gather visible text progressively

- No:
  - Action:
    - ask the user for HAR / cURL / export with a precise blocker explanation

## Output Template: Access State

Use this template before analysis:

```text
Access state:
- Controllable session: <browser/session>
- User login session match: <yes/no/unclear>
- Current page type: <login/approval/content>
- Visible rendered content: <yes/no>
- Dynamic requests observed: <yes/no>
- Page-context deeper reads: <working/blocked/not tried>
- Page-external replay: <working/blocked/not tried>
- Current extraction mode: <visible-only/page-context/dom-only/complete>
```

## Output Template: Partial Success

Use this when the page is readable but full structured extraction is incomplete:

```text
What I can already read:
- <visible summary>
- <visible metadata>
- <visible sections or chapters>

What is still blocked:
- <specific deeper path>

What that means:
- The content exists and is visible in-page.
- The blocker is <session mismatch / deeper auth / app structure>, not "no data".

Best next step:
- <log in in controllable browser / continue DOM extraction / provide HAR / provide cURL>
```

## Output Template: Minimal User Action Request

Use this when you genuinely need user help:

```text
I’m blocked at one precise layer:
- Blocker: <browser_session_mismatch / approval_required / page_context_fetch_blocked / page_external_api_blocked>

What already works:
- <page opened / summary visible / chapters visible / some transcript visible>

Fastest fix:
1. <smallest user action>
2. <what I will do immediately after>
```

