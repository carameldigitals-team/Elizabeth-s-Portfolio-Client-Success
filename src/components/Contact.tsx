/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { EditableText } from "./EditableText";
import { PortfolioData, ReceivedInquiry, ContactInfo } from "../types";
import { Globe, Linkedin, Mail, MessageCircle, Send, CheckCircle } from "lucide-react";

interface ContactProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
  isEditing: boolean;
  onNewInquiry: (inquiry: Omit<ReceivedInquiry, "id" | "timestamp">) => void;
}

export function Contact({ data, onChange, isEditing, onNewInquiry }: ContactProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const updateField = (key: keyof PortfolioData, value: any) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const handleContactDetailChange = (field: keyof ContactInfo, val: string) => {
    const updatedDetails = {
      ...data.contactDetails,
      [field]: val,
    };
    updateField("contactDetails", updatedDetails);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please fill out all required fields (Name, Email, and Message).");
      return;
    }

    onNewInquiry({
      fullName,
      email,
      subject: subject || "No Subject Given",
      message,
    });

    setSubmitted(true);
    setFullName("");
    setEmail("");
    setSubject("");
    setMessage("");

    // Direct user to specified WhatsApp link
    try {
      const newWin = window.open("https://wa.link/ldgv9u", "_blank");
      if (!newWin || newWin.closed || typeof newWin.closed === "undefined") {
        window.location.href = "https://wa.link/ldgv9u";
      }
    } catch (e) {
      // Fallback: direct navigation if window.open is blocked by iframe constraints
      window.location.href = "https://wa.link/ldgv9u";
    }

    // Automatically hide success notification after some seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <section className="bg-navy-mid px-6 md:px-12 lg:px-16 py-24 border-t border-gold/10" id="contact">
      <div className="inline-flex items-center gap-2 mb-4">
        <span className="w-6 h-[1px] bg-gold block"></span>
        <span className="text-[10px] font-semibold text-gold uppercase tracking-[0.18em]">Get In Touch</span>
      </div>

      <h2 className="font-serif text-3xl md:text-5xl font-light text-white leading-tight mb-4">
        <EditableText
          value={data.contactHeading}
          onChange={(val) => updateField("contactHeading", val)}
          isEditing={isEditing}
        />
        <br />
        <span className="text-gold italic font-normal">
          <EditableText
            value={data.contactEmphasis}
            onChange={(val) => updateField("contactEmphasis", val)}
            isEditing={isEditing}
          />
        </span>
      </h2>

      <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans font-light max-w-2xl mb-12">
        <EditableText
          value={data.contactSubheading}
          onChange={(val) => updateField("contactSubheading", val)}
          isEditing={isEditing}
          type="textarea"
        />
      </p>

      {/* Main Grid: Left details, Right form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* LEFT COLUMN: CONTACT DETAILS info */}
        <div className="space-y-6">
          {/* Website Card */}
          <div className="flex items-start gap-4 p-5 bg-navy/20 border border-gold/5 rounded-sm hover:border-gold/25 transition-colors">
            <div className="p-3 bg-navy-light text-gold border border-gold/25 flex items-center justify-center shrink-0">
              <Globe size={18} />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-text-muted font-sans font-medium">Website / Academy</span>
              <div className="text-white font-sans text-sm md:text-base font-light mt-0.5">
                <EditableText
                  value={data.contactDetails.website}
                  onChange={(val) => handleContactDetailChange("website", val)}
                  isEditing={isEditing}
                >
                  <a
                    href={
                      data.contactDetails.website.startsWith("http")
                        ? data.contactDetails.website
                        : `https://${data.contactDetails.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors underline decoration-gold/30 hover:decoration-gold"
                  >
                    {data.contactDetails.website}
                  </a>
                </EditableText>
              </div>
            </div>
          </div>

          {/* LinkedIn Card */}
          <div className="flex items-start gap-4 p-5 bg-navy/20 border border-gold/5 rounded-sm hover:border-gold/25 transition-colors">
            <div className="p-3 bg-navy-light text-gold border border-gold/25 flex items-center justify-center shrink-0">
              <Linkedin size={18} />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-text-muted font-sans font-medium">LinkedIn Handle</span>
              <div className="text-white font-sans text-sm md:text-base font-light mt-0.5">
                <EditableText
                  value={data.contactDetails.linkedin}
                  onChange={(val) => handleContactDetailChange("linkedin", val)}
                  isEditing={isEditing}
                >
                  <a
                    href={
                      data.contactDetails.linkedin.startsWith("http")
                        ? data.contactDetails.linkedin
                        : `https://${data.contactDetails.linkedin}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors underline decoration-gold/30 hover:decoration-gold break-all"
                  >
                    {data.contactDetails.linkedin}
                  </a>
                </EditableText>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="flex items-start gap-4 p-5 bg-navy/20 border border-gold/5 rounded-sm hover:border-gold/25 transition-colors">
            <div className="p-3 bg-navy-light text-gold border border-gold/25 flex items-center justify-center shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-text-muted font-sans font-medium">Email Address</span>
              <div className="text-white font-sans text-sm md:text-base font-light mt-0.5">
                <EditableText
                  value={data.contactDetails.email}
                  onChange={(val) => handleContactDetailChange("email", val)}
                  isEditing={isEditing}
                >
                  <a
                    href={`mailto:${data.contactDetails.email}`}
                    className="hover:text-gold transition-colors underline decoration-gold/30 hover:decoration-gold break-all"
                  >
                    {data.contactDetails.email}
                  </a>
                </EditableText>
              </div>
            </div>
          </div>

          {/* WhatsApp / DM Card */}
          <div className="flex items-start gap-4 p-5 bg-navy/20 border border-gold/5 rounded-sm hover:border-gold/25 transition-colors">
            <div className="p-3 bg-navy-light text-gold border border-gold/25 flex items-center justify-center shrink-0">
              <MessageCircle size={18} />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-text-muted font-sans font-medium">WhatsApp / Messaging Direct</span>
              <div className="text-white font-sans text-sm md:text-base font-light mt-0.5">
                <EditableText
                  value={data.contactDetails.whatsapp}
                  onChange={(val) => handleContactDetailChange("whatsapp", val)}
                  isEditing={isEditing}
                >
                  <a
                    href={
                      data.contactDetails.whatsapp.startsWith("http")
                        ? data.contactDetails.whatsapp
                        : `https://${data.contactDetails.whatsapp}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 border border-green-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all mt-1"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.1 1.45 4.8 1.45 5.26 0 9.54-4.28 9.54-9.54 0-2.55-1-4.94-2.82-6.75C16.3 2.5 13.91 1.5 11.46 1.5 6.2 1.5 1.92 5.78 1.92 11.04c0 1.74.46 3.44 1.33 4.93l-.99 3.61 3.7-.97zM17.41 14.3c-.32-.16-1.89-.93-2.18-1.04-.3-.1-.5-.16-.71.16-.2.32-.82 1.04-1 1.25-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.86-1.61-1.92-1.8-2.24-.19-.32-.02-.49.14-.65.15-.14.32-.38.48-.56.16-.18.21-.3.32-.5.1-.2.05-.38-.03-.54-.08-.16-.71-1.72-.98-2.36-.26-.64-.53-.55-.72-.56l-.61-.01c-.2 0-.53.07-.8.37-.28.3-1.07 1.04-1.07 2.54s1.1 2.95 1.25 3.15c.15.2 2.16 3.3 5.24 4.63.73.32 1.3.51 1.74.65.74.24 1.4.2 1.94.12.6-.09 1.84-.75 2.1-1.48.25-.74.25-1.37.18-1.48-.07-.1-.27-.16-.62-.32z"/>
                    </svg>
                    <span>Chat on WhatsApp</span>
                  </a>
                </EditableText>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTACT FORM */}
        <div>
          {submitted ? (
            <div className="bg-gold/10 border border-gold/45 p-8 text-center rounded-sm animate-fadeIn">
              <CheckCircle size={44} className="text-gold mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-white font-semibold mb-2">Message Received!</h3>
              <p className="text-xs md:text-sm text-text-muted mb-6 leading-relaxed max-w-sm mx-auto">
                Thank you so much! Your message has been simulated successfully and logged securely inside the local browser inbox tab.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-gold uppercase tracking-widest font-bold hover:underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-xs p-3 rounded">
                  {errorMsg}
                </div>
              )}

              {/* Full Name input */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-sans font-bold text-gold uppercase tracking-widest mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="bg-white/[0.04] border border-gold/15 focus:border-gold hover:border-gold/30 text-white p-3.5 text-xs md:text-sm font-light rounded-sm outline-none transition-colors"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-sans font-bold text-gold uppercase tracking-widest mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="bg-white/[0.04] border border-gold/15 focus:border-gold hover:border-gold/30 text-white p-3.5 text-xs md:text-sm font-light rounded-sm outline-none transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Subject Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-sans font-bold text-gold uppercase tracking-widest mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Speaking inquiry / Masterclass / Partnership"
                  className="bg-white/[0.04] border border-gold/15 focus:border-gold hover:border-gold/30 text-white p-3.5 text-xs md:text-sm font-light rounded-sm outline-none transition-colors"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              {/* Message text area */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-sans font-bold text-gold uppercase tracking-widest mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me how I can help you..."
                  className="bg-white/[0.04] border border-gold/15 focus:border-gold hover:border-gold/30 text-white p-3.5 text-xs md:text-sm font-light rounded-sm outline-none resize-none transition-colors"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="inline-flex self-start items-center gap-2 bg-gradient-to-r from-gold to-gold-light text-navy font-bold text-xs uppercase tracking-wider px-8 py-3.5 hover:shadow-lg transition-transform hover:-translate-y-0.5 select-none mt-2 cursor-pointer"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
              >
                <Send size={12} />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
