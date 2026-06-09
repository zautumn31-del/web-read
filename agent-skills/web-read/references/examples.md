# Real-World Examples

These examples are not site-specific scripts. They show how to apply the protocol on common classes of authenticated web apps.

## Example 1: Tencent Meeting Recording / Transcript

### Typical user intent

- "Open this meeting recording"
- "Read the transcript"
- "Summarize the transcript"

### Common trap

The agent tries to replay transcript APIs too early and receives an auth failure, then incorrectly concludes there is no transcript.

### Correct sequence

1. Open the recording link in the controllable browser session.
2. Confirm whether the page is:
   - login page
   - approval page
   - recording page
3. If the recording page loads, read visible content first:
   - title
   - date/time
   - summary
   - chapters
   - visible transcript fragments
4. Inspect page requests related to:
   - `minutes/detail`
   - `get-full-summary`
   - `get-chapter`
   - `get-brief-record`
   - `timeline`
   - `record-detail`
5. Reuse the page's own authenticated context to fetch more data or paginated transcript chunks.
6. If page-external replay fails but the page still shows transcript sections, continue with DOM extraction and scrolling.

### Correct diagnosis examples

- `browser_session_mismatch`: User logged in inside Chrome, but agent only controls the in-app browser.
- `content_page_open + rendered_content_visible + page_external_api_blocked`: The page renders summary/chapters, but standalone replay still fails.
- `complete`: Visible content plus transcript pagination succeeded.

## Example 2: Google Docs / Forms

### Typical user intent

- "Open this doc and keep working after I log in"
- "Read this form structure"
- "Write into this document"

### Common trap

The agent sees the page title and assumes the doc is ready, but never verifies editability, rendered content, or whether the right frame is active.

### Correct sequence

1. Open the document in the controllable browser session.
2. Confirm whether the page is actually loaded and editable.
3. Read:
   - document title
   - tabs or top-level structure
   - visible headings or form sections
4. If the user wants edits, verify that:
   - the document is editable
   - the content area is active
   - the agent can interact without triggering a read-only flow
5. For Forms, treat the page as structured content:
   - title
   - section names
   - question groups
   - settings

### Correct diagnosis examples

- `content_page_open + rendered_content_visible`: Enough to read structure.
- `content_page_open + page_context_fetch_blocked`: Frames or app structure complicate direct deeper extraction.
- `complete`: Title, sections, and content are all readable/editable.

## Example 3: Figma

### Typical user intent

- "Open this Figma design"
- "Read the content of this node"
- "Check comments or note cards after I log in"

### Common trap

The agent reaches the file shell or home page, but not the intended node or not the actual visible canvas state.

### Correct sequence

1. Open the Figma URL in the controllable browser session.
2. Confirm whether the page is:
   - login wall
   - home/recents
   - target file
3. If the file is open, verify:
   - file title
   - whether the `node-id` is preserved
   - whether the visible canvas matches the requested target
4. Read what is available from:
   - file metadata
   - visible labels/panels
   - comments or notes, if exposed in UI
5. If structured API access is unavailable, keep the diagnosis narrow:
   - file page open
   - node targeting unstable
   - canvas rendered but layer labels not exposed

### Correct diagnosis examples

- `browser_session_mismatch`: User logged into Figma in Edge, agent controls another browser.
- `content_page_open + rendered_content_visible`: File is open.
- `content_page_open + rendered_content_visible + page_context_fetch_blocked`: File is visible but node/layer detail is not easily exposed in-page.

