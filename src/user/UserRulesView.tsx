import React from "react";
import RulesManager from "../components/RulesManager";

const UserRulesView: React.FC = () => {
  return (
    <div>
      <p className="text-sm text-slate-400 mb-4">
        These are the currently active rules. You can view details but cannot modify them.
      </p>
      <RulesManager readOnly onEdit={() => {}} onCreateNew={() => {}} />
    </div>
  );
};

export default UserRulesView;

