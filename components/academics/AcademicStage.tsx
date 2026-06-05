import React from "react";
import * as Icons from "lucide-react";

interface AcademicStageProps {
  id: string;
  icon: string;
  title: string;
  description: string;
  syllabusLink?: string;
  syllabusText?: string;
  sections: Array<{
    title: string;
    icon: string;
    items: string[];
  }>;
}

const AcademicStage: React.FC<AcademicStageProps> = ({
  id,
  icon,
  title,
  description,
  syllabusLink,
  syllabusText,
  sections,
}) => {
  const StageIcon = (Icons as any)[icon];

  return (
    <section className="grid md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start" id={id}>
      {/* Left Column: Info */}
      <div className="md:col-span-4 lg:col-span-3 md:sticky md:top-32">
        <div className="size-14 md:size-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 md:mb-8 shadow-sm">
          {StageIcon && <StageIcon size={28} className="md:hidden" />}
          {StageIcon && <StageIcon size={40} className="hidden md:block" />}
        </div>
        <h2 className="text-xl md:text-3xl font-black text-secondary mb-3 md:mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-[#64748b] mb-5 md:mb-8 leading-relaxed text-sm md:text-lg">
          {description}
        </p>
      </div>

      {/* Right Column: Cards */}
      <div className="md:col-span-8 lg:col-span-9 bg-white rounded-2xl border border-gray-100 p-5 md:p-12 shadow-xl shadow-gray-200/40">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {sections.map((section, sidx) => {
            const SectionIcon = (Icons as any)[section.icon];
            return (
              <div key={sidx}>
                <div className="flex items-center gap-3 mb-5 md:mb-8 pb-3 md:pb-4 border-b border-gray-100">
                  <div className="size-8 md:size-10 rounded-lg bg-bg-accent-subtle flex items-center justify-center text-primary">
                    {SectionIcon && <SectionIcon size={18} />}
                  </div>
                  <h3 className="text-base md:text-xl font-bold text-secondary">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, iidx) => (
                    <li key={iidx} className="flex items-start gap-3">
                      <div className={`mt-1.5 size-1.5 rounded-full shrink-0 ${sidx === 0 ? 'bg-primary' : 'bg-[#57cc99]'}`} />
                      <span className="text-[#64748b] text-sm leading-snug font-medium" dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AcademicStage;
