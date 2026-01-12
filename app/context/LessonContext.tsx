'use client'
import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';
interface LessonContextType {
  course: any | null;
  setCourse: Dispatch<SetStateAction<any | null>>;
}

const LessonContext = createContext<LessonContextType>({
  course: null,
  setCourse: () => { },
});

// Create a custom hook to easily consume the context
export const useLessonContext = () => useContext(LessonContext);

// Create the Provider component
export const LessonsProvider = ({ children }: any) => {
  const [course, setCourse] = useState<any>(null); // The state that will be shared

  // The value provided to the children will contain both the data and the setter
  const value = {
    course,
    setCourse,
  };

  return <LessonContext.Provider value={value}>{children}</LessonContext.Provider>;
};
