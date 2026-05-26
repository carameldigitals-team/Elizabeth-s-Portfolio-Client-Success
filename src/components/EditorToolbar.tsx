/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Edit2, Eye, RotateCcw, Mail, Settings2, Download, Check, Sparkles, X } from "lucide-react";

interface EditorToolbarProps {
  isEditing: boolean;
  onToggleEdit: () => void;
  onReset: () => void;
  onOpenInbox: () => void;
  inboxCount: number;
  onExport: () => void;
}

export function EditorToolbar({
  isEditing,
  onToggleEdit,
  onReset,
  onOpenInbox,
  inboxCount,
  onExport,
}: EditorToolbarProps) {
  const [collapsed, setCollapsed] = useState(true);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleResetClick = () => {
    if (resetConfirm) {
      onReset();
      setResetConfirm(false);
    } else {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 4000); // Reset confirm safety
    }
  };

  const handleExportClick = () => {
    onExport();
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-100 flex flex-col items-end gap-3 font-sans">
      {/* Expanded Actions Panel */}
      {!collapsed && (
        <div className="bg-navy border border-gold/30 p-5 shadow-2xl flex flex-col gap-4 animate-fadeUp rounded-md min-w-[260px] max-w-[320px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gold/15 pb-2">
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold flex items-center gap-1.5">
              <Sparkles size={12} className="text-gold animate-pulse" />
              <span>Portfolio Editor</span>
            </span>
            <button
              onClick={() => {
                setCollapsed(true);
                setResetConfirm(false);
              }}
              className="text-white/60 hover:text-white"
            >
              <X size={14} />
            </button>
          </div>

          <p className="text-[11px] text-text-muted leading-relaxed font-light">
            Toggle Edit Mode to click and refine headers, stats, biographies, and links directly on the screen.
          </p>

          <div className="flex flex-col gap-2">
            {/* Toggle Edit Button */}
            <button
              onClick={onToggleEdit}
              className={`w-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold py-3 px-4 transition-all duration-300 pointer-events-auto cursor-pointer ${
                isEditing
                  ? "bg-gold text-navy hover:bg-gold-light"
                  : "bg-navy-mid border border-gold/45 text-gold hover:bg-navy-light"
              }`}
              style={{
                clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))"
              }}
            >
              {isEditing ? (
                <>
                  <Eye size={14} />
                  <span>Preview Live Mode</span>
                </>
              ) : (
                <>
                  <Edit2 size={13} />
                  <span>Interactive Edit Mode</span>
                </>
              )}
            </button>

            {/* View Inbox Trigger */}
            <button
              onClick={onOpenInbox}
              className="w-full flex items-center justify-between bg-navy-light/60 hover:bg-navy-light text-white text-xs font-semibold py-2.5 px-3 border border-gold/15 rounded transition-all"
            >
              <span className="flex items-center gap-2">
                <Mail size={13} className="text-gold/80" />
                <span>Local Form Inbox</span>
              </span>
              <span className="bg-gold text-navy font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md animate-pulse">
                {inboxCount}
              </span>
            </button>

            {/* Export JSON Config */}
            <button
              onClick={handleExportClick}
              className="w-full flex items-center justify-center gap-2 bg-navy-light/45 hover:bg-navy-light text-white text-xs font-semibold py-2 px-3 border border-white/10 rounded transition-all"
            >
              {exportSuccess ? (
                <>
                  <Check size={13} className="text-green-400" />
                  <span className="text-green-400">Export Copied!</span>
                </>
              ) : (
                <>
                  <Download size={13} className="text-gold/80" />
                  <span>Export JSON Schema</span>
                </>
              )}
            </button>

            {/* Reset Safety Trigger */}
            <button
              onClick={handleResetClick}
              className={`w-full flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider py-2 px-3 rounded border transition-colors ${
                resetConfirm
                  ? "bg-red-950/40 border-red-500/40 text-red-300 hover:bg-red-900/50"
                  : "bg-transparent border-white/5 text-white/50 hover:bg-white/[0.02] hover:text-white"
              }`}
            >
              <RotateCcw size={11} />
              <span>{resetConfirm ? "Click Again to Confirm Reset" : "Restore Defaults"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Sparkle Hub Button */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="bg-navy border border-gold hover:border-gold-light p-3.5 shadow-2xl rounded-full text-gold hover:text-white hover:scale-105 transition-all text-sm flex items-center gap-2"
          title="Open Customization Toolkit"
        >
          <Settings2 size={18} className="animate-spin-slow text-gold animate-[spin_5s_linear_infinite]" />
          <span className="text-xs uppercase tracking-widest font-bold pr-1 select-none">Edit Portfolio</span>
        </button>
      )}
    </div>
  );
}
export default EditorToolbar;
