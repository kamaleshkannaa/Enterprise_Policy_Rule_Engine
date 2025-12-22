// import { useState } from 'react';
// import { BarChart3, BookOpen, FileText, PlayCircle, Settings } from 'lucide-react';
// import RulesManager from './RulesManager';
// import RuleBuilder from './RuleBuilder';
// import DecisionLogs from './DecisionLogs';
// import RuleTester from './RuleTester';
// import Analytics from './Analytics';

// type Tab = 'rules' | 'builder' | 'logs' | 'tester' | 'analytics';

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState<Tab>('rules');
//   const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);

//   const tabs = [
//     { id: 'rules' as Tab, label: 'Rules', icon: BookOpen },
//     { id: 'builder' as Tab, label: 'Rule Builder', icon: Settings },
//     { id: 'tester' as Tab, label: 'Test Rules', icon: PlayCircle },
//     { id: 'logs' as Tab, label: 'Decision Logs', icon: FileText },
//     { id: 'analytics' as Tab, label: 'Analytics', icon: BarChart3 },
//   ];

//   const handleEditRule = (ruleId: string) => {
//     setSelectedRuleId(ruleId);
//     setActiveTab('builder');
//   };

//   const handleCreateNew = () => {
//     setSelectedRuleId(null);
//     setActiveTab('builder');
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-slate-900">
//                 Policy Rule Engine
//               </h1>
//               <p className="text-sm text-slate-600 mt-1">
//                 Enterprise Decision Platform
//               </p>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2 text-sm text-slate-600">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                 System Active
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-6 py-6">
//         <nav className="flex gap-2 mb-6 bg-white rounded-lg p-1 border border-slate-200">
//           {tabs.map((tab) => {
//             const Icon = tab.icon;
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-2 px-4 py-2.5 rounded-md transition-all ${
//                   activeTab === tab.id
//                     ? 'bg-blue-600 text-white shadow-sm'
//                     : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
//                 }`}
//               >
//                 <Icon className="w-4 h-4" />
//                 <span className="font-medium text-sm">{tab.label}</span>
//               </button>
//             );
//           })}
//         </nav>

//         <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
//           {activeTab === 'rules' && (
//             <RulesManager onEdit={handleEditRule} onCreateNew={handleCreateNew} />
//           )}
//           {activeTab === 'builder' && (
//             <RuleBuilder
//               ruleId={selectedRuleId}
//               onSave={() => setActiveTab('rules')}
//               onCancel={() => setActiveTab('rules')}
//             />
//           )}
//           {activeTab === 'logs' && <DecisionLogs />}
//           {activeTab === 'tester' && <RuleTester />}
//           {activeTab === 'analytics' && <Analytics />}
//         </div>
//       </div>
//     </div>
//   );
// }






// import { useState } from 'react';
// import {
//   BarChart3,
//   BookOpen,
//   FileText,
//   PlayCircle,
//   Settings,
//   LogOut
// } from 'lucide-react';
// import RulesManager from './RulesManager';
// import RuleBuilder from './RuleBuilder';
// import DecisionLogs from './DecisionLogs';
// import RuleTester from './RuleTester';
// import Analytics from './Analytics';
// import { useAuth } from '../contexts/AuthContext';

// type Tab = 'rules' | 'builder' | 'logs' | 'tester' | 'analytics';

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState<Tab>('rules');
//   const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);
//   const { logout } = useAuth(); // ✅ ADD

//   const tabs = [
//     { id: 'rules' as Tab, label: 'Rules', icon: BookOpen },
//     { id: 'builder' as Tab, label: 'Rule Builder', icon: Settings },
//     { id: 'tester' as Tab, label: 'Test Rules', icon: PlayCircle },
//     { id: 'logs' as Tab, label: 'Decision Logs', icon: FileText },
//     { id: 'analytics' as Tab, label: 'Analytics', icon: BarChart3 },
//   ];

//   const handleEditRule = (ruleId: string) => {
//     setSelectedRuleId(ruleId);
//     setActiveTab('builder');
//   };

//   const handleCreateNew = () => {
//     setSelectedRuleId(null);
//     setActiveTab('builder');
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-slate-900">
//                 Policy Rule Engine
//               </h1>
//               <p className="text-sm text-slate-600 mt-1">
//                 Enterprise Decision Platform
//               </p>
//             </div>

//             {/* RIGHT SIDE */}
//             <div className="flex items-center gap-6">
//               <div className="flex items-center gap-2 text-sm text-slate-600">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                 System Active
//               </div>

//               {/* ✅ LOGOUT BUTTON */}
//               <button
//                 onClick={logout}
//                 className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
//               >
//                 <LogOut className="w-4 h-4" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-6 py-6">
//         <nav className="flex gap-2 mb-6 bg-white rounded-lg p-1 border border-slate-200">
//           {tabs.map((tab) => {
//             const Icon = tab.icon;
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-2 px-4 py-2.5 rounded-md transition-all ${
//                   activeTab === tab.id
//                     ? 'bg-blue-600 text-white shadow-sm'
//                     : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
//                 }`}
//               >
//                 <Icon className="w-4 h-4" />
//                 <span className="font-medium text-sm">{tab.label}</span>
//               </button>
//             );
//           })}
//         </nav>

//         <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
//           {activeTab === 'rules' && (
//             <RulesManager onEdit={handleEditRule} onCreateNew={handleCreateNew} />
//           )}
//           {activeTab === 'builder' && (
//             <RuleBuilder
//               ruleId={selectedRuleId}
//               onSave={() => setActiveTab('rules')}
//               onCancel={() => setActiveTab('rules')}
//             />
//           )}
//           {activeTab === 'logs' && <DecisionLogs />}
//           {activeTab === 'tester' && <RuleTester />}
//           {activeTab === 'analytics' && <Analytics />}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import {
  BarChart3,
  BookOpen,
  FileText,
  PlayCircle,
  Settings,
  LogOut,
  Shield
} from 'lucide-react';
import RulesManager from './RulesManager';
import RuleBuilder from './RuleBuilder';
import DecisionLogs from './DecisionLogs';
import RuleTester from './RuleTester';
import Analytics from './Analytics';
import { useAuth } from '../contexts/AuthContext';

type Tab = 'rules' | 'builder' | 'logs' | 'tester' | 'analytics';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('rules');
  const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);
  const { logout } = useAuth();

  const tabs = [
    { id: 'rules' as Tab, label: 'Rules', icon: BookOpen },
    { id: 'builder' as Tab, label: 'Rule Builder', icon: Settings },
    { id: 'tester' as Tab, label: 'Test Rules', icon: PlayCircle },
    { id: 'logs' as Tab, label: 'Decision Logs', icon: FileText },
    { id: 'analytics' as Tab, label: 'Analytics', icon: BarChart3 },
  ];

  const handleEditRule = (ruleId: string) => {
    setSelectedRuleId(ruleId);
    setActiveTab('builder');
  };

  const handleCreateNew = () => {
    setSelectedRuleId(null);
    setActiveTab('builder');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-gradient-to-br from-indigo-500 to-teal-600 shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Policy Rule Engine</h1>
              <p className="text-sm text-slate-400">Enterprise Decision Platform</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-200 border border-slate-600 hover:border-red-500/50"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-700 bg-slate-900/30 backdrop-blur-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-3.5 font-medium transition-all duration-200 group ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'group-hover:text-indigo-400/50'}`} />
                  <span>{tab.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-teal-500"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'rules' && (
          <RulesManager onEdit={handleEditRule} onCreateNew={handleCreateNew} />
        )}
        {activeTab === 'builder' && (
          <RuleBuilder
            ruleId={selectedRuleId}
            onSave={() => setActiveTab('rules')}
            onCancel={() => setActiveTab('rules')}
          />
        )}
        {activeTab === 'logs' && <DecisionLogs />}
        {activeTab === 'tester' && <RuleTester />}
        {activeTab === 'analytics' && <Analytics />}
      </main>
    </div>
  );
}