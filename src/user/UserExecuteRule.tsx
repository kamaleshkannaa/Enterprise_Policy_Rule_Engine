import React from "react";
import RuleTester from "../components/RuleTester";

const UserExecuteRule: React.FC = () => {
  return (
    <div>
      <p className="text-sm text-slate-400 mb-4">
        Select a rule and provide input to execute it and see the decision.
      </p>
      <RuleTester mode="user" />
    </div>
  );
};

export default UserExecuteRule;
