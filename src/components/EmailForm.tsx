
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuestionnaire } from '@/contexts/QuestionnaireContext';
import { Mail } from 'lucide-react';

const EmailForm: React.FC = () => {
  const { setEmail, goToNextQuestion, userProfile } = useQuestionnaire();
  const [inputEmail, setInputEmail] = useState(userProfile.email);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail.trim()) {
      setError('Please enter your email');
      return;
    }
    
    if (!validateEmail(inputEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setEmail(inputEmail);
    goToNextQuestion();
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-paasa-light-purple">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-bold">Start Your Friend Journey</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
              />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          className="w-full bg-paasa-purple hover:bg-paasa-dark-purple"
        >
          Continue to Questionnaire
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmailForm;
