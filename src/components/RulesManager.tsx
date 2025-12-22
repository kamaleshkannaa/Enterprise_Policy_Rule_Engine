  // import { useState } from 'react';
  // import { Edit2, Plus, Search, Trash2, Power, PowerOff } from 'lucide-react';
  // import { useRules } from '../hooks/useRules';
  // import { useRuleGroups } from '../hooks/useRuleGroups';

  // interface RulesManagerProps {
  //   onEdit: (ruleId: string) => void;
  //   onCreateNew: () => void;
  // }

  // export default function RulesManager({ onEdit, onCreateNew }: RulesManagerProps) {
  //   const { rules, loading, deleteRule, updateRule } = useRules();
  //   const { ruleGroups } = useRuleGroups();

  //   const [searchTerm, setSearchTerm] = useState('');
  //   const [filterGroup, setFilterGroup] = useState<string>('all');
  //   const [filterStatus, setFilterStatus] = useState<string>('all');

  //   const safeSearch = searchTerm.toLowerCase();

  //   const filteredRules = rules.filter((rule) => {
  //     const name = (rule.name ?? '').toLowerCase();
  //     const description = (rule.description ?? '').toLowerCase();

  //     const matchesSearch =
  //       name.includes(safeSearch) || description.includes(safeSearch);

  //     const matchesGroup =
  //       filterGroup === 'all' || rule.rule_group_id === filterGroup;

  //     const matchesStatus =
  //       filterStatus === 'all' ||
  //       (filterStatus === 'active' && rule.is_active) ||
  //       (filterStatus === 'inactive' && !rule.is_active);

  //     return matchesSearch && matchesGroup && matchesStatus;
  //   });

  //   const handleToggleActive = async (ruleId: string, currentStatus: boolean) => {
  //     try {
  //       await updateRule(ruleId, { is_active: !currentStatus });
  //     } catch (err) {
  //       console.error('Error toggling rule status:', err);
  //     }
  //   };

  //   const handleDelete = async (ruleId: string, ruleName: string | null) => {
  //     const displayName = ruleName ?? 'this rule';

  //     if (
  //       window.confirm(
  //         `Are you sure you want to delete "${displayName}"? This action cannot be undone.`
  //       )
  //     ) {
  //       try {
  //         await deleteRule(ruleId);
  //       } catch (err) {
  //         console.error('Error deleting rule:', err);
  //       }
  //     }
  //   };
  //   if (loading) {
  //     return (
  //       <div className="p-12 text-center">
  //         <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  //         <p className="mt-4 text-slate-600">Loading rules...</p>
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="p-6">
  //       <div className="flex items-center justify-between mb-6">
  //         <h2 className="text-xl font-bold text-slate-900">Rules Management</h2>
  //         <button
  //           onClick={onCreateNew}
  //           className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
  //         >
  //           <Plus className="w-4 h-4" />
  //           Create New Rule
  //         </button>
  //       </div>

  //       <div className="flex gap-4 mb-6">
  //         <div className="flex-1 relative">
  //           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
  //           <input
  //             type="text"
  //             placeholder="Search rules..."
  //             value={searchTerm}
  //             onChange={(e) => setSearchTerm(e.target.value)}
  //             className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  //           />
  //         </div>
  //         <select
  //           value={filterGroup}
  //           onChange={(e) => setFilterGroup(e.target.value)}
  //           className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  //         >
  //           <option value="all">All Groups</option>
  //           {ruleGroups.map((group) => (
  //             <option key={group.id} value={group.id}>
  //               {group.name}
  //             </option>
  //           ))}
  //         </select>
  //         <select
  //           value={filterStatus}
  //           onChange={(e) => setFilterStatus(e.target.value)}
  //           className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  //         >
  //           <option value="all">All Status</option>
  //           <option value="active">Active</option>
  //           <option value="inactive">Inactive</option>
  //         </select>
  //       </div>

  //       {filteredRules.length === 0 ? (
  //         <div className="text-center py-12">
  //           <p className="text-slate-600">
  //             {searchTerm || filterGroup !== 'all' || filterStatus !== 'all'
  //               ? 'No rules match your filters'
  //               : 'No rules created yet. Click "Create New Rule" to get started.'}
  //           </p>
  //         </div>
  //       ) : (
  //         <div className="space-y-3">
  //           {filteredRules.map((rule) => (
  //             <div
  //               key={rule.id}
  //               className="border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors"
  //             >
  //               <div className="flex items-start justify-between">
  //                 <div className="flex-1">
  //                   <div className="flex items-center gap-3 mb-2">
  //                     <h3 className="text-lg font-semibold text-slate-900">
  //                       {rule.name}
  //                     </h3>
  //                     <span
  //                       className={`px-2 py-1 text-xs font-medium rounded-full ${
  //                         rule.is_active
  //                           ? 'bg-green-100 text-green-700'
  //                           : 'bg-slate-100 text-slate-600'
  //                       }`}
  //                     >
  //                       {rule.is_active ? 'Active' : 'Inactive'}
  //                     </span>
  //                     <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
  //                       Priority: {rule.priority}
  //                     </span>
  //                   </div>
  //                   {rule.description && (
  //                     <p className="text-sm text-slate-600 mb-2">
  //                       {rule.description}
  //                     </p>
  //                   )}
  //                   <div className="flex items-center gap-4 text-xs text-slate-500">
  //                     <span>Version {rule.version}</span>
  //                     <span>
  //                       Created {new Date(rule.created_at).toLocaleDateString()}
  //                     </span>
  //                   </div>
  //                 </div>
  //                 <div className="flex items-center gap-2">
  //                   <button
  //                     onClick={() => handleToggleActive(rule.id, rule.is_active)}
  //                     className={`p-2 rounded-lg transition-colors ${
  //                       rule.is_active
  //                         ? 'text-green-600 hover:bg-green-50'
  //                         : 'text-slate-400 hover:bg-slate-50'
  //                     }`}
  //                     title={rule.is_active ? 'Deactivate' : 'Activate'}
  //                   >
  //                     {rule.is_active ? (
  //                       <Power className="w-4 h-4" />
  //                     ) : (
  //                       <PowerOff className="w-4 h-4" />
  //                     )}
  //                   </button>
  //                   <button
  //                     onClick={() => onEdit(rule.id)}
  //                     className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
  //                     title="Edit rule"
  //                   >
  //                     <Edit2 className="w-4 h-4" />
  //                   </button>
  //                   <button
  //                     onClick={() => handleDelete(rule.id, rule.name)}
  //                     className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
  //                     title="Delete rule"
  //                   >
  //                     <Trash2 className="w-4 h-4" />
  //                   </button>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   );
  // }



 import { useState } from 'react';
import { Edit2, Plus, Search, Trash2, Power, PowerOff, Clock, Tag } from 'lucide-react';
import { useRules } from '../hooks/useRules';
import { useRuleGroups } from '../hooks/useRuleGroups';

interface RulesManagerProps {
  onEdit: (ruleId: string) => void;
  onCreateNew: () => void;
}

export default function RulesManager({ onEdit, onCreateNew }: RulesManagerProps) {
  const { rules, loading, deleteRule, updateRule, refetch } = useRules();
  const { ruleGroups } = useRuleGroups();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const safeSearch = searchTerm.toLowerCase();
  
  // ✅ IMPORTANT: Backend returns "active" field, not "is_active"
  const filteredRules = rules.filter((rule) => {
    const name = (rule.name ?? '').toLowerCase();
    const description = (rule.description ?? '').toLowerCase();
    const matchesSearch = name.includes(safeSearch) || description.includes(safeSearch);
    const matchesGroup = filterGroup === 'all' || rule.rule_group_id === filterGroup;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && rule.active) ||    // ✅ Use "active" not "is_active"
      (filterStatus === 'inactive' && !rule.active);   // ✅ Use "active" not "is_active"
    return matchesSearch && matchesGroup && matchesStatus;
  });

  // ✅ FIXED: Send correct field name "active" that backend expects
  const handleToggleActive = async (ruleId: string, currentStatus: boolean) => {
    try {
      // ✅ Send "active" field (backend expects this, not "is_active")
      await updateRule(ruleId, { active: !currentStatus });
      // ✅ ADDED: Refetch rules to update frontend with latest data
      await refetch();
    } catch (err) {
      console.error('Error toggling rule status:', err);
    }
  };

  const handleDelete = async (ruleId: string, ruleName: string | null) => {
    const displayName = ruleName ?? 'this rule';
    if (
      window.confirm(
        `Are you sure you want to delete "${displayName}"? This action cannot be undone.`
      )
    ) {
      try {
        await deleteRule(ruleId);
        // ✅ ADDED: Refetch rules after deletion
        await refetch();
      } catch (err) {
        console.error('Error deleting rule:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/20 mb-4">
            <div className="w-8 h-8 border-3 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-400">Loading rules...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Rules Management</h2>
          <p className="text-slate-400">Create and manage your policy rules</p>
        </div>
        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Create New Rule
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search rules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Group Filter */}
        <select
          value={filterGroup}
          onChange={(e) => setFilterGroup(e.target.value)}
          className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer"
        >
          <option value="all">All Groups</option>
          {ruleGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Rules List */}
      <div className="space-y-3">
        {filteredRules.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/50 rounded-lg border border-slate-700">
            <Tag className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 mb-2">
              {searchTerm || filterGroup !== 'all' || filterStatus !== 'all'
                ? 'No rules match your filters'
                : 'No rules created yet. Click "Create New Rule" to get started.'}
            </p>
            {!searchTerm && filterGroup === 'all' && filterStatus === 'all' && (
              <button
                onClick={onCreateNew}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Rule
              </button>
            )}
          </div>
        ) : (
          filteredRules.map((rule) => (
            <div
              key={rule.id}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-indigo-500/50 rounded-lg p-5 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/10"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Rule Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white truncate">{rule.name}</h3>
                    <div className="flex items-center gap-2">
                      {/* ✅ FIXED: Check "active" field, not "is_active" */}
                      {rule.active ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 border border-green-500/50 text-green-400 rounded-full text-xs font-medium">
                          <div className="w-2 h-2 rounded-full bg-green-400"></div>
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-600/30 border border-slate-600/50 text-slate-400 rounded-full text-xs font-medium">
                          <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                          Inactive
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/20 border border-indigo-500/50 text-indigo-400 rounded-full text-xs font-medium">
                        Priority: {rule.priority}
                      </span>
                    </div>
                  </div>

                  {rule.description && (
                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">{rule.description}</p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Version</span>
                      <span>{rule.version}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Created {new Date(rule.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* ✅ FIXED: Send "active" field when toggling */}
                  <button
                    onClick={() => handleToggleActive(rule.id, rule.active)}
                    className={`p-2.5 rounded-lg transition-all duration-200 ${
                      rule.active
                        ? 'text-green-400 hover:bg-green-500/20'
                        : 'text-slate-500 hover:bg-slate-700/50'
                    }`}
                    title={rule.active ? 'Deactivate' : 'Activate'}
                  >
                    {rule.active ? <Power className="w-5 h-5" /> : <PowerOff className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => onEdit(rule.id)}
                    className="p-2.5 text-indigo-400 hover:bg-indigo-500/20 rounded-lg transition-all duration-200"
                    title="Edit rule"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleDelete(rule.id, rule.name)}
                    className="p-2.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                    title="Delete rule"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {filteredRules.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-700 text-sm text-slate-400">
          Showing {filteredRules.length} of {rules.length} rules
        </div>
      )}
    </div>
  );
}