// import { useState, useEffect } from 'react';
// import { supabase, DecisionLog } from '../lib/supabase';

// export function useDecisionLogs(limit: number = 50) {
//   const [decisionLogs, setDecisionLogs] = useState<DecisionLog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchDecisionLogs = async () => {
//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from('decision_logs')
//         .select('*')
//         .order('created_at', { ascending: false })
//         .limit(limit);

//       if (error) throw error;
//       setDecisionLogs(data || []);
//       setError(null);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDecisionLogs();
//   }, [limit]);

//   return {
//     decisionLogs,
//     loading,
//     error,
//     fetchDecisionLogs,
//   };
// }

// export function useDecisionStats() {
//   const [stats, setStats] = useState({
//     totalDecisions: 0,
//     matchedDecisions: 0,
//     avgExecutionTime: 0,
//     decisionsToday: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   const fetchStats = async () => {
//     try {
//       setLoading(true);

//       const { data: allLogs } = await supabase
//         .from('decision_logs')
//         .select('matched, execution_time_ms, created_at');

//       if (allLogs) {
//         const matched = allLogs.filter((log) => log.matched).length;
//         const avgTime =
//           allLogs.reduce((sum, log) => sum + (log.execution_time_ms || 0), 0) /
//           (allLogs.length || 1);

//         const today = new Date();
//         today.setHours(0, 0, 0, 0);
//         const todayLogs = allLogs.filter(
//           (log) => new Date(log.created_at) >= today
//         );

//         setStats({
//           totalDecisions: allLogs.length,
//           matchedDecisions: matched,
//           avgExecutionTime: Math.round(avgTime),
//           decisionsToday: todayLogs.length,
//         });
//       }
//     } catch (err) {
//       console.error('Error fetching stats:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   return { stats, loading, fetchStats };
// }

// // import { useEffect, useState } from "react";
// // import { get } from "../lib/apiClient";

// // /**
// //  * Fetch decision logs
// //  */
// // export function useDecisionLogs() {
// //   const [logs, setLogs] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     get<any[]>("/logs")
// //       .then(setLogs)
// //       .catch(console.error)
// //       .finally(() => setLoading(false));
// //   }, []);

// //   return { logs, loading };
// // }


// import { useEffect, useState } from "react";
// import { get } from "../lib/apiClient";

// export type DecisionLog = {
//   id: number;
//   decision: string;
//   matched: boolean;
//   executionTimeMs: number;
//   createdAt: string;
// };

// export function useDecisionLogs(limit: number = 50) {
//   const [decisionLogs, setDecisionLogs] = useState<DecisionLog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchDecisionLogs = async () => {
//     try {
//       setLoading(true);
//       const data = await get<DecisionLog[]>(`/logs?limit=${limit}`);
//       setDecisionLogs(data);
//       setError(null);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDecisionLogs();
//   }, [limit]);

//   return { decisionLogs, loading, error, fetchDecisionLogs };
// }

// /* 🔹 Analytics hook used by Analytics.tsx */
// export function useDecisionStats() {
//   const [stats, setStats] = useState({
//     totalDecisions: 0,
//     matchedDecisions: 0,
//     avgExecutionTime: 0,
//     decisionsToday: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     get<DecisionLog[]>("/logs")
//       .then((logs) => {
//         const matched = logs.filter((l) => l.matched).length;
//         const avg =
//   logs.reduce((s, l) => s + (l.executionTime || 0), 0) /
//   (logs.length || 1);


//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         const todayCount = logs.filter(
//           (l) => new Date(l.createdAt) >= today
//         ).length;

//         setStats({
//           totalDecisions: logs.length,
//           matchedDecisions: matched,
//           avgExecutionTime: Math.round(avg),
//           decisionsToday: todayCount,
//         });
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return { stats, loading };
// }



// import { useEffect, useState } from "react";
// import { get } from "../lib/apiClient";

// export type DecisionLog = {
//   id: number;
//   decision: string;
//   matched: boolean;
//   executionTimeMs: number;
//   createdAt: string;
// };

// /** 🔹 Fetch decision logs (admin/global) */
// export function useDecisionLogs(limit: number = 50) {
//   const [decisionLogs, setDecisionLogs] = useState<DecisionLog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchDecisionLogs = async () => {
//     try {
//       setLoading(true);
//       // NEW: hit /decision-logs instead of /logs
//       const data = await get<DecisionLog[]>(`/decision-logs?limit=${limit}`);
//       setDecisionLogs(data);
//       setError(null);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDecisionLogs();
//   }, [limit]);

//   return { decisionLogs, loading, error, fetchDecisionLogs };
// }

// /** 🔹 Analytics hook used by Analytics.tsx */
// export function useDecisionStats() {
//   const [stats, setStats] = useState({
//     totalDecisions: 0,
//     matchedDecisions: 0,
//     avgExecutionTime: 0,
//     decisionsToday: 0,
//     matchRate: 0,
//     totalRules: 0,
//     activeRules: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // 1) Get aggregated numbers from /analytics
//     get<any>("/analytics")
//       .then((payload) => {
//         setStats((prev) => ({
//           ...prev,
//           totalDecisions: payload.totalDecisions ?? 0,
//           matchedDecisions: payload.matchedDecisions ?? 0,
//           matchRate: payload.matchRate ?? 0,
//           totalRules: payload.totalRules ?? 0,
//           activeRules: payload.activeRules ?? 0,
//           // keep avgExecutionTime / decisionsToday for step 2
//           avgExecutionTime: prev.avgExecutionTime,
//           decisionsToday: prev.decisionsToday,
//         }));
//       })
//       .then(() =>
//         // 2) Optionally refine avgExecutionTime / decisionsToday from raw logs
//         get<DecisionLog[]>("/decision-logs")
//       )
//       .then((logs) => {
//         const avg =
//           logs.reduce(
//             (s, l: any) =>
//               s + (l.executionTimeMs ?? l.executionTime ?? 0),
//             0
//           ) / (logs.length || 1);

//         const today = new Date();
//         today.setHours(0, 0, 0, 0);
//         const todayCount = logs.filter((l) => {
//           const ts = l.createdAt ?? (l as any).created_at;
//           return ts && new Date(ts) >= today;
//         }).length;

//         setStats((prev) => ({
//           ...prev,
//           avgExecutionTime: Math.round(avg),
//           decisionsToday: todayCount,
//         }));
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return { stats, loading };
// }

import { useEffect, useState } from "react";
import { get } from "../lib/apiClient";

export type DecisionLog = {
  id: number;
  decision: string;
  matched: boolean;
  executionTime: number; // ms
  createdAt: string;
};

/** 🔹 Decision Logs (Admin / Global) */
export function useDecisionLogs(limit: number = 50) {
  const [decisionLogs, setDecisionLogs] = useState<DecisionLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDecisionLogs = async () => {
    try {
      setLoading(true);

      // ✅ MATCHES BACKEND
      const data = await get(`/api/decision-logs?limit=${limit}`);

      setDecisionLogs(data ?? []);
      setError(null);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load decision logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDecisionLogs();
  }, [limit]);

  return { decisionLogs, loading, error, fetchDecisionLogs };
}

/** 🔹 Analytics & Insights */
export function useDecisionStats() {
  const [stats, setStats] = useState({
    totalDecisions: 0,
    matchedDecisions: 0,
    avgExecutionTime: 0,
    decisionsToday: 0,
    matchRate: 0,
    totalRules: 0,
    activeRules: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1️⃣ Aggregated analytics
    get("/api/analytics")
      .then((payload: any) => {
        setStats((prev) => ({
          ...prev,
          totalDecisions: payload.totalDecisions ?? 0,
          matchedDecisions: payload.matchedDecisions ?? 0,
          matchRate: payload.matchRate ?? 0,
          totalRules: payload.totalRules ?? 0,
          activeRules: payload.activeRules ?? 0,
        }));
      })
      // 2️⃣ Raw logs for charts
      .then(() => get("/api/decision-logs"))
      .then((logs: DecisionLog[]) => {
        const avg =
          logs.reduce((s, l) => s + (l.executionTime ?? 0), 0) /
          (logs.length || 1);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayCount = logs.filter(
          (l) => l.createdAt && new Date(l.createdAt) >= today
        ).length;

        setStats((prev) => ({
          ...prev,
          avgExecutionTime: Math.round(avg),
          decisionsToday: todayCount,
        }));
      })
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading };
}
