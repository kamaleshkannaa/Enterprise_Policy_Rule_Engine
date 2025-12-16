import { useState } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useDecisionLogs } from '../hooks/useDecisionLogs';

export default function DecisionLogs() {
  const { decisionLogs, loading } = useDecisionLogs(100);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const toggleExpanded = (logId: string) => {
    setExpandedLog(expandedLog === logId ? null : logId);
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-600">Loading decision logs...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Decision Logs</h2>
          <p className="text-sm text-slate-600 mt-1">
            Audit trail of all rule evaluations
          </p>
        </div>
        <div className="text-sm text-slate-600">
          Showing last {decisionLogs.length} decisions
        </div>
      </div>

      {decisionLogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600">No decision logs yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {decisionLogs.map((log) => (
            <div
              key={log.id}
              className="border border-slate-200 rounded-lg overflow-hidden"
            >
              <div
                className="p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => toggleExpanded(log.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {log.matched ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-slate-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            log.matched
                              ? 'bg-green-100 text-green-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {log.decision}
                        </span>
                        {log.matched && (
                          <span className="text-sm font-medium text-slate-900">
                            Rule Matched
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(log.created_at).toLocaleString()}
                        </span>
                        {log.execution_time_ms && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {log.execution_time_ms}ms
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className="p-1 text-slate-400 hover:text-slate-600">
                    {expandedLog === log.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {expandedLog === log.id && (
                <div className="border-t border-slate-200 bg-slate-50 p-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-2">
                      Input Data
                    </h4>
                    <pre className="bg-white p-3 rounded border border-slate-200 text-xs overflow-x-auto">
                      {JSON.stringify(log.input_data, null, 2)}
                    </pre>
                  </div>

                  {log.actions_taken && Array.isArray(log.actions_taken) && log.actions_taken.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-2">
                        Actions Taken
                      </h4>
                      <pre className="bg-white p-3 rounded border border-slate-200 text-xs overflow-x-auto">
                        {JSON.stringify(log.actions_taken, null, 2)}
                      </pre>
                    </div>
                  )}

                  {log.metadata && Object.keys(log.metadata).length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-2">
                        Metadata
                      </h4>
                      <pre className="bg-white p-3 rounded border border-slate-200 text-xs overflow-x-auto">
                        {JSON.stringify(log.metadata, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
