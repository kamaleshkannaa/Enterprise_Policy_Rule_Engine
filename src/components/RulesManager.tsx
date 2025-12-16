import { useState } from 'react';
import { Edit2, Plus, Search, Trash2, Power, PowerOff } from 'lucide-react';
import { useRules } from '../hooks/useRules';
import { useRuleGroups } from '../hooks/useRuleGroups';

interface RulesManagerProps {
  onEdit: (ruleId: string) => void;
  onCreateNew: () => void;
}

export default function RulesManager({ onEdit, onCreateNew }: RulesManagerProps) {
  const { rules, loading, deleteRule, updateRule } = useRules();
  const { ruleGroups } = useRuleGroups();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredRules = rules.filter((rule) => {
    const matchesSearch =
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rule.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesGroup =
      filterGroup === 'all' || rule.rule_group_id === filterGroup;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && rule.is_active) ||
      (filterStatus === 'inactive' && !rule.is_active);
    return matchesSearch && matchesGroup && matchesStatus;
  });

  const handleToggleActive = async (ruleId: string, currentStatus: boolean) => {
    try {
      await updateRule(ruleId, { is_active: !currentStatus });
    } catch (err) {
      console.error('Error toggling rule status:', err);
    }
  };

  const handleDelete = async (ruleId: string, ruleName: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete the rule "${ruleName}"? This action cannot be undone.`
      )
    ) {
      try {
        await deleteRule(ruleId);
      } catch (err) {
        console.error('Error deleting rule:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-600">Loading rules...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Rules Management</h2>
        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create New Rule
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search rules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterGroup}
          onChange={(e) => setFilterGroup(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Groups</option>
          {ruleGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {filteredRules.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600">
            {searchTerm || filterGroup !== 'all' || filterStatus !== 'all'
              ? 'No rules match your filters'
              : 'No rules created yet. Click "Create New Rule" to get started.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRules.map((rule) => (
            <div
              key={rule.id}
              className="border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {rule.name}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        rule.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {rule.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                      Priority: {rule.priority}
                    </span>
                  </div>
                  {rule.description && (
                    <p className="text-sm text-slate-600 mb-2">
                      {rule.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>Version {rule.version}</span>
                    <span>
                      Created {new Date(rule.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive(rule.id, rule.is_active)}
                    className={`p-2 rounded-lg transition-colors ${
                      rule.is_active
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-slate-400 hover:bg-slate-50'
                    }`}
                    title={rule.is_active ? 'Deactivate' : 'Activate'}
                  >
                    {rule.is_active ? (
                      <Power className="w-4 h-4" />
                    ) : (
                      <PowerOff className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => onEdit(rule.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit rule"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(rule.id, rule.name)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete rule"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
