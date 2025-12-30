import { useEffect, useState } from "react";
import { get } from "../lib/apiClient";

/**
 * =========================
 * SINGLE RULE DETAILS
 * =========================
 */
export function useRuleDetails(ruleId: number | null) {
  const [rule, setRule] = useState<any>(null);
  const [conditions, setConditions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ruleId) return;

    setLoading(true);

    get(`/rules/${ruleId}`) // -> /api/rules/{id}
      .then(ruleData => {
        setRule(ruleData);
        setConditions(ruleData.conditions ?? []);
      })
      .catch(err => console.error("Error loading rule details:", err))
      .finally(() => setLoading(false));
  }, [ruleId]);

  return { rule, conditions, loading };
}
