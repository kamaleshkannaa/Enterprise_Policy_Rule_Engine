import { useEffect, useState } from "react";
import { get } from "../lib/apiClient";

export function useRuleDetails(ruleId: string | null) {
  const [rule, setRule] = useState<any>(null);
  const [conditions, setConditions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ruleId) return;

    setLoading(true);

    get<any>(`/rules/${ruleId}`)
      .then(ruleData => {
        setRule(ruleData);
        setConditions(ruleData.conditions || []);
      })
      .finally(() => setLoading(false));
  }, [ruleId]);

  return { rule, conditions, loading };
}
