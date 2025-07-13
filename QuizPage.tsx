
import React, { useState } from 'react';
import { quizzes, studyPlan } from '../data/content';
import { useUserProgress } from '../hooks/useUserProgress';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Check, X, ChevronsRight } from 'lucide-react';

const QuizPage: React.FC = () => {
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const { saveQuizScore } = useUserProgress();

  const quiz = quizzes.find(q => q.unitId === selectedUnitId);
  const question = quiz?.questions[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === question?.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    if (question && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    } else {
      // Quiz finished
      const finalPercentage = (score / quiz.questions.length) * 100;
      saveQuizScore(selectedUnitId, finalPercentage);
    }
  };
  
  const resetQuiz = (unitId: string) => {
    setSelectedUnitId(unitId);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedOption(null);
  };
  
  const isQuizFinished = quiz && currentQuestionIndex === quiz.questions.length - 1 && isAnswered;

  if (!selectedUnitId || !quiz) {
    return (
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold mb-6">اختر اختبارًا</h1>
        <div className="grid md:grid-cols-2 gap-4">
          {studyPlan.map(unit => (
            <Card key={unit.id} className="hover:border-blue-500 dark:hover:border-blue-500 border-2 border-transparent transition">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold">{unit.title}</h2>
                <p className="text-gray-500 mb-4">{quizzes.find(q => q.unitId === unit.id)?.questions.length || 0} أسئلة</p>
                <Button onClick={() => resetQuiz(unit.id)}>ابدأ الاختبار</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto animate-fade-in-up">
      <CardContent className="p-8">
        {isQuizFinished ? (
           <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">انتهى الاختبار!</h2>
            <p className="text-4xl font-bold mb-2">
              نتيجتك: {score} <span className="text-xl">من</span> {quiz.questions.length}
            </p>
            <p className="text-5xl font-bold text-blue-600 mb-8">{Math.round((score / quiz.questions.length) * 100)}%</p>
            <Button onClick={() => setSelectedUnitId(null)}>اختر اختبارًا آخر</Button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{studyPlan.find(u => u.id === selectedUnitId)?.title}</h2>
                <p className="text-lg font-mono">{currentQuestionIndex + 1} / {quiz.questions.length}</p>
            </div>
            <p className="text-2xl font-semibold mb-6">{question.question}</p>
            <div className="space-y-4">
              {question.options.map(option => {
                const isCorrect = option === question.correctAnswer;
                const isSelected = option === selectedOption;
                let optionClass = 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600';
                if (isAnswered && isCorrect) {
                  optionClass = 'bg-green-100 dark:bg-green-900 border-green-500 text-green-800 dark:text-green-200';
                } else if (isAnswered && isSelected && !isCorrect) {
                  optionClass = 'bg-red-100 dark:bg-red-900 border-red-500 text-red-800 dark:text-red-200';
                }
                
                return (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    disabled={isAnswered}
                    className={`w-full text-right p-4 rounded-lg border-2 transition-all duration-300 flex justify-between items-center ${optionClass}`}
                  >
                    <span>{option}</span>
                    {isAnswered && isCorrect && <Check />}
                    {isAnswered && isSelected && !isCorrect && <X />}
                  </button>
                );
              })}
            </div>
            {isAnswered && (
              <div className="mt-6 text-right">
                <Button onClick={handleNextQuestion}>
                  <span>{currentQuestionIndex < quiz.questions.length - 1 ? 'السؤال التالي' : 'عرض النتيجة'}</span>
                  <ChevronsRight className="inline-block mr-2" />
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizPage;
