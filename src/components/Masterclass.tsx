/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { EditableText } from "./EditableText";
import { PortfolioData, WaveBadgeItem } from "../types";
import { CreditCard, Rocket, Sparkles } from "lucide-react";

interface MasterclassProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
  isEditing: boolean;
}

export function Masterclass({ data, onChange, isEditing }: MasterclassProps) {
  const updateField = (key: keyof PortfolioData, value: any) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const handleBadgeChange = (id: string, field: keyof WaveBadgeItem, val: string) => {
    const updatedBadges = data.masterclassBadges.map((badge) => {
      if (badge.id === id) {
        return { ...badge, [field]: val };
      }
      return badge;
    });
    updateField("masterclassBadges", updatedBadges);
  };

  return (
    <section className="bg-gradient-to-br from-navy-light to-navy px-6 md:px-12 lg:px-16 py-24 relative overflow-hidden" id="masterclass">
      {/* Decorative WAVE ambient lettering underlay mimicking CSS original */}
      <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 rotate-90 font-serif text-[14rem] md:text-[20rem] font-bold text-gold/[0.03] select-none pointer-events-none tracking-normal leading-none">
        WAVE
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Side: W.A.V.E letters and descriptors */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-gold block"></span>
            <span className="text-[10px] font-semibold text-gold uppercase tracking-[0.18em]">Signature Programme</span>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl font-light text-white leading-tight mb-4">
            <EditableText
              value={data.masterclassHeading}
              onChange={(val) => updateField("masterclassHeading", val)}
              isEditing={isEditing}
            />{" "}
            <span className="text-gold italic font-normal">
              <EditableText
                value={data.masterclassEmphasis}
                onChange={(val) => updateField("masterclassEmphasis", val)}
                isEditing={isEditing}
              />
            </span>
            <br />
            <EditableText
              value={data.masterclassSubheading}
              onChange={(val) => updateField("masterclassSubheading", val)}
              isEditing={isEditing}
            />
          </h2>

          <div className="space-y-4 my-8 max-w-xl">
            {data.masterclassBadges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-start gap-5 p-5 bg-white/[0.03] hover:bg-gold/[0.05] border-l-2 border-gold transition-colors duration-200 group"
              >
                {/* Huge letter accent */}
                <div className="font-serif text-3xl md:text-4xl font-black text-gold/40 group-hover:text-gold transition-colors min-w-[36px] select-none leading-none">
                  <EditableText
                    value={badge.letter}
                    onChange={(val) => handleBadgeChange(badge.id, "letter", val)}
                    isEditing={isEditing}
                  />
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white mb-1 tracking-wide">
                    <EditableText
                      value={badge.title}
                      onChange={(val) => handleBadgeChange(badge.id, "title", val)}
                      isEditing={isEditing}
                    />
                  </h4>
                  <p className="text-xs md:text-sm text-text-muted leading-relaxed font-sans font-light">
                    <EditableText
                      value={badge.desc}
                      onChange={(val) => handleBadgeChange(badge.id, "desc", val)}
                      isEditing={isEditing}
                      type="textarea"
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Selar Enrollment Card box */}
        <div className="lg:col-span-5">
          <div className="bg-gold/[0.06] border border-gold/25 p-8 md:p-12 text-center relative rounded-sm">
            {/* Dynamic label */}
            <p className="font-serif text-[11px] font-bold tracking-[0.15em] uppercase text-gold mb-4">
              <EditableText
                value={data.masterclassCtaLabel}
                onChange={(val) => updateField("masterclassCtaLabel", val)}
                isEditing={isEditing}
              />
            </p>

            {/* Title greeting */}
            <h3 className="font-serif text-2xl md:text-3xl font-light text-white leading-snug mb-4">
              <EditableText
                value={data.masterclassCtaTitle}
                onChange={(val) => updateField("masterclassCtaTitle", val)}
                isEditing={isEditing}
              />
            </h3>

            {/* Sub description */}
            <p className="text-xs md:text-sm text-text-muted leading-relaxed mb-8">
              <EditableText
                value={data.masterclassCtaSub}
                onChange={(val) => updateField("masterclassCtaSub", val)}
                isEditing={isEditing}
                type="textarea"
              />
            </p>

            {/* Trigger Button link */}
            <div className="w-full flex flex-col items-center">
              {isEditing ? (
                <div className="bg-navy p-3 border border-gold/40 rounded w-full text-left flex flex-col gap-1.5 mb-4">
                  <span className="text-[10px] text-gold/70 font-mono">Checkout Target URL:</span>
                  <input
                    type="text"
                    className="bg-navy-dark text-white text-xs p-2 rounded border border-gold/30 w-full"
                    value={data.masterclassCtaLink}
                    onChange={(e) => updateField("masterclassCtaLink", e.target.value)}
                  />
                  <span className="text-[10px] text-gold/70 font-mono mt-1">Button Text:</span>
                  <EditableText
                    value={data.masterclassCtaBtnText}
                    onChange={(val) => updateField("masterclassCtaBtnText", val)}
                    isEditing={true}
                    className="text-navy text-xs font-bold leading-normal bg-gold text-center py-1 rounded"
                  />
                </div>
              ) : (
                <a
                  href={data.masterclassCtaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-gold to-gold-light text-navy font-bold text-xs uppercase tracking-wider px-8 py-4 mb-4 transition-transform duration-300 hover:scale-103 hover:shadow-[0_12px_35px_rgba(201,168,76,0.3)] select-none"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                  }}
                >
                  {data.masterclassCtaBtnText}
                </a>
              )}
            </div>

            {/* Alert subtext */}
            <p className="text-[10px] md:text-xs text-text-muted font-light mt-4 flex items-center justify-center gap-1.5">
              <CreditCard size={12} className="text-gold/80" />
              <span>
                <EditableText
                  value={data.masterclassCheckoutAlert}
                  onChange={(val) => updateField("masterclassCheckoutAlert", val)}
                  isEditing={isEditing}
                />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
