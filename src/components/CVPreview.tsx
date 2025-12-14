import * as React from 'react';
import type { CVData } from '../types';

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview = React.forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ data }: CVPreviewProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const primaryColor = '#4657F1';

    const styles = {
      titleClass: 'font-bold text-3xl mb-2',
      subtitleClass: 'text-sm uppercase font-normal',
      sectionTitleClass: 'uppercase font-bold text-[14px] mb-3',
      textClass: 'text-[12px] leading-relaxed mb-2',
      itemTitleClass: 'font-bold text-[12px] mb-1',
      itemMetaClass: 'text-[12px] mb-2',
      listItemClass: 'text-[12px] leading-relaxed',
      eduInstitutionClass: 'font-bold text-[12px]',
      eduCourseClass: 'text-[12px]',
      eduDateClass: 'text-[12px] text-gray-600',
      skillsItemClass: 'text-[12px]',
      refBlockClass: 'mb-3 text-sm',
    } as const;

    // --- Pagination logic -------------------------------------------------
    const mmToPx = (mm: number) => (mm * 96) / 28.4;
    const PAGE_HEIGHT_PX = mmToPx(297);
    // reserve top+bottom paddings (pt-8 ~= 32px). Keep some margin for safety.
    const RESERVED_VERTICAL_PX = 64;
    const PAGE_INNER_PX = PAGE_HEIGHT_PX - RESERVED_VERTICAL_PX;

    // Build ordered sections to measure and render. Each section gets a key.
    const sectionRefs = React.useRef<Record<string, HTMLDivElement | null>>({});

    const sectionsOrder: string[] = [];

    const makeKey = (name: string, idx?: number) =>
      idx !== undefined ? `${name}-${idx}` : name;

    // map of render functions for visible output (no refs)
    const renderSection = (key: string) => {
      const [name, idxStr] = key.split('-');
      const idx = idxStr ? Number(idxStr) : undefined;

      switch (name) {
        case 'header':
          return (
            <div>
              <div className="flex justify-between ">
                <div className="flex flex-col w-1/2">
                  <h1
                    className={styles.titleClass}
                    style={{ color: primaryColor }}
                  >
                    {data.fullName}
                  </h1>
                  <p className={styles.subtitleClass}>
                    {data.jobTitle || 'Profissional'}
                  </p>
                </div>
                <div className="w-2/5">
                  <div className="mb-6">
                    <h2
                      className={styles.sectionTitleClass}
                      style={{ color: primaryColor }}
                    >
                      CONTATO
                    </h2>
                    <div className="space-y-2 text-sm">
                      {data.email && (
                        <p>
                          <span className="font-semibold">E-mail:</span>{' '}
                          {data.email}
                        </p>
                      )}
                      {data.portfolio && (
                        <p>
                          <span className="font-semibold">Portfólio:</span>{' '}
                          {data.portfolio}
                        </p>
                      )}
                      {data.linkedin && (
                        <p>
                          <span className="font-semibold">LinkedIn:</span>{' '}
                          {data.linkedin}
                        </p>
                      )}
                      {data.phone && (
                        <p>
                          <span className="font-semibold">Telefone:</span>{' '}
                          {data.phone}
                        </p>
                      )}
                      {data.address && (
                        <p>
                          <span className="font-semibold">Endereço:</span>{' '}
                          {data.address}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

        case 'objective':
          return (
            <div className="mb-6">
              <h2
                className={styles.sectionTitleClass}
                style={{ color: primaryColor }}
              >
                PERFIL
              </h2>
              <p className={styles.textClass}>{data.objective}</p>
            </div>
          );

        case 'experience': {
          if (idx === undefined) return null;
          const exp = data.experience?.[idx];
          if (!exp) return null;
          return (
            <div className="mb-5">
              <p className={styles.itemTitleClass}>{exp.role}</p>
              <p className={styles.itemMetaClass}>
                {exp.company} | {exp.startDate} - {exp.endDate}
              </p>
              {exp.description && (
                <ul className="list-disc ml-5 space-y-1">
                  {exp.description
                    .split('\n')
                    .filter((line) => line.trim())
                    .map((line, i) => (
                      <li key={i} className={styles.listItemClass}>
                        {line.trim()}
                      </li>
                    ))}
                </ul>
              )}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="list-disc ml-5 space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className={styles.listItemClass}>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }

        case 'education': {
          if (idx === undefined) return null;
          const edu = data.education?.[idx];
          if (!edu) return null;
          return (
            <div>
              {idx === 0 && (
                <h2
                  className={styles.sectionTitleClass}
                  style={{ color: primaryColor }}
                >
                  FORMAÇÃO ACADÊMICA
                </h2>
              )}
              <div className="mb-4">
                <p className={styles.eduInstitutionClass}>{edu.institution}</p>
                <p className={styles.eduCourseClass}>{edu.course}</p>
                <p className={styles.eduDateClass}>
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            </div>
          );
        }

        case 'softSkills': {
          const soft = data.softSkills ?? '';
          if (!soft.trim()) return null;
          return (
            <div className="mb-6">
              <h2
                className={styles.sectionTitleClass}
                style={{ color: primaryColor }}
              >
                SOFT SKILLS
              </h2>
              <ul className="space-y-1">
                {soft
                  .split('\n')
                  .filter((s) => s.trim())
                  .map((s, i) => (
                    <li key={i} className={styles.listItemClass}>
                      {s.trim()}
                    </li>
                  ))}
              </ul>
            </div>
          );
        }

        case 'skills':
          return (
            <div className="mb-6">
              <h2
                className={styles.sectionTitleClass}
                style={{ color: primaryColor }}
              >
                HABILIDADES
              </h2>
              <ul className="space-y-1">
                {data.skills
                  .split('\n')
                  .filter((skill) => skill.trim())
                  .map((skill, i) => (
                    <li key={i} className={styles.skillsItemClass}>
                      {skill.trim().startsWith('•')
                        ? skill.trim()
                        : `• ${skill.trim()}`}
                    </li>
                  ))}
              </ul>
            </div>
          );

        case 'languages': {
          const langs = data.languages ?? '';
          if (!langs.trim()) return null;
          return (
            <div className="mb-6">
              <h2
                className={styles.sectionTitleClass}
                style={{ color: primaryColor }}
              >
                IDIOMAS
              </h2>
              <ul className="space-y-1">
                {langs
                  .split('\n')
                  .filter((l) => l.trim())
                  .map((l, i) => (
                    <li key={i} className={styles.listItemClass}>
                      {l.trim()}
                    </li>
                  ))}
              </ul>
            </div>
          );
        }

        case 'custom':
          if (!data.customFields || data.customFields.length === 0) return null;
          return (
            <div className="mb-6">
              {data.customFields.map((cf, i) =>
                cf.label && cf.value ? (
                  <div key={i} className="mb-3">
                    <p className={styles.itemTitleClass}>{cf.label}</p>
                    <p className={styles.listItemClass}>{cf.value}</p>
                  </div>
                ) : null
              )}
            </div>
          );

        case 'references': {
          if (idx === undefined) return null;
          const refData = data.references?.[idx];
          if (!refData) return null;
          return (
            <div className={styles.refBlockClass}>
              <p className="font-bold">{refData.name}</p>
              {refData.email && <p>E-mail: {refData.email}</p>}
              {refData.phone && <p>Telefone: {refData.phone}</p>}
            </div>
          );
        }

        default:
          return null;
      }
    };

    // prepare ordered keys
    sectionsOrder.push(makeKey('header'));
    if (data.objective) sectionsOrder.push(makeKey('objective'));
    if (data.experience) {
      data.experience.forEach((_, i) =>
        sectionsOrder.push(makeKey('experience', i))
      );
    }
    if (data.education && data.education.length > 0) {
      sectionsOrder.push(makeKey('educationHeader'));
      data.education.forEach((_, i) =>
        sectionsOrder.push(makeKey('education', i))
      );
    }
    if (data.softSkills && data.softSkills.trim())
      sectionsOrder.push(makeKey('softSkills'));
    if (data.skills) sectionsOrder.push(makeKey('skills'));
    if (data.languages && data.languages.trim())
      sectionsOrder.push(makeKey('languages'));
    if (data.customFields && data.customFields.length > 0)
      sectionsOrder.push(makeKey('custom'));
    if (data.references)
      data.references.forEach((_, i) =>
        sectionsOrder.push(makeKey('references', i))
      );

    const [pages, setPages] = React.useState<string[][]>([[...sectionsOrder]]);

    // Measure in a hidden container and compute pages
    React.useLayoutEffect(() => {
      // measurement container elements must be present in DOM
      const measurements: { key: string; height: number }[] = [];

      sectionsOrder.forEach((key) => {
        const el = sectionRefs.current[key];
        if (!el) {
          measurements.push({ key, height: 0 });
          return;
        }
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        const marginTop = parseFloat(style.marginTop || '0');
        const marginBottom = parseFloat(style.marginBottom || '0');
        const total = rect.height + marginTop + marginBottom;
        measurements.push({ key, height: total });
      });

      const newPages: string[][] = [];
      let currentPage: string[] = [];
      let acc = 0;

      measurements.forEach((m) => {
        // if single element exceeds page, still put it alone
        if (acc + m.height > PAGE_INNER_PX && currentPage.length > 0) {
          newPages.push(currentPage);
          currentPage = [m.key];
          acc = m.height;
        } else {
          currentPage.push(m.key);
          acc += m.height;
        }
      });

      if (currentPage.length > 0) newPages.push(currentPage);

      setPages(newPages.length ? newPages : [[]]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    // Hidden measurement container render
    const measurementNodes = (
      <div
        style={{
          position: 'absolute',
          left: -9999,
          top: 0,
          visibility: 'hidden',
          width: '210mm',
        }}
      >
        {sectionsOrder.map((key) => (
          <div
            key={key}
            ref={(el) => {
              sectionRefs.current[key] = el;
            }}
            style={{ boxSizing: 'border-box' }}
          >
            {renderSection(key)}
          </div>
        ))}
      </div>
    );

    // Visible pages render — wrap pages in the forwarded ref container
    return (
      <div ref={ref} style={{ fontFamily: 'Arial, sans-serif' }}>
        {measurementNodes}
        {pages.map((pageKeys, pIdx) => (
          <div
            key={pIdx}
            className="bg-white text-black pt-8 px-12 w-[210mm] shadow-lg mx-auto print:shadow-none print:w-full print:mx-0"
            style={{
              height: '297mm',
              boxSizing: 'border-box',
              marginTop: pIdx === 0 ? 0 : 16,
            }}
          >
            <div className="flex flex-col">
              {pageKeys.map((k) => (
                <div key={k}>{renderSection(k)}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

CVPreview.displayName = 'CVPreview';
