
import React from 'react';
import { useUserProgress } from '../hooks/useUserProgress';
import { studyPlan } from '../data/content';
import ProgressChart from '../components/ProgressChart';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Award, BookCopy, RefreshCw } from 'lucide-react';

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
    <Card className="flex-1 min-w-[200px]">
        <CardContent className="flex items-center gap-4 p-4">
            <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 p-3 rounded-lg">
                {icon}
            </div>
            <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            </div>
        </CardContent>
    </Card>
);

const DashboardPage: React.FC = () => {
  const { progress, resetProgress } = useUserProgress();
  
  const totalLessons = studyPlan.reduce((acc, unit) => acc + unit.lessons.length, 0);
  const completedLessonsCount = progress.completedLessons.length;
  const overallProgress = totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0;
  
  const totalQuizzes = Object.keys(progress.quizScores).length;
  const averageScore = totalQuizzes > 0 ? Object.values(progress.quizScores).reduce((a: number, b: number) => a + b, 0) / totalQuizzes : 0;

  const handleReset = () => {
      if (window.confirm("هل أنت متأكد من أنك تريد إعادة تعيين كل تقدمك؟ لا يمكن التراجع عن هذا الإجراء.")) {
          resetProgress();
      }
  };
  
  return (
    <div className="space-y-8 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">لوحة التحكم</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <h2 className="text-xl font-bold">ملخص التقدم</h2>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap justify-around items-center gap-6">
                         <StatCard icon={<BookCopy size={24} />} label="الدروس المكتملة" value={`${completedLessonsCount} / ${totalLessons}`} />
                         <StatCard icon={<Award size={24} />} label="متوسط الاختبارات" value={`${Math.round(averageScore)}%`} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                 <CardHeader>
                    <h2 className="text-xl font-bold text-center">نسبة الإنجاز</h2>
                </CardHeader>
                <CardContent>
                    <ProgressChart percentage={overallProgress} />
                </CardContent>
            </Card>
        </div>

        <div>
            <h2 className="text-2xl font-bold mb-4">الإعدادات</h2>
            <Card>
                <CardContent className="flex justify-between items-center">
                    <div>
                        <h3 className="font-bold">إعادة تعيين التقدم</h3>
                        <p className="text-sm text-gray-500">سيؤدي هذا إلى مسح جميع الدروس المكتملة ودرجات الاختبارات.</p>
                    </div>
                    <Button variant="secondary" onClick={handleReset}>
                        <RefreshCw className="inline-block ml-2" size={16}/>
                        إعادة تعيين
                    </Button>
                </CardContent>
            </Card>
        </div>

    </div>
  );
};

export default DashboardPage;
