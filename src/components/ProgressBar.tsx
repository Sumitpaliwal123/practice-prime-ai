import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  completedQuestions: number;
}

const ProgressBar = ({ currentStep, totalSteps, completedQuestions }: ProgressBarProps) => {
  const progressPercentage = (completedQuestions / totalSteps) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mb-8"
    >
      <div className="bg-gradient-card rounded-lg p-6 border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Interview Progress</h3>
          <span className="text-sm text-muted-foreground">
            {completedQuestions} of {totalSteps} questions completed
          </span>
        </div>
        
        <div className="space-y-4">
          <Progress 
            value={progressPercentage} 
            className="h-3 bg-secondary"
          />
          
          <div className="grid grid-cols-5 gap-2 md:grid-cols-10">
            {Array.from({ length: totalSteps }, (_, index) => {
              const isCompleted = index < completedQuestions;
              const isCurrent = index === currentStep - 1;
              
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ 
                    scale: isCurrent ? 1.1 : 1,
                    opacity: isCompleted || isCurrent ? 1 : 0.5
                  }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center justify-center p-2 rounded-lg transition-all ${
                    isCompleted 
                      ? 'bg-success/20 text-success' 
                      : isCurrent 
                      ? 'bg-primary/20 text-primary animate-pulse-glow' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                  <span className="ml-1 text-xs font-medium hidden sm:block">
                    {index + 1}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressBar;