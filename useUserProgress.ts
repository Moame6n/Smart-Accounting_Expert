
import { useState, useEffect, useCallback } from 'react';
import type { UserProgress } from '../types';

const STORAGE_KEY = 'accountingAppProgress';

const getInitialProgress = (): UserProgress => {
  try {
    const storedProgress = localStorage.getItem(STORAGE_KEY);
    if (storedProgress) {
      return JSON.parse(storedProgress);
    }
  } catch (error) {
    console.error("Failed to parse user progress from localStorage", error);
  }
  return {
    completedLessons: [],
    quizScores: {},
    lastActiveUnit: null,
  };
};

export const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error("Failed to save user progress to localStorage", error);
    }
  }, [progress]);

  const completeLesson = useCallback((lessonId: string) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) {
        return prev;
      }
      return { ...prev, completedLessons: [...prev.completedLessons, lessonId] };
    });
  }, []);
  
  const saveQuizScore = useCallback((unitId: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      quizScores: { ...prev.quizScores, [unitId]: score },
    }));
  }, []);

  const setLastActiveUnit = useCallback((unitId: string) => {
      setProgress(prev => ({ ...prev, lastActiveUnit: unitId }));
  }, []);

  const resetProgress = useCallback(() => {
    const initialProgress = {
      completedLessons: [],
      quizScores: {},
      lastActiveUnit: null,
    };
    setProgress(initialProgress);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { progress, completeLesson, saveQuizScore, setLastActiveUnit, resetProgress };
};
