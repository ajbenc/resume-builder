import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Define styles for the PDF document using a system font
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica", // Use a system font
    backgroundColor: "#f8f8f8", // Light background for the page
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    borderBottom: "2px solid #007BFF", // Blue border for header
    paddingBottom: 10,
  },
  title: {
    fontSize: 26,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#007BFF", // Title color
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555",
  },
  section: {
    marginBottom: 15,
    padding: 10,
    border: "1px solid #ccc", // Border around sections
    borderRadius: 5,
    backgroundColor: "#fff", // White background for sections
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#333",
    borderBottom: "1px solid #007BFF", // Blue border for section titles
    paddingBottom: 5,
  },
  list: {
    marginLeft: 10,
  },
  listItem: {
    marginBottom: 5,
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
});

// PDF Document component
const PDFDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>{data.personalInfo.name}</Text>
        <Text style={styles.subtitle}>{data.personalInfo.email}</Text>
        <Text style={styles.subtitle}>{data.personalInfo.phone}</Text>
      </View>

      {/* Profile Summary Section */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Summary</Text>
          <Text>{data.summary}</Text>
        </View>
      )}

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {data.skills.map((skill, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text style={styles.listItem}>• {skill}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.list}>
              <Text style={styles.listItem}>
                <Text style={{ fontWeight: "bold" }}>{exp.role}</Text> at{" "}
                {exp.company}
              </Text>
              <Text style={styles.listItem}>
                {exp.startDate} - {exp.endDate || "Present"}
              </Text>
              <Text>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.list}>
              <Text style={styles.listItem}>
                <Text style={{ fontWeight: "bold" }}>{edu.degree}</Text> at{" "}
                {edu.school}
              </Text>
              <Text style={styles.listItem}>
                {edu.startDate} - {edu.endDate || "Present"}
              </Text>
              <Text>{edu.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Projects Section */}
      {data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map((proj, index) => (
            <View key={index} style={styles.list}>
              <Text style={styles.listItem}>
                <Text style={{ fontWeight: "bold" }}>{proj.name}</Text>
              </Text>
              <Text>{proj.description}</Text>
              <Text style={styles.listItem}>
                Technologies: {proj.technologies}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default PDFDocument;
