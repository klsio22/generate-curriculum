import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  Link,
} from '@react-pdf/renderer';
import styles from '../styles/pdfStyles';
import type { CVData } from '../types';
import { formatDate, wrapAndTruncate } from '../utils/textUtils';

export interface PDFPreviewProps {
  data: CVData;
}

const CVDocument: React.FC<PDFPreviewProps> = ({ data }) => {
  const skillsList =
    data.skills
      ?.split('\n')
      .map((s) => s.trim())
      .filter(Boolean) || [];
  const topSkills = skillsList.slice(0, 6);
  const langsList = data.languages?.split('\n').filter((l) => l.trim()) || [];
  const softList = data.softSkills?.split('\n').filter((s) => s.trim()) || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* SIDEBAR */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarContent}>
            {/* Name */}
            <Text style={styles.sidebarName}>{data.fullName}</Text>

            {/* Contact Section */}
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Contato</Text>
              {data.email && (
                <Text style={styles.sidebarText}>{data.email}</Text>
              )}
              {data.phone && (
                <Text style={styles.sidebarText}>{data.phone}</Text>
              )}
              {data.linkedin && (
                <Link style={styles.sidebarLink} src={data.linkedin}>
                  {wrapAndTruncate(data.linkedin, 24, 1)}
                </Link>
              )}
              {data.portfolio && (
                <Link style={styles.sidebarLink} src={data.portfolio}>
                  {wrapAndTruncate(data.portfolio, 30, 2)}
                </Link>
              )}
            </View>

            {/* Main Skills Section */}
            {topSkills.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Principais competências</Text>
                {topSkills.map((skill) => (
                  <Text key={skill} style={styles.skillItem}>
                    • {skill.replace(/^•\s*/, '')}
                  </Text>
                ))}
              </View>
            )}

            {/* Languages */}
            {langsList.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Idiomas</Text>
                {langsList.map((lang) => (
                  <Text key={lang} style={styles.sidebarText}>
                    {lang.trim()}
                  </Text>
                ))}
              </View>
            )}

            {/* Soft Skills */}
            {softList.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Soft Skills</Text>
                {softList.map((s) => (
                  <Text key={s} style={styles.sidebarText}>
                    • {s.trim()}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* MAIN CONTENT */}
        <View style={styles.mainContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.fullName}>{data.fullName}</Text>
            {data.jobTitle && (
              <Text style={styles.jobTitle}>{data.jobTitle}</Text>
            )}
            <View style={styles.headerInfo}>
              {data.email && <Text>{data.email}</Text>}
              {data.phone && <Text>{data.phone}</Text>}
              {data.address && <Text>{data.address}</Text>}
            </View>
          </View>

          {/* Objective */}
          {data.objective && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>PERFIL</Text>
              <Text style={styles.objective}>{data.objective}</Text>
            </View>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>EXPERIÊNCIA PROFISSIONAL</Text>
              {data.experience.map((exp) => (
                <View
                  key={`${exp.company}-${exp.role}`}
                  style={styles.itemContainer}
                >
                  <Text style={styles.itemTitle}>{exp.role}</Text>
                  <Text style={styles.itemSubtitle}>{exp.company}</Text>
                  <Text style={styles.itemDate}>
                    {formatDate(exp.startDate)}
                    {exp.endDate ? ` - ${formatDate(exp.endDate)}` : ' - Atual'}
                  </Text>
                  {exp.description && (
                    <View style={styles.bulletList}>
                      {exp.description
                        .split('\n')
                        .filter((line) => line.trim())
                        .map((line) => (
                          <Text
                            key={`${exp.company}-${line.trim()}`}
                            style={styles.bulletItem}
                          >
                            • {line.trim()}
                          </Text>
                        ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>FORMAÇÃO ACADÊMICA</Text>
              {data.education.map((edu) => (
                <View
                  key={`${edu.institution}-${edu.course}`}
                  style={styles.itemContainer}
                >
                  <Text style={styles.itemTitle}>{edu.institution}</Text>
                  <Text style={styles.itemSubtitle}>{edu.course}</Text>
                  {(edu.startDate || edu.endDate) && (
                    <Text style={styles.itemDate}>
                      {formatDate(edu.startDate)}
                      {edu.endDate ? ` - ${formatDate(edu.endDate)}` : ''}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* All Skills */}
          {skillsList.length > 0 && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>HABILIDADES</Text>
              {skillsList.map((skill) => (
                <Text key={skill} style={styles.bulletItem}>
                  • {skill.trim().replace(/^•\s*/, '')}
                </Text>
              ))}
            </View>
          )}

          {/* References */}
          {data.references && data.references.length > 0 && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>REFERÊNCIAS</Text>
              {data.references.map((ref) => (
                <View
                  key={`${ref.name}-${ref.email || ref.phone}`}
                  style={styles.itemContainer}
                >
                  <Text style={styles.itemTitle}>{ref.name}</Text>
                  {ref.email && (
                    <Text style={styles.itemSubtitle}>E-mail: {ref.email}</Text>
                  )}
                  {ref.phone && (
                    <Text style={styles.itemSubtitle}>
                      Telefone: {ref.phone}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export const PDFPreview = ({ data }: PDFPreviewProps) => {
  return (
    <div className="h-192 max-h-max border border-gray-200 rounded-lg overflow-hidden w-full">
      <PDFViewer style={{ width: '100%', height: '100%' }}>
        <CVDocument data={data} />
      </PDFViewer>
    </div>
  );
};

export { CVDocument };
export default PDFPreview;
