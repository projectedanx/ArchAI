
import React from 'react';
import { AuditEvent } from '../types';
import { ClipboardList, User, Bot } from 'lucide-react';

/**
 * Props for the AuditLog component.
 * @property {AuditEvent[]} events - The chronological list of events to display in the audit trail.
 */
interface AuditLogProps {
  events: AuditEvent[];
}

/**
 * Displays an immutable, chronological log of system actions.
 *
 * @param {AuditLogProps} props - The component props.
 * @returns {JSX.Element} The rendered AuditLog component.
 */
const AuditLog: React.FC<AuditLogProps> = ({ events }) => {
  return (
    <div className="w-80 border-l border-slate-800 bg-slate-900 flex flex-col hidden xl:flex">
      <div className="p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0">
        <h3 className="text-sm font-semibold text-slate-400 flex items-center gap-2 uppercase tracking-wider">
          <ClipboardList className="w-4 h-4" />
          Audit Trail
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {events.map((event) => (
          <div key={event.id} className="relative pl-4 border-l border-slate-800 pb-2">
            <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-slate-800 border border-slate-600" />
            <div className="flex flex-col gap-1">
              <span className="text-xs text-slate-500 font-mono">
                {new Date(event.timestamp).toLocaleTimeString()}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300">
                  {event.action}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                    event.actor === 'User' ? 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10' 
                    : event.actor === 'System' ? 'border-slate-500/30 text-slate-400 bg-slate-500/10'
                    : 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                }`}>
                    {event.actor}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                {event.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditLog;