import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { saveToLocalStorage, loadFromLocalStorage } from "../services/localStorage"; // Import localStorage functions

// Initial state structure
const initialState = {
  personalInfo: { name: "", email: "", phone: "", summary: "", profilePicture: "" },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  sections: [], // Dynamic sections for ordering
};

// Reducer function to handle state updates
const resumeReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };

    case "UPDATE_PROFILE_PICTURE":
      return {
        ...state,
        personalInfo: { ...state.personalInfo, profilePicture: action.payload },
      };

    case "ADD_SECTION":
      if (
        state.sections.some((section) => section.type === action.payload.type)
      ) {
        console.warn(`Section of type '${action.payload.type}' already exists.`);
        return state; // Prevent duplicates
      }
      return {
        ...state,
        sections: [...state.sections, action.payload],
      };

    case "REMOVE_SECTION":
      return {
        ...state,
        sections: state.sections.filter(
          (_, index) => index !== action.payload
        ),
      };

    case "REORDER_SECTIONS": {
      const { sourceIndex, destinationIndex } = action.payload;
      const updatedSections = Array.from(state.sections);
      const [movedItem] = updatedSections.splice(sourceIndex, 1);
      updatedSections.splice(destinationIndex, 0, movedItem);
      return { ...state, sections: updatedSections };
    }

    case "ADD_EDUCATION":
      return { ...state, education: [...state.education, action.payload] };

    case "DELETE_EDUCATION":
      return {
        ...state,
        education: state.education.filter(
          (_, index) => index !== action.payload
        ),
      };

      case "ADD_EXPERIENCE":
        return {
          ...state,
          experience: [...state.experience, action.payload],
        };

    case "DELETE_EXPERIENCE":
      return {
        ...state,
        experience: state.experience.filter(
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
      return initialState;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
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
      if (savedData.personalInfo) {
        dispatch({
          type: "UPDATE_PERSONAL_INFO",
          payload: savedData.personalInfo,
        });
      }
      if (savedData.sections) {
        savedData.sections.forEach((section) =>
          dispatch({ type: "ADD_SECTION", payload: section })
        );
      }
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
