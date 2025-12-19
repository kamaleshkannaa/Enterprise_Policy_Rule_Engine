// import { Activity, TrendingUp, Zap, CheckCircle } from 'lucide-react';
// import { useDecisionStats } from '../hooks/useDecisionLogs';
// import { useRules } from '../hooks/useRules';

// export default function Analytics() {
//   const { stats, loading: statsLoading } = useDecisionStats();
//   const { rules, loading: rulesLoading } = useRules();

//   const activeRules = rules.filter((r) => r.is_active).length;
//   const inactiveRules = rules.filter((r) => !r.is_active).length;
//   const matchRate =
//     stats.totalDecisions > 0
//       ? Math.round((stats.matchedDecisions / stats.totalDecisions) * 100)
//       : 0;

//   const statCards = [
//     {
//       label: 'Total Decisions',
//       value: stats.totalDecisions.toLocaleString(),
//       icon: Activity,
//       color: 'blue',
//     },
//     {
//       label: 'Matched Decisions',
//       value: stats.matchedDecisions.toLocaleString(),
//       icon: CheckCircle,
//       color: 'green',
//     },
//     {
//       label: 'Match Rate',
//       value: `${matchRate}%`,
//       icon: TrendingUp,
//       color: 'purple',
//     },
//     {
//       label: 'Avg Execution Time',
//       value: `${stats.avgExecutionTime}ms`,
//       icon: Zap,
//       color: 'orange',
//     },
//   ];

//   const ruleCards = [
//     {
//       label: 'Total Rules',
//       value: rules.length,
//       color: 'slate',
//     },
//     {
//       label: 'Active Rules',
//       value: activeRules,
//       color: 'green',
//     },
//     {
//       label: 'Inactive Rules',
//       value: inactiveRules,
//       color: 'slate',
//     },
//     {
//       label: 'Decisions Today',
//       value: stats.decisionsToday,
//       color: 'blue',
//     },
//   ];

//   if (statsLoading || rulesLoading) {
//     return (
//       <div className="p-12 text-center">
//         <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//         <p className="mt-4 text-slate-600">Loading analytics...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <h2 className="text-xl font-bold text-slate-900 mb-2">Analytics Dashboard</h2>
//         <p className="text-sm text-slate-600">
//           Monitor rule performance and decision metrics
//         </p>
//       </div>

//       <div className="space-y-6">
//         <div>
//           <h3 className="text-sm font-semibold text-slate-700 mb-3">
//             Decision Metrics
//           </h3>
//           <div className="grid grid-cols-4 gap-4">
//             {statCards.map((card) => {
//               const Icon = card.icon;
//               const colorClasses = {
//                 blue: 'bg-blue-100 text-blue-600',
//                 green: 'bg-green-100 text-green-600',
//                 purple: 'bg-purple-100 text-purple-600',
//                 orange: 'bg-orange-100 text-orange-600',
//               }[card.color];

//               return (
//                 <div
//                   key={card.label}
//                   className="bg-white border border-slate-200 rounded-lg p-4"
//                 >
//                   <div className="flex items-center justify-between mb-3">
//                     <div className={`p-2 rounded-lg ${colorClasses}`}>
//                       <Icon className="w-5 h-5" />
//                     </div>
//                   </div>
//                   <div className="text-2xl font-bold text-slate-900 mb-1">
//                     {card.value}
//                   </div>
//                   <div className="text-sm text-slate-600">{card.label}</div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div>
//           <h3 className="text-sm font-semibold text-slate-700 mb-3">
//             Rule Statistics
//           </h3>
//           <div className="grid grid-cols-4 gap-4">
//             {ruleCards.map((card) => {
//               const bgColor = {
//                 slate: 'bg-slate-50',
//                 green: 'bg-green-50',
//                 blue: 'bg-blue-50',
//               }[card.color];

//               const textColor = {
//                 slate: 'text-slate-900',
//                 green: 'text-green-900',
//                 blue: 'text-blue-900',
//               }[card.color];

//               return (
//                 <div
//                   key={card.label}
//                   className={`${bgColor} border border-slate-200 rounded-lg p-4`}
//                 >
//                   <div className={`text-3xl font-bold ${textColor} mb-2`}>
//                     {card.value}
//                   </div>
//                   <div className="text-sm text-slate-600">{card.label}</div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-6">
//           <div className="bg-white border border-slate-200 rounded-lg p-6">
//             <h3 className="text-sm font-semibold text-slate-900 mb-4">
//               Performance Summary
//             </h3>
//             <div className="space-y-4">
//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm text-slate-600">Match Rate</span>
//                   <span className="text-sm font-semibold text-slate-900">
//                     {matchRate}%
//                   </span>
//                 </div>
//                 <div className="w-full bg-slate-200 rounded-full h-2">
//                   <div
//                     className="bg-green-600 h-2 rounded-full transition-all"
//                     style={{ width: `${matchRate}%` }}
//                   ></div>
//                 </div>
//               </div>

//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm text-slate-600">Active Rules</span>
//                   <span className="text-sm font-semibold text-slate-900">
//                     {rules.length > 0
//                       ? Math.round((activeRules / rules.length) * 100)
//                       : 0}
//                     %
//                   </span>
//                 </div>
//                 <div className="w-full bg-slate-200 rounded-full h-2">
//                   <div
//                     className="bg-blue-600 h-2 rounded-full transition-all"
//                     style={{
//                       width: `${
//                         rules.length > 0
//                           ? Math.round((activeRules / rules.length) * 100)
//                           : 0
//                       }%`,
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white border border-slate-200 rounded-lg p-6">
//             <h3 className="text-sm font-semibold text-slate-900 mb-4">
//               System Health
//             </h3>
//             <div className="space-y-3">
//               <div className="flex items-center justify-between py-2 border-b border-slate-100">
//                 <span className="text-sm text-slate-600">Avg Response Time</span>
//                 <span className="text-sm font-semibold text-slate-900">
//                   {stats.avgExecutionTime}ms
//                 </span>
//               </div>
//               <div className="flex items-center justify-between py-2 border-b border-slate-100">
//                 <span className="text-sm text-slate-600">Total Rules</span>
//                 <span className="text-sm font-semibold text-slate-900">
//                   {rules.length}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between py-2">
//                 <span className="text-sm text-slate-600">System Status</span>
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   <span className="text-sm font-semibold text-green-600">
//                     Operational
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {rules.length > 0 && (
//           <div className="bg-white border border-slate-200 rounded-lg p-6">
//             <h3 className="text-sm font-semibold text-slate-900 mb-4">
//               Top Rules by Priority
//             </h3>
//             <div className="space-y-2">
//               {rules
//                 .sort((a, b) => b.priority - a.priority)
//                 .slice(0, 5)
//                 .map((rule) => (
//                   <div
//                     key={rule.id}
//                     className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div
//                         className={`w-2 h-2 rounded-full ${
//                           rule.is_active ? 'bg-green-500' : 'bg-slate-400'
//                         }`}
//                       ></div>
//                       <div>
//                         <div className="font-medium text-sm text-slate-900">
//                           {rule.name}
//                         </div>
//                         {rule.description && (
//                           <div className="text-xs text-slate-600">
//                             {rule.description}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     <div className="text-sm font-semibold text-slate-900">
//                       Priority: {rule.priority}
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import { Activity, TrendingUp, Zap, CheckCircle } from 'lucide-react';
import { useDecisionStats } from '../hooks/useDecisionLogs';
import { useRules } from '../hooks/useRules';

export default function Analytics() {
  const { stats, loading: statsLoading } = useDecisionStats();
  const { rules, loading: rulesLoading } = useRules();

  /* =========================
     SAFE FALLBACKS
  ========================== */
  const safeStats = {
    totalDecisions: stats?.totalDecisions ?? 0,
    matchedDecisions: stats?.matchedDecisions ?? 0,
    avgExecutionTime: stats?.avgExecutionTime ?? 0,
    decisionsToday: stats?.decisionsToday ?? 0,
  };

  /* =========================
     FIX ACTIVE FLAG
     backend uses `active`
  ========================== */
  const activeRules = rules.filter((r: any) => r.active).length;
  const inactiveRules = rules.filter((r: any) => !r.active).length;

  const matchRate =
    safeStats.totalDecisions > 0
      ? Math.round(
          (safeStats.matchedDecisions / safeStats.totalDecisions) * 100
        )
      : 0;

  const statCards = [
    {
      label: 'Total Decisions',
      value: safeStats.totalDecisions.toLocaleString(),
      icon: Activity,
      color: 'blue',
    },
    {
      label: 'Matched Decisions',
      value: safeStats.matchedDecisions.toLocaleString(),
      icon: CheckCircle,
      color: 'green',
    },
    {
      label: 'Match Rate',
      value: `${matchRate}%`,
      icon: TrendingUp,
      color: 'purple',
    },
    {
      label: 'Avg Execution Time',
      value: `${safeStats.avgExecutionTime}ms`,
      icon: Zap,
      color: 'orange',
    },
  ];

  const ruleCards = [
    {
      label: 'Total Rules',
      value: rules.length,
      color: 'slate',
    },
    {
      label: 'Active Rules',
      value: activeRules,
      color: 'green',
    },
    {
      label: 'Inactive Rules',
      value: inactiveRules,
      color: 'slate',
    },
    {
      label: 'Decisions Today',
      value: safeStats.decisionsToday,
      color: 'blue',
    },
  ];

  if (statsLoading || rulesLoading) {
    return (
      <div className="p-12 text-center">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-600">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Analytics Dashboard
        </h2>
        <p className="text-sm text-slate-600">
          Monitor rule performance and decision metrics
        </p>
      </div>

      <div className="space-y-6">
        {/* =========================
           Decision Metrics
        ========================== */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            Decision Metrics
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {statCards.map((card) => {
              const Icon = card.icon;
              const colorClasses = {
                blue: 'bg-blue-100 text-blue-600',
                green: 'bg-green-100 text-green-600',
                purple: 'bg-purple-100 text-purple-600',
                orange: 'bg-orange-100 text-orange-600',
              }[card.color];

              return (
                <div
                  key={card.label}
                  className="bg-white border border-slate-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${colorClasses}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    {card.value}
                  </div>
                  <div className="text-sm text-slate-600">{card.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================
           Rule Statistics
        ========================== */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            Rule Statistics
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {ruleCards.map((card) => {
              const bgColor = {
                slate: 'bg-slate-50',
                green: 'bg-green-50',
                blue: 'bg-blue-50',
              }[card.color];

              const textColor = {
                slate: 'text-slate-900',
                green: 'text-green-900',
                blue: 'text-blue-900',
              }[card.color];

              return (
                <div
                  key={card.label}
                  className={`${bgColor} border border-slate-200 rounded-lg p-4`}
                >
                  <div className={`text-3xl font-bold ${textColor} mb-2`}>
                    {card.value}
                  </div>
                  <div className="text-sm text-slate-600">{card.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================
           Performance + Health
        ========================== */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              Performance Summary
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Match Rate</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {matchRate}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${matchRate}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Active Rules</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {rules.length > 0
                      ? Math.round((activeRules / rules.length) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${
                        rules.length > 0
                          ? Math.round((activeRules / rules.length) * 100)
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              System Health
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">
                  Avg Response Time
                </span>
                <span className="text-sm font-semibold text-slate-900">
                  {safeStats.avgExecutionTime}ms
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Total Rules</span>
                <span className="text-sm font-semibold text-slate-900">
                  {rules.length}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-600">System Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-green-600">
                    Operational
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
           Top Rules
        ========================== */}
        {rules.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              Top Rules by Priority
            </h3>
            <div className="space-y-2">
              {rules
                .slice()
                .sort((a: any, b: any) => b.priority - a.priority)
                .slice(0, 5)
                .map((rule: any) => (
                  <div
                    key={rule.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          rule.active ? 'bg-green-500' : 'bg-slate-400'
                        }`}
                      ></div>
                      <div>
                        <div className="font-medium text-sm text-slate-900">
                          {rule.name}
                        </div>
                        {rule.description && (
                          <div className="text-xs text-slate-600">
                            {rule.description}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      Priority: {rule.priority}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
