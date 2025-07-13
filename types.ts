export interface Message {
  sender: 'user' | 'ai';
  text: string;
}

// For study plan in data/content.ts
export interface Lesson {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

// For accounting terms in data/content.ts
export interface Term {
  id: string;
  term: string;
  definition: string;
  image: string;
}

// For quizzes in data/content.ts
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  unitId: string;
  questions: Question[];
}

// For user progress hook
export interface UserProgress {
  completedLessons: string[];
  quizScores: { [key: string]: number };
  lastActiveUnit: string | null;
}
