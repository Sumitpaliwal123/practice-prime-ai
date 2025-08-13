import { useState, useEffect } from 'react';

export interface Question {
  id: string;
  text: string;
  answered: boolean;
}

export interface Answer {
  questionId: string;
  question: string;
  answer: string;
  feedback: {
    score: number;
    strengths: string[];
    weaknesses: string[];
    improvements: string[];
  };
}

export interface InterviewState {
  jobDescription: string;
  questions: Question[];
  answers: Answer[];
  currentQuestionIndex: number;
  status: 'idle' | 'generating-questions' | 'answering' | 'evaluating' | 'completed';
}

const STORAGE_KEY = 'ai-interview-coach-state';

export const useInterviewCoach = () => {
  const [state, setState] = useState<InterviewState>(() => {
    // Load from localStorage on initialization
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load saved state:', error);
    }
    
    return {
      jobDescription: '',
      questions: [],
      answers: [],
      currentQuestionIndex: 0,
      status: 'idle' as const,
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  }, [state]);

  const generateQuestions = async (jobDescription: string) => {
    setState(prev => ({ 
      ...prev, 
      jobDescription, 
      status: 'generating-questions' 
    }));

    try {
      // Simulate API call for now - this would be replaced with actual Supabase edge function
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const sampleQuestions: Question[] = [
        { id: '1', text: 'Tell me about yourself and your background in software development.', answered: false },
        { id: '2', text: 'Describe a challenging project you worked on and how you overcame obstacles.', answered: false },
        { id: '3', text: 'How do you stay updated with the latest technologies and industry trends?', answered: false },
        { id: '4', text: 'Explain the difference between React hooks and class components. When would you use each?', answered: false },
        { id: '5', text: 'Walk me through how you would debug a performance issue in a React application.', answered: false },
        { id: '6', text: 'Describe your experience with version control and collaborative development workflows.', answered: false },
        { id: '7', text: 'How do you ensure code quality and maintainability in your projects?', answered: false },
        { id: '8', text: 'Tell me about a time when you had to learn a new technology quickly.', answered: false },
        { id: '9', text: 'How would you approach implementing responsive design for a complex web application?', answered: false },
        { id: '10', text: 'Describe your ideal work environment and how you handle feedback and criticism.', answered: false },
      ];

      setState(prev => ({
        ...prev,
        questions: sampleQuestions,
        status: 'answering',
        currentQuestionIndex: 0,
      }));
    } catch (error) {
      console.error('Failed to generate questions:', error);
      setState(prev => ({ ...prev, status: 'idle' }));
    }
  };

  const submitAnswer = async (answer: string) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    if (!currentQuestion) return;

    setState(prev => ({ ...prev, status: 'evaluating' }));

    try {
      // Simulate API call for feedback - this would be replaced with actual Supabase edge function
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sample feedback generation
      const sampleFeedback = {
        score: Math.floor(Math.random() * 4) + 6, // Score between 6-9
        strengths: [
          'Clear communication and structure',
          'Good use of specific examples',
          'Demonstrates technical knowledge'
        ],
        weaknesses: [
          'Could provide more specific metrics',
          'Answer could be more concise'
        ],
        improvements: [
          'Include quantifiable results when possible',
          'Practice the STAR method for better structure',
          'Add more details about lessons learned'
        ]
      };

      const newAnswer: Answer = {
        questionId: currentQuestion.id,
        question: currentQuestion.text,
        answer,
        feedback: sampleFeedback,
      };

      setState(prev => {
        const updatedQuestions = [...prev.questions];
        updatedQuestions[prev.currentQuestionIndex] = { 
          ...currentQuestion, 
          answered: true 
        };

        return {
          ...prev,
          questions: updatedQuestions,
          answers: [...prev.answers, newAnswer],
          status: 'answering',
        };
      });
    } catch (error) {
      console.error('Failed to evaluate answer:', error);
      setState(prev => ({ ...prev, status: 'answering' }));
    }
  };

  const nextQuestion = () => {
    const nextIndex = state.currentQuestionIndex + 1;
    
    if (nextIndex >= state.questions.length) {
      setState(prev => ({ ...prev, status: 'completed' }));
    } else {
      setState(prev => ({ 
        ...prev, 
        currentQuestionIndex: nextIndex,
        status: 'answering' 
      }));
    }
  };

  const restart = () => {
    setState({
      jobDescription: '',
      questions: [],
      answers: [],
      currentQuestionIndex: 0,
      status: 'idle',
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  const getSummaryData = () => {
    if (state.answers.length === 0) {
      return {
        averageScore: 0,
        totalQuestions: 0,
        strengths: [],
        improvementAreas: [],
        recommendations: [],
      };
    }

    const scores = state.answers.map(a => a.feedback.score);
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    // Aggregate all feedback
    const allStrengths = state.answers.flatMap(a => a.feedback.strengths);
    const allWeaknesses = state.answers.flatMap(a => a.feedback.weaknesses);
    const allImprovements = state.answers.flatMap(a => a.feedback.improvements);

    // Get unique items and most common ones
    const uniqueStrengths = [...new Set(allStrengths)].slice(0, 5);
    const uniqueWeaknesses = [...new Set(allWeaknesses)].slice(0, 5);
    const uniqueImprovements = [...new Set(allImprovements)].slice(0, 5);

    return {
      averageScore,
      totalQuestions: state.questions.length,
      strengths: uniqueStrengths,
      improvementAreas: uniqueWeaknesses,
      recommendations: uniqueImprovements,
    };
  };

  return {
    state,
    generateQuestions,
    submitAnswer,
    nextQuestion,
    restart,
    getSummaryData,
  };
};