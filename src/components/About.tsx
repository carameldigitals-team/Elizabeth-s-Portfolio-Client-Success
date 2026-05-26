/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { EditableText } from "./EditableText";
import { PortfolioData, ValueCard } from "../types";
import { Plus, Trash } from "lucide-react";

interface AboutProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
  isEditing: boolean;
}

export function About({ data, onChange, isEditing }: AboutProps) {
  const updateField = (key: keyof PortfolioData, value: any) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const handleParagraphChange = (index: number, val: string) => {
    const updatedParagraphs = [...data.aboutParagraphs];
    updatedParagraphs[index] = val;
    updateField("aboutParagraphs", updatedParagraphs);
  };

  const handleValueChange = (id: string, field: keyof ValueCard, val: string) => {
    const updatedValues = data.aboutValues.map((v) => {
      if (v.id === id) {
        return { ...v, [field]: val };
      }
      return v;
    });
    updateField("aboutValues", updatedValues);
  };

  const addParagraph = () => {
    const updatedParagraphs = [...data.aboutParagraphs, "New paragraph story detail..."];
    updateField("aboutParagraphs", updatedParagraphs);
  };

  const removeParagraph = (index: number) => {
    const updatedParagraphs = data.aboutParagraphs.filter((_, i) => i !== index);
    updateField("aboutParagraphs", updatedParagraphs);
  };

  return (
    <section className="bg-navy-mid px-6 md:px-12 lg:px-16 py-24" id="about">
      {/* Small Eyebrow Section */}
      <div className="inline-flex items-center gap-2 mb-4">
        <span className="w-6 h-[1px] bg-gold block"></span>
        <span className="text-[10px] font-semibold text-gold uppercase tracking-[0.18em]">My Story</span>
      </div>

      {/* Hero-quality Header */}
      <h2 className="font-serif text-3xl md:text-5xl font-light text-white leading-tight mb-16 max-w-2xl">
        <EditableText
          value={data.aboutHeading}
          onChange={(val) => updateField("aboutHeading", val)}
          isEditing={isEditing}
        />
        <br />
        <span className="text-gold italic font-normal">
          <EditableText
            value={data.aboutSubHeading}
            onChange={(val) => updateField("aboutSubHeading", val)}
            isEditing={isEditing}
          />
        </span>
      </h2>

      {/* Main Grid Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left column: Paragraph texts */}
        <div className="lg:col-span-7 space-y-6 text-white/70 leading-relaxed text-sm md:text-base">
          {data.aboutParagraphs.map((paragraph, index) => (
            <div key={index} className="relative group/paragraph">
              {isEditing ? (
                <div className="flex gap-2 items-start bg-navy/30 p-2 rounded border border-gold/10">
                  <div className="flex-1">
                    <EditableText
                      value={paragraph}
                      onChange={(val) => handleParagraphChange(index, val)}
                      isEditing={true}
                      type="textarea"
                      placeholder="Story paragraph..."
                    />
                  </div>
                  <button
                    onClick={() => removeParagraph(index)}
                    className="text-red-400 hover:text-red-500 hover:bg-red-500/10 p-1.5 rounded transition-colors self-start"
                    title="Remove paragraph"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              ) : (
                <p 
                  className="font-sans font-light tracking-wide text-white/80"
                  dangerouslySetInnerHTML={{
                    __html: paragraph
                      .replace(/<strong>/g, '<strong class="text-gold font-semibold">')
                      .replace(/<\/strong>/g, '</strong>')
                  }}
                />
              )}
            </div>
          ))}

          {isEditing && (
            <button
              onClick={addParagraph}
              className="inline-flex items-center gap-1 text-xs text-gold hover:text-gold-light hover:underline font-semibold tracking-wider uppercase mt-4"
            >
              <Plus size={14} /> Add Story Paragraph
            </button>
          )}
        </div>

        {/* Right column: Values cards stacked */}
        <div className="lg:col-span-5 space-y-6">
          {data.aboutValues.map((valueCard) => (
            <div
              key={valueCard.id}
              className="relative p-7 border border-gold/15 bg-white/[0.02] hover:border-gold/45 transition-all duration-300 translate-x-0 hover:translate-x-1 group"
            >
              {/* Highlight bar */}
              <div className="absolute top-0 left-0 w-[3px] h-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex flex-col gap-2">
                <EditableText
                  value={valueCard.num}
                  onChange={(val) => handleValueChange(valueCard.id, "num", val)}
                  isEditing={isEditing}
                  className="font-serif text-2s font-bold text-gold tracking-widest text-xs mb-1"
                />
                
                <h3 className="text-base font-semibold text-white tracking-wide">
                  <EditableText
                    value={valueCard.heading}
                    onChange={(val) => handleValueChange(valueCard.id, "heading", val)}
                    isEditing={isEditing}
                  />
                </h3>

                <p className="text-xs md:text-sm text-text-muted leading-relaxed font-sans font-light">
                  <EditableText
                    value={valueCard.body}
                    onChange={(val) => handleValueChange(valueCard.id, "body", val)}
                    isEditing={isEditing}
                    type="textarea"
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
