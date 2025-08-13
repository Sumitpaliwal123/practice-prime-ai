import { motion } from "framer-motion";
import { useInterviewCoach } from "@/hooks/useInterviewCoach";
import { useTheme } from "@/hooks/useTheme";
import Header from "@/components/Header";
import JobDescriptionForm from "@/components/JobDescriptionForm";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";
import FeedbackCard from "@/components/FeedbackCard";
import SummaryCard from "@/components/SummaryCard";

const Index = () => {
  const { isDark, toggleTheme } = useTheme();
  const {
    state,
    generateQuestions,
    submitAnswer,
    nextQuestion,
    restart,
    getSummaryData,
  } = useInterviewCoach();

  const renderContent = () => {
    switch (state.status) {
      case 'idle':
        return (
          <motion.div
            key="job-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-8"
          >
            <JobDescriptionForm
              onStartInterview={generateQuestions}
              isLoading={false}
            />
          </motion.div>
        );

      case 'generating-questions':
        return (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-8"
          >
            <JobDescriptionForm
              onStartInterview={generateQuestions}
              isLoading={true}
            />
          </motion.div>
        );

      case 'answering':
        const currentQuestion = state.questions[state.currentQuestionIndex];
        const hasAnsweredCurrent = state.answers.some(
          a => a.questionId === currentQuestion?.id
        );

        if (hasAnsweredCurrent) {
          const currentAnswer = state.answers.find(
            a => a.questionId === currentQuestion.id
          );
          
          return (
            <motion.div
              key={`feedback-${currentQuestion.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="container mx-auto px-4 py-8"
            >
              <ProgressBar
                currentStep={state.currentQuestionIndex + 1}
                totalSteps={state.questions.length}
                completedQuestions={state.answers.length}
              />
              {currentAnswer && (
                <FeedbackCard
                  feedback={currentAnswer.feedback}
                  question={currentAnswer.question}
                  answer={currentAnswer.answer}
                  onNextQuestion={nextQuestion}
                  isLastQuestion={state.currentQuestionIndex === state.questions.length - 1}
                />
              )}
            </motion.div>
          );
        }

        return (
          <motion.div
            key={`question-${currentQuestion?.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-8"
          >
            <ProgressBar
              currentStep={state.currentQuestionIndex + 1}
              totalSteps={state.questions.length}
              completedQuestions={state.answers.length}
            />
            {currentQuestion && (
              <QuestionCard
                question={currentQuestion.text}
                questionNumber={state.currentQuestionIndex + 1}
                totalQuestions={state.questions.length}
                onSubmitAnswer={submitAnswer}
                isLoading={false}
              />
            )}
          </motion.div>
        );

      case 'evaluating':
        // Show current question with loading state
        const currentQ = state.questions[state.currentQuestionIndex];
        return (
          <motion.div
            key={`evaluating-${currentQ?.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-8"
          >
            <ProgressBar
              currentStep={state.currentQuestionIndex + 1}
              totalSteps={state.questions.length}
              completedQuestions={state.answers.length}
            />
            {currentQ && (
              <QuestionCard
                question={currentQ.text}
                questionNumber={state.currentQuestionIndex + 1}
                totalQuestions={state.questions.length}
                onSubmitAnswer={submitAnswer}
                isLoading={true}
              />
            )}
          </motion.div>
        );

      case 'completed':
        return (
          <motion.div
            key="summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-8"
          >
            <SummaryCard
              summaryData={getSummaryData()}
              onRestart={restart}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isDark={isDark} toggleDark={toggleTheme} />
      <main className="min-h-[calc(100vh-80px)]">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
