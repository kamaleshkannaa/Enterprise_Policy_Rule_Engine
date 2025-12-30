// import { useState, useEffect } from 'react';
// import { Save, X, Plus, Trash2 } from 'lucide-react';
// import { useRuleDetails } from '../hooks/useRules';
// import { useRuleGroups } from '../hooks/useRuleGroups';
// import { post, put } from '../lib/apiClient';
// import { OPERATORS, ACTION_TYPES, formatOperatorLabel, formatActionTypeLabel } from '../lib/ruleEngine';

// interface RuleBuilderProps {
//   ruleId: string | null;
//   onSave: () => void;
//   onCancel: () => void;
// }

// export default function RuleBuilder({ ruleId, onSave, onCancel }: RuleBuilderProps) {
//   const { rule, conditions, actions, loading, addCondition, updateCondition, deleteCondition, addAction, updateAction, deleteAction } = useRuleDetails(ruleId);
//   const { ruleGroups } = useRuleGroups();

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     rule_group_id: '',
//     priority: 0,
//     is_active: true,
//   });

//   const [newCondition, setNewCondition] = useState({
//     field_name: '',
//     operator: OPERATORS.EQUALS,
//     value: '',
//     logical_operator: 'AND',
//   });

//   const [newAction, setNewAction] = useState({
//     action_type: ACTION_TYPES.APPROVE,
//     action_config: '{}',
//   });

//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     if (rule) {
//       setFormData({
//         name: rule.name,
//         description: rule.description || '',
//         rule_group_id: rule.rule_group_id || '',
//         priority: rule.priority,
//         is_active: rule.is_active,
//       });
//     } else {
//       setFormData({
//         name: '',
//         description: '',
//         rule_group_id: '',
//         priority: 0,
//         is_active: true,
//       });
//     }
//   }, [rule]);

//   const handleSaveRule = async () => {
//   try {
//     setSaving(true);

//     if (!ruleId) {
//       await post("/rules", formData);
//     } else {
//       await put(`/rules/${ruleId}`, formData);
//     }

//     onSave();
//   } catch (err) {
//     console.error("Error saving rule:", err);
//     alert("Failed to save rule. Please try again.");
//   } finally {
//     setSaving(false);
//   }
// };


//   const handleAddCondition = async () => {
//     if (!ruleId) {
//       alert('Please save the rule first before adding conditions.');
//       return;
//     }

//     try {
//       let parsedValue;
//       try {
//         parsedValue = JSON.parse(newCondition.value);
//       } catch {
//         parsedValue = newCondition.value;
//       }

//       await addCondition({
//         rule_id: ruleId,
//         field_name: newCondition.field_name,
//         operator: newCondition.operator,
//         value: parsedValue,
//         logical_operator: newCondition.logical_operator,
//         condition_order: conditions.length,
//       });

//       setNewCondition({
//         field_name: '',
//         operator: OPERATORS.EQUALS,
//         value: '',
//         logical_operator: 'AND',
//       });
//     } catch (err) {
//       console.error('Error adding condition:', err);
//       alert('Failed to add condition. Please try again.');
//     }
//   };

//   const handleAddAction = async () => {
//     if (!ruleId) {
//       alert('Please save the rule first before adding actions.');
//       return;
//     }

//     try {
//       let parsedConfig;
//       try {
//         parsedConfig = JSON.parse(newAction.action_config);
//       } catch {
//         parsedConfig = {};
//       }

//       await addAction({
//         rule_id: ruleId,
//         action_type: newAction.action_type,
//         action_config: parsedConfig,
//         action_order: actions.length,
//       });

//       setNewAction({
//         action_type: ACTION_TYPES.APPROVE,
//         action_config: '{}',
//       });
//     } catch (err) {
//       console.error('Error adding action:', err);
//       alert('Failed to add action. Please try again.');
//     }
//   };

//   if (loading && ruleId) {
//     return (
//       <div className="p-12 text-center">
//         <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//         <p className="mt-4 text-slate-600">Loading rule...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-slate-900">
//           {ruleId ? 'Edit Rule' : 'Create New Rule'}
//         </h2>
//         <div className="flex gap-2">
//           <button
//             onClick={onCancel}
//             className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
//           >
//             <X className="w-4 h-4" />
//             Cancel
//           </button>
//           <button
//             onClick={handleSaveRule}
//             disabled={saving || !formData.name}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <Save className="w-4 h-4" />
//             {saving ? 'Saving...' : 'Save Rule'}
//           </button>
//         </div>
//       </div>

//       <div className="space-y-6">
//         <div className="bg-slate-50 rounded-lg p-6 space-y-4">
//           <h3 className="font-semibold text-slate-900 mb-4">Rule Details</h3>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Rule Name *
//               </label>
//               <input
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="e.g., Credit Approval Rule"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Rule Group
//               </label>
//               <select
//                 value={formData.rule_group_id}
//                 onChange={(e) => setFormData({ ...formData, rule_group_id: e.target.value })}
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">No Group</option>
//                 {ruleGroups.map((group) => (
//                   <option key={group.id} value={group.id}>
//                     {group.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Description
//             </label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows={3}
//               placeholder="Describe what this rule does..."
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Priority
//               </label>
//               <input
//                 type="number"
//                 value={formData.priority}
//                                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     priority: Number(e.target.value) || 0
//                   })
//                 }

//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <p className="text-xs text-slate-500 mt-1">Higher priority rules execute first</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Status
//               </label>
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={formData.is_active}
//                   onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
//                   className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
//                 />
//                 <span className="text-sm text-slate-700">Rule is active</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         {ruleId && (
//           <>
//             <div className="bg-slate-50 rounded-lg p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold text-slate-900">Conditions</h3>
//               </div>

//               {conditions.length > 0 && (
//                 <div className="space-y-2 mb-4">
//                   {conditions.map((condition, index) => (
//                     <div
//                       key={condition.id}
//                       className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200"
//                     >
//                       {index > 0 && (
//                         <span className="text-xs font-semibold text-blue-600 px-2 py-1 bg-blue-50 rounded">
//                           {condition.logical_operator}
//                         </span>
//                       )}
//                       <div className="flex-1 text-sm">
//                         <span className="font-medium text-slate-700">{condition.field_name}</span>
//                         <span className="text-slate-500 mx-2">
//                           {formatOperatorLabel(condition.operator)}
//                         </span>
//                         <span className="font-medium text-slate-900">
//                           {JSON.stringify(condition.value)}
//                         </span>
//                       </div>
//                       <button
//                         onClick={() => deleteCondition(condition.id)}
//                         className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <div className="grid grid-cols-12 gap-2">
//                 <input
//                   type="text"
//                   placeholder="Field name"
//                   value={newCondition.field_name}
//                   onChange={(e) => setNewCondition({ ...newCondition, field_name: e.target.value })}
//                   className="col-span-3 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <select
//                   value={newCondition.operator}
//                   onChange={(e) => setNewCondition({ ...newCondition, operator: e.target.value })}
//                   className="col-span-3 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {Object.entries(OPERATORS).map(([key, value]) => (
//                     <option key={value} value={value}>
//                       {formatOperatorLabel(value)}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="text"
//                   placeholder="Value"
//                   value={newCondition.value}
//                   onChange={(e) => setNewCondition({ ...newCondition, value: e.target.value })}
//                   className="col-span-3 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <select
//                   value={newCondition.logical_operator}
//                   onChange={(e) => setNewCondition({ ...newCondition, logical_operator: e.target.value })}
//                   className="col-span-2 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="AND">AND</option>
//                   <option value="OR">OR</option>
//                 </select>
//                 <button
//                   onClick={handleAddCondition}
//                   disabled={!newCondition.field_name || !newCondition.value}
//                   className="col-span-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <Plus className="w-4 h-4 mx-auto" />
//                 </button>
//               </div>
//             </div>

//             <div className="bg-slate-50 rounded-lg p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold text-slate-900">Actions</h3>
//               </div>

//               {actions.length > 0 && (
//                 <div className="space-y-2 mb-4">
//                   {actions.map((action) => (
//                     <div
//                       key={action.id}
//                       className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200"
//                     >
//                       <div className="flex-1 text-sm">
//                         <span className="font-medium text-slate-700">
//                           {formatActionTypeLabel(action.action_type)}
//                         </span>
//                         {Object.keys(action.action_config || {}).length > 0 && (
//                           <span className="text-slate-500 ml-2">
//                             {JSON.stringify(action.action_config)}
//                           </span>
//                         )}
//                       </div>
//                       <button
//                         onClick={() => deleteAction(action.id)}
//                         className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <div className="grid grid-cols-12 gap-2">
//                 <select
//                   value={newAction.action_type}
//                   onChange={(e) => setNewAction({ ...newAction, action_type: e.target.value })}
//                   className="col-span-5 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {Object.entries(ACTION_TYPES).map(([key, value]) => (
//                     <option key={value} value={value}>
//                       {formatActionTypeLabel(value)}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="text"
//                   placeholder='Config (JSON, e.g., {"key": "value"})'
//                   value={newAction.action_config}
//                   onChange={(e) => setNewAction({ ...newAction, action_config: e.target.value })}
//                   className="col-span-6 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button
//                   onClick={handleAddAction}
//                   className="col-span-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   <Plus className="w-4 h-4 mx-auto" />
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from 'react';
// import { Save, X, Plus, Trash2 } from 'lucide-react';
// import { useRuleDetails } from '../hooks/useRules';
// import { useRuleGroups } from '../hooks/useRuleGroups';
// import { post, put } from '../lib/apiClient';
// import { createCondition } from '../lib/conditionsApi';
// import { OPERATOR_TO_SYMBOL } from '../lib/operatorMapper';
// import {
//   OPERATORS,
//   ACTION_TYPES,
//   formatOperatorLabel,
//   formatActionTypeLabel,
// } from '../lib/ruleEngine';

// interface RuleBuilderProps {
//   ruleId: string | null;
//   onSave: () => void;
//   onCancel: () => void;
// }

// export default function RuleBuilder({
//   ruleId,
//   onSave,
//   onCancel,
// }: RuleBuilderProps) {

//   /* =========================
//      FIXED HOOK USAGE
//      (ONLY WHAT HOOK PROVIDES)
//   ========================== */
//   const { rule, conditions, loading } = useRuleDetails(ruleId);
//   const { ruleGroups } = useRuleGroups();

//   /* =========================
//      STUB ACTIONS (UI SAFE)
//   ========================== */
//   const actions: any[] = [];

//   const addAction = async () => {
//     alert('Actions backend not implemented yet');
//   };

//   const deleteAction = async () => {
//     alert('Actions backend not implemented yet');
//   };

//   const deleteCondition = async (conditionId: number) => {
//   if (!ruleId) return;

//   try {
//     const res = await fetch(
//       `http://localhost:8080/api/rules/${ruleId}/conditions/${conditionId}`,
//       {
//         method: "DELETE",
//       }
//     );

//     if (!res.ok) {
//       throw new Error("Delete failed");
//     }

//     alert("Condition deleted successfully");

//     // refresh rule + conditions
//     onSave();
//   } catch (err) {
//     console.error(err);
//     alert("Failed to delete condition");
//   }
// };



//   /* =========================
//      FORM STATE
//   ========================== */
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     rule_group_id: '',
//     priority: 0,
//     is_active: true,
//   });

//   const [newCondition, setNewCondition] = useState({
//     field_name: '',
//     operator: OPERATORS.EQUALS,
//     value: '',
//     logical_operator: 'AND',
//   });

//   const [newAction, setNewAction] = useState({
//     action_type: ACTION_TYPES.APPROVE,
//     action_config: '{}',
//   });

//   const [saving, setSaving] = useState(false);

//   /* =========================
//      PREFILL RULE
//   ========================== */
//   useEffect(() => {
//     if (rule) {
//       setFormData({
//         name: rule.name,
//         description: rule.description || '',
//         rule_group_id: rule.groupId ? String(rule.groupId) : '',
//         priority: rule.priority,
//         is_active: rule.active,
//       });
//     }
//   }, [rule]);

//   /* =========================
//      SAVE RULE
//   ========================== */
//   const handleSaveRule = async () => {
//     try {
//       setSaving(true);

//       const payload = {
//         name: formData.name,
//         description: formData.description,
//         priority: formData.priority,
//         active: formData.is_active,
//         groupId: formData.rule_group_id
//           ? Number(formData.rule_group_id)
//           : null,
//       };

//       if (!ruleId) {
//         await post('/rules', payload);
//       } else {
//         await put(`/rules/${ruleId}`, payload);
//       }

//       onSave();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to save rule');
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* =========================
//      ADD CONDITION (REAL)
//   ========================== */
//  const handleAddCondition = async () => {
//   if (!ruleId) {
//     alert("Please save rule first");
//     return;
//   }

//   if (!newCondition.field_name || !newCondition.operator || !newCondition.value) {
//     alert("Fill all condition fields");
//     return;
//   }

//   try {
//     await createCondition(Number(ruleId), {
//       fieldName: newCondition.field_name,
//       operator: newCondition.operator, // NOW SYMBOL
//       fieldValue: newCondition.value
//     });

//     setNewCondition({
//       field_name: "",
//       operator: "==",
//       value: "",
//       logical_operator: "AND"
//     });

//     onSave();
//   } catch (err) {
//     console.error(err);
//     alert("Failed to add condition");
//   }
// };


//   /* =========================
//      ADD ACTION (STUB)
//   ========================== */
//   const handleAddAction = async () => {
//     await addAction();
//     setNewAction({
//       action_type: ACTION_TYPES.APPROVE,
//       action_config: '{}',
//     });
//   };

//   if (loading && ruleId) {
//     return (
//       <div className="p-12 text-center">
//         <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//         <p className="mt-4 text-slate-600">Loading rule...</p>
//       </div>
//     );
//   }

//   /* =========================
//      UI — 100% YOUR ORIGINAL
//   ========================== */
//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-slate-900">
//           {ruleId ? 'Edit Rule' : 'Create New Rule'}
//         </h2>
//         <div className="flex gap-2">
//           <button
//             onClick={onCancel}
//             className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
//           >
//             <X className="w-4 h-4" />
//             Cancel
//           </button>
//           <button
//             onClick={handleSaveRule}
//             disabled={saving || !formData.name}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <Save className="w-4 h-4" />
//             {saving ? 'Saving...' : 'Save Rule'}
//           </button>
//         </div>
//       </div>

//       <div className="space-y-6">
//         <div className="bg-slate-50 rounded-lg p-6 space-y-4">
//           <h3 className="font-semibold text-slate-900 mb-4">Rule Details</h3>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Rule Name *
//               </label>
//               <input
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="e.g., Credit Approval Rule"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Rule Group
//               </label>
//               <select
//                 value={formData.rule_group_id}
//                 onChange={(e) => setFormData({ ...formData, rule_group_id: e.target.value })}
//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">No Group</option>
//                 {ruleGroups.map((group) => (
//                   <option key={group.id} value={group.id}>
//                     {group.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Description
//             </label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows={3}
//               placeholder="Describe what this rule does..."
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Priority
//               </label>
//               <input
//                 type="number"
//                 value={formData.priority}
//                                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     priority: Number(e.target.value) || 0
//                   })
//                 }

//                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <p className="text-xs text-slate-500 mt-1">Higher priority rules execute first</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Status
//               </label>
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={formData.is_active}
//                   onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
//                   className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
//                 />
//                 <span className="text-sm text-slate-700">Rule is active</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         {ruleId && (
//           <>
//             <div className="bg-slate-50 rounded-lg p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold text-slate-900">Conditions</h3>
//               </div>

//               {conditions.length > 0 && (
//                 <div className="space-y-2 mb-4">
//                   {conditions.map((condition, index) => (
//                     <div
//                       key={condition.id}
//                       className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200"
//                     >
//                       {index > 0 && (
//                         <span className="text-xs font-semibold text-blue-600 px-2 py-1 bg-blue-50 rounded">
//                           {condition.logical_operator}
//                         </span>
//                       )}
//                       <div className="flex-1 text-sm">
//                         <span className="font-medium text-slate-700">{condition.field_name}</span>
//                         <span className="text-slate-500 mx-2">
//                           {formatOperatorLabel(condition.operator)}
//                         </span>
//                         <span className="font-medium text-slate-900">
//                           {JSON.stringify(condition.value)}
//                         </span>
//                       </div>
//                       <button
//                         onClick={() => deleteCondition(condition.id)}
//                         className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <div className="grid grid-cols-12 gap-2">
//                 <input
//                   type="text"
//                   placeholder="Field name"
//                   value={newCondition.field_name}
//                   onChange={(e) => setNewCondition({ ...newCondition, field_name: e.target.value })}
//                   className="col-span-3 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <select
//                   value={newCondition.operator}
//                   onChange={(e) => setNewCondition({ ...newCondition, operator: e.target.value })}
//                   className="col-span-3 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value=">">Greater Than ( &gt; )</option>
// <option value="<">Less Than ( &lt; )</option>
// <option value=">=">Greater Than or Equal ( ≥ )</option>
// <option value="<=">Less Than or Equal ( ≤ )</option>
// <option value="==">Equals ( = )</option>


//                 </select>
//                 <input
//                   type="text"
//                   placeholder="Value"
//                   value={newCondition.value}
//                   onChange={(e) => setNewCondition({ ...newCondition, value: e.target.value })}
//                   className="col-span-3 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <select
//                   value={newCondition.logical_operator}
//                   onChange={(e) => setNewCondition({ ...newCondition, logical_operator: e.target.value })}
//                   className="col-span-2 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="AND">AND</option>
//                   <option value="OR">OR</option>
//                 </select>
//                 <button
//                   onClick={handleAddCondition}
//                   disabled={!newCondition.field_name || !newCondition.value}
//                   className="col-span-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <Plus className="w-4 h-4 mx-auto" />
//                 </button>
//               </div>
//             </div>

//             <div className="bg-slate-50 rounded-lg p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold text-slate-900">Actions</h3>
//               </div>

//               {actions.length > 0 && (
//                 <div className="space-y-2 mb-4">
//                   {actions.map((action) => (
//                     <div
//                       key={action.id}
//                       className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200"
//                     >
//                       <div className="flex-1 text-sm">
//                         <span className="font-medium text-slate-700">
//                           {formatActionTypeLabel(action.action_type)}
//                         </span>
//                         {Object.keys(action.action_config || {}).length > 0 && (
//                           <span className="text-slate-500 ml-2">
//                             {JSON.stringify(action.action_config)}
//                           </span>
//                         )}
//                       </div>
//                       <button
//                         onClick={() => deleteAction(action.id)}
//                         className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <div className="grid grid-cols-12 gap-2">
//                 <select
//                   value={newAction.action_type}
//                   onChange={(e) => setNewAction({ ...newAction, action_type: e.target.value })}
//                   className="col-span-5 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {Object.entries(ACTION_TYPES).map(([key, value]) => (
//                     <option key={value} value={value}>
//                       {formatActionTypeLabel(value)}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="text"
//                   placeholder='Config (JSON, e.g., {"key": "value"})'
//                   value={newAction.action_config}
//                   onChange={(e) => setNewAction({ ...newAction, action_config: e.target.value })}
//                   className="col-span-6 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button
//                   onClick={handleAddAction}
//                   className="col-span-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   <Plus className="w-4 h-4 mx-auto" />
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { Save, X, Plus, Trash2 } from "lucide-react";
import { useRuleDetails } from "../hooks/useRuleDetails";
import { useRuleGroups } from "../hooks/useRuleGroups";
import { post, put } from "../lib/apiClient";
import {
  createCondition,
  deleteCondition as apiDeleteCondition,
} from "../lib/conditionsApi";
import {
  OPERATORS,
  ACTION_TYPES,
  formatOperatorLabel,
  formatActionTypeLabel,
} from "../lib/ruleEngine";

interface RuleBuilderProps {
  ruleId: string | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function RuleBuilder({ ruleId, onSave, onCancel }: RuleBuilderProps) {
  const { rule, conditions, loading } = useRuleDetails(ruleId);
  const { ruleGroups } = useRuleGroups();

  // actions still stubbed
  const actions: any[] = [];

  const addAction = async () => {
    alert("Actions backend not implemented yet");
  };

  const deleteAction = async () => {
    alert("Actions backend not implemented yet");
  };

  // form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rule_group_id: "",
    priority: 0,
    active: true,
  });

  const [newCondition, setNewCondition] = useState({
    field_name: "",
    operator: "==", // symbols stored in DB
    value: "",
    logical_operator: "AND",
  });

  const [newAction, setNewAction] = useState({
    action_type: ACTION_TYPES.APPROVE,
    action_config: "{}",
  });

  const [saving, setSaving] = useState(false);
  const [conditionSaving, setConditionSaving] = useState(false);

  // prefill from rule
  useEffect(() => {
    if (rule) {
      setFormData({
        name: (rule as any).name,
        description: (rule as any).description || "",
        rule_group_id: (rule as any).groupId ? String((rule as any).groupId) : "",
        priority: (rule as any).priority,
        active: (rule as any).active,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        rule_group_id: "",
        priority: 0,
        active: true,
      });
    }
  }, [rule]);

  // save rule
  // save rule
const handleSaveRule = async () => {
  try {
    setSaving(true);

    const payload = {
      name: formData.name,
      description: formData.description,
      priority: formData.priority,
      active: formData.active,                     // backend field
      groupId: formData.rule_group_id
        ? Number(formData.rule_group_id)
        : null,                                   // backend field
    };

    if (!ruleId) {
      await post("/api/rules", payload);          // was "/rules"
    } else {
      await put(`/api/rules/${ruleId}`, payload); // was `/rules/${ruleId}`
    }

    onSave();
  } catch (err) {
    console.error("Error saving rule:", err);
    alert("Failed to save rule");
  } finally {
    setSaving(false);
  }
};
  // add condition (stores operator as symbol)
  const handleAddCondition = async () => {
    if (!ruleId) {
      alert("Please save rule first");
      return;
    }

    if (!newCondition.field_name || !newCondition.operator || !newCondition.value) {
      alert("Fill all condition fields");
      return;
    }

    try {
      setConditionSaving(true);

      await createCondition(Number(ruleId), {
        fieldName: newCondition.field_name,
        operator: newCondition.operator, // ">", "<", ">=", "<=", "=="
        fieldValue: newCondition.value,
      });

      setNewCondition({
        field_name: "",
        operator: "==",
        value: "",
        logical_operator: "AND",
      });

      onSave();
    } catch (err) {
      console.error("handleAddCondition error:", err);
      alert("Failed to add condition");
    } finally {
      setConditionSaving(false);
    }
  };

  // delete condition
  const handleDeleteCondition = async (conditionId: number) => {
  if (!ruleId) return;

  try {
    // ✅ ruleId FIRST, conditionId SECOND
    await apiDeleteCondition(Number(ruleId), conditionId);
    onSave(); // refresh rule data
  } catch (err) {
    console.error("Error deleting condition:", err);
    alert("Failed to delete condition");
  }
};


  // add action (stub)
  const handleAddAction = async () => {
    await addAction();
    setNewAction({
      action_type: ACTION_TYPES.APPROVE,
      action_config: "{}",
    });
  };

  if (loading && ruleId) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/20 mb-4">
            <div className="w-8 h-8 border-4 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin" />
          </div>
          <p className="text-slate-400">Loading rule...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">
            {ruleId ? "Edit Rule" : "Create New Rule"}
          </h2>
          <p className="text-slate-400">
            {ruleId ? "Modify rule details and conditions" : "Set up a new policy rule"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-600 text-slate-400 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            onClick={handleSaveRule}
            disabled={saving || !formData.name}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Rule"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 space-y-6">
        {/* Rule Details */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Rule Details</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rule Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Rule Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Credit Approval Rule"
                className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Rule Group */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Rule Group
              </label>
              <select
                value={formData.rule_group_id}
                onChange={(e) =>
                  setFormData({ ...formData, rule_group_id: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="">No Group</option>
                {ruleGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe what this rule does..."
                rows={4}
                className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Priority
              </label>
              <input
                type="number"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: Number(e.target.value) || 0 })
                }
                min={0}
                className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-500 mt-1">
                Higher priority rules execute first
              </p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Status
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.checked })
                  }
                  className="w-4 h-4 text-indigo-600 border-slate-600 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-slate-300">Rule is active</span>
              </label>
            </div>
          </div>
        </div>

        {/* Conditions Section */}
        {ruleId && (
          <div className="border-t border-slate-700 pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Conditions ({conditions.length})
            </h3>

            {conditions.length === 0 ? (
              <div className="text-center py-6 text-slate-400">
                <p>No conditions yet. Add your first condition below.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {conditions.map((condition: any, index: number) => (
                  <div
                    key={condition.id}
                    className="flex items-center gap-2 p-3 bg-slate-700/50 rounded-lg"
                  >
                    {index > 0 && (
                      <span className="text-xs font-semibold text-indigo-400 px-2 py-1 bg-indigo-500/20 rounded">
                        {condition.logical_operator || "AND"}
                      </span>
                    )}
                    <div className="flex-1 text-sm">
                      <span className="font-medium text-slate-200">
                        {condition.field_name}
                      </span>
                      <span className="text-slate-400 mx-2">
                        {formatOperatorLabel(condition.operator)}
                      </span>
                      <span className="font-medium text-slate-100">
                        {JSON.stringify(condition.value)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteCondition(condition.id)}
                      className="p-1 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* add condition row */}
            <div className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-3">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Field name
                </label>
                <input
                  type="text"
                  value={newCondition.field_name}
                  onChange={(e) =>
                    setNewCondition({ ...newCondition, field_name: e.target.value })
                  }
                  placeholder="e.g. salary"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-500"
                />
              </div>

              <div className="col-span-3">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Operator
                </label>
                <select
                  value={newCondition.operator}
                  onChange={(e) =>
                    setNewCondition({ ...newCondition, operator: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white"
                >
                  <option value=">">Greater Than ( &gt; )</option>
                  <option value="<">Less Than ( &lt; )</option>
                  <option value=">=">Greater Than or Equal ( ≥ )</option>
                  <option value="<=">Less Than or Equal ( ≤ )</option>
                  <option value="==">Equals ( = )</option>
                </select>
              </div>

              <div className="col-span-3">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Value
                </label>
                <input
                  type="text"
                  value={newCondition.value}
                  onChange={(e) =>
                    setNewCondition({ ...newCondition, value: e.target.value })
                  }
                  placeholder="e.g. 20000"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Logical operator
                </label>
                <select
                  value={newCondition.logical_operator}
                  onChange={(e) =>
                    setNewCondition({
                      ...newCondition,
                      logical_operator: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white"
                >
                  <option value="AND">AND</option>
                  <option value="OR">OR</option>
                </select>
              </div>

              <div className="col-span-1">
                <button
                  onClick={handleAddCondition}
                  disabled={
                    conditionSaving || !newCondition.field_name || !newCondition.value
                  }
                  className="w-full flex items-center justify-center px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50"
                  title={!ruleId ? "Save rule first" : "Add condition"}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Actions Section (stub) */}
        {ruleId && (
          <div className="border-t border-slate-700 pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Actions</h3>

            {actions.length > 0 && (
              <div className="space-y-2 mb-4">
                {actions.map((action: any) => (
                  <div
                    key={action.id}
                    className="flex items-center gap-3 bg-slate-700/50 p-3 rounded-lg border border-slate-600"
                  >
                    <div className="flex-1 text-sm">
                      <span className="font-medium text-slate-200">
                        {formatActionTypeLabel(action.action_type)}
                      </span>
                      {Object.keys(action.action_config || {}).length > 0 && (
                        <span className="text-slate-400 ml-2">
                          {JSON.stringify(action.action_config)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => deleteAction(action.id)}
                      className="p-1 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-12 gap-2">
              <select
                value={newAction.action_type}
                onChange={(e) =>
                  setNewAction({ ...newAction, action_type: e.target.value })
                }
                className="col-span-5 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {Object.entries(ACTION_TYPES).map(([key, value]) => (
                  <option key={value} value={value}>
                    {formatActionTypeLabel(value)}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder='Config (JSON, e.g., {"key": "value"})'
                value={newAction.action_config}
                onChange={(e) =>
                  setNewAction({ ...newAction, action_config: e.target.value })
                }
                className="col-span-6 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleAddAction}
                className="col-span-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
