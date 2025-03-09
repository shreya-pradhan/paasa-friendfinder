
export interface PersonalityQuestion {
  id: string;
  question: string;
  options: Array<{
    id: string;
    text: string;
    value: string;
  }>;
  type: 'single-choice' | 'multi-choice' | 'text';
}

export interface UserProfile {
  email: string;
  answers: Record<string, string | string[]>;
  completed: boolean;
}
