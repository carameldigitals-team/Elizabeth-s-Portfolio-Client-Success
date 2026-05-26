/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { EditableText } from "./EditableText";
import { PortfolioData, TestimonialItem } from "../types";
import { MessageSquare, Plus, Trash, Quote, ExternalLink } from "lucide-react";

interface TestimonialsProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
  isEditing: boolean;
}

export function Testimonials({ data, onChange, isEditing }: TestimonialsProps) {
  const updateField = (key: keyof PortfolioData, value: any) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const handleTestimonialChange = (id: string, field: keyof TestimonialItem, val: string) => {
    const updatedList = data.testimonialList.map((itm) => {
      if (itm.id === id) {
        return { ...itm, [field]: val };
      }
      return itm;
    });
    updateField("testimonialList", updatedList);
  };

  const addTestimonial = () => {
    const id = `tst-${Date.now()}`;
    const newTestimonial: TestimonialItem = {
      id,
      text: "The exact feedback or review goes here. Describe how Elizabeth Emmanuel's automation hacks, masterclass levels, or consultancy moves impacted your workflows.",
      author: "Jane D.",
      role: "Public Speaker & Strategist",
      avatarInitials: "JD",
    };
    updateField("testimonialList", [...data.testimonialList, newTestimonial]);
  };

  const removeTestimonial = (id: string) => {
    const updatedList = data.testimonialList.filter((itm) => itm.id !== id);
    updateField("testimonialList", updatedList);
  };

  return (
    <section className="bg-navy px-6 md:px-12 lg:px-16 py-24 border-t border-gold/10" id="testimonials">
      <div className="inline-flex items-center gap-2 mb-4">
        <span className="w-6 h-[1px] bg-gold block"></span>
        <span className="text-[10px] font-semibold text-gold uppercase tracking-[0.18em]">Testimonials</span>
      </div>

      <h2 className="font-serif text-3xl md:text-5xl font-light text-white leading-tight mb-16 max-w-xl">
        <EditableText
          value={data.testimonialHeading}
          onChange={(val) => updateField("testimonialHeading", val)}
          isEditing={isEditing}
        />
        <br />
        <span className="text-gold italic font-normal">
          <EditableText
            value={data.testimonialEmphasis}
            onChange={(val) => updateField("testimonialEmphasis", val)}
            isEditing={isEditing}
          />
        </span>
      </h2>

      {/* Testimonials grid */}
      <div className={`grid gap-8 ${
        data.testimonialList.length <= 2 
          ? "grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto" 
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      }`}>
        {data.testimonialList.map((item) => (
          <div
            key={item.id}
            className="p-8 md:p-10 bg-gradient-to-b from-navy-mid/90 to-navy-dark/95 border border-gold/15 hover:border-gold/35 hover:shadow-[0_20px_45px_rgba(201,168,76,0.06)] transition-all duration-500 relative flex flex-col justify-between hover:-translate-y-1.5 group/card rounded-lg"
          >
            {/* Hanging Quote decorative mark */}
            <div className="absolute top-6 right-8 text-gold/10 font-serif text-7xl select-none leading-none h-6 group-hover/card:text-gold/20 transition-colors duration-500">
              “
            </div>

            <div>
              <p className="text-sm md:text-base text-white/90 leading-relaxed font-sans font-light italic mb-10 relative z-10 whitespace-pre-line">
                <EditableText
                  value={item.text}
                  onChange={(val) => handleTestimonialChange(item.id, "text", val)}
                  isEditing={isEditing}
                  type="textarea"
                />
              </p>
            </div>

            {/* Author bar info */}
            <div className="flex flex-col gap-4 pt-6 border-t border-gold/10 relative">
              <div className="flex items-center gap-4">
                {/* Gold-ringed profile picture container */}
                <div className="h-12 w-12 min-w-[48px] rounded-full overflow-hidden border-2 border-gold/30 shadow-md relative flex items-center justify-center bg-navy-dark shrink-0">
                  {item.avatarUrl ? (
                    <img
                      src={item.avatarUrl}
                      alt={item.author}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-tr from-gold to-gold-light text-navy-dark text-xs font-bold flex items-center justify-center select-none uppercase font-sans">
                      {item.avatarInitials}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white tracking-wide truncate">
                    <EditableText
                      value={item.author}
                      onChange={(val) => handleTestimonialChange(item.id, "author", val)}
                      isEditing={isEditing}
                    />
                  </h4>
                  <p className="text-xs text-gold-light/90 mt-0.5 truncate font-sans">
                    <EditableText
                      value={item.role}
                      onChange={(val) => handleTestimonialChange(item.id, "role", val)}
                      isEditing={isEditing}
                    />
                  </p>
                </div>
              </div>

              {isEditing && (
                <div className="mt-2 space-y-2 bg-black/30 p-3 rounded border border-white/5 text-[11px]">
                  <div className="flex items-center gap-1.5 text-white/60">
                    <span className="font-semibold block shrink-0 text-gold-light">Initials:</span>
                    <EditableText
                      value={item.avatarInitials}
                      onChange={(val) => handleTestimonialChange(item.id, "avatarInitials", val)}
                      isEditing={isEditing}
                      className="font-mono text-white inline-block bg-transparent"
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-white/60">
                    <span className="font-semibold text-gold-light">Avatar Image Path/URL:</span>
                    <input
                      type="text"
                      value={item.avatarUrl || ""}
                      placeholder="/src/assets/images/... (optional)"
                      onChange={(e) => handleTestimonialChange(item.id, "avatarUrl", e.target.value)}
                      className="bg-navy-dark border border-gold/20 text-white rounded px-2 py-1 text-[10px] w-full focus:outline-none focus:border-gold"
                    />
                  </div>
                  <button
                    onClick={() => removeTestimonial(item.id)}
                    className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors mt-2 uppercase text-[9px] font-bold"
                    title="Remove testimonial"
                  >
                    <Trash size={10} /> Delete Testimonial
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Social Proof Vault & Drives Panel */}
      <div className="mt-16 bg-navy-mid/60 border border-gold/15 p-8 md:p-12 relative overflow-hidden group shadow-2xl">
        {/* Subtle background glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none transition-transform duration-500 group-hover:scale-105"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
              Live Social Proof Vault
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-light text-white mb-3">
              Students Work, Client Testimonies &amp; General Mentions
            </h3>
            <p className="text-xs md:text-sm text-text-muted leading-relaxed font-sans font-light">
              I believe in absolute, undeniable transparency. Browse through the live Google Drive vault archives containing real workshop designs, students' actual workflows, glowing client screenshots, and mentions from across the digital ecosystem.
            </p>
          </div>
          <div className="shrink-0 flex items-center">
            <a
              href="https://drive.google.com/drive/folders/1bgIbGq36ZwNNqP86qjnblEWHGJRI0y8s"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-gradient-to-tr from-gold to-gold-light text-navy-dark hover:from-white hover:to-white hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(201,168,76,0.3)] transition-all duration-300 text-xs font-bold uppercase tracking-wider px-7 py-4 shadow-lg pr-6 cursor-pointer"
            >
              <span>Explore Social Proof Folders</span>
              <ExternalLink size={14} className="stroke-[2.5px]" />
            </a>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={addTestimonial}
            className="inline-flex items-center gap-2 bg-navy-mid border border-gold/45 text-gold hover:bg-gold hover:text-navy hover:shadow-lg transition-all duration-300 text-xs font-bold uppercase tracking-wider px-6 py-3"
          >
            <Plus size={14} /> Add Testimonial Card
          </button>
        </div>
      )}
    </section>
  );
}
