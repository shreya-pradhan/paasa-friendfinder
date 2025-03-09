
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PersonalityQuestion } from '@/types';
import { useQuestionnaire } from '@/contexts/QuestionnaireContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface QuestionCardProps {
  question: PersonalityQuestion;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const { saveAnswer, goToNextQuestion, goToPreviousQuestion, userProfile } = useQuestionnaire();
  const currentAnswer = userProfile.answers[question.id];
  
  const [singleAnswer, setSingleAnswer] = useState<string>(
    currentAnswer && !Array.isArray(currentAnswer) ? currentAnswer : ''
  );
  
  const [multiAnswer, setMultiAnswer] = useState<string[]>(
    currentAnswer && Array.isArray(currentAnswer) ? currentAnswer : []
  );
  
  const [textAnswer, setTextAnswer] = useState<string>(
    currentAnswer && !Array.isArray(currentAnswer) ? currentAnswer as string : ''
  );

  const [error, setError] = useState('');

  useEffect(() => {
    // Update local state if the answer in context changes
    if (question.type === 'single-choice' && currentAnswer && !Array.isArray(currentAnswer)) {
      setSingleAnswer(currentAnswer);
    } else if (question.type === 'multi-choice' && currentAnswer && Array.isArray(currentAnswer)) {
      setMultiAnswer(currentAnswer);
    } else if (question.type === 'text' && currentAnswer && !Array.isArray(currentAnswer)) {
      setTextAnswer(currentAnswer);
    }
  }, [currentAnswer, question.type]);

  const handleSingleChoiceChange = (value: string) => {
    setSingleAnswer(value);
    setError('');
  };

  const handleMultiChoiceChange = (value: string, checked: boolean) => {
    setMultiAnswer(prev => {
      if (checked) {
        // If we're at max selections, don't add
        if (prev.length >= 3) {
          return prev;
        }
        return [...prev, value];
      } else {
        return prev.filter(item => item !== value);
      }
    });
    setError('');
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAnswer(e.target.value);
    setError('');
  };

  const handleContinue = () => {
    if (question.type === 'single-choice' && !singleAnswer) {
      setError('Please select an option');
      return;
    }
    
    if (question.type === 'multi-choice' && multiAnswer.length === 0) {
      setError('Please select at least one option');
      return;
    }
    
    if (question.type === 'single-choice') {
      saveAnswer(question.id, singleAnswer);
    } else if (question.type === 'multi-choice') {
      saveAnswer(question.id, multiAnswer);
    } else if (question.type === 'text') {
      saveAnswer(question.id, textAnswer);
    }
    
    goToNextQuestion();
  };

  return (
    <Card className="question-card w-full max-w-lg mx-auto">
      <CardContent className="pt-6">
        <h3 className="text-xl font-medium mb-6 text-center">{question.question}</h3>
        
        {question.type === 'single-choice' && (
          <RadioGroup value={singleAnswer} onValueChange={handleSingleChoiceChange} className="space-y-3">
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 p-3 rounded-md hover:bg-secondary transition-colors">
                <RadioGroupItem value={option.value} id={option.id} />
                <Label htmlFor={option.id} className="flex-grow cursor-pointer">{option.text}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
        
        {question.type === 'multi-choice' && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-2">Select up to 3 options</p>
            {question.options.map((option) => (
              <div 
                key={option.id} 
                className="flex items-center space-x-2 p-3 rounded-md hover:bg-secondary transition-colors"
              >
                <Checkbox 
                  id={option.id} 
                  checked={multiAnswer.includes(option.value)}
                  onCheckedChange={(checked) => handleMultiChoiceChange(option.value, checked === true)}
                  disabled={multiAnswer.length >= 3 && !multiAnswer.includes(option.value)}
                />
                <Label htmlFor={option.id} className="flex-grow cursor-pointer">{option.text}</Label>
              </div>
            ))}
          </div>
        )}
        
        {question.type === 'text' && (
          <Textarea 
            value={textAnswer}
            onChange={handleTextChange}
            placeholder="Share your thoughts here..."
            className="min-h-[120px]"
          />
        )}
        
        {error && <p className="text-destructive mt-2 text-sm">{error}</p>}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={goToPreviousQuestion}
        >
          Back
        </Button>
        <Button 
          onClick={handleContinue}
          className="bg-paasa-purple hover:bg-paasa-dark-purple"
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
