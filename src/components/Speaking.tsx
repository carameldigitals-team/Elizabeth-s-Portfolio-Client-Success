/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { EditableText } from "./EditableText";
import { PortfolioData, SpeakingItem } from "../types";
import { Calendar, Plus, Trash, Mic } from "lucide-react";

interface SpeakingProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
  isEditing: boolean;
}

export function Speaking({ data, onChange, isEditing }: SpeakingProps) {
  const updateField = (key: keyof PortfolioData, value: any) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const handleGigChange = (id: string, field: keyof SpeakingItem, val: string) => {
    const updatedList = data.speakingList.map((gig) => {
      if (gig.id === id) {
        return { ...gig, [field]: val };
      }
      return gig;
    });
    updateField("speakingList", updatedList);
  };

  const addGig = () => {
    const id = `spk-${Date.now()}`;
    const newGig: SpeakingItem = {
      id,
      year: "2026",
      type: "Panelist",
      event: "New Digital Summit",
      topic: "Describe the panel discussion or presentation context focusing on AI, monetization or digital skills.",
    };
    updateField("speakingList", [...data.speakingList, newGig]);
  };

  const removeGig = (id: string) => {
    const updatedList = data.speakingList.filter((gig) => gig.id !== id);
    updateField("speakingList", updatedList);
  };

  return (
    <section className="bg-navy-mid px-6 md:px-12 lg:px-16 py-24 border-t border-gold/10" id="speaking">
      <div className="inline-flex items-center gap-2 mb-4">
        <span className="w-6 h-[1px] bg-gold block"></span>
        <span className="text-[10px] font-semibold text-gold uppercase tracking-[0.18em]">Speaking</span>
      </div>

      <h2 className="font-serif text-3xl md:text-5xl font-light text-white leading-tight mb-4">
        <EditableText
          value={data.speakingHeading}
          onChange={(val) => updateField("speakingHeading", val)}
          isEditing={isEditing}
        />
        <br />
        <span className="text-gold italic font-normal">
          <EditableText
            value={data.speakingEmphasis}
            onChange={(val) => updateField("speakingEmphasis", val)}
            isEditing={isEditing}
          />
        </span>
      </h2>

      <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans font-light max-w-2xl mb-12">
        <EditableText
          value={data.speakingSubheading}
          onChange={(val) => updateField("speakingSubheading", val)}
          isEditing={isEditing}
          type="textarea"
        />
      </p>

      {/* Speaking events grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.speakingList.map((gig) => (
          <div
            key={gig.id}
            className="p-8 bg-navy border border-gold/10 hover:border-gold/35 transition-colors duration-300 relative flex flex-col justify-between"
          >
            <div>
              {/* Event Metadata row */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1.5 text-gold text-xs font-semibold">
                  <Calendar size={14} className="opacity-80" />
                  <EditableText
                    value={gig.year}
                    onChange={(val) => handleGigChange(gig.id, "year", val)}
                    isEditing={isEditing}
                    className="font-mono tracking-wider"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-semibold uppercase tracking-wider bg-navy-light text-text-muted px-2.5 py-1 border border-gold/15 flex items-center gap-1">
                    <Mic size={10} className="text-gold/60" />
                    <EditableText
                      value={gig.type}
                      onChange={(val) => handleGigChange(gig.id, "type", val)}
                      isEditing={isEditing}
                    />
                  </span>

                  {isEditing && (
                    <button
                      onClick={() => removeGig(gig.id)}
                      className="text-red-400 hover:text-red-500 hover:bg-red-500/10 p-1 rounded transition-colors"
                      title="Remove gig"
                    >
                      <Trash size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* Event Name */}
              <h3 className="font-serif text-lg md:text-xl font-semibold text-white mb-3">
                <EditableText
                  value={gig.event}
                  onChange={(val) => handleGigChange(gig.id, "event", val)}
                  isEditing={isEditing}
                />
              </h3>

              {/* Topic */}
              <p className="text-xs md:text-sm text-text-muted leading-relaxed font-sans font-light">
                <EditableText
                  value={gig.topic}
                  onChange={(val) => handleGigChange(gig.id, "topic", val)}
                  isEditing={isEditing}
                  type="textarea"
                />
              </p>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={addGig}
            className="inline-flex items-center gap-2 bg-navy border border-gold/45 text-gold hover:bg-gold hover:text-navy hover:shadow-lg transition-all duration-300 text-xs font-bold uppercase tracking-wider px-6 py-3"
          >
            <Plus size={14} /> Add Speaking Gig
          </button>
        </div>
      )}
    </section>
  );
}
