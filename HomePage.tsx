
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, BarChart, BookCheck } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <Card className="text-center">
    <CardContent className="flex flex-col items-center gap-4 pt-6">
      <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 p-4 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </CardContent>
  </Card>
);

const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in-up space-y-12">
      <section className="text-center py-16 px-4 bg-blue-50 dark:bg-gray-800/50 rounded-xl">
        <h1 className="text-4xl md:text-6xl font-black text-blue-600 dark:text-blue-400 mb-4 tracking-tighter">
          أتقن المحاسبة، خطوة بخطوة.
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
          منصة "محاسب محترف" هي بوابتك لتعلم المحاسبة من الصفر إلى الاحتراف بأسلوب تفاعلي ومبسط. ابدأ رحلتك اليوم!
        </p>
        <div className="flex justify-center items-center gap-4">
          <Link to="/lessons">
            <Button variant="primary" className="text-lg shadow-lg">
              <span>ابدأ التعلم الآن</span>
              <ArrowLeft className="inline-block mr-2" />
            </Button>
          </Link>
          <Link to="/dashboard">
             <Button variant="secondary" className="text-lg">
                لوحة التحكم
            </Button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">لماذا تختارنا؟</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Target size={32} />} 
            title="منهج متكامل" 
            description="خريطة طريق واضحة تأخذك من المبادئ الأساسية إلى التطبيقات المتقدمة والمعايير الدولية."
          />
          <FeatureCard 
            icon={<BookCheck size={32} />} 
            title="شرح مبسط" 
            description="نستخدم اللهجة المصرية وأمثلة من الواقع لتسهيل فهم أصعب المفاهيم المحاسبية."
          />
          <FeatureCard 
            icon={<BarChart size={32} />} 
            title="متابعة التقدم" 
            description="لوحة تحكم تفاعلية تعرض إنجازك وتحفزك على الاستمرار في رحلتك التعليمية."
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
