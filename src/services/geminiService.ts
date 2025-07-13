import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// The user must configure the API key in their environment.
// The app will not work without it.
const apiKey = process.env.API_KEY;
if (!apiKey) {
    // This is a fatal error for the application.
    // We render an error message in the UI instead of throwing.
    // See App.tsx.
}

const ai = new GoogleGenAI({ apiKey: apiKey || ' ' }); // a key must be provided

const model = "gemini-2.5-flash";

export const getAiAccountingAnswer = async (question: string): Promise<string> => {
  if(!apiKey) {
      return "خطأ: مفتاح API غير موجود. يرجى التأكد من تكوين متغير البيئة API_KEY.";
  }
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: `سؤالي في المحاسبة هو: ${question}`,
        config: {
            systemInstruction: `أنت خبير محاسبة دولي ومستشار مالي ذكي. مهمتك هي تقديم إجابات دقيقة، شاملة، ومبسطة على جميع الأسئلة المتعلقة بالمحاسبة. يجب أن تكون على دراية كاملة بجميع أنواع المحاسبة (المالية، الإدارية، التكاليف، الضريبية، الحكومية) والمعايير المحاسبية الدولية (IFRS) والأمريكية (GAAP). عند الإجابة، استخدم لهجة مصرية واضحة، وقدم أمثلة عملية لتوضيح النقاط المعقدة. كن دقيقًا في معلوماتك ومحدثًا بآخر التغييرات في المعايير. هدفك هو أن تكون المصدر الأكثر ثقة وموثوقية في مجال المحاسبة.`,
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "عفوًا، حدث خطأ أثناء محاولة الاتصال بالنموذج الذكي. قد تكون هناك مشكلة في الشبكة أو مفتاح API. الرجاء المحاولة مرة أخرى.";
  }
};
