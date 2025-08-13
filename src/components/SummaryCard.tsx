import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Target, 
  BookOpen, 
  RefreshCw, 
  TrendingUp,
  Star,
  Award,
  ExternalLink,
  Download
} from "lucide-react";
import { motion } from "framer-motion";

interface SummaryData {
  averageScore: number;
  totalQuestions: number;
  strengths: string[];
  improvementAreas: string[];
  recommendations: string[];
}

interface SummaryCardProps {
  summaryData: SummaryData;
  onRestart: () => void;
}

const SummaryCard = ({ summaryData, onRestart }: SummaryCardProps) => {
  const { averageScore, totalQuestions, strengths, improvementAreas, recommendations } = summaryData;
  
  const getOverallRating = (score: number) => {
    if (score >= 8.5) return { rating: "Outstanding", color: "text-success bg-success/20", icon: Trophy };
    if (score >= 7) return { rating: "Very Good", color: "text-primary bg-primary/20", icon: Award };
    if (score >= 5.5) return { rating: "Good", color: "text-warning bg-warning/20", icon: Star };
    return { rating: "Needs Practice", color: "text-destructive bg-destructive/20", icon: Target };
  };

  const overall = getOverallRating(averageScore);
  const OverallIcon = overall.icon;

  const learningResources = [
    { title: "STAR Method Guide", url: "https://www.indeed.com/career-advice/interviewing/how-to-use-the-star-method", description: "Master behavioral interview questions" },
    { title: "Technical Interview Prep", url: "https://leetcode.com/", description: "Practice coding challenges" },
    { title: "System Design Basics", url: "https://github.com/donnemartin/system-design-primer", description: "Learn system design concepts" },
    { title: "Interview Questions Database", url: "https://www.glassdoor.com/", description: "Company-specific questions" },
  ];

  const handleDownloadReport = () => {
    const reportData = {
      date: new Date().toLocaleDateString(),
      averageScore,
      totalQuestions,
      strengths,
      improvementAreas,
      recommendations
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `interview-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Overall Performance */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-card border-border/50 shadow-elevated text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <div className={`p-3 rounded-full ${overall.color}`}>
                <OverallIcon className="h-6 w-6" />
              </div>
              Interview Complete!
            </CardTitle>
            <CardDescription>Your overall performance summary</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-full ${overall.color} text-3xl font-bold`}>
                <Star className="h-8 w-8" />
                {averageScore.toFixed(1)}/10
              </div>
              <p className="text-xl font-semibold mt-3">{overall.rating}</p>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{totalQuestions}</p>
                <p className="text-sm text-muted-foreground">Questions Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {Math.round((averageScore / 10) * 100)}%
                </p>
                <p className="text-sm text-muted-foreground">Overall Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Key Strengths */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-card border-border/50 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <TrendingUp className="h-5 w-5" />
                Key Strengths
              </CardTitle>
              <CardDescription>Areas where you excelled</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {strengths.map((strength, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <Badge variant="secondary" className="bg-success/20 text-success">
                      ✓
                    </Badge>
                    <span className="text-sm">{strength}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Areas for Improvement */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-card border-border/50 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <Target className="h-5 w-5" />
                Focus Areas
              </CardTitle>
              <CardDescription>Skills to develop further</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {improvementAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <Badge variant="secondary" className="bg-warning/20 text-warning">
                      !
                    </Badge>
                    <span className="text-sm">{area}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <BookOpen className="h-5 w-5" />
              Personalized Recommendations
            </CardTitle>
            <CardDescription>Next steps for your interview preparation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg"
                >
                  <Badge variant="secondary" className="bg-primary/20 text-primary mt-1">
                    {index + 1}
                  </Badge>
                  <span className="text-sm flex-1">{rec}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Learning Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Learning Resources
            </CardTitle>
            <CardDescription>Curated resources to boost your interview skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {learningResources.map((resource, index) => (
                <motion.a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-background/50 rounded-lg border border-border/50 hover:border-primary/50 transition-all group"
                >
                  <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {resource.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {resource.description}
                  </p>
                </motion.a>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleDownloadReport}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onRestart}
            className="bg-gradient-primary hover:opacity-90 shadow-glow text-primary-foreground font-semibold flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Practice Again
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SummaryCard;