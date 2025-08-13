import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  ArrowRight, 
  Star,
  CheckCircle2,
  AlertCircle,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";

interface FeedbackCardProps {
  feedback: {
    score: number;
    strengths: string[];
    weaknesses: string[];
    improvements: string[];
  };
  question: string;
  answer: string;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

const FeedbackCard = ({ 
  feedback, 
  question, 
  answer, 
  onNextQuestion, 
  isLastQuestion 
}: FeedbackCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-success bg-success/20";
    if (score >= 6) return "text-warning bg-warning/20";
    return "text-destructive bg-destructive/20";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 8) return <CheckCircle2 className="h-5 w-5" />;
    if (score >= 6) return <AlertCircle className="h-5 w-5" />;
    return <Target className="h-5 w-5" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Score Card */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-card border-border/50 shadow-elevated">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <div className={`p-3 rounded-full ${getScoreColor(feedback.score)}`}>
                {getScoreIcon(feedback.score)}
              </div>
              Answer Evaluation
            </CardTitle>
            <CardDescription>Your performance analysis</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="mb-4"
            >
              <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${getScoreColor(feedback.score)} text-2xl font-bold`}>
                <Star className="h-6 w-6" />
                {feedback.score}/10
              </div>
            </motion.div>
            <p className="text-muted-foreground">
              {feedback.score >= 8 ? "Excellent response!" : 
               feedback.score >= 6 ? "Good response with room for improvement" : 
               "Needs improvement - keep practicing!"}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Feedback */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-card border-border/50 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <TrendingUp className="h-5 w-5" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feedback.strengths.map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weaknesses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-card border-border/50 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <TrendingDown className="h-5 w-5" />
                Areas to Work On
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feedback.weaknesses.map((weakness, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{weakness}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Improvements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-card border-border/50 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Lightbulb className="h-5 w-5" />
                How to Improve
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feedback.improvements.map((improvement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{improvement}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Question & Answer Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Review</CardTitle>
            <CardDescription>Question and your response</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
              <h4 className="font-semibold mb-2">Question:</h4>
              <p className="text-sm">{question}</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg border-l-4 border-secondary">
              <h4 className="font-semibold mb-2">Your Answer:</h4>
              <p className="text-sm whitespace-pre-wrap">{answer}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Next Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={onNextQuestion}
            className="bg-gradient-primary hover:opacity-90 shadow-glow text-primary-foreground font-semibold py-4 px-8"
          >
            {isLastQuestion ? (
              <div className="flex items-center gap-2">
                View Final Results
                <Star className="h-4 w-4" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Next Question
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackCard;