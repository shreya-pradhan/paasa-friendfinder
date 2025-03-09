
import React, { useState, useEffect } from 'react';
import { useQuestionnaire } from '@/contexts/QuestionnaireContext';
import { Users, Globe, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuestionnaireProvider } from '@/contexts/QuestionnaireContext';
import { useToast } from '@/hooks/use-toast';

const TallySurveyEmbed = () => {
  useEffect(() => {
    // This ensures the Tally embed script is loaded only once
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <iframe
      data-tally-src="https://tally.so/embed/wMMAzE?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
      width="100%"
      height="600"
      frameBorder="0"
      marginHeight={0}
      marginWidth={0}
      title="Personality Survey"
      className="tally-iframe"
    ></iframe>
  );
};

const QuestionnairePage: React.FC = () => {
  const { setEmail } = useQuestionnaire();
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [joinedWaitlist, setJoinedWaitlist] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const { toast } = useToast();
  
  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail && waitlistEmail.includes('@')) {
      setJoinedWaitlist(true);
      setEmail(waitlistEmail);
      toast({
        title: "Success!",
        description: "You've been added to our waiting list.",
      });
    }
  };
  
  const startSurvey = () => {
    setShowSurvey(true);
  };
  
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {!showJoinForm && !joinedWaitlist && !showSurvey && (
        <header className="text-center">
          <div className="flex justify-center mb-3">
            <div className="bg-orange-100 p-3 rounded-full">
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3">Paasa</h1>
          <p className="text-xl mb-8 flex items-center justify-center gap-2">
            Find Your Circle<Globe className="h-5 w-5 text-orange-500" />, Build Your Tribe.<Sparkles className="h-5 w-5 text-orange-500" />
          </p>
          
          <div className="max-w-md mx-auto space-y-6 mt-10">
            <Button 
              onClick={() => setShowJoinForm(true)} 
              size="lg"
              className="w-full text-lg py-6"
            >
              Join Now
            </Button>
          </div>
        </header>
      )}
      
      {showJoinForm && !joinedWaitlist && !showSurvey && (
        <div className="question-card w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Join the Waitlist</h2>
          <form onSubmit={handleJoinWaitlist} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="your@email.com"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Join Waitlist</Button>
          </form>
        </div>
      )}
      
      {joinedWaitlist && !showSurvey && (
        <div className="question-card w-full max-w-md mx-auto text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-orange-100 p-3 rounded-full">
              <Heart className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">You're on the List!</h2>
          <p className="mb-6 text-muted-foreground">
            While we prepare your perfect circle, take our personality test to help us match you with like-minded friends.
          </p>
          <Button 
            onClick={startSurvey}
            size="lg"
          >
            Take the Survey
          </Button>
        </div>
      )}
      
      {showSurvey && (
        <div className="w-full mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Personality Survey</h2>
          <TallySurveyEmbed />
        </div>
      )}
      
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Paasa. All rights reserved.</p>
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
