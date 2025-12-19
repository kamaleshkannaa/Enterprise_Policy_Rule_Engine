// import { useState } from 'react';
// import { Play, FileJson, AlertCircle, CheckCircle } from 'lucide-react';
// import { useRules } from '../hooks/useRules';
// import { useRuleDetails } from '../hooks/useRules';
// import { evaluateConditions } from '../lib/ruleEngine';

// export default function RuleTester() {
//   const { rules } = useRules();
//   const [selectedRuleId, setSelectedRuleId] = useState<string>('');
//   const { rule, conditions, actions } = useRuleDetails(selectedRuleId || null);
//   const [inputData, setInputData] = useState('{\n  "amount": 1000,\n  "age": 25\n}');
//   const [testResult, setTestResult] = useState<{
//     matched: boolean;
//     decision: string;
//     actions: any[];
//     executionTime: number;
//   } | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const handleTest = () => {
//     try {
//       setError(null);
//       const startTime = performance.now();

//       const parsedInput = JSON.parse(inputData);

//       if (!rule) {
//         setError('Please select a rule to test');
//         return;
//       }

//       if (!rule.is_active) {
//         setError('This rule is not active');
//         return;
//       }
      

//       const matched = evaluateConditions(conditions, parsedInput);

//       const executedActions = matched
//         ? actions.map((action) => ({
//             type: action.action_type,
//             config: action.action_config,
//           }))
//         : [];

//       const endTime = performance.now();
//       const executionTime = Math.round(endTime - startTime);

//       setTestResult({
//         matched,
//         decision: matched ? 'Rule Matched' : 'Rule Not Matched',
//         actions: executedActions,
//         executionTime,
//       });
//     } catch (err: any) {
//       setError(err.message || 'Invalid JSON input');
//       setTestResult(null);
//     }
//   };

//   const exampleInputs = [
//     {
//       name: 'Credit Application',
//       data: {
//         amount: 5000,
//         age: 30,
//         creditScore: 720,
//         employment: 'full-time',
//       },
//     },
//     {
//       name: 'Purchase Order',
//       data: {
//         totalAmount: 15000,
//         customerType: 'premium',
//         paymentTerms: 'net30',
//       },
//     },
//     {
//       name: 'User Registration',
//       data: {
//         age: 18,
//         country: 'US',
//         hasParentalConsent: false,
//       },
//     },
//   ];

//   const loadExample = (example: any) => {
//     setInputData(JSON.stringify(example.data, null, 2));
//   };

//   const activeRules = rules.filter((r) => r.is_active);

//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <h2 className="text-xl font-bold text-slate-900 mb-2">Test Rules</h2>
//         <p className="text-sm text-slate-600">
//           Test your rules with sample data to verify they work as expected
//         </p>
//       </div>

//       <div className="grid grid-cols-2 gap-6">
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Select Rule to Test
//             </label>
//             <select
//               value={selectedRuleId}
//               onChange={(e) => {
//                 setSelectedRuleId(e.target.value);
//                 setTestResult(null);
//                 setError(null);
//               }}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select a rule...</option>
//               {activeRules.map((r) => (
//                 <option key={r.id} value={r.id}>
//                   {r.name} (Priority: {r.priority})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {rule && (
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//               <h3 className="font-semibold text-slate-900 mb-2">{rule.name}</h3>
//               {rule.description && (
//                 <p className="text-sm text-slate-600 mb-3">{rule.description}</p>
//               )}
//               <div className="text-xs space-y-1">
//                 <div className="flex items-center justify-between">
//                   <span className="text-slate-600">Conditions:</span>
//                   <span className="font-semibold text-slate-900">
//                     {conditions.length}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-slate-600">Actions:</span>
//                   <span className="font-semibold text-slate-900">
//                     {actions.length}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Input Data (JSON)
//             </label>
//             <textarea
//               value={inputData}
//               onChange={(e) => setInputData(e.target.value)}
//               className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
//               rows={12}
//               placeholder='{\n  "field": "value"\n}'
//             />
//           </div>

//           <div>
//             <p className="text-xs font-medium text-slate-700 mb-2">Quick Examples:</p>
//             <div className="flex flex-wrap gap-2">
//               {exampleInputs.map((example) => (
//                 <button
//                   key={example.name}
//                   onClick={() => loadExample(example)}
//                   className="px-3 py-1 text-xs bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
//                 >
//                   <FileJson className="w-3 h-3 inline mr-1" />
//                   {example.name}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={handleTest}
//             disabled={!selectedRuleId || !inputData}
//             className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <Play className="w-4 h-4" />
//             Run Test
//           </button>
//         </div>

//         <div>
//           <h3 className="text-sm font-medium text-slate-700 mb-4">Test Results</h3>

//           {!testResult && !error && (
//             <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
//               <div>
//                 <Play className="w-12 h-12 text-slate-300 mx-auto mb-3" />
//                 <p className="text-slate-500">
//                   Select a rule and run a test to see results
//                 </p>
//               </div>
//             </div>
//           )}

//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//               <div className="flex items-start gap-3">
//                 <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
//                 <div>
//                   <h4 className="font-semibold text-red-900 mb-1">Error</h4>
//                   <p className="text-sm text-red-700">{error}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {testResult && (
//             <div className="space-y-4">
//               <div
//                 className={`border-2 rounded-lg p-4 ${
//                   testResult.matched
//                     ? 'bg-green-50 border-green-300'
//                     : 'bg-slate-50 border-slate-300'
//                 }`}
//               >
//                 <div className="flex items-center gap-3 mb-3">
//                   {testResult.matched ? (
//                     <CheckCircle className="w-6 h-6 text-green-600" />
//                   ) : (
//                     <AlertCircle className="w-6 h-6 text-slate-500" />
//                   )}
//                   <div>
//                     <h4 className="font-semibold text-slate-900">
//                       {testResult.decision}
//                     </h4>
//                     <p className="text-xs text-slate-600">
//                       Executed in {testResult.executionTime}ms
//                     </p>
//                   </div>
//                 </div>

//                 {testResult.matched && (
//                   <div className="mt-3 pt-3 border-t border-green-200">
//                     <p className="text-xs font-medium text-slate-700 mb-2">
//                       Conditions Evaluation:
//                     </p>
//                     <div className="bg-white rounded p-2 text-xs">
//                       <span className="text-green-600 font-semibold">
//                         All conditions passed
//                       </span>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {testResult.actions.length > 0 && (
//                 <div className="bg-white border border-slate-200 rounded-lg p-4">
//                   <h4 className="font-semibold text-slate-900 mb-3">
//                     Actions to Execute ({testResult.actions.length})
//                   </h4>
//                   <div className="space-y-2">
//                     {testResult.actions.map((action, index) => (
//                       <div
//                         key={index}
//                         className="bg-blue-50 border border-blue-200 rounded p-3"
//                       >
//                         <div className="font-medium text-sm text-blue-900 mb-1">
//                           {action.type}
//                         </div>
//                         {Object.keys(action.config || {}).length > 0 && (
//                           <pre className="text-xs text-slate-600 mt-2 overflow-x-auto">
//                             {JSON.stringify(action.config, null, 2)}
//                           </pre>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {rule && conditions.length > 0 && (
//                 <div className="bg-white border border-slate-200 rounded-lg p-4">
//                   <h4 className="font-semibold text-slate-900 mb-3">
//                     Rule Conditions
//                   </h4>
//                   <div className="space-y-2">
//                     {conditions.map((condition, index) => (
//                       <div key={condition.id} className="text-xs">
//                         {index > 0 && (
//                           <span className="font-semibold text-blue-600 mr-2">
//                             {condition.logical_operator}
//                           </span>
//                         )}
//                         <span className="text-slate-700">
//                           {condition.field_name} {condition.operator}{' '}
//                           <span className="font-medium">
//                             {JSON.stringify(condition.value)}
//                           </span>
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Play, FileJson, AlertCircle, CheckCircle } from "lucide-react";
import { useRules, useRuleDetails } from "../hooks/useRules";
import { evaluateRule } from "../lib/ruleEngine";

export default function RuleTester() {
  const { rules, loading } = useRules();

  const [selectedRuleId, setSelectedRuleId] = useState<string>("");

  const { rule } = useRuleDetails(
    selectedRuleId ? Number(selectedRuleId) : null
  );

  const [inputData, setInputData] = useState(
    '{\n  "age": 22,\n  "salary": 25000\n}'
  );

  const [testResult, setTestResult] = useState<{
    matched: boolean;
    decision: string;
    executionTime: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  // ✅ Backend uses `active`
  const activeRules = rules.filter((r: any) => r.active);

  const handleTest = async () => {
  try {
    setError(null);
    setTestResult(null);

    if (!selectedRuleId) {
      setError("Please select a rule to test");
      return;
    }

    if (!rule?.active) {
      setError("Selected rule is not active");
      return;
    }

    const parsedInput = JSON.parse(inputData);

    const startTime = performance.now();
    const response = await evaluateRule(parsedInput);
    const endTime = performance.now();

    setTestResult({
      matched: response.decision !== "NO_MATCH",
      decision: response.decision,
      executionTime: Math.round(endTime - startTime),
    });
  } catch (err: any) {
  console.error(err);

  if (err instanceof SyntaxError) {
    setError("Invalid JSON input");
  } else {
    setError("Rule evaluation failed");
  }
}
};


  const exampleInputs = [
    {
      name: "Loan Application",
      data: {
        age: 30,
        salary: 50000,
      },
    },
    {
      name: "Low Salary Case",
      data: {
        age: 22,
        salary: 12000,
      },
    },
  ];

  const loadExample = (example: any) => {
    setInputData(JSON.stringify(example.data, null, 2));
  };  

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Test Rules</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="space-y-4">
          <select
            value={selectedRuleId}
            onChange={(e) => {
              setSelectedRuleId(e.target.value);
              setTestResult(null);
              setError(null);
            }}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select a rule...</option>
            {activeRules.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>

          <textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            rows={10}
            className="w-full border rounded p-3 font-mono"
          />

          <div className="flex gap-2">
            {exampleInputs.map((ex) => (
              <button
                key={ex.name}
                onClick={() => loadExample(ex)}
                className="px-3 py-1 text-xs bg-slate-200 rounded"
              >
                <FileJson className="inline w-3 h-3 mr-1" />
                {ex.name}
              </button>
            ))}
          </div>

          <button
            onClick={handleTest}
            className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Run Test
          </button>
        </div>

        {/* RIGHT */}
        <div>
          {!testResult && !error && (
            <div className="border-dashed border-2 p-10 text-center">
              Run a test to see results
            </div>
          )}

          {error && (
            <div className="bg-red-100 p-4 rounded flex gap-2">
              <AlertCircle className="text-red-600" />
              {error}
            </div>
          )}

          {testResult && (
            <div
              className={`p-4 rounded ${
                testResult.matched
                  ? "bg-green-100"
                  : "bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2">
                {testResult.matched ? (
                  <CheckCircle className="text-green-600" />
                ) : (
                  <AlertCircle className="text-slate-500" />
                )}
                <h3 className="font-semibold">
                  Decision: {testResult.decision}
                </h3>
              </div>
              <p className="text-xs mt-1">
                Execution time: {testResult.executionTime} ms
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
