
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuestionnaire } from '@/contexts/QuestionnaireContext';
import { Heart, Smile, Users } from 'lucide-react';

const CompletionScreen: React.FC = () => {
  const { userProfile } = useQuestionnaire();
  
  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg border-paasa-light-purple">
      <CardHeader>
        <div className="flex justify-center mb-2">
          <div className="bg-paasa-light-purple p-3 rounded-full">
            <Heart className="h-10 w-10 text-paasa-purple" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center font-bold">Thank You!</CardTitle>
      </CardHeader>
      
      <CardContent className="text-center space-y-4">
        <p className="text-lg">
          We've received your personality profile and will be working on finding great friend matches for you.
        </p>
        
        <div className="py-6 grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-paasa-light-purple p-2 rounded-full mb-2">
              <Smile className="h-6 w-6 text-paasa-purple" />
            </div>
            <p className="text-sm">Personality Analyzed</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-paasa-light-purple p-2 rounded-full mb-2 animate-pulse-soft">
              <Users className="h-6 w-6 text-paasa-purple" />
            </div>
            <p className="text-sm">Finding Matches</p>
          </div>
          
          <div className="flex flex-col items-center opacity-50">
            <div className="bg-paasa-light-purple p-2 rounded-full mb-2">
              <Users className="h-6 w-6 text-paasa-purple" />
            </div>
            <p className="text-sm">Connections Made</p>
          </div>
        </div>
        
        <p className="text-muted-foreground">
          We'll send an email to <span className="font-medium">{userProfile.email}</span> with your matches and next steps.
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-center">
        <Button 
          onClick={() => window.location.reload()}
          variant="outline"
          className="border-paasa-purple text-paasa-purple hover:bg-paasa-light-purple"
        >
          Start Over
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompletionScreen;
