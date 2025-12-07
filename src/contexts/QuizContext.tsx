'use client';

import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import { QuizState, Answer, Question, Axis } from '@/types';
import { calculateMBTIType, shuffleQuestions } from '@/lib/calculateResult';
import questionsData from '@/data/questions.json';

type QuizAction =
  | { type: 'ANSWER_QUESTION'; payload: Answer }
  | { type: 'GO_TO_QUESTION'; payload: number }
  | { type: 'RESET_QUIZ' }
  | { type: 'SET_QUESTIONS'; payload: Question[] };

interface QuizContextValue {
  state: QuizState;
  questions: Question[];
  currentQuestionData: Question | null;
  answerQuestion: (value: number) => void;
  goToQuestion: (index: number) => void;
  goToPrevious: () => void;
  goToNext: () => void;
  resetQuiz: () => void;
  calculateResult: () => { type: string; axisResults: ReturnType<typeof calculateMBTIType>['axisResults'] };
  getAnswerForQuestion: (questionId: number) => number | null;
  progress: number;
}

const initialState: QuizState = {
  currentQuestion: 0,
  answers: [],
  isCompleted: false,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'ANSWER_QUESTION': {
      const existingIndex = state.answers.findIndex(
        (a) => a.questionId === action.payload.questionId
      );

      let newAnswers: Answer[];
      if (existingIndex >= 0) {
        newAnswers = [...state.answers];
        newAnswers[existingIndex] = action.payload;
      } else {
        newAnswers = [...state.answers, action.payload];
      }

      const totalQuestions = questionsData.questions.length;
      const isCompleted = newAnswers.length >= totalQuestions;

      return {
        ...state,
        answers: newAnswers,
        isCompleted,
      };
    }

    case 'GO_TO_QUESTION':
      return {
        ...state,
        currentQuestion: Math.max(0, Math.min(action.payload, questionsData.questions.length - 1)),
      };

    case 'RESET_QUIZ':
      return initialState;

    default:
      return state;
  }
}

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const questions = useMemo(() => {
    return shuffleQuestions(questionsData.questions as Question[]);
  }, []);

  const currentQuestionData = useMemo(() => {
    return questions[state.currentQuestion] || null;
  }, [questions, state.currentQuestion]);

  const answerQuestion = useCallback(
    (value: number) => {
      if (!currentQuestionData) return;

      const answer: Answer = {
        questionId: currentQuestionData.id,
        axis: currentQuestionData.axis as Axis,
        value: currentQuestionData.direction === 'positive' ? value : -value,
      };

      dispatch({ type: 'ANSWER_QUESTION', payload: answer });

      if (state.currentQuestion < questions.length - 1) {
        dispatch({ type: 'GO_TO_QUESTION', payload: state.currentQuestion + 1 });
      }
    },
    [currentQuestionData, state.currentQuestion, questions.length]
  );

  const goToQuestion = useCallback((index: number) => {
    dispatch({ type: 'GO_TO_QUESTION', payload: index });
  }, []);

  const goToPrevious = useCallback(() => {
    dispatch({ type: 'GO_TO_QUESTION', payload: state.currentQuestion - 1 });
  }, [state.currentQuestion]);

  const goToNext = useCallback(() => {
    dispatch({ type: 'GO_TO_QUESTION', payload: state.currentQuestion + 1 });
  }, [state.currentQuestion]);

  const resetQuiz = useCallback(() => {
    dispatch({ type: 'RESET_QUIZ' });
  }, []);

  const calculateResult = useCallback(() => {
    return calculateMBTIType(state.answers);
  }, [state.answers]);

  const getAnswerForQuestion = useCallback(
    (questionId: number) => {
      const answer = state.answers.find((a) => a.questionId === questionId);
      if (!answer) return null;

      const question = questions.find((q) => q.id === questionId);
      if (!question) return null;

      return question.direction === 'positive' ? answer.value : -answer.value;
    },
    [state.answers, questions]
  );

  const progress = useMemo(() => {
    return Math.round((state.answers.length / questions.length) * 100);
  }, [state.answers.length, questions.length]);

  const value: QuizContextValue = {
    state,
    questions,
    currentQuestionData,
    answerQuestion,
    goToQuestion,
    goToPrevious,
    goToNext,
    resetQuiz,
    calculateResult,
    getAnswerForQuestion,
    progress,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
