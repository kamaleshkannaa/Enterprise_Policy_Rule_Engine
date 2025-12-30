// src/hooks/useRuleDetails.ts
import { useEffect, useState } from "react";
import { get } from "../lib/apiClient";

/**
 * =========================
 * SINGLE RULE DETAILS
 * =========================
 * Uses:
 *   GET /api/rules/{id}
 * Backend response should include a `conditions` array.
 */
export function useRuleDetails(ruleId: number | null) {
  const [rule, setRule] = useState<any | null>(null);
  const [conditions, setConditions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ruleId) return;

    setLoading(true);
    get(`/api/rules/${ruleId}`)
      .then((ruleData) => {
        setRule(ruleData);
        // backend: conditions[]
        setConditions(ruleData.conditions ?? []);
      })
      .catch((err) =>
        console.error("Error loading rule details:", err)
      )
      .finally(() => setLoading(false));
  }, [ruleId]);

  return { rule, conditions, loading, setConditions };
}
