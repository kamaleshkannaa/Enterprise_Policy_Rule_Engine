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



import { useEffect, useState } from "react";
import { get, post, put, del } from '../lib/apiClient';

/**
 * ✅ FIXED: Fetch all rules with updateRule and refetch support
 * Now sends correct field names for backend: "active" instead of "is_active"
 */
export function useRules() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ LOAD RULES ON MOUNT
  const loadRules = async () => {
    try {
      setLoading(true);
      const data = await get('/rules');
      setRules(data);
    } catch (err) {
      console.error('Error loading rules:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRules();
  }, []);

  // ✅ UPDATE RULE - Send "active" field name that backend expects
  const updateRule = async (id: string | number, updates: any) => {
    try {
      // ✅ Convert "is_active" to "active" for backend
      const backendUpdates = { ...updates };
      if ('is_active' in backendUpdates) {
        backendUpdates.active = backendUpdates.is_active;
        delete backendUpdates.is_active;
      }

      const response = await put(`/rules/${id}`, backendUpdates);
      return response;
    } catch (err) {
      console.error('Error updating rule:', err);
      throw err;
    }
  };

  // ✅ DELETE RULE
  const deleteRule = async (id: number) => {
    try {
      await del(`/rules/${id}`);
      setRules(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error('Error deleting rule:', err);
      throw err;
    }
  };

  // ✅ REFETCH FUNCTION (THIS IS THE CRITICAL FIX!)
  const refetch = async () => {
    try {
      const data = await get('/rules');
      setRules(data);
    } catch (err) {
      console.error('Error refetching rules:', err);
    }
  };

  return { 
    rules, 
    loading, 
    deleteRule, 
    updateRule,    
    refetch        
  };
}

/**
 * Fetch rule details (rule + conditions + actions)
 */
export function useRuleDetails(ruleId: string | null) {
  const [rule, setRule] = useState(null);
  const [conditions, setConditions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ruleId) return;

    setLoading(true);
    get(`/rules/${ruleId}`)
      .then(ruleData => {
        setRule(ruleData);
        setConditions(ruleData.conditions || []);
      })
      .catch(err => console.error('Error loading rule details:', err))
      .finally(() => setLoading(false));
  }, [ruleId]);

  return { rule, conditions, loading };
}
