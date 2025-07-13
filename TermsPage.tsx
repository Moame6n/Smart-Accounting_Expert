
import React, { useState, useMemo } from 'react';
import { accountingTerms } from '../data/content';
import { Search } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';

const TermsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = useMemo(() => {
    if (!searchTerm) {
      return accountingTerms;
    }
    return accountingTerms.filter(t =>
      t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">قاموس المصطلحات المحاسبية</h1>
      
      <div className="relative">
        <input
          type="text"
          placeholder="ابحث عن مصطلح..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full p-4 pr-12 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTerms.length > 0 ? (
          filteredTerms.map(term => (
            <Card key={term.id}>
              <img src={term.image} alt={term.term} className="w-full h-40 object-cover" />
              <CardContent className="p-4">
                <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">{term.term}</h2>
                <p className="text-gray-700 dark:text-gray-300">{term.definition}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="md:col-span-2 lg:col-span-3 text-center text-xl text-gray-500 py-10">
            لم يتم العثور على مصطلحات تطابق بحثك.
          </p>
        )}
      </div>
    </div>
  );
};

export default TermsPage;
