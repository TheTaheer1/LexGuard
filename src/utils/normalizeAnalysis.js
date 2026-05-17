export const normalizeAnalysis = (raw) => {
  if (!raw) return null;

  // Basic structure guarantee
  const normalized = {
    document_type: raw.document_type || "Unknown Document Type",
    jurisdiction_status: raw.jurisdiction_status || "Jurisdiction not specified",
    overall_risk_score: typeof raw.overall_risk_score === 'number' ? Math.max(0, Math.min(100, raw.overall_risk_score)) : 0,
    overall_risk_level: raw.overall_risk_level || "Unknown",
    one_line_summary: raw.one_line_summary || "No summary provided.",
    user_should_sign: raw.user_should_sign || "Review carefully before signing",
    plain_english_summary: raw.plain_english_summary || "No detailed summary available.",
    final_recommendation: raw.final_recommendation || "Proceed with caution.",
    disclaimer: raw.disclaimer || "This is an AI-generated risk analysis for awareness and is not formal legal advice.",
    
    agent_summary: {
      clause_extractor: raw.agent_summary?.clause_extractor || "Not available",
      risk_detector: raw.agent_summary?.risk_detector || "Not available",
      user_rights_advocate: raw.agent_summary?.user_rights_advocate || "Not available",
      company_defender: raw.agent_summary?.company_defender || "Not available",
      legal_ambiguity_critic: raw.agent_summary?.legal_ambiguity_critic || "Not available",
      final_verdict: raw.agent_summary?.final_verdict || "Not available",
    },

    risk_distribution: {
      critical: raw.risk_distribution?.critical || 0,
      high: raw.risk_distribution?.high || 0,
      medium: raw.risk_distribution?.medium || 0,
      low: raw.risk_distribution?.low || 0,
    },

    top_risks: Array.isArray(raw.top_risks) ? raw.top_risks : [],
    hidden_liabilities: Array.isArray(raw.hidden_liabilities) ? raw.hidden_liabilities : [],
    ambiguous_terms: Array.isArray(raw.ambiguous_terms) ? raw.ambiguous_terms : [],
    missing_protections_for_user: Array.isArray(raw.missing_protections_for_user) ? raw.missing_protections_for_user : [],
    negotiation_points: Array.isArray(raw.negotiation_points) ? raw.negotiation_points : [],
  };

  // Derive risk level from score if missing or unknown
  if (normalized.overall_risk_level === "Unknown") {
    if (normalized.overall_risk_score <= 20) normalized.overall_risk_level = "Low";
    else if (normalized.overall_risk_score <= 50) normalized.overall_risk_level = "Medium";
    else if (normalized.overall_risk_score <= 75) normalized.overall_risk_level = "High";
    else normalized.overall_risk_level = "Critical";
  }

  // Derive risk distribution from top_risks if missing
  if (
    normalized.risk_distribution.critical === 0 &&
    normalized.risk_distribution.high === 0 &&
    normalized.risk_distribution.medium === 0 &&
    normalized.risk_distribution.low === 0 &&
    normalized.top_risks.length > 0
  ) {
    normalized.top_risks.forEach(risk => {
      const level = risk.risk_level?.toLowerCase();
      if (level === 'critical') normalized.risk_distribution.critical++;
      else if (level === 'high') normalized.risk_distribution.high++;
      else if (level === 'medium') normalized.risk_distribution.medium++;
      else if (level === 'low') normalized.risk_distribution.low++;
    });
  }

  return normalized;
};
