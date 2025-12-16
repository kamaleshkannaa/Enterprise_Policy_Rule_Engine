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

import { useEffect, useState } from "react";
import { get, post, put, del } from '../lib/apiClient';

/**
 * Fetch all rules
 */
export function useRules() {
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get<any[]>('/rules')
      .then(setRules)
      .finally(() => setLoading(false));
  }, []);

  // ✅ DELETE RULE
  const deleteRule = async (id: number) => {
    await del(`/rules/${id}`);
    setRules(prev => prev.filter(r => r.id !== id));
  };

  return { rules, loading, deleteRule };
}


/**
 * Fetch rule details (rule + conditions + actions)
 */
export function useRuleDetails(ruleId: string | null) {
  const [rule, setRule] = useState<any>(null);
  const [conditions, setConditions] = useState<any[]>([]);
  const [actions, setActions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ruleId) return;

    setLoading(true);

    Promise.all([
      get<any>(`/rules/${ruleId}`),
      get<any[]>(`/rules/${ruleId}/conditions`),
      get<any[]>(`/rules/${ruleId}/actions`),
    ])
      .then(([ruleData, conditionsData, actionsData]) => {
        setRule(ruleData);
        setConditions(conditionsData);
        setActions(actionsData);
      })
      .finally(() => setLoading(false));
  }, [ruleId]);

  return { rule, conditions, actions, loading };
}

