// import { useState } from 'react';
// import { Calendar, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
// import { useDecisionLogs } from '../hooks/useDecisionLogs';

// export default function DecisionLogs() {
//   const { decisionLogs, loading } = useDecisionLogs(100);
//   const [expandedLog, setExpandedLog] = useState<string | null>(null);

//   const toggleExpanded = (logId: string) => {
//     setExpandedLog(expandedLog === logId ? null : logId);
//   };

//   if (loading) {
//     return (
//       <div className="p-12 text-center">
//         <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//         <p className="mt-4 text-slate-600">Loading decision logs...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-xl font-bold text-slate-900">Decision Logs</h2>
//           <p className="text-sm text-slate-600 mt-1">
//             Audit trail of all rule evaluations
//           </p>
//         </div>
//         <div className="text-sm text-slate-600">
//           Showing last {decisionLogs.length} decisions
//         </div>
//       </div>

//       {decisionLogs.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-slate-600">No decision logs yet.</p>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {decisionLogs.map((log) => (
//             <div
//               key={log.id}
//               className="border border-slate-200 rounded-lg overflow-hidden"
//             >
//               <div
//                 className="p-4 cursor-pointer hover:bg-slate-50 transition-colors"
//                 onClick={() => toggleExpanded(log.id)}
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start gap-3 flex-1">
//                     {log.matched ? (
//                       <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
//                     ) : (
//                       <XCircle className="w-5 h-5 text-slate-400 mt-0.5" />
//                     )}
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <span
//                           className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                             log.matched
//                               ? 'bg-green-100 text-green-700'
//                               : 'bg-slate-100 text-slate-600'
//                           }`}
//                         >
//                           {log.decision}
//                         </span>
//                         {log.matched && (
//                           <span className="text-sm font-medium text-slate-900">
//                             Rule Matched
//                           </span>
//                         )}
//                       </div>
//                       <div className="flex items-center gap-4 text-xs text-slate-500">
//                         <span className="flex items-center gap-1">
//                           <Calendar className="w-3 h-3" />
//                           {new Date(log.created_at).toLocaleString()}
//                         </span>
//                         {log.execution_time_ms && (
//                           <span className="flex items-center gap-1">
//                             <Clock className="w-3 h-3" />
//                             {log.execution_time_ms}ms
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   <button className="p-1 text-slate-400 hover:text-slate-600">
//                     {expandedLog === log.id ? (
//                       <ChevronUp className="w-5 h-5" />
//                     ) : (
//                       <ChevronDown className="w-5 h-5" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {expandedLog === log.id && (
//                 <div className="border-t border-slate-200 bg-slate-50 p-4 space-y-4">
//                   <div>
//                     <h4 className="text-sm font-semibold text-slate-900 mb-2">
//                       Input Data
//                     </h4>
//                     <pre className="bg-white p-3 rounded border border-slate-200 text-xs overflow-x-auto">
//                       {JSON.stringify(log.input_data, null, 2)}
//                     </pre>
//                   </div>

//                   {log.actions_taken && Array.isArray(log.actions_taken) && log.actions_taken.length > 0 && (
//                     <div>
//                       <h4 className="text-sm font-semibold text-slate-900 mb-2">
//                         Actions Taken
//                       </h4>
//                       <pre className="bg-white p-3 rounded border border-slate-200 text-xs overflow-x-auto">
//                         {JSON.stringify(log.actions_taken, null, 2)}
//                       </pre>
//                     </div>
//                   )}

//                   {log.metadata && Object.keys(log.metadata).length > 0 && (
//                     <div>
//                       <h4 className="text-sm font-semibold text-slate-900 mb-2">
//                         Metadata
//                       </h4>
//                       <pre className="bg-white p-3 rounded border border-slate-200 text-xs overflow-x-auto">
//                         {JSON.stringify(log.metadata, null, 2)}
//                       </pre>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




// import { useState } from 'react';
// import {
//   Calendar,
//   CheckCircle,
//   XCircle,
//   Clock,
//   ChevronDown,
//   ChevronUp,
//   Code,
//   Zap,
//   FileJson,
// } from 'lucide-react';
// import { useDecisionLogs } from '../hooks/useDecisionLogs';

// export default function DecisionLogs() {
//   const { decisionLogs, loading } = useDecisionLogs(100);
//   const [expandedLog, setExpandedLog] = useState<string | null>(null);

//   const toggleExpanded = (logId: string) => {
//     setExpandedLog(expandedLog === logId ? null : logId);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="text-center">
//           <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-500/20 mb-4">
//             <div className="w-10 h-10 border-4 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin"></div>
//           </div>
//           <p className="text-slate-400 font-medium">Loading decision logs...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Header */}
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-white mb-1">Decision Logs</h2>
//         <p className="text-slate-400">Audit trail of all rule evaluations and decisions</p>
//       </div>

//       {/* Stats */}
//       <div className="mb-6 flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-lg p-4">
//         <div className="flex items-center gap-2 text-slate-300">
//           <Calendar className="w-4 h-4 text-indigo-400" />
//           <span className="font-medium">Showing last {decisionLogs.length} decisions</span>
//         </div>
//       </div>

//       {/* Logs List */}
//       <div className="space-y-3">
//         {decisionLogs.length === 0 ? (
//           <div className="text-center py-16 bg-slate-800/50 rounded-lg border border-slate-700">
//             <FileJson className="w-12 h-12 text-slate-600 mx-auto mb-4" />
//             <p className="text-slate-400">No decision logs yet.</p>
//             <p className="text-sm text-slate-500 mt-2">Create rules and run decisions to see logs here</p>
//           </div>
//         ) : (
//           decisionLogs.map((log) => (
//             <div
//               key={log.id}
//               className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-indigo-500/50 rounded-lg overflow-hidden transition-all duration-200"
//             >
//               {/* Log Header */}
//               <button
//                 onClick={() => toggleExpanded(log.id)}
//                 className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors"
//               >
//                 {/* Left Side - Decision Status & Info */}
//                 <div className="flex items-center gap-4 flex-1 min-w-0">
//                   {log.matched ? (
//                     <div className="flex-shrink-0 p-2.5 rounded-lg bg-green-500/20">
//                       <CheckCircle className="w-5 h-5 text-green-400" />
//                     </div>
//                   ) : (
//                     <div className="flex-shrink-0 p-2.5 rounded-lg bg-red-500/20">
//                       <XCircle className="w-5 h-5 text-red-400" />
//                     </div>
//                   )}

//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-1">
//                       <p className="text-white font-semibold truncate">{log.decision}</p>
//                       {log.matched && (
//                         <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-green-500/20 border border-green-500/50 text-green-400 rounded-full text-xs font-medium flex-shrink-0">
//                           <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
//                           Matched
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex items-center gap-3 text-sm text-slate-400">
//                       <span className="flex items-center gap-1">
//                         <Calendar className="w-3.5 h-3.5" />
//                         {new Date(log.created_at).toLocaleString()}
//                       </span>
//                       {log.execution_time_ms && (
//                         <span className="flex items-center gap-1">
//                           <Clock className="w-3.5 h-3.5" />
//                           {log.execution_time_ms}ms
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Side - Expand Button */}
//                 <div className="flex-shrink-0 ml-4 text-indigo-400">
//                   {expandedLog === log.id ? (
//                     <ChevronUp className="w-5 h-5" />
//                   ) : (
//                     <ChevronDown className="w-5 h-5" />
//                   )}
//                 </div>
//               </button>

//               {/* Expanded Content */}
//               {expandedLog === log.id && (
//                 <div className="border-t border-slate-700 bg-slate-900/50 px-6 py-4 space-y-4">
//                   {/* Input Data */}
//                   <div>
//                     <div className="flex items-center gap-2 mb-3">
//                       <Code className="w-4 h-4 text-indigo-400" />
//                       <h4 className="text-sm font-semibold text-white">Input Data</h4>
//                     </div>
//                     <div className="bg-slate-950/80 border border-slate-700 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto max-h-64 overflow-y-auto">
//                       <pre>{JSON.stringify(log.input_data, null, 2)}</pre>
//                     </div>
//                   </div>

//                   {/* Actions Taken */}
//                   {log.actions_taken &&
//                     Array.isArray(log.actions_taken) &&
//                     log.actions_taken.length > 0 && (
//                       <div>
//                         <div className="flex items-center gap-2 mb-3">
//                           <Zap className="w-4 h-4 text-orange-400" />
//                           <h4 className="text-sm font-semibold text-white">Actions Taken</h4>
//                         </div>
//                         <div className="bg-slate-950/80 border border-slate-700 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto max-h-64 overflow-y-auto">
//                           <pre>{JSON.stringify(log.actions_taken, null, 2)}</pre>
//                         </div>
//                       </div>
//                     )}

//                   {/* Metadata */}
//                   {log.metadata && Object.keys(log.metadata).length > 0 && (
//                     <div>
//                       <div className="flex items-center gap-2 mb-3">
//                         <FileJson className="w-4 h-4 text-cyan-400" />
//                         <h4 className="text-sm font-semibold text-white">Metadata</h4>
//                       </div>
//                       <div className="bg-slate-950/80 border border-slate-700 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto max-h-64 overflow-y-auto">
//                         <pre>{JSON.stringify(log.metadata, null, 2)}</pre>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import {
//   Calendar,
//   CheckCircle,
//   XCircle,
//   Clock,
//   ChevronDown,
//   ChevronUp,
//   Code,
//   Zap,
//   FileJson,
// } from "lucide-react";
// import { useDecisionLogs } from "../hooks/useDecisionLogs";

// export default function DecisionLogs() {
//   const { decisionLogs, loading } = useDecisionLogs(100);
//   const [expandedLog, setExpandedLog] = useState<string | null>(null);

//   const toggleExpanded = (logId: string) => {
//     setExpandedLog(expandedLog === logId ? null : logId);
//   };

//   // 🔽 NEW: sort logs newest → oldest
//   const sortedLogs = [...decisionLogs].sort((a: any, b: any) => {
//     const aTime = a.created_at
//       ? new Date(a.created_at).getTime()
//       : (a.id as any) ?? 0;
//     const bTime = b.created_at
//       ? new Date(b.created_at).getTime()
//       : (b.id as any) ?? 0;
//     return bTime - aTime;
//   });

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="text-center">
//           <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-500/20 mb-4">
//             <div className="w-10 h-10 border-4 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin"></div>
//           </div>
//           <p className="text-slate-400 font-medium">
//             Loading decision logs...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Header */}
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-white mb-1">Decision Logs</h2>
//         <p className="text-slate-400">
//           Audit trail of all rule evaluations and decisions
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="mb-6 flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-lg p-4">
//         <div className="flex items-center gap-2 text-slate-300">
//           <Calendar className="w-4 h-4 text-indigo-400" />
//           <span className="font-medium">
//             Showing last {sortedLogs.length} decisions
//           </span>
//         </div>
//       </div>

//       {/* Logs List */}
//       <div className="space-y-3">
//         {sortedLogs.length === 0 ? (
//           <div className="text-center py-16 bg-slate-800/50 rounded-lg border border-slate-700">
//             <FileJson className="w-12 h-12 text-slate-600 mx-auto mb-4" />
//             <p className="text-slate-400">No decision logs yet.</p>
//             <p className="text-sm text-slate-500 mt-2">
//               Create rules and run decisions to see logs here
//             </p>
//           </div>
//         ) : (
//           sortedLogs.map((log: any) => (
//             <div
//               key={log.id}
//               className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-indigo-500/50 rounded-lg overflow-hidden transition-all duration-200"
//             >
//               {/* Log Header */}
//               <button
//                 onClick={() => toggleExpanded(log.id)}
//                 className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors"
//               >
//                 {/* Left Side - Decision Status & Info */}
//                 <div className="flex items-center gap-4 flex-1 min-w-0">
//                   {log.matched ? (
//                     <div className="flex-shrink-0 p-2.5 rounded-lg bg-green-500/20">
//                       <CheckCircle className="w-5 h-5 text-green-400" />
//                     </div>
//                   ) : (
//                     <div className="flex-shrink-0 p-2.5 rounded-lg bg-red-500/20">
//                       <XCircle className="w-5 h-5 text-red-400" />
//                     </div>
//                   )}

//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-1">
//                       <p className="text-white font-semibold truncate">
//                         {log.decision}
//                       </p>
//                       {log.matched && (
//                         <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-green-500/20 border border-green-500/50 text-green-400 rounded-full text-xs font-medium flex-shrink-0">
//                           <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
//                           Matched
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex items-center gap-3 text-sm text-slate-400">
//                       <span className="flex items-center gap-1">
//                         <Calendar className="w-3.5 h-3.5" />
//                         {new Date(log.created_at).toLocaleString()}
//                       </span>
//                       {log.execution_time_ms && (
//                         <span className="flex items-center gap-1">
//                           <Clock className="w-3.5 h-3.5" />
//                           {log.execution_time_ms}ms
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Side - Expand Button */}
//                 <div className="flex-shrink-0 ml-4 text-indigo-400">
//                   {expandedLog === log.id ? (
//                     <ChevronUp className="w-5 h-5" />
//                   ) : (
//                     <ChevronDown className="w-5 h-5" />
//                   )}
//                 </div>
//               </button>

//               {/* Expanded Content */}
//               {expandedLog === log.id && (
//                 <div className="border-t border-slate-700 bg-slate-900/50 px-6 py-4 space-y-4">
//                   {/* Input Data */}
//                   <div>
//                     <div className="flex items-center gap-2 mb-3">
//                       <Code className="w-4 h-4 text-indigo-400" />
//                       <h4 className="text-sm font-semibold text-white">
//                         Input Data
//                       </h4>
//                     </div>
//                     <div className="bg-slate-950/80 border border-slate-700 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto max-h-64 overflow-y-auto">
//                       <pre>{JSON.stringify(log.input_data, null, 2)}</pre>
//                     </div>
//                   </div>

//                   {/* Actions Taken */}
//                   {log.actions_taken &&
//                     Array.isArray(log.actions_taken) &&
//                     log.actions_taken.length > 0 && (
//                       <div>
//                         <div className="flex items-center gap-2 mb-3">
//                           <Zap className="w-4 h-4 text-orange-400" />
//                           <h4 className="text-sm font-semibold text-white">
//                             Actions Taken
//                           </h4>
//                         </div>
//                         <div className="bg-slate-950/80 border border-slate-700 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto max-h-64 overflow-y-auto">
//                           <pre>
//                             {JSON.stringify(log.actions_taken, null, 2)}
//                           </pre>
//                         </div>
//                       </div>
//                     )}

//                   {/* Metadata */}
//                   {log.metadata && Object.keys(log.metadata).length > 0 && (
//                     <div>
//                       <div className="flex items-center gap-2 mb-3">
//                         <FileJson className="w-4 h-4 text-cyan-400" />
//                         <h4 className="text-sm font-semibold text-white">
//                           Metadata
//                         </h4>
//                       </div>
//                       <div className="bg-slate-950/80 border border-slate-700 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto max-h-64 overflow-y-auto">
//                         <pre>{JSON.stringify(log.metadata, null, 2)}</pre>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Code,
  Zap,
  FileJson,
} from "lucide-react";
import { useDecisionLogs } from "../hooks/useDecisionLogs";


type DecisionLogsProps = {
  scope?: "all" | "me"; // 👈 NEW
};

export default function DecisionLogs({ scope = "all" }: DecisionLogsProps) {
  // 👇 choose endpoint based on scope; adapt inside hook implementation
  const endpoint =
    scope === "me" ? "/decision-logs/my" : "/decision-logs";

  const { decisionLogs, loading } = useDecisionLogs(100, endpoint);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const toggleExpanded = (logId: string) => {
    setExpandedLog(expandedLog === logId ? null : logId);
  };

  // sort logs newest → oldest
  const sortedLogs = [...decisionLogs].sort((a: any, b: any) => {
    const aTime = a.created_at
      ? new Date(a.created_at).getTime()
      : (a.id as any) ?? 0;
    const bTime = b.created_at
      ? new Date(b.created_at).getTime()
      : (b.id as any) ?? 0;
    return bTime - aTime;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-500/20 mb-4">
            <div className="w-10 h-10 border-4 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-400 font-medium">
            Loading decision logs...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-1">Decision Logs</h2>
        <p className="text-slate-400">
          Audit trail of all rule evaluations and decisions
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Scope: {scope === "me" ? "My decisions only" : "All decisions"}
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-lg p-4">
        <div className="flex items-center gap-2 text-slate-300">
          <Calendar className="w-4 h-4 text-indigo-400" />
          <span className="font-medium">
            Showing last {sortedLogs.length} decisions
          </span>
        </div>
      </div>

      {/* Logs List */}
      <div className="space-y-3">
        {sortedLogs.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/50 rounded-lg border border-slate-700">
            <FileJson className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No decision logs yet.</p>
            <p className="text-sm text-slate-500 mt-2">
              Create rules and run decisions to see logs here
            </p>
          </div>
        ) : (
          sortedLogs.map((log: any) => (
            <div
              key={log.id}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-indigo-500/50 rounded-lg overflow-hidden transition-all duration-200"
            >
              {/* Log Header */}
              <button
                onClick={() => toggleExpanded(log.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors"
              >
                {/* Left Side - Decision Status & Info */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {log.matched ? (
                    <div className="flex-shrink-0 p-2.5 rounded-lg bg-green-500/20">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 p-2.5 rounded-lg bg-red-500/20">
                      <XCircle className="w-5 h-5 text-red-400" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-semibold truncate">
                        {log.decision}
                      </p>
                      {log.matched && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-green-500/20 border border-green-500/50 text-green-400 rounded-full text-xs font-medium flex-shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          Matched
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(log.created_at).toLocaleString()}
                      </span>
                      {log.execution_time_ms && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {log.execution_time_ms}ms
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side - Expand Button */}
                <div className="flex-shrink-0 ml-4 text-indigo-400">
                  {expandedLog === log.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {expandedLog === log.id && (
                <div className="border-t border-slate-700 bg-slate-900/50 px-6 py-4 space-y-4">
                  {/* Input Data */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-sm font-semibold text-white">
                        Input Data
                      </h4>
                    </div>
                    <div className="bg-slate-950/80 border border-slate-700 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto max-h-64 overflow-y-auto">
                      <pre>{JSON.stringify(log.input_data, null, 2)}</pre>
                    </div>
                  </div>

                  {/* Actions Taken */}
                  {log.actions_taken &&
                    Array.isArray(log.actions_taken) &&
                    log.actions_taken.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Zap className="w-4 h-4 text-orange-400" />
                          <h4 className="text-sm font-semibold text-white">
                            Actions Taken
                          </h4>
                        </div>
                        <div className="bg-slate-950/80 border border-slate-700 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto max-h-64 overflow-y-auto">
                          <pre>
                            {JSON.stringify(log.actions_taken, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}

                  {/* Metadata */}
                  {log.metadata && Object.keys(log.metadata).length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FileJson className="w-4 h-4 text-cyan-400" />
                        <h4 className="text-sm font-semibold text-white">
                          Metadata
                        </h4>
                      </div>
                      <div className="bg-slate-950/80 border border-slate-700 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto max-h-64 overflow-y-auto">
                        <pre>{JSON.stringify(log.metadata, null, 2)}</pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

