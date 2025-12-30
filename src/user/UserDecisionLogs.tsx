import React from "react";
import DecisionLogs from "../components/DecisionLogs";

const UserDecisionLogs: React.FC = () => {
  return (
    <div>
      <p className="text-sm text-slate-400 mb-4">
        Decision history for rules you executed.
      </p>
      <DecisionLogs scope="me" />
    </div>
  );
};

export default UserDecisionLogs;
