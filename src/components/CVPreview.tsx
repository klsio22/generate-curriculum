import * as React from 'react';
import type { CVData } from '../types';

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview = React.forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ data }: CVPreviewProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    // ABNT Styling constants
    const sectionTitleClass =
      'uppercase font-bold text-sm mb-2 border-b border-black pb-1 mt-6';
    const textClass = 'text-justify leading-[1.5] text-base mb-1'; // 1.5 line height, base size (~12pt usually implies 16px in web, but strict 12pt is 16px)
    // Tailwind text-base is 1rem = 16px. 12pt is 16px. So text-base is correct.

    return (
      <div
        ref={ref}
        className="bg-white text-black p-[3cm_2cm_2cm_3cm] w-[210mm] min-h-[297mm] shadow-lg mx-auto print:shadow-none print:w-full print:mx-0"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-bold text-xl uppercase mb-1">{data.fullName}</h1>
          <div className="text-sm leading-relaxed">
            {data.address && <p>{data.address}</p>}
            <p>
              {data.phone && <span>{data.phone}</span>}
              {data.phone && data.email && <span> • </span>}
              {data.email && <span>{data.email}</span>}
            </p>
            {data.linkedin && <p>{data.linkedin}</p>}
          </div>
        </div>

        {/* Objective */}
        {data.objective && (
          <div className="mb-4">
            <h2 className={sectionTitleClass}>Objetivo</h2>
            <p className={textClass}>{data.objective}</p>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-4">
            <h2 className={sectionTitleClass}>Formação Acadêmica</h2>
            {data.education.map((edu, idx) => (
              <div key={idx} className="mb-3">
                <p className="font-bold">{edu.course}</p>
                <p className={textClass}>
                  {edu.institution} — {edu.startDate} a {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-4">
            <h2 className={sectionTitleClass}>Experiência Profissional</h2>
            {data.experience.map((exp, idx) => (
              <div key={idx} className="mb-4">
                <p className="font-bold">
                  {exp.role} — {exp.company}
                </p>
                <p className="italic text-sm mb-1">
                  {exp.startDate} a {exp.endDate}
                </p>
                {exp.description && (
                  <p className={textClass}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills && (
          <div className="mb-4">
            <h2 className={sectionTitleClass}>Habilidades e Qualificações</h2>
            <p className={textClass} style={{ whiteSpace: 'pre-line' }}>
              {data.skills}
            </p>
          </div>
        )}
      </div>
    );
  }
);

CVPreview.displayName = 'CVPreview';
