import React from "react";

const LeftSidebar = () => {
  return (
    <div className="w-64 border-r border-gray-800 p-4 flex flex-col">
      <div className="mb-6">
        <h2 className="font-semibold text-sm">open-resume</h2>
        <p className="text-xs text-gray-400">C:/Users/ANSH/open-resume</p>
      </div>

      <button className="bg-gray-900 border border-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-800">
        New session
      </button>
    </div>
  );
};

export default LeftSidebar;
