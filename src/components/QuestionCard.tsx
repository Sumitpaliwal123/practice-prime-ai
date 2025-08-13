import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ArrowRight, Clock, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

interface QuestionCardProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  onSubmitAnswer: (answer: string) => void;
  isLoading: boolean;
}

const QuestionCard = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onSubmitAnswer, 
  isLoading 
}: QuestionCardProps) => {
  const [answer, setAnswer] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmitAnswer(answer.trim());
      setAnswer("");
      setTimeElapsed(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeElapsed < 60) return "text-success";
    if (timeElapsed < 180) return "text-warning";
    return "text-destructive";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="bg-gradient-card border-border/50 shadow-elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Question {questionNumber} of {totalQuestions}
            </CardTitle>
            <div className={`flex items-center gap-2 text-sm ${getTimeColor()}`}>
              <Clock className="h-4 w-4" />
              {formatTime(timeElapsed)}
            </div>
          </div>
          <CardDescription>
            Take your time to think through your response. Quality over speed!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-background/50 rounded-lg border border-border/50"
            >
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                {question}
              </h3>
              
              <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                <Lightbulb className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  <strong>Pro tip:</strong> Structure your answer using the STAR method 
                  (Situation, Task, Action, Result) for behavioral questions, or break down 
                  your thought process for technical questions.
                </p>
              </div>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Textarea
                  placeholder="Type your answer here... Be specific and provide examples when possible."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="min-h-[200px] resize-none bg-background/50 border-border/50 focus:border-primary/50"
                  required
                />
                <p className="text-sm text-muted-foreground mt-2">
                  {answer.length} characters
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={!answer.trim() || isLoading}
                  className="w-full bg-gradient-primary hover:opacity-90 shadow-glow text-primary-foreground font-semibold py-4"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Analyzing Answer...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Submit Answer & Get Feedback
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuestionCard;