/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StatItem {
  id: string;
  num: string;
  label: string;
}

export interface ValueCard {
  id: string;
  num: string;
  heading: string;
  body: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  name: string;
  desc: string;
  tag: string;
}

export interface WaveBadgeItem {
  id: string;
  letter: string;
  title: string;
  desc: string;
}

export interface SpeakingItem {
  id: string;
  year: string;
  type: string;
  event: string;
  topic: string;
}

export interface TestimonialItem {
  id: string;
  text: string;
  author: string;
  role: string;
  avatarInitials: string;
  avatarUrl?: string;
}

export interface ContactInfo {
  website: string;
  linkedin: string;
  email: string;
  whatsapp: string;
}

export interface PortfolioData {
  ownerName: string;
  headerCtaText: string;
  headerCtaLink: string;
  
  // Hero section
  heroEyebrow: string;
  heroFirstName: string;
  heroLastName: string;
  heroTitle: string;
  heroDesc: string;
  heroStats: StatItem[];
  heroCtaText: string;
  heroCtaLink: string;
  heroSecondaryText: string;
  heroPhotoBadgeText: string;

  // About Section
  aboutHeading: string;
  aboutSubHeading: string;
  aboutParagraphs: string[];
  aboutValues: ValueCard[];

  // Services Section
  servicesHeading: string;
  servicesEmphasis: string;
  servicesSubHeading: string;
  servicesList: ServiceItem[];

  // Masterclass Section
  masterclassHeading: string;
  masterclassEmphasis: string;
  masterclassSubheading: string;
  masterclassBadges: WaveBadgeItem[];
  masterclassCtaLabel: string;
  masterclassCtaTitle: string;
  masterclassCtaSub: string;
  masterclassCtaLink: string;
  masterclassCtaBtnText: string;
  masterclassCheckoutAlert: string;

  // Speaking Section
  speakingHeading: string;
  speakingEmphasis: string;
  speakingSubheading: string;
  speakingList: SpeakingItem[];

  // Testimonial Section
  testimonialHeading: string;
  testimonialEmphasis: string;
  testimonialList: TestimonialItem[];

  // Free Guide Section
  ctaStripTitle: string;
  ctaStripSubheading: string;
  ctaStripBtnText: string;
  ctaStripLink: string;

  // Contact Section
  contactHeading: string;
  contactEmphasis: string;
  contactSubheading: string;
  contactDetails: ContactInfo;
}

export interface ReceivedInquiry {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
