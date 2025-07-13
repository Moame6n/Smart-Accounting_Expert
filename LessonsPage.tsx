
import React, { useState } from 'react';
import { studyPlan } from '../data/content';
import { useUserProgress } from '../hooks/useUserProgress';
import { CheckCircle, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';

const LessonsPage: React.FC = () => {
  const { progress, completeLesson } = useUserProgress();
  const [openUnit, setOpenUnit] = useState<string | null>(studyPlan[0]?.id || null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  const toggleUnit = (unitId: string) => {
    setOpenUnit(prev => (prev === unitId ? null : unitId));
  };
  
  const isUnitUnlocked = (unitIndex: number) => {
    if (unitIndex === 0) return true; // First unit is always unlocked
    const prevUnit = studyPlan[unitIndex - 1];
    const completedInPrevUnit = prevUnit.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
    return completedInPrevUnit / prevUnit.lessons.length >= 0.5; // Unlock if 50% of previous unit is done
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
      <div className="md:col-span-1 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">خريطة الدراسة</h1>
        {studyPlan.map((unit, index) => {
          const isUnlocked = isUnitUnlocked(index);
          const unitProgress = (unit.lessons.filter(l => progress.completedLessons.includes(l.id)).length / unit.lessons.length) * 100;

          return (
            <div key={unit.id} className="rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow">
              <button
                onClick={() => isUnlocked && toggleUnit(unit.id)}
                disabled={!isUnlocked}
                className="w-full text-right p-4 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  {!isUnlocked && <Lock className="text-yellow-500" />}
                  <div>
                    <h2 className="text-lg font-bold">{unit.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{unit.description}</p>
                  </div>
                </div>
                {isUnlocked && (openUnit === unit.id ? <ChevronUp /> : <ChevronDown />)}
              </button>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5">
                <div className="bg-blue-600 h-1.5" style={{ width: `${unitProgress}%` }}></div>
              </div>
              {openUnit === unit.id && isUnlocked && (
                <ul className="p-4 space-y-2">
                  {unit.lessons.map(lesson => (
                    <li key={lesson.id}>
                      <button onClick={() => setSelectedLesson(lesson)} className="w-full text-right flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                        {progress.completedLessons.includes(lesson.id) ? (
                          <CheckCircle className="text-green-500 flex-shrink-0" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex-shrink-0" />
                        )}
                        <span>{lesson.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      <div className="md:col-span-2">
        {selectedLesson ? (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedLesson.title}</h2>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">{selectedLesson.content}</p>
              {!progress.completedLessons.includes(selectedLesson.id) && (
                 <button onClick={() => completeLesson(selectedLesson.id)} className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition">
                    <CheckCircle className="inline-block ml-2" />
                    إكمال الدرس
                </button>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="flex items-center justify-center h-full min-h-[300px]">
             <CardContent>
                <p className="text-xl text-gray-500">اختر درسًا من القائمة لبدء التعلم.</p>
             </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LessonsPage;
