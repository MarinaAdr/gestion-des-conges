import React from 'react';

const SummaryCard = ({
  icon,
  text,
  number,
  color = 'from-blue-500 to-indigo-500',
}) => {
  return (
    <div className="w-[400px] group relative rounded-lg p-px bg-gradient-to-b from-gray-400/50 to-gray-800/25 hover:from-gray-800 hover:to-violet-800/50 transition-all duration-300">
      <div className="relative rounded-lg bg-white h-32 w-full backdrop-blur-xl transition-all duration-300 group-hover:translate-y-[-2px]">
        <div className="flex h-full">
          {/* Icon container - takes up 1/3 of the width */}
          <div
            className={`w-1/3 h-full flex items-center justify-center rounded-l-lg bg-gradient-to-br ${color}`}
          >
            <span className="text-4xl text-white">
              {icon}
            </span>
          </div>

          {/* Content - takes up 2/3 of the width */}
          <div className="w-2/3 p-6 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-slate-800">
              {text}
            </h3>
            {number &&
              <p className="text-2xl text-center font-semibold text-slate-600 mt-1">
                {number}
              </p>}
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </div>
  );
};

export default SummaryCard;
