import React, { useState } from "react";
import {
  BookOpen,
  PlayCircle,
  FileText,
  BarChart3,
  LogOut,
  Shield,
} from "lucide-react";
import UserRulesView from "./UserRulesView";
import UserExecuteRule from "./UserExecuteRule";
import UserDecisionLogs from "./UserDecisionLogs";
import UserAnalytics from "./UserAnalytics";
import { useAuth } from "../contexts/AuthContext";

type Tab = "rules" | "execute" | "logs" | "analytics";

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("rules");
  const { logout } = useAuth();

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "rules", label: "Rules", icon: BookOpen },
    { id: "execute", label: "Execute Rule", icon: PlayCircle },
    { id: "logs", label: "Decision Logs", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header - same style as admin */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-gradient-to-br from-indigo-500 to-teal-600 shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Policy Rule Engine</h1>
              <p className="text-sm text-slate-400">
                View available rules and execute them with your own data.
              </p>
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

      {/* Navigation Tabs - same style as admin, but user tabs */}
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
                    isActive ? "text-white" : "text-slate-400 hover:text-slate-300"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-indigo-400" : "group-hover:text-indigo-400/50"
                    }`}
                  />
                  <span>{tab.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-teal-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content – uses user components */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "rules" && <UserRulesView />}
        {activeTab === "execute" && <UserExecuteRule />}
        {activeTab === "logs" && <UserDecisionLogs />}
        {activeTab === "analytics" && <UserAnalytics />}
      </main>
    </div>
  );
};

export default UserDashboard;
