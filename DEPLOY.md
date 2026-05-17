# Deployment to Google Cloud Run

## Prerequisites
- Google Cloud project
- Google Cloud CLI installed (\`gcloud\`)
- Billing enabled
- Gemini API key available
- GitHub repository public (under 10 MB, single branch)

## 1. Login to Google Cloud
\`\`\`bash
gcloud auth login
\`\`\`

## 2. Set Project
\`\`\`bash
gcloud config set project sound-chimera-496606-n7
\`\`\`

## 3. Enable APIs
\`\`\`bash
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
\`\`\`

## 4. Deploy to Cloud Run
\`\`\`bash
gcloud run deploy lexguard \\
  --source . \\
  --region asia-south1 \\
  --allow-unauthenticated \\
  --min-instances 0 \\
  --max-instances 1 \\
  --set-env-vars GEMINI_API_KEY=YOUR_GEMINI_API_KEY,GEMINI_MODEL=gemini-2.5-flash
\`\`\`

## 5. Update Environment Variables (If needed)
\`\`\`bash
gcloud run services update lexguard \\
  --region asia-south1 \\
  --update-env-vars GEMINI_API_KEY=YOUR_GEMINI_API_KEY,GEMINI_MODEL=gemini-2.5-flash
\`\`\`

## 6. Read Logs
\`\`\`bash
gcloud run services logs read lexguard --region asia-south1 --limit 50
\`\`\`

## 7. Delete Service (After competition if needed)
\`\`\`bash
gcloud run services delete lexguard --region asia-south1
\`\`\`

## Cost Safety
- **min instances 0**: Scales to zero when inactive.
- **max instances 1**: Prevents runaway costs.
- Lightweight express backend, no database attached.
- Set a Google Cloud billing budget alert around $4.
