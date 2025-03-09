
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '../types';
import { useToast } from '@/hooks/use-toast';

interface QuestionnaireContextType {
  userProfile: UserProfile;
  setEmail: (email: string) => void;
  saveAnswer: (questionId: string, answer: string | string[]) => void;
  currentQuestionIndex: number;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  submitQuestionnaire: () => void;
  isSubmitting: boolean;
  isCompleted: boolean;
}

const defaultUserProfile: UserProfile = {
  email: '',
  answers: {},
  completed: false,
};

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

export const QuestionnaireProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  const setEmail = (email: string) => {
    setUserProfile((prev) => ({
      ...prev,
      email,
    }));
  };

  const saveAnswer = (questionId: string, answer: string | string[]) => {
    setUserProfile((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer,
      },
    }));
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  };

  const submitQuestionnaire = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Submitting data:', userProfile);
      
      // In a real app, you would send this data to your backend
      setUserProfile((prev) => ({
        ...prev,
        completed: true,
      }));
      
      setIsCompleted(true);
      setIsSubmitting(false);
      
      toast({
        title: "Success!",
        description: "Your profile has been saved. We'll be in touch soon!",
      });
    }, 1500);
  };

  const value = {
    userProfile,
    setEmail,
    saveAnswer,
    currentQuestionIndex,
    goToNextQuestion,
    goToPreviousQuestion,
    submitQuestionnaire,
    isSubmitting,
    isCompleted,
  };

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (context === undefined) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
};
