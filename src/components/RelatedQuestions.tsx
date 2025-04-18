
import { MessageSquare } from 'lucide-react';

interface RelatedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

const RelatedQuestions = ({ questions, onQuestionClick }: RelatedQuestionsProps) => {
  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 h-full">
      <h3 className="font-semibold text-gray-900 mb-4">Related Questions</h3>
      <ul className="space-y-2">
        {questions.map((question, index) => (
          <li key={index}>
            <button
              className="w-full text-left px-3 py-2 rounded-lg border border-gray-100 hover:bg-gray-50 text-sm text-gray-700 transition-colors flex items-start"
              onClick={() => onQuestionClick(question)}
            >
              <MessageSquare size={14} className="text-ziada-400 mr-2 mt-0.5 flex-shrink-0" />
              <span>{question}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedQuestions;
