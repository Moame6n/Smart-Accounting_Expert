import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Loader, BrainCircuit, User } from 'lucide-react';
import { getAiAccountingAnswer } from './services/geminiService';
import type { Message } from './types';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'أهلاً بك! أنا خبير المحاسبة الذكي. كيف يمكنني مساعدتك اليوم في عالم المحاسبة والمعايير الدولية؟'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, [isLoading]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    const aiResponseText = await getAiAccountingAnswer(currentInput);
    
    const aiMessage: Message = { sender: 'ai', text: aiResponseText };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 font-cairo">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
            <BrainCircuit className="text-blue-600 dark:text-blue-400" size={40} />
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">خبير المحاسبة الذكي</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">مدعوم بواسطة Gemini API</p>
            </div>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && <div className="p-2 bg-blue-600 rounded-full text-white flex-shrink-0"><Bot size={20} /></div>}
              
              <div className={`max-w-xl lg:max-w-2xl px-5 py-3 rounded-2xl shadow-sm ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'}`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              </div>

              {msg.sender === 'user' && <div className="p-2 bg-gray-200 dark:bg-gray-600 rounded-full text-gray-700 dark:text-gray-200 flex-shrink-0"><User size={20} /></div>}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
               <div className="p-2 bg-blue-600 rounded-full text-white flex-shrink-0"><Bot size={20} /></div>
              <div className="max-w-md lg:max-w-lg px-5 py-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Loader className="animate-spin" size={20} />
                  <span>يقوم الخبير بالبحث عن إجابة...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 border-t border-gray-200 dark:border-gray-700 sticky bottom-0">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="اسأل عن أي شيء في المحاسبة..."
            disabled={isLoading}
            className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-70"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="إرسال"
          >
            <Send size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
