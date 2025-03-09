
import React from 'react';
import { personalityQuestions } from '@/data/questions';

interface ProgressIndicatorProps {
  currentIndex: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentIndex }) => {
  // Add +1 to account for the email form step
  const totalSteps = personalityQuestions.length + 1;
  const normalizedIndex = currentIndex;
  
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Step {normalizedIndex + 1} of {totalSteps}
        </p>
        <p className="text-sm text-muted-foreground">
          {Math.round((normalizedIndex / (totalSteps - 1)) * 100)}% Complete
        </p>
      </div>
      
      <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-paasa-purple rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${(normalizedIndex / (totalSteps - 1)) * 100}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between mt-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index}
            className={`progress-dot ${index < normalizedIndex ? 'completed' : ''} ${index === normalizedIndex ? 'active' : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
