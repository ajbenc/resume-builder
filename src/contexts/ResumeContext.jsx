import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../services/localStorage"; // Import the localStorage functions

// Initial state structure
const initialState = {
  personalInfo: { name: "", email: "", phone: "", summary: "" },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  sections: [], // To keep track of which sections to show dynamically
};

// Reducer function to handle state updates
const resumeReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };

    case "ADD_SECTION":
      if (
        state.sections.some((section) => section.type === action.payload.type)
      ) {
        console.warn(
          `Section of type '${action.payload.type}' already exists.`
        );
        return state; // Prevent duplicates
      }
      return {
        ...state,
        sections: [
          ...state.sections,
          { type: action.payload.type, title: action.payload.title, data: [] },
        ],
      };

    case "REMOVE_SECTION":
      return {
        ...state,
        sections: state.sections.filter(
          (_, index) => index !== action.payload
        ),
      };

    case "ADD_EXPERIENCE":
      return { ...state, experience: [...state.experience, action.payload] };

    case "DELETE_EXPERIENCE":
      return {
        ...state,
        experience: state.experience.filter(
          (_, index) => index !== action.payload
        ),
      };

    case "ADD_EDUCATION":
      return { ...state, education: [...state.education, action.payload] };

    case "DELETE_EDUCATION":
      return {
        ...state,
        education: state.education.filter(
          (_, index) => index !== action.payload
        ),
      };

    case "ADD_SKILL":
      return { ...state, skills: [...state.skills, action.payload] };

    case "DELETE_SKILL":
      return {
        ...state,
        skills: state.skills.filter((skill) => skill !== action.payload),
      };

    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] };

    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          (_, index) => index !== action.payload
        ),
      };

    case "RESET_RESUME":
      console.log("Resetting resume to initial state.");
      return initialState;

    default:
      console.error(`Unknown action type: ${action.type}`);
      return state;
  }
};

// Context creation
export const ResumeContext = createContext();

// Provider component to wrap the app
export const ResumeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  // Load saved data from localStorage on initialization
  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      dispatch({
        type: "UPDATE_PERSONAL_INFO",
        payload: savedData.personalInfo || {},
      });
      dispatch({
        type: "ADD_SECTION",
        payload: savedData.sections || [],
      });
      // Load other sections (education, experience, etc.)
      if (savedData.education) {
        savedData.education.forEach((edu) =>
          dispatch({ type: "ADD_EDUCATION", payload: edu })
        );
      }
      if (savedData.experience) {
        savedData.experience.forEach((exp) =>
          dispatch({ type: "ADD_EXPERIENCE", payload: exp })
        );
      }
      if (savedData.skills) {
        savedData.skills.forEach((skill) =>
          dispatch({ type: "ADD_SKILL", payload: skill })
        );
      }
      if (savedData.projects) {
        savedData.projects.forEach((proj) =>
          dispatch({ type: "ADD_PROJECT", payload: proj })
        );
      }
    }
  }, []);

  // Save to localStorage whenever the state changes
  useEffect(() => {
    saveToLocalStorage(state);
  }, [state]);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

// Prop validation
ResumeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
