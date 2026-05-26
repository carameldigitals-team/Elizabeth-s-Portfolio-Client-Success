/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Masterclass } from "./components/Masterclass";
import { Speaking } from "./components/Speaking";
import { Testimonials } from "./components/Testimonials";
import { CtaStrip } from "./components/CtaStrip";
import { Contact } from "./components/Contact";
import { InboxManager } from "./components/InboxManager";
import { EditorToolbar } from "./components/EditorToolbar";
import { defaultPortfolioData } from "./data/defaultPortfolio";
import { PortfolioData, ReceivedInquiry } from "./types";
import { Sparkles, ArrowUp, AlertCircle } from "lucide-react";

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData>(defaultPortfolioData);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>("/assets/images/elizabeth_headshot_1779809556104.png");
  const [inquiries, setInquiries] = useState<ReceivedInquiry[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showEditorButton, setShowEditorButton] = useState(false);

  // 1. Initial State Hydration from Local Storage
  useEffect(() => {
    // Check if '?edit=true' or '#edit' is appended to the URL to show control toolkit
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("edit") === "true" || window.location.hash === "#edit" || window.location.hash === "#editor") {
      setShowEditorButton(true);
    }

    try {
      const storedData = localStorage.getItem("elizabeth_portfolio_data");
      if (storedData) {
        const parsed = JSON.parse(storedData) as PortfolioData;
        
        // Auto-migrate old default CTA strip links to the new Google Drive shared document
        let migrated = false;
        if (parsed.ctaStripLink === "https://carameldigitals.com/wave") {
          parsed.ctaStripLink = "https://drive.google.com/file/d/1UQsSgaaLxhLLyj-MKvAT0Apd3D_qh37r/view?usp=drivesdk";
          migrated = true;
        }

        // Auto-migrate old story heading if it's still local default
        if (parsed.aboutSubHeading === "Digital Freedom") {
          parsed.aboutSubHeading = "to Digital Freedom";
          migrated = true;
        }

        // Auto-migrate WiPatechs Conference year from 2024 to 2026
        if (parsed.speakingList && Array.isArray(parsed.speakingList)) {
          parsed.speakingList = parsed.speakingList.map(item => {
            if (item.event === "WiPatechs Conference" && item.year === "2024") {
              migrated = true;
              return { ...item, year: "2026" };
            }
            return item;
          });
        }

        // Auto-migrate mock testimonials to the true premium stories of Chimezie and Engr Ebenezer
        const hasOldTestimonials = !parsed.testimonialList || 
          parsed.testimonialList.length !== 2 || 
          parsed.testimonialList.some(item => item.author === "Temi I." || item.author === "Adaeze O.");
        
        if (hasOldTestimonials) {
          parsed.testimonialList = defaultPortfolioData.testimonialList;
          parsed.testimonialHeading = defaultPortfolioData.testimonialHeading;
          parsed.testimonialEmphasis = defaultPortfolioData.testimonialEmphasis;
          migrated = true;
        }

        // Auto-migrate testimonial avatarUrls from /src/assets/images/ to /assets/images/ or direct link
        if (parsed.testimonialList && Array.isArray(parsed.testimonialList)) {
          parsed.testimonialList = parsed.testimonialList.map(item => {
            let itemMigrated = false;
            let avatarUrl = item.avatarUrl;
            let role = item.role;
            if (item.author === "Chimezie I." && avatarUrl !== "https://i.ibb.co/LdVWS9rf/1779819316267.jpg") {
              avatarUrl = "https://i.ibb.co/LdVWS9rf/1779819316267.jpg";
              itemMigrated = true;
            }
            if (avatarUrl === "/src/assets/images/chimezie_avatar_1779815145996.png") {
              avatarUrl = "https://i.ibb.co/LdVWS9rf/1779819316267.jpg";
              itemMigrated = true;
            }
            if (avatarUrl === "/assets/images/chimezie_avatar_1779815145996.png") {
              avatarUrl = "https://i.ibb.co/LdVWS9rf/1779819316267.jpg";
              itemMigrated = true;
            }
            if (avatarUrl === "/src/assets/images/ebenezer_avatar_1779815166119.png") {
              avatarUrl = "https://i.ibb.co/Q3H7Q9Vd/1779814967804.jpg";
              itemMigrated = true;
            }
            if (item.author === "Engineer Ebenezer A." && avatarUrl !== "https://i.ibb.co/Q3H7Q9Vd/1779814967804.jpg") {
              avatarUrl = "https://i.ibb.co/Q3H7Q9Vd/1779814967804.jpg";
              itemMigrated = true;
            }
            if (item.author === "Engineer Ebenezer A." && (role === "Technology Director & Academy Client" || !role)) {
              role = "Geologist & Academy Client";
              itemMigrated = true;
            }
            if (itemMigrated) {
              migrated = true;
              return { ...item, avatarUrl, role };
            }
            return item;
          });
        }

        // Auto-migrate hero photo badge from Keynote Speaker to Founder, Caramel Digital Academy
        if (!parsed.heroPhotoBadgeText || parsed.heroPhotoBadgeText.toLowerCase().includes("keynote\nspeaker")) {
          parsed.heroPhotoBadgeText = "FOUNDER, CARAMEL\nDIGITAL ACADEMY";
          migrated = true;
        }

        if (migrated) {
          localStorage.setItem("elizabeth_portfolio_data", JSON.stringify(parsed));
        }
        
        setPortfolio(parsed);
      }

      const storedInquiries = localStorage.getItem("elizabeth_portfolio_inquiries");
      if (storedInquiries) {
        setInquiries(JSON.parse(storedInquiries));
      }

      const storedPhoto = localStorage.getItem("elizabeth_portfolio_photo");
      if (storedPhoto) {
        if (storedPhoto === "/src/assets/images/elizabeth_headshot_1779809556104.png") {
          setUploadedPhoto("/assets/images/elizabeth_headshot_1779809556104.png");
          localStorage.setItem("elizabeth_portfolio_photo", "/assets/images/elizabeth_headshot_1779809556104.png");
        } else {
          setUploadedPhoto(storedPhoto);
        }
      }
    } catch (e) {
      console.error("Failed to load data from LocalStorage", e);
    }
  }, []);

  // Scroll visibility handler
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. State persistence side-effects
  const handlePortfolioChange = (newData: PortfolioData) => {
    setPortfolio(newData);
    localStorage.setItem("elizabeth_portfolio_data", JSON.stringify(newData));
  };

  const handlePhotoUpload = (base64: string | null) => {
    setUploadedPhoto(base64);
    if (base64) {
      localStorage.setItem("elizabeth_portfolio_photo", base64);
    } else {
      localStorage.removeItem("elizabeth_portfolio_photo");
    }
  };

  const handleNewInquiry = (msg: Omit<ReceivedInquiry, "id" | "timestamp">) => {
    const localTimeStr = new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const newInquiry: ReceivedInquiry = {
      ...msg,
      id: `inq-${Date.now()}`,
      timestamp: localTimeStr,
    };

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem("elizabeth_portfolio_inquiries", JSON.stringify(updated));
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    localStorage.setItem("elizabeth_portfolio_inquiries", JSON.stringify(updated));
  };

  const handleClearInquiries = () => {
    setInquiries([]);
    localStorage.removeItem("elizabeth_portfolio_inquiries");
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleResetDefaults = () => {
    localStorage.removeItem("elizabeth_portfolio_data");
    localStorage.removeItem("elizabeth_portfolio_photo");
    setPortfolio(defaultPortfolioData);
    setUploadedPhoto(null);
    setIsEditing(false);
  };

  // Clipboard copy helper for JSON backups
  const handleExportConfig = () => {
    const dataStr = JSON.stringify(portfolio, null, 2);
    navigator.clipboard.writeText(dataStr);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-navy text-white relative">
      {/* 1. Header Navigation */}
      <Header
        data={portfolio}
        onChange={handlePortfolioChange}
        isEditing={isEditing}
      />

      {/* 2. Live Edit Banner Alert indicating mode active */}
      {isEditing && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gold text-navy text-xs font-bold uppercase tracking-widest px-6 py-2 shadow-2xl flex items-center gap-2 animate-fadeIn rounded-full border border-white/20 select-none">
          <Sparkles size={14} className="animate-pulse" />
          <span>Interactive Editing Mode is Active</span>
          <span className="text-[10px] opacity-75 shrink-0 hidden md:inline">
            | Click any element to edit
          </span>
        </div>
      )}

      {/* 3. Hero Visual Section */}
      <Hero
        data={portfolio}
        onChange={handlePortfolioChange}
        isEditing={isEditing}
        uploadedPhoto={uploadedPhoto}
        onPhotoUpload={handlePhotoUpload}
      />

      {/* 4. About Biography Section */}
      <About
        data={portfolio}
        onChange={handlePortfolioChange}
        isEditing={isEditing}
      />

      {/* 5. Services and Offers Section */}
      <Services
        data={portfolio}
        onChange={handlePortfolioChange}
        isEditing={isEditing}
      />

      {/* 6. Signature WAVE Masterclass Section */}
      <Masterclass
        data={portfolio}
        onChange={handlePortfolioChange}
        isEditing={isEditing}
      />

      {/* 7. Keynote Speaking Gigs Section */}
      <Speaking
        data={portfolio}
        onChange={handlePortfolioChange}
        isEditing={isEditing}
      />

      {/* 8. Student Testimonies Section */}
      <Testimonials
        data={portfolio}
        onChange={handlePortfolioChange}
        isEditing={isEditing}
      />

      {/* 9. Glowing Banner Strip */}
      <CtaStrip
        data={portfolio}
        onChange={handlePortfolioChange}
        isEditing={isEditing}
      />

      {/* 10. Contact Section */}
      <Contact
        data={portfolio}
        onChange={handlePortfolioChange}
        isEditing={isEditing}
        onNewInquiry={handleNewInquiry}
      />

      {/* 11. Custom Themed Footer */}
      <footer className="bg-navy-dark px-6 md:px-12 lg:px-16 py-12 flex flex-col md:flex-row items-center justify-between border-t border-gold/10 text-center md:text-left gap-6">
        <div>
          <h4 className="font-serif text-lg font-bold text-gold tracking-wider">
            {portfolio.ownerName}
          </h4>
          <p className="text-[11px] text-text-muted mt-1 font-light tracking-wide font-sans">
            © 2026 Elizabeth Emmanuel · Caramel Digital Academy
          </p>
        </div>
        <ul className="flex flex-wrap justify-center gap-6 text-xs text-text-muted font-sans tracking-wide">
          <li>
            <a href="#about" className="hover:text-gold transition-colors">
              About
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-gold transition-colors">
              Services
            </a>
          </li>
          <li>
            <a href="#masterclass" className="hover:text-gold transition-colors">
              WAVE Masterclass
            </a>
          </li>
          <li>
            <a href="#speaking" className="hover:text-gold transition-colors">
              Speaking
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gold transition-colors">
              Contact
            </a>
          </li>
        </ul>
      </footer>

      {/* 12. Floating control toolkit */}
      {showEditorButton && (
        <EditorToolbar
          isEditing={isEditing}
          onToggleEdit={handleToggleEdit}
          onReset={handleResetDefaults}
          onOpenInbox={() => setIsInboxOpen(true)}
          inboxCount={inquiries.length}
          onExport={handleExportConfig}
        />
      )}

      {/* 13. Local Form Submission Inbox Drawer Overlay */}
      {isInboxOpen && (
        <InboxManager
          inquiries={inquiries}
          onDeleteInquiry={handleDeleteInquiry}
          onClearAll={handleClearInquiries}
          onClose={() => setIsInboxOpen(false)}
        />
      )}

      {/* 14. Smooth Back to Top Scroll toggle */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 bg-navy/80 hover:bg-gold text-gold hover:text-navy border border-gold/40 p-3 hover:scale-105 transition-all outline-none"
          title="Scroll to top"
          style={{
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
          }}
        >
          <ArrowUp size={16} />
        </button>
      )}
    </div>
  );
}
