/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { EditableText } from "./EditableText";
import { PortfolioData, ServiceItem } from "../types";
import { Plus, Trash, Sparkles } from "lucide-react";

interface ServicesProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
  isEditing: boolean;
}

export function Services({ data, onChange, isEditing }: ServicesProps) {
  const updateField = (key: keyof PortfolioData, value: any) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const handleServiceChange = (id: string, field: keyof ServiceItem, val: string) => {
    const updatedServices = data.servicesList.map((service) => {
      if (service.id === id) {
        return { ...service, [field]: val };
      }
      return service;
    });
    updateField("servicesList", updatedServices);
  };

  const addService = () => {
    const id = `srv-${Date.now()}`;
    const newService: ServiceItem = {
      id,
      icon: "✨",
      name: "New Consulting Service",
      desc: "Provide custom description about what goals and outcomes you deliver for African professionals.",
      tag: "Strategy",
    };
    updateField("servicesList", [...data.servicesList, newService]);
  };

  const removeService = (id: string) => {
    const updatedServices = data.servicesList.filter((service) => service.id !== id);
    updateField("servicesList", updatedServices);
  };

  return (
    <section className="bg-navy px-6 md:px-12 lg:px-16 py-24 border-t border-gold/10" id="services">
      {/* Header section with grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16">
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-gold block"></span>
            <span className="text-[10px] font-semibold text-gold uppercase tracking-[0.18em]">What I Offer</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-white leading-tight">
            <EditableText
              value={data.servicesHeading}
              onChange={(val) => updateField("servicesHeading", val)}
              isEditing={isEditing}
            />
            <br />
            <span className="text-gold italic font-normal">
              <EditableText
                value={data.servicesEmphasis}
                onChange={(val) => updateField("servicesEmphasis", val)}
                isEditing={isEditing}
              />
            </span>
          </h2>
        </div>
        <p className="lg:col-span-6 text-sm md:text-base text-white/60 leading-relaxed font-sans font-light">
          <EditableText
            value={data.servicesSubHeading}
            onChange={(val) => updateField("servicesSubHeading", val)}
            isEditing={isEditing}
            type="textarea"
          />
        </p>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-gold/10">
        {data.servicesList.map((service) => (
          <div
            key={service.id}
            className="group relative p-8 bg-navy-mid hover:bg-navy-light transition-all duration-300 flex flex-col justify-between h-full group"
          >
            {/* Hover Bottom line effect from original CSS */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold to-gold-light scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

            <div>
              {/* Header Icon & Tag */}
              <div className="flex items-center justify-between mb-6">
                <EditableText
                  value={service.icon}
                  onChange={(val) => handleServiceChange(service.id, "icon", val)}
                  isEditing={isEditing}
                  className="text-2xl"
                />

                <div className="flex items-center gap-2">
                  <EditableText
                    value={service.tag}
                    onChange={(val) => handleServiceChange(service.id, "tag", val)}
                    isEditing={isEditing}
                    className="border border-gold/30 text-gold font-sans text-[9px] font-semibold uppercase tracking-wider px-3 py-1 rounded-sm"
                  />

                  {isEditing && (
                    <button
                      onClick={() => removeService(service.id)}
                      className="text-red-400 hover:text-red-500 hover:bg-red-500/10 p-1 rounded transition-colors"
                      title="Remove service"
                    >
                      <Trash size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg md:text-xl font-semibold text-white mb-3">
                <EditableText
                  value={service.name}
                  onChange={(val) => handleServiceChange(service.id, "name", val)}
                  isEditing={isEditing}
                />
              </h3>

              {/* Description */}
              <p className="text-xs md:text-sm text-text-muted leading-relaxed font-sans font-light mb-6">
                <EditableText
                  value={service.desc}
                  onChange={(val) => handleServiceChange(service.id, "desc", val)}
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
            onClick={addService}
            className="inline-flex items-center gap-2 bg-navy-mid border border-gold/45 text-gold hover:bg-gold hover:text-navy hover:shadow-lg transition-all duration-300 text-xs font-bold uppercase tracking-wider px-6 py-3"
          >
            <Plus size={14} /> Add Digital Service Card
          </button>
        </div>
      )}
    </section>
  );
}
