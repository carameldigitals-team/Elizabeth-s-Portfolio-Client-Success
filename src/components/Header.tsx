/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { EditableText } from "./EditableText";
import { PortfolioData } from "../types";
import { Menu, X, Globe, Sparkles, BookOpen } from "lucide-react";

interface HeaderProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
  isEditing: boolean;
}

export function Header({ data, onChange, isEditing }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const updateField = (key: keyof PortfolioData, value: any) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-100 bg-navy/92 backdrop-blur-md border-b border-gold/15 px-6 md:px-12 lg:px-16 py-4 flex items-center justify-between animate-fadeDown">
      {/* Logo / Name */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 bg-gradient-to-tr from-gold to-gold-light rounded flex items-center justify-center font-bold text-navy-dark text-sm shadow-[0_0_12px_rgba(201,168,76,0.3)]">
          EE
        </div>
        <div>
          <EditableText
            value={data.ownerName}
            onChange={(val) => updateField("ownerName", val)}
            isEditing={isEditing}
            className="font-serif text-lg md:text-xl font-semibold text-gold tracking-wide"
          />
          {isEditing && (
            <span className="block text-[10px] text-gold/60 font-mono">
              [Editable Brand Name]
            </span>
          )}
        </div>
      </div>

      {/* Desktop Menu links */}
      <ul className="hidden md:flex items-center gap-8">
        <li>
          <a
            href="#about"
            className="text-white/70 hover:text-gold text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#services"
            className="text-white/70 hover:text-gold text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#masterclass"
            className="text-white/70 hover:text-gold text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            Masterclass
          </a>
        </li>
        <li>
          <a
            href="#speaking"
            className="text-white/70 hover:text-gold text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            Speaking
          </a>
        </li>
        <li>
          <a
            href="#testimonials"
            className="text-white/70 hover:text-gold text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            Testimonials
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="text-white/70 hover:text-gold text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            Contact
          </a>
        </li>
      </ul>

      {/* Header CTA Button */}
      <div className="hidden md:flex items-center gap-4">
        {isEditing ? (
          <div className="flex flex-col gap-1 items-end bg-navy-light/60 p-2 rounded border border-gold/20">
            <span className="text-[9px] text-gold/70 font-mono">CTA Button link</span>
            <input
              type="text"
              className="bg-navy-dark text-white text-xs px-2 py-1 rounded border border-gold/30 w-44"
              value={data.headerCtaLink}
              onChange={(e) => updateField("headerCtaLink", e.target.value)}
              placeholder="Button Link URL"
            />
            <span className="text-[9px] text-gold/70 font-mono mt-1">CTA Button text</span>
            <EditableText
              value={data.headerCtaText}
              onChange={(val) => updateField("headerCtaText", val)}
              isEditing={true}
              className="text-navy bg-gold font-semibold text-xs py-1 px-3 rounded uppercase"
            />
          </div>
        ) : (
          <a
            href={data.headerCtaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gold text-gold font-medium px-5 py-2 text-xs tracking-widest uppercase transition-all duration-300 hover:bg-gold hover:text-navy hover:shadow-[0_0_15px_rgba(201,168,76,0.3)]"
          >
            {data.headerCtaText}
          </a>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-white/90 hover:text-gold focus:outline-none"
        aria-label="Toggle Menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-navy border-b border-gold/25 py-6 px-8 flex flex-col gap-6 md:hidden animate-fadeIn shadow-2xl z-50">
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 hover:text-gold text-sm font-semibold tracking-wider uppercase block"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 hover:text-gold text-sm font-semibold tracking-wider uppercase block"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#masterclass"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 hover:text-gold text-sm font-semibold tracking-wider uppercase block"
              >
                Masterclass
              </a>
            </li>
            <li>
              <a
                href="#speaking"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 hover:text-gold text-sm font-semibold tracking-wider uppercase block"
              >
                Speaking
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 hover:text-gold text-sm font-semibold tracking-wider uppercase block"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 hover:text-gold text-sm font-semibold tracking-wider uppercase block"
              >
                Contact
              </a>
            </li>
          </ul>

          <div className="pt-4 border-t border-gold/10">
            {isEditing ? (
              <div className="flex flex-col gap-2 bg-navy-mid/60 p-3 rounded">
                <input
                  type="text"
                  className="bg-navy-dark text-white text-xs p-2 rounded border border-gold/30 w-full"
                  value={data.headerCtaLink}
                  onChange={(e) => updateField("headerCtaLink", e.target.value)}
                />
                <EditableText
                  value={data.headerCtaText}
                  onChange={(val) => updateField("headerCtaText", val)}
                  isEditing={true}
                  className="text-center font-bold text-xs"
                />
              </div>
            ) : (
              <a
                href={data.headerCtaLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center border border-gold text-gold font-semibold py-3 px-4 text-xs tracking-widest uppercase hover:bg-gold hover:text-navy transition-all"
              >
                {data.headerCtaText}
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
