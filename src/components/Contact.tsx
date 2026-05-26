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
                />
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
                />
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
                />
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
                />
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
