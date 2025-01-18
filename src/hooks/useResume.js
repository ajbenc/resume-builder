import { useContext } from 'react';
import { ResumeContext } from '../contexts/ResumeContext';

export const useResume = () => {
  const { state, dispatch } = useContext(ResumeContext);

  const updatePersonalInfo = (info) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: info });
  };

  const addEducation = (education) => {
    dispatch({ type: 'ADD_EDUCATION', payload: education });
  };

  const addExperience = (experience) => {
    dispatch({ type: 'ADD_EXPERIENCE', payload: experience });
  };

  const addSkill = (skill) => {
    dispatch({ type: 'ADD_SKILL', payload: skill });
  };

  const addProject = (project) => {
    dispatch({ type: 'ADD_PROJECT', payload: project });
  };

  const resetResume = () => {
    dispatch({ type: 'RESET_RESUME' });
  };

  return {
    state,
    updatePersonalInfo,
    addEducation,
    addExperience,
    addSkill,
    addProject,
    resetResume
  };
};
