import React from 'react';

export const StatCard = ({ title, value, icon: Icon, change, color = 'indigo' }) => {
  const colorMap = {
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    violet: 'bg-violet-50 text-violet-600 border-violet-100',
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        {change && (
          <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
            <span>↑</span> {change}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-xl border ${colorMap[color] || colorMap.indigo}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};
