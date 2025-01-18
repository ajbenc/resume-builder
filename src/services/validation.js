import * as Yup from "yup";

// Personal Information Validation Schema
export const personalInfoSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^[0-9]{10}$/,
      "Phone number must be 10 digits"
    ),
  summary: Yup.string()
    .max(500, "Summary cannot exceed 500 characters"),
});

// Education Validation Schema
export const educationSchema = Yup.object().shape({
    school: Yup.string()
      .required("Institution is required")
      .min(2, "Institution name must be at least 2 characters"),
    degree: Yup.string()
      .required("Degree is required")
      .min(2, "Degree must be at least 2 characters"),
    startDate: Yup.date()
      .required("Start date is required")
      .typeError("Invalid date format"),
    endDate: Yup.date()
      .nullable()
      .typeError("Invalid date format")
      .min(Yup.ref("startDate"), "End date cannot be before start date"),
    description: Yup.string()
      .max(500, "Description cannot exceed 500 characters")
      .nullable(),
  });
  

// Experience Validation Schema
export const experienceSchema = Yup.object().shape({
    company: Yup.string()
      .required("Company name is required")
      .min(2, "Company name must be at least 2 characters"),
    role: Yup.string()
      .required("Role is required")
      .min(2, "Role must be at least 2 characters"),
    startDate: Yup.date()
      .required("Start date is required")
      .typeError("Invalid date format"),
    endDate: Yup.date()
      .nullable()
      .typeError("Invalid date format")
      .min(Yup.ref("startDate"), "End date cannot be before start date"),
    description: Yup.string()
      .max(1000, "Description cannot exceed 1000 characters")
      .nullable(),
  });
  
// Skills Validation Schema
export const skillSchema = Yup.object().shape({
    skill: Yup.string()
      .required("Skill is required")
      .min(2, "Skill must be at least 2 characters"),
  });
  

// Projects Validation Schema
export const projectSchema = Yup.object().shape({
  name: Yup.string()
    .required("Project name is required")
    .min(2, "Project name must be at least 2 characters"),
  description: Yup.string()
    .required("Description is required")
    .max(1000, "Description cannot exceed 1000 characters"),
  technologies: Yup.string()
    .required("Technologies are required")
    .min(2, "Technologies must be at least 2 characters"),
});
