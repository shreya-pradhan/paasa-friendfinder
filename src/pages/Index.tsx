
import React from 'react';
import { useQuestionnaire } from '@/contexts/QuestionnaireContext';
import { personalityQuestions } from '@/data/questions';
import EmailForm from '@/components/EmailForm';
import QuestionCard from '@/components/QuestionCard';
import ProgressIndicator from '@/components/ProgressIndicator';
import CompletionScreen from '@/components/CompletionScreen';
import { Button } from '@/components/ui/button';
import { Heart, Users } from 'lucide-react';
import { QuestionnaireProvider } from '@/contexts/QuestionnaireContext';

const QuestionnairePage: React.FC = () => {
  const { currentQuestionIndex, isCompleted, submitQuestionnaire, isSubmitting } = useQuestionnaire();
  
  // If user has completed all questions but not yet submitted
  const showSubmitScreen = currentQuestionIndex === personalityQuestions.length;
  
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <div className="flex justify-center mb-3">
          <div className="bg-paasa-light-purple p-2 rounded-full">
            <Users className="h-6 w-6 text-paasa-purple" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">PAASA Friend Finder</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Find friends who match your personality and interests. It only takes a few minutes!
        </p>
      </header>
      
      {currentQuestionIndex > 0 && !isCompleted && (
        <ProgressIndicator currentIndex={currentQuestionIndex} />
      )}
      
      {currentQuestionIndex === 0 && (
        <EmailForm />
      )}
      
      {currentQuestionIndex > 0 && currentQuestionIndex <= personalityQuestions.length && !isCompleted && (
        <QuestionCard question={personalityQuestions[currentQuestionIndex - 1]} />
      )}
      
      {showSubmitScreen && !isCompleted && (
        <div className="question-card w-full max-w-lg mx-auto text-center p-6">
          <div className="mb-6 flex justify-center">
            <div className="bg-paasa-light-purple p-3 rounded-full">
              <Heart className="h-8 w-8 text-paasa-purple" />
            </div>
          </div>
          <h3 className="text-xl font-medium mb-4">You're all set!</h3>
          <p className="mb-6 text-muted-foreground">
            Thanks for completing the questionnaire. Submit now to find your perfect friends!
          </p>
          <Button 
            onClick={submitQuestionnaire} 
            disabled={isSubmitting}
            className="bg-paasa-purple hover:bg-paasa-dark-purple"
          >
            {isSubmitting ? "Processing..." : "Find My Friends"}
          </Button>
        </div>
      )}
      
      {isCompleted && (
        <CompletionScreen />
      )}
      
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} PAASA Friend Finder. All rights reserved.</p>
      </footer>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <QuestionnaireProvider>
      <QuestionnairePage />
    </QuestionnaireProvider>
  );
};

export default Index;
