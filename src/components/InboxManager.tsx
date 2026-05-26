/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ReceivedInquiry } from "../types";
import { Mail, Calendar, User, Trash2, X, AlertCircle } from "lucide-react";

interface InboxManagerProps {
  inquiries: ReceivedInquiry[];
  onDeleteInquiry: (id: string) => void;
  onClearAll: () => void;
  onClose: () => void;
}

export function InboxManager({
  inquiries,
  onDeleteInquiry,
  onClearAll,
  onClose,
}: InboxManagerProps) {
  return (
    <div className="fixed inset-0 z-100 bg-navy-dark/90 backdrop-blur-md flex justify-end animate-fadeIn">
      <div className="w-full max-w-lg bg-navy border-l border-gold/20 h-full flex flex-col justify-between py-6 px-6 md:px-8 shadow-2xl overflow-hidden animate-fadeUp">
        {/* Header bar */}
        <div className="border-b border-gold/15 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gold/10 text-gold border border-gold/20 flex items-center justify-center">
              <Mail size={16} />
            </div>
            <div>
              <h3 className="font-serif text-lg text-white font-semibold">Business Portfolio Inbox</h3>
              <p className="text-[10px] text-text-muted mt-0.5">
                {inquiries.length} {inquiries.length === 1 ? "Inquiry" : "Inquiries"} Logged Locally
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-gold hover:bg-white/5 p-2 rounded transition-colors"
            title="Close panel"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content panel */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4 pr-1">
          {inquiries.length === 0 ? (
            <div className="h-44 flex flex-col items-center justify-center text-center p-6 bg-navy-mid/35 border border-gold/10 rounded">
              <AlertCircle size={32} className="text-gold/40 mb-2" />
              <p className="font-serif text-sm text-white/90">No Inquiries Found</p>
              <p className="text-xs text-text-muted max-w-[240px] mt-2 font-light">
                Submit a test message via the contact form on your portfolio to see it log here instantly.
              </p>
            </div>
          ) : (
            inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="bg-navy-mid border border-gold/10 p-5 hover:border-gold/30 transition-colors relative group rounded-sm"
              >
                {/* Delete direct row button */}
                <button
                  onClick={() => onDeleteInquiry(inquiry.id)}
                  className="absolute top-4 right-4 text-white/50 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded transition-colors"
                  title="Delete message"
                >
                  <Trash2 size={12} />
                </button>

                <div className="space-y-3">
                  {/* Sender Metadata */}
                  <div className="flex flex-col gap-1 text-[11px] text-text-muted">
                    <span className="flex items-center gap-1 font-semibold text-white/90">
                      <User size={12} className="text-gold/60 shrink-0" />
                      <span>{inquiry.fullName}</span>
                    </span>
                    <span className="font-mono text-[10px] block opacity-85 ml-4">
                      {inquiry.email}
                    </span>
                  </div>

                  {/* Subject text */}
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gold/80 block font-semibold mb-0.5">Subject</span>
                    <h4 className="text-xs text-white font-serif">{inquiry.subject}</h4>
                  </div>

                  {/* Core Message item */}
                  <div className="bg-navy/50 p-3.5 border border-gold/10 text-xs text-white/80 leading-relaxed max-h-40 overflow-y-auto font-light whitespace-pre-wrap">
                    {inquiry.message}
                  </div>

                  {/* Time notation */}
                  <div className="flex items-center gap-1 font-mono text-[9px] text-text-muted/75">
                    <Calendar size={10} />
                    <span>{inquiry.timestamp}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer controls */}
        <div className="border-t border-gold/15 pt-4 space-y-3">
          {inquiries.length > 0 && (
            <button
              onClick={onClearAll}
              className="w-full bg-red-950/20 border border-red-500/20 text-red-300 hover:bg-red-950/40 hover:text-red-200 transition-colors text-xs font-semibold uppercase tracking-wider py-3 "
            >
              Clear All Message Logs
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full bg-navy-mid hover:bg-navy-light text-white text-xs font-semibold uppercase tracking-wider py-3 border border-gold/15 transition-colors"
          >
            Back to Portfolio View
          </button>
        </div>
      </div>
    </div>
  );
}
