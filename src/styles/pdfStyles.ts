import { StyleSheet } from '@react-pdf/renderer';

export const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    position: 'relative',
    paddingTop: 24,
  },

  sidebar: {
    width: '25%',
    backgroundColor: '#1e3a8a', // blue-900
    color: '#ffffff',
    padding: 24,
    flexDirection: 'column',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },

  sidebarContent: {
    position: 'relative',
    top: 24,
  },

  mainContent: {
    width: '75%',
    padding: 32,
    flexDirection: 'column',
    marginLeft: '25%',
  },

  sidebarName: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e40af',
  },
  sidebarSection: {
    marginBottom: 16,
  },
  sidebarTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#ffffff',
  },
  sidebarText: {
    fontSize: 9,
    marginBottom: 4,
    color: '#ffffff',
    lineHeight: 1.6,
  },
  sidebarLink: {
    fontSize: 9,
    color: '#ffffff',
    textDecoration: 'underline',
    marginBottom: 6,
  },
  header: {
    marginBottom: 24,
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
  },
  headerInfo: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    paddingBottom: 4,
  },
  sectionContent: {
    marginBottom: 12,
  },
  itemContainer: {
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 9,
    color: '#4b5563',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 8,
  },
  bulletList: {
    marginLeft: 12,
  },
  bulletItem: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 4,
    lineHeight: 1.4,
  },
  objective: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  skillItem: {
    fontSize: 9,
    color: '#ffffff',
    marginBottom: 4,
    lineHeight: 1.6,
  },
});

export default pdfStyles;
