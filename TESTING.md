# Testing LexGuard

## Functional Tests

### 1. Health Endpoint With Key
Ensure \`GEMINI_API_KEY\` is set in \`.env\`.
\`\`\`bash
curl http://localhost:8080/api/health
\`\`\`
**Expected:** \`"status": "ok", "hasGeminiKey": true\`

### 2. Health Endpoint Without Key
Remove \`GEMINI_API_KEY\` from \`.env\` and restart.
\`\`\`bash
curl http://localhost:8080/api/health
\`\`\`
**Expected:** \`"status": "ok", "hasGeminiKey": false\`

### 3. Analyze Sample Contract
1. Click **Try Sample Contract** on the frontend.
2. Click **Analyze Document**.
3. Watch the multi-agent loading screen.
4. Verify dynamic dashboard and reports populate.

### 4. Analyze Uploaded TXT / PDF
1. Upload a plain text file (\`.txt\`) or PDF (\`.pdf\`).
2. Ensure size is under 4MB.
3. Click **Analyze**.

### 5. Chat After Analysis
1. Once analysis is complete, go to the chat panel.
2. Click a chip (e.g., "Are there hidden fees?").
3. Verify Gemini answers contextually.

### 6. Export Report
1. After successful analysis, click **Export Risk Report**.
2. Verify \`.md\` file downloads correctly.

## Edge Case Tests
- **Empty input validation:** Trying to analyze without text/file prevents submission.
- **Short input validation:** Entering less than 80 characters alerts the user.
- **Large file:** Uploading > 4MB file rejects immediately on the frontend and backend.
- **Unsupported file type:** Uploading a \`.docx\` rejects immediately.
- **No Gemini key:** Attempting analysis without a key returns a clean JSON error \`Gemini API key is not configured\`.
- **Malformed Gemini Response:** The backend uses regex to extract JSON if Gemini wraps it in markdown blocks.
