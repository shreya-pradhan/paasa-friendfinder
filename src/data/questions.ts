
import { PersonalityQuestion } from "../types";

export const personalityQuestions: PersonalityQuestion[] = [
  {
    id: "social-preference",
    question: "How do you prefer to spend your free time?",
    type: "single-choice",
    options: [
      { id: "sp1", text: "With a large group of friends", value: "extrovert" },
      { id: "sp2", text: "With a small group of close friends", value: "ambivert" },
      { id: "sp3", text: "Alone or with one close friend", value: "introvert" },
    ]
  },
  {
    id: "energy-source",
    question: "What energizes you most?",
    type: "single-choice",
    options: [
      { id: "es1", text: "Meeting new people and socializing", value: "extrovert" },
      { id: "es2", text: "A mix of social time and alone time", value: "ambivert" },
      { id: "es3", text: "Quiet time to think and recharge", value: "introvert" },
    ]
  },
  {
    id: "decision-making",
    question: "When making decisions, do you tend to:",
    type: "single-choice",
    options: [
      { id: "dm1", text: "Follow your heart and intuition", value: "feeler" },
      { id: "dm2", text: "Use a mix of logic and feelings", value: "balanced" },
      { id: "dm3", text: "Analyze facts and logical consequences", value: "thinker" },
    ]
  },
  {
    id: "conversation-style",
    question: "In conversations, which describes you best?",
    type: "single-choice",
    options: [
      { id: "cs1", text: "I speak as I think and process thoughts out loud", value: "external-processor" },
      { id: "cs2", text: "I consider my words carefully before speaking", value: "internal-processor" },
      { id: "cs3", text: "It depends on the situation and who I'm with", value: "adaptable" },
    ]
  },
  {
    id: "interests",
    question: "What activities interest you most? (Select up to 3)",
    type: "multi-choice",
    options: [
      { id: "int1", text: "Arts and creative activities", value: "arts" },
      { id: "int2", text: "Sports and fitness", value: "sports" },
      { id: "int3", text: "Technology and gaming", value: "tech" },
      { id: "int4", text: "Nature and outdoor activities", value: "nature" },
      { id: "int5", text: "Reading and learning", value: "learning" },
      { id: "int6", text: "Social events and gatherings", value: "social" },
      { id: "int7", text: "Cooking and food exploration", value: "food" },
      { id: "int8", text: "Travel and new experiences", value: "travel" },
    ]
  },
  {
    id: "ideal-friend",
    question: "What qualities do you value most in friends? (Select up to 3)",
    type: "multi-choice",
    options: [
      { id: "if1", text: "Loyalty and dependability", value: "loyalty" },
      { id: "if2", text: "Sense of humor", value: "humor" },
      { id: "if3", text: "Intelligence and thoughtfulness", value: "intelligence" },
      { id: "if4", text: "Empathy and understanding", value: "empathy" },
      { id: "if5", text: "Adventurousness", value: "adventure" },
      { id: "if6", text: "Honesty and directness", value: "honesty" },
      { id: "if7", text: "Positive outlook", value: "positivity" },
      { id: "if8", text: "Similar interests and values", value: "similarity" },
    ]
  },
  {
    id: "bio",
    question: "Tell us a little more about yourself and what you're looking for in a friend:",
    type: "text",
    options: []
  }
];
