export type Axis = 'EI' | 'SN' | 'TF' | 'JP' | 'AT';
export type Direction = 'positive' | 'negative';

export interface Question {
  id: number;
  axis: Axis;
  text: string;
  direction: Direction;
}

export interface QuestionsData {
  version: string;
  lastUpdated: string;
  questions: Question[];
}

export interface Answer {
  questionId: number;
  axis: Axis;
  value: number; // -2 to 2
}

export interface QuizState {
  currentQuestion: number;
  answers: Answer[];
  isCompleted: boolean;
}

export interface AxisResult {
  axis: Axis;
  primary: string;
  secondary: string;
  percentage: number;
}
