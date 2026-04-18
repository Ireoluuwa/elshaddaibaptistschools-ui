import React from "react";
import * as Icons from "lucide-react";
import { Download } from "lucide-react";

interface AcademicStageProps {
  id: string;
  icon: string;
  title: string;
  description: string;
  syllabusLink: string;
  syllabusText: string;
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
      <div className="md:col-span-4 lg:col-span-3 sticky top-32">
        <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 shadow-sm">
          {StageIcon && <StageIcon size={40} />}
        </div>
        <h2 className="text-3xl font-black text-secondary mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-[#64748b] mb-8 leading-relaxed text-lg">
          {description}
        </p>
        <a 
          className="inline-flex items-center gap-3 text-primary font-bold hover:text-secondary transition-colors group px-6 py-3 bg-primary/5 rounded-xl border border-primary/10" 
          href={syllabusLink}
        >
          <Download size={20} className="transition-transform group-hover:translate-y-1" />
          {syllabusText}
        </a>
      </div>

      {/* Right Column: Cards */}
      <div className="md:col-span-8 lg:col-span-9 bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-xl shadow-gray-200/40">
        <div className="grid md:grid-cols-2 gap-12">
          {sections.map((section, sidx) => {
            const SectionIcon = (Icons as any)[section.icon];
            return (
              <div key={sidx}>
                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                  <div className="size-10 rounded-lg bg-bg-accent-subtle flex items-center justify-center text-primary">
                    {SectionIcon && <SectionIcon size={24} />}
                  </div>
                  <h3 className="text-xl font-bold text-secondary">{section.title}</h3>
                </div>
                <ul className="space-y-4">
                  {section.items.map((item, iidx) => (
                    <li key={iidx} className="flex items-start gap-4">
                      <div className={`mt-2 size-2 rounded-full flex-shrink-0 ${sidx === 0 ? 'bg-primary' : 'bg-[#57cc99]'}`} />
                      <span className="text-[#64748b] leading-tight font-medium" dangerouslySetInnerHTML={{ __html: item }} />
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
