import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface JobDescriptionFormProps {
  onStartInterview: (jobDescription: string) => void;
  isLoading: boolean;
}

const JobDescriptionForm = ({ onStartInterview, isLoading }: JobDescriptionFormProps) => {
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobDescription.trim()) {
      onStartInterview(jobDescription.trim());
    }
  };

  const sampleJD = `We are looking for a Senior Frontend Developer with 3+ years of experience in React, TypeScript, and modern web technologies. The ideal candidate should have experience with state management, responsive design, and working in agile environments.

Responsibilities:
- Develop and maintain user-facing features
- Collaborate with designers and backend developers
- Optimize applications for maximum speed and scalability
- Participate in code reviews and mentoring junior developers

Requirements:
- Strong proficiency in React and TypeScript
- Experience with CSS frameworks (Tailwind CSS preferred)
- Knowledge of version control (Git)
- Excellent problem-solving skills`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-block p-4 rounded-full bg-gradient-primary shadow-glow mb-4"
        >
          <FileText className="h-8 w-8 text-primary-foreground" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
          AI Interview Coach
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transform your interview preparation with AI-powered coaching. 
          Get personalized questions and detailed feedback to ace your next interview.
        </p>
      </div>

      <Card className="bg-gradient-card border-border/50 shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Start Your Interview Preparation
          </CardTitle>
          <CardDescription>
            Paste the job description below to generate tailored interview questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Textarea
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[200px] resize-none bg-background/50 border-border/50 focus:border-primary/50"
                required
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-muted-foreground">
                  {jobDescription.length} characters
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setJobDescription(sampleJD)}
                  className="text-primary hover:text-primary/80"
                >
                  Use sample JD
                </Button>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={!jobDescription.trim() || isLoading}
                className="w-full bg-gradient-primary hover:opacity-90 shadow-glow text-primary-foreground font-semibold py-6 text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating Questions...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Start Interview Preparation
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JobDescriptionForm;