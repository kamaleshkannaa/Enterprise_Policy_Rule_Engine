// import { useState, useEffect } from 'react';
// import { supabase, Rule, RuleCondition, RuleAction } from '../lib/supabase';

// export function useRules() {
//   const [rules, setRules] = useState<Rule[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchRules = async () => {
//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from('rules')
//         .select('*')
//         .order('priority', { ascending: false });

//       if (error) throw error;
//       setRules(data || []);
//       setError(null);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRules();
//   }, []);

//   const createRule = async (ruleData: Partial<Rule>) => {
//     try {
//       const { data, error } = await supabase
//         .from('rules')
//         .insert([ruleData])
//         .select()
//         .single();

//       if (error) throw error;
//       await fetchRules();
//       return data;
//     } catch (err: any) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   const updateRule = async (id: string, updates: Partial<Rule>) => {
//     try {
//       const { error } = await supabase
//         .from('rules')
//         .update(updates)
//         .eq('id', id);

//       if (error) throw error;
//       await fetchRules();
//     } catch (err: any) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   const deleteRule = async (id: string) => {
//     try {
//       const { error } = await supabase.from('rules').delete().eq('id', id);

//       if (error) throw error;
//       await fetchRules();
//     } catch (err: any) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   return {
//     rules,
//     loading,
//     error,
//     fetchRules,
//     createRule,
//     updateRule,
//     deleteRule,
//   };
// }

// export function useRuleDetails(ruleId: string | null) {
//   const [rule, setRule] = useState<Rule | null>(null);
//   const [conditions, setConditions] = useState<RuleCondition[]>([]);
//   const [actions, setActions] = useState<RuleAction[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchRuleDetails = async () => {
//     if (!ruleId) {
//       setRule(null);
//       setConditions([]);
//       setActions([]);
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);

//       const [ruleRes, conditionsRes, actionsRes] = await Promise.all([
//         supabase.from('rules').select('*').eq('id', ruleId).single(),
//         supabase
//           .from('rule_conditions')
//           .select('*')
//           .eq('rule_id', ruleId)
//           .order('condition_order'),
//         supabase
//           .from('rule_actions')
//           .select('*')
//           .eq('rule_id', ruleId)
//           .order('action_order'),
//       ]);

//       if (ruleRes.error) throw ruleRes.error;

//       setRule(ruleRes.data);
//       setConditions(conditionsRes.data || []);
//       setActions(actionsRes.data || []);
//       setError(null);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRuleDetails();
//   }, [ruleId]);

//   const addCondition = async (condition: Omit<RuleCondition, 'id' | 'created_at'>) => {
//     try {
//       const { error } = await supabase
//         .from('rule_conditions')
//         .insert([condition]);

//       if (error) throw error;
//       await fetchRuleDetails();
//     } catch (err: any) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   const updateCondition = async (id: string, updates: Partial<RuleCondition>) => {
//     try {
//       const { error } = await supabase
//         .from('rule_conditions')
//         .update(updates)
//         .eq('id', id);

//       if (error) throw error;
//       await fetchRuleDetails();
//     } catch (err: any) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   const deleteCondition = async (id: string) => {
//     try {
//       const { error } = await supabase
//         .from('rule_conditions')
//         .delete()
//         .eq('id', id);

//       if (error) throw error;
//       await fetchRuleDetails();
//     } catch (err: any) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   const addAction = async (action: Omit<RuleAction, 'id' | 'created_at'>) => {
//     try {
//       const { error } = await supabase
//         .from('rule_actions')
//         .insert([action]);

//       if (error) throw error;
//       await fetchRuleDetails();
//     } catch (err: any) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   const updateAction = async (id: string, updates: Partial<RuleAction>) => {
//     try {
//       const { error } = await supabase
//         .from('rule_actions')
//         .update(updates)
//         .eq('id', id);

//       if (error) throw error;
//       await fetchRuleDetails();
//     } catch (err: any) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   const deleteAction = async (id: string) => {
//     try {
//       const { error } = await supabase
//         .from('rule_actions')
//         .delete()
//         .eq('id', id);

//       if (error) throw error;
//       await fetchRuleDetails();
//     } catch (err: any) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   return {
//     rule,
//     conditions,
//     actions,
//     loading,
//     error,
//     fetchRuleDetails,
//     addCondition,
//     updateCondition,
//     deleteCondition,
//     addAction,
//     updateAction,
//     deleteAction,
//   };
// }




// import { useEffect, useState } from "react";
// import { get, post, put, del } from '../lib/apiClient';

// /**
//  * Fetch all rules
//  */
// export function useRules() {
//   const [rules, setRules] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     get<any[]>('/rules')
//       .then(setRules)
//       .finally(() => setLoading(false));
//   }, []);

//   // ✅ DELETE RULE
//   const deleteRule = async (id: number) => {
//     await del(`/rules/${id}`);
//     setRules(prev => prev.filter(r => r.id !== id));
//   };

//   return { rules, loading, deleteRule };
// }
   


// /**
//  * Fetch rule details (rule + conditions + actions)
//  */
// export function useRuleDetails(ruleId: string | null) {
//   const [rule, setRule] = useState<any>(null);
//   const [conditions, setConditions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!ruleId) return;

//     setLoading(true);

//     get<any>(`/rules/${ruleId}`)
//       .then(ruleData => {
//         setRule(ruleData);
//         setConditions(ruleData.conditions || []);
//       })
//       .finally(() => setLoading(false));
//   }, [ruleId]);

//   return { rule, conditions, loading };
// }


// src/hooks/useRules.ts
// src/hooks/useRules.ts - SINGLE FILE, NO DUPLICATES
import { useEffect, useState } from "react";
import { get, post, put, del } from "../lib/apiClient";

export type RuleGroup = {
  id: number;
  name: string;
  description?: string;
};

/**
 * RULES LIST HOOK - ALL PATHS FIXED ✅
 * GET    /api/rules           
 * PUT    /api/rules/{id}      
 * DELETE /api/rules/{id}      
 */
export function useRules() {
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRules = async () => {
    try {
      setLoading(true);
      const data = await get("/api/rules");  // ✅ FIXED
      setRules(data ?? []);
    } catch (err) {
      console.error("Error loading rules:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRules();
  }, []);

  const updateRule = async (id: number, updates: any) => {
    const backendUpdates: any = { ...updates };
    
    if ("is_active" in backendUpdates) {
      backendUpdates.active = backendUpdates.is_active;
      delete backendUpdates.is_active;
    }
    if ("rule_group_id" in backendUpdates) {
      backendUpdates.groupId = backendUpdates.rule_group_id;
      delete backendUpdates.rule_group_id;
    }

    await put(`/api/rules/${id}`, backendUpdates);  // ✅ FIXED
    await loadRules();
  };

  const deleteRule = async (id: number) => {
    await del(`/api/rules/${id}`);  // ✅ FIXED
    setRules(prev => prev.filter(r => r.id !== id));
  };

  return {
    rules,
    loading,
    updateRule,
    deleteRule,
    refetch: loadRules,
  };
}

/**
 * RULE GROUPS HOOK - ALL PATHS FIXED ✅
 */
export function useRuleGroups() {
  const [ruleGroups, setRuleGroups] = useState<RuleGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRuleGroups = async () => {
    try {
      setLoading(true);
      const data = await get("/api/rule-groups");  // ✅ FIXED
      setRuleGroups(data ?? []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRuleGroups();
  }, []);

  const createRuleGroup = async (group: Partial<RuleGroup>) => {
    await post("/api/rule-groups", group);
    await fetchRuleGroups();
  };

  const updateRuleGroup = async (id: number, updates: Partial<RuleGroup>) => {
    await put(`/api/rule-groups/${id}`, updates);
    await fetchRuleGroups();
  };

  const deleteRuleGroup = async (id: number) => {
    await del(`/api/rule-groups/${id}`);
    await fetchRuleGroups();
  };

  return {
    ruleGroups,
    loading,
    error,
    fetchRuleGroups,
    createRuleGroup,
    updateRuleGroup,
    deleteRuleGroup,
  };
}

/**
 * SINGLE RULE DETAILS - ONLY ONE VERSION ✅
 * GET /api/rules/{id}
 */
export function useRuleDetails(ruleId: number | null) {
  const [rule, setRule] = useState<any | null>(null);
  const [conditions, setConditions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ruleId) return;

    setLoading(true);
    get(`/api/rules/${ruleId}`)  // ✅ FIXED - SINGLE SOURCE OF TRUTH
      .then((ruleData) => {
        setRule(ruleData);
        setConditions(ruleData.conditions ?? []);
      })
      .catch((err) => console.error("Error loading rule details:", err))
      .finally(() => setLoading(false));
  }, [ruleId]);

  return { rule, conditions, loading, setConditions };
}
