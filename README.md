# LexGuard — AI Rights & Contract Intelligence System

## Problem
People sign contracts, offer letters, ticket terms, quotations, rental agreements, refund policies, and online policies without understanding hidden risks.

## Solution
LexGuard uses Gemini-powered adversarial multi-agent analysis to detect risky clauses, hidden liabilities, ambiguous terms, and user-rights issues before a user agrees to a document.

## Approach and Logic
- User uploads PDF/TXT or pastes document.
- Backend extracts text using \`pdf-parse\` (no text is stored on disk).
- Gemini analyzes the text using six adversarial AI agent personas.
- The result is returned as structured JSON and dynamically normalized.
- UI displays a dashboard, clause risks, hidden liabilities, ambiguous terms, safer rewrites, and negotiation points.
- User can ask dynamic follow-up questions using Gemini chat.
- User can export the risk report in Markdown format.

## Six Agents
1. Clause Extractor Agent
2. Risk Detector Agent
3. User Rights Advocate Agent
4. Company Defender Agent
5. Legal Ambiguity Critic Agent
6. Final Verdict Agent

## Google Services Used
- **Gemini API**: Live multi-agent document analysis and dynamic chat context.
- **Google Cloud Run**: Serverless container deployment with auto-scaling.

## Google Services Future-Ready
- **Document AI**: For scanned physical document extraction (OCR).
- **Cloud Storage**: Secure document storage for user histories.
- **Firestore**: User report history.
- **BigQuery**: Anonymized clause-risk analytics.

## Assumptions
- The app provides risk awareness, not legal advice.
- The document text is in English or readable by Gemini.
- Gemini API key is configured server-side via environment variables.

## How to Run Locally

\`\`\`bash
npm install
cp .env.example .env
# Add your GEMINI_API_KEY inside the .env file
npm run build
npm start
\`\`\`

Open [http://localhost:8080](http://localhost:8080)

## Health Check
[http://localhost:8080/api/health](http://localhost:8080/api/health)

## Security
- API key is stored server-side only.
- \`.env\` is ignored.
- File uploads are memory-buffered and size-limited to 4MB.
- No database or authentication required.
- No secrets committed.

## Accessibility
- Semantic HTML and ARIA labels.
- Keyboard-friendly controls and visible focus states.
- High contrast, dark-mode accessible text.
- Responsive design for mobile and desktop.

## Disclaimer
LexGuard provides AI-generated risk awareness and is not a substitute for professional legal advice. Every analysis is generated dynamically from your document.
