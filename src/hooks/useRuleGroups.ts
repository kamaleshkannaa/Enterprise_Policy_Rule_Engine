// import { useState, useEffect } from 'react';
// import { supabase, RuleGroup } from '../lib/supabase';

// export function useRuleGroups() {
//   const [ruleGroups, setRuleGroups] = useState<RuleGroup[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchRuleGroups = async () => {
//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from('rule_groups')
//         .select('*')
//         .order('name');

//       if (error) throw error;
//       setRuleGroups(data || []);
//       setError(null);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRuleGroups();
//   }, []);

//   const createRuleGroup = async (groupData: Partial<RuleGroup>) => {
//     try {
//       const { data, error } = await supabase
//         .from('rule_groups')
//         .insert([groupData])
//         .select()
//         .single();

//       if (error) throw error;
//       await fetchRuleGroups();
//       return data;
//     } catch (err: any) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   const updateRuleGroup = async (id: string, updates: Partial<RuleGroup>) => {
//     try {
//       const { error } = await supabase
//         .from('rule_groups')
//         .update(updates)
//         .eq('id', id);

//       if (error) throw error;
//       await fetchRuleGroups();
//     } catch (err: any) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   const deleteRuleGroup = async (id: string) => {
//     try {
//       const { error } = await supabase
//         .from('rule_groups')
//         .delete()
//         .eq('id', id);

//       if (error) throw error;
//       await fetchRuleGroups();
//     } catch (err: any) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   return {
//     ruleGroups,
//     loading,
//     error,
//     fetchRuleGroups,
//     createRuleGroup,
//     updateRuleGroup,
//     deleteRuleGroup,
//   };
// }


// // import { useEffect, useState } from "react";
// // import { get } from "../lib/apiClient";

// // /**
// //  * Fetch rule groups
// //  */
// // export function useRuleGroups() {
// //   const [groups, setGroups] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     get<any[]>("/rule-groups")
// //       .then(setGroups)
// //       .catch(console.error)
// //       .finally(() => setLoading(false));
// //   }, []);

// //   return { groups, loading };
// // }

import { useEffect, useState } from "react";
import { get, post, put, del } from "../lib/apiClient";

export type RuleGroup = {
  id: number;
  name: string;
  description?: string;
};

export function useRuleGroups() {
  const [ruleGroups, setRuleGroups] = useState<RuleGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRuleGroups = async () => {
    try {
      setLoading(true);
      const data = await get<RuleGroup[]>("/rule-groups");
      setRuleGroups(data);
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
    await post("/rule-groups", group);
    await fetchRuleGroups();
  };

  const updateRuleGroup = async (id: number, updates: Partial<RuleGroup>) => {
    await put(`/rule-groups/${id}`, updates);
    await fetchRuleGroups();
  };

  const deleteRuleGroup = async (id: number) => {
    await del(`/rule-groups/${id}`);
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
