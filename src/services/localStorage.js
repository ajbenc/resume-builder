const LOCAL_STORAGE_KEY = "resumeData";

// Save data to localStorage
export const saveToLocalStorage = (data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedData);
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
};

// Load data from localStorage
export const loadFromLocalStorage = () => {
  try {
    const serializedData = localStorage.getItem("resumeData");
    if (serializedData) {
      const parsedData = JSON.parse(serializedData);
      // Validate and return correct structure
      return {
        personalInfo: parsedData.personalInfo || {
          name: "",
          email: "",
          phone: "",
          summary: "",
        },
        education: parsedData.education || [],
        experience: parsedData.experience || [],
        skills: parsedData.skills || [],
        projects: parsedData.projects || [],
        sections: parsedData.sections || [],
      };
    }
    return null;
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
    return null; // Return null on error
  }
};

// Clear data from localStorage
export const clearLocalStorage = () => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing data from localStorage:", error);
  }
};
