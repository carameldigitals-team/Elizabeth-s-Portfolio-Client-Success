/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { EditableText } from "./EditableText";
import { PortfolioData, StatItem } from "../types";
import { Award, Upload, Trash2, ArrowRight } from "lucide-react";

interface HeroProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
  isEditing: boolean;
  uploadedPhoto: string | null;
  onPhotoUpload: (base64: string | null) => void;
}

export function Hero({
  data,
  onChange,
  isEditing,
  uploadedPhoto,
  onPhotoUpload,
}: HeroProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const updateField = (key: keyof PortfolioData, value: any) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const handleStatChange = (id: string, field: "num" | "label", value: string) => {
    const updatedStats = data.heroStats.map((stat) => {
      if (stat.id === id) {
        return { ...stat, [field]: value };
      }
      return stat;
    });
    updateField("heroStats", updatedStats);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onPhotoUpload(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPhotoUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-12 items-center px-6 md:px-12 lg:px-16 pt-28 pb-16 md:py-36 overflow-hidden bg-navy">
      {/* Decorative Grid Mesh Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(201,168,76,1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      
      {/* Radial ambient glow orbs matching original card.co style */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_80%_at_75%_40%,rgba(201,168,76,0.08)_0%,transparent_70%),radial-gradient(ellipse_40%_60%_at_20%_80%,rgba(26,50,150,0.45)_0%,transparent_60%)]"></div>

      {/* LEFT COLUMN: Texts and Actions */}
      <div className="lg:col-span-7 relative z-10 flex flex-col items-start text-left animate-fadeUp">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-8 h-[1px] bg-gold block"></span>
          <EditableText
            value={data.heroEyebrow}
            onChange={(val) => updateField("heroEyebrow", val)}
            isEditing={isEditing}
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold"
          />
        </div>

        {/* Name Header */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-10 md:leading-tight text-white mb-2">
          <EditableText
            value={data.heroFirstName}
            onChange={(val) => updateField("heroFirstName", val)}
            isEditing={isEditing}
            className="block"
          />
          <span className="text-gold italic block md:inline font-normal">
            <EditableText
              value={data.heroLastName}
              onChange={(val) => updateField("heroLastName", val)}
              isEditing={isEditing}
            />
          </span>
        </h1>

        {/* Professional taglines */}
        <div className="text-md md:text-lg lg:text-xl font-serif text-text-muted mb-6 tracking-wide w-full max-w-xl">
          <EditableText
            value={data.heroTitle}
            onChange={(val) => updateField("heroTitle", val)}
            isEditing={isEditing}
            className="font-light italic block"
          />
        </div>

        {/* Bio */}
        <div className="text-sm md:text-base leading-relaxed text-white/65 max-w-lg mb-8">
          <EditableText
            value={data.heroDesc}
            onChange={(val) => updateField("heroDesc", val)}
            isEditing={isEditing}
            type="textarea"
          />
        </div>

        {/* Interactive Stats Grid */}
        <div className="grid grid-cols-3 gap-6 md:gap-10 mb-8 border-t border-b border-gold/10 py-5 w-full max-w-xl">
          {data.heroStats.map((stat) => (
            <div key={stat.id} className="flex flex-col">
              <EditableText
                value={stat.num}
                onChange={(val) => handleStatChange(stat.id, "num", val)}
                isEditing={isEditing}
                className="font-serif text-2xl md:text-4xl font-semibold text-gold leading-none mb-1"
              />
              <EditableText
                value={stat.label}
                onChange={(val) => handleStatChange(stat.id, "label", val)}
                isEditing={isEditing}
                className="text-[10px] md:text-xs text-text-muted font-sans font-medium uppercase tracking-wider"
              />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          {isEditing ? (
            <div className="flex flex-col gap-2 p-3 bg-navy-light/40 border border-gold/30 rounded w-full max-w-sm">
              <span className="text-[10px] text-gold/80 font-mono">Primary Link Endpoint:</span>
              <input
                type="text"
                className="bg-navy-dark text-white text-xs p-2 rounded border border-gold/30"
                value={data.heroCtaLink}
                onChange={(e) => updateField("heroCtaLink", e.target.value)}
              />
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div>
                  <span className="text-[10px] text-gold/80 font-mono block">Btn 1 Name:</span>
                  <EditableText
                    value={data.heroCtaText}
                    onChange={(val) => updateField("heroCtaText", val)}
                    isEditing={true}
                    className="border border-gold placeholder-current text-white text-xs font-semibold px-2 py-1 bg-navy"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-gold/80 font-mono block">Btn 2 Name:</span>
                  <EditableText
                    value={data.heroSecondaryText}
                    onChange={(val) => updateField("heroSecondaryText", val)}
                    isEditing={true}
                    className="border border-white/30 text-white text-xs font-semibold px-2 py-1 bg-navy"
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <a
                href={data.heroCtaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-gold to-gold-light text-navy font-bold text-xs uppercase tracking-wider px-8 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(201,168,76,0.3)] select-none cursor-pointer"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                }}
              >
                {data.heroCtaText}
              </a>
              <a
                href="#about"
                className="border border-white/20 text-white hover:border-gold hover:text-gold font-medium text-xs uppercase tracking-wider px-8 py-4 transition-colors duration-300"
              >
                {data.heroSecondaryText}
              </a>
            </>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Media Frame */}
      <div className="lg:col-span-5 relative z-10 flex justify-center items-center mt-12 lg:mt-0 animate-fadeUp [animation-delay:0.3s]">
        <div 
          onClick={triggerUpload}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-72 h-72 md:w-96 md:h-96 rounded-full group cursor-pointer overflow-visible"
        >
          {/* Glowing Ring Backline with Balanced Pulse Accent */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-white via-gold/50 to-white opacity-40 blur-xl group-hover:opacity-80 group-hover:scale-105 transition-all duration-500 animate-pulse pointer-events-none z-0"></div>
          
          {/* Pure High-contrast White Glow Halo ring to sync with the border line */}
          <div className="absolute -inset-1 rounded-full bg-white/20 blur-md group-hover:scale-103 transition-transform duration-300 pointer-events-none z-0 shadow-[0_0_30px_rgba(255,255,255,0.35),0_0_60px_rgba(201,168,76,0.25)]"></div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {/* Real Photo or Premium Graphic Placeholder with perfect rounded clipping, border and inner shadow */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy-light to-navy-mid flex flex-col justify-center items-center overflow-hidden rounded-full z-10 border-[6px] border-white shadow-[0_15px_35px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.15)]">
            {uploadedPhoto ? (
              <>
                <img
                  src={uploadedPhoto}
                  alt={data.ownerName}
                  className="w-full h-full object-cover relative z-10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-navy/90 to-transparent z-15 pointer-events-none"></div>
                
                {/* Floating Clear Image Action */}
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute top-4 right-4 bg-navy-dark/80 hover:bg-red-950/90 text-white/85 hover:text-red-400 p-2 rounded-full border border-gold/20 hover:border-red-500/30 z-30 transition-all opacity-0 group-hover:opacity-100"
                  title="Remove photo"
                >
                  <Trash2 size={16} />
                </button>
              </>
            ) : (
              <div className="p-6 text-center select-none flex flex-col justify-center items-center h-full relative z-10">
                <div className="font-serif text-6xl md:text-8xl font-extralight text-gold/15 leading-none tracking-tighter mb-2 animate-pulse">
                  EE
                </div>
                <div className="inline-flex items-center gap-1.5 text-gold-light hover:text-white transition-colors duration-300 bg-navy/60 px-4 py-1.5 rounded-md border border-gold/20 shadow-md">
                  <Upload size={12} />
                  <span className="text-[10px] font-semibold tracking-wider uppercase font-sans">
                    Upload Photo
                  </span>
                </div>
                <p className="text-[9px] text-text-muted mt-2 font-medium uppercase tracking-wider max-w-[150px]">
                  Supports JPG, PNG
                </p>
              </div>
            )}

            {/* Subtle help label on hover */}
            {uploadedPhoto && isHovered && (
              <div className="absolute inset-0 bg-navy/40 flex items-center justify-center z-20 pointer-events-none rounded-full">
                <div className="bg-navy-dark/90 px-3 py-1.5 rounded border border-gold/40 text-[10px] text-gold font-sans uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Upload size={12} /> Click to Change Photo
                </div>
              </div>
            )}
          </div>

          {/* Centralized Premium Badge */}
          <div 
            className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-navy-dark via-navy-mid to-navy-dark border border-gold/40 text-gold-light font-bold text-[9.5px] uppercase tracking-widest px-6 py-2.5 z-20 shadow-[0_12px_28px_rgba(0,0,0,0.65),0_0_15px_rgba(201,168,76,0.15)] rounded-full text-center font-sans hover:border-gold-light hover:text-white transition-all duration-300 flex flex-col items-center justify-center min-w-[200px] max-w-[90%] cursor-pointer group/badge hover:scale-[1.03]"
            onClick={(e) => {
              if (isEditing) {
                e.stopPropagation(); // Avoid triggering file upload when editing badge text
              }
            }}
          >
            <div className="whitespace-pre-line leading-normal">
              <EditableText
                value={data.heroPhotoBadgeText}
                onChange={(val) => updateField("heroPhotoBadgeText", val)}
                isEditing={isEditing}
                className="inline-block text-gold-light group-hover/badge:text-white bg-transparent border-none text-[9.5px] font-bold focus:outline-none placeholder-current text-center font-sans tracking-widest uppercase"
              />
            </div>
            {isEditing && (
              <span className="block text-[7px] text-gold/60 font-mono italic mt-0.5">
                [Edit Badge Text]
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
