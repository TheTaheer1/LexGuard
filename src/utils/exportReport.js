export const exportReportToMarkdown = (analysis) => {
  if (!analysis) return;

  const date = new Date().toISOString().split('T')[0];
  
  let markdown = `# LexGuard Risk Report

**Date:** ${date}
**Document Type:** ${analysis.document_type}
**Jurisdiction:** ${analysis.jurisdiction_status}

## Final Verdict
**Risk Score:** ${analysis.overall_risk_score}/100 (${analysis.overall_risk_level})
**Should You Sign?** ${analysis.user_should_sign}

**Summary:**
${analysis.plain_english_summary}

**Recommendation:**
${analysis.final_recommendation}

---

## Agent Summaries
- **Clause Extractor:** ${analysis.agent_summary.clause_extractor}
- **Risk Detector:** ${analysis.agent_summary.risk_detector}
- **User Rights Advocate:** ${analysis.agent_summary.user_rights_advocate}
- **Company Defender:** ${analysis.agent_summary.company_defender}
- **Legal Ambiguity Critic:** ${analysis.agent_summary.legal_ambiguity_critic}
- **Final Verdict:** ${analysis.agent_summary.final_verdict}

---

## Top Risks Detected
`;

  if (analysis.top_risks && analysis.top_risks.length > 0) {
    analysis.top_risks.forEach((risk, i) => {
      markdown += `### ${i + 1}. ${risk.risk_category} [${risk.risk_level}]
**Clause:** "${risk.exact_clause}"

**Why it's risky:** ${risk.why_it_is_risky}
**Real World Consequence:** ${risk.real_world_consequence}
**Company Argument:** ${risk.company_side_argument}

**Safer Rewrite:** 
> ${risk.safer_rewritten_clause}

**Questions to Ask:**
`;
      risk.questions_to_ask_before_signing?.forEach(q => {
        markdown += `- ${q}\n`;
      });
      markdown += '\n';
    });
  } else {
    markdown += "No major risks detected.\n\n";
  }

  markdown += `---

## Hidden Liabilities
`;
  if (analysis.hidden_liabilities && analysis.hidden_liabilities.length > 0) {
    analysis.hidden_liabilities.forEach(l => {
      markdown += `- **Clause:** "${l.clause}"
  **Liability:** ${l.liability_explanation}
  **Possible Cost:** ${l.possible_cost_or_damage}\n\n`;
    });
  } else {
    markdown += "No hidden liabilities detected.\n\n";
  }

  markdown += `---

## Ambiguous Terms
`;
  if (analysis.ambiguous_terms && analysis.ambiguous_terms.length > 0) {
    analysis.ambiguous_terms.forEach(t => {
      markdown += `- **Term:** "${t.term_or_phrase}"
  **Why:** ${t.why_ambiguous}
  **Clarification Needed:** ${t.clarification_needed}\n\n`;
    });
  } else {
    markdown += "No ambiguous terms detected.\n\n";
  }

  markdown += `---

## Negotiation Points
`;
  if (analysis.negotiation_points && analysis.negotiation_points.length > 0) {
    analysis.negotiation_points.forEach(p => {
      markdown += `- ${p}\n`;
    });
  } else {
    markdown += "No specific negotiation points suggested.\n\n";
  }

  markdown += `
---
*Disclaimer: ${analysis.disclaimer}*
`;

  // Create Blob and Download
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `LexGuard_Report_${date}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
