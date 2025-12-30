import React from "react";
import Analytics from "../components/Analytics";

const UserAnalytics: React.FC = () => {
  return (
    <div>
      <p className="text-sm text-slate-400 mb-4">
        Analytics based on your own decisions.
      </p>
      <Analytics scope="me" />
    </div>
  );
};

export default UserAnalytics;
