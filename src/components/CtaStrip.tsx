/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { EditableText } from "./EditableText";
import { PortfolioData } from "../types";
import { BookOpen, Sparkles } from "lucide-react";

interface CtaStripProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
  isEditing: boolean;
}

export function CtaStrip({ data, onChange, isEditing }: CtaStripProps) {
  const updateField = (key: keyof PortfolioData, value: any) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  return (
    <div className="bg-gradient-to-r from-gold to-gold-light text-navy-dark px-6 md:px-12 lg:px-20 py-20 text-center relative overflow-hidden">
      {/* Decorative vector overlays */}
      <div className="absolute top-[-30px] left-[5%] w-24 h-24 border border-navy/10 rounded-full pointer-events-none opacity-40"></div>
      <div className="absolute bottom-[-40px] right-[8%] w-40 h-40 border border-navy/10 rounded-full pointer-events-none opacity-30"></div>
      
      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        {/* Title */}
        <h2 className="font-serif text-3xl md:text-5xl lg:text-5xl font-light text-navy leading-tight mb-4 tracking-normal">
          <EditableText
            value={data.ctaStripTitle}
            onChange={(val) => updateField("ctaStripTitle", val)}
            isEditing={isEditing}
            className="text-navy"
          />
        </h2>

        {/* Subtitle */}
        <p className="text-xs md:text-sm lg:text-base text-navy/70 leading-relaxed font-sans font-medium mb-8 max-w-xl">
          <EditableText
            value={data.ctaStripSubheading}
            onChange={(val) => updateField("ctaStripSubheading", val)}
            isEditing={isEditing}
            type="textarea"
            className="text-navy"
          />
        </p>

        {/* Click-through links */}
        <div className="w-full flex flex-col items-center">
          {isEditing ? (
            <div className="bg-navy p-3 border border-gold/40 rounded w-full max-w-sm text-left flex flex-col gap-1.5 shadow-xl">
              <span className="text-[10px] text-gold/70 font-mono">Guide Link URL:</span>
              <input
                type="text"
                className="bg-navy-dark text-white text-xs p-2 rounded border border-gold/30 w-full"
                value={data.ctaStripLink}
                onChange={(e) => updateField("ctaStripLink", e.target.value)}
              />
              <span className="text-[10px] text-gold/70 font-mono mt-1">Button Text:</span>
              <EditableText
                value={data.ctaStripBtnText}
                onChange={(val) => updateField("ctaStripBtnText", val)}
                isEditing={true}
                className="text-gold text-xs font-bold leading-normal bg-navy-mid text-center py-1 rounded"
              />
            </div>
          ) : (
            <a
              href={data.ctaStripLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-navy text-gold font-bold text-xs uppercase tracking-wider px-10 py-5 transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_16px_48px_rgba(11,28,58,0.25)] select-none"
              style={{
                clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              <BookOpen size={14} />
              <span>{data.ctaStripBtnText}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
