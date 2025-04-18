
import { useState, useEffect } from 'react';
import { ExternalLink, RefreshCcw } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  date: string;
}

const FinancialNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    
    // In a real application, this would be an API call to a financial news service
    // For demonstration, we're using mock data
    const mockNews: NewsItem[] = [
      {
        id: '1',
        title: 'Federal Reserve Holds Interest Rates Steady',
        source: 'Financial Times',
        url: '#',
        date: new Date().toLocaleDateString()
      },
      {
        id: '2',
        title: 'S&P 500 Reaches All-Time High on Tech Earnings',
        source: 'Wall Street Journal',
        url: '#',
        date: new Date().toLocaleDateString()
      },
      {
        id: '3',
        title: 'Bitcoin Surges Past $75,000 for First Time',
        source: 'Bloomberg',
        url: '#',
        date: new Date().toLocaleDateString()
      },
      {
        id: '4',
        title: 'Oil Prices Drop 5% on Higher Inventory Report',
        source: 'Reuters',
        url: '#',
        date: new Date().toLocaleDateString()
      },
    ];
    
    // Simulate API delay
    setTimeout(() => {
      setNews(mockNews);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">Financial News</h3>
        <button 
          onClick={fetchNews} 
          className="text-ziada-500 hover:text-ziada-600 transition-colors"
          aria-label="Refresh news"
        >
          <RefreshCcw size={16} />
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-52">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-ziada-500"></div>
        </div>
      ) : (
        <ul className="space-y-3">
          {news.map((item) => (
            <li key={item.id} className="border-b border-gray-100 pb-2 last:border-0">
              <a 
                href={item.url} 
                className="block hover:bg-gray-50 p-2 rounded transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500">{item.source}</span>
                      <span className="mx-1 text-gray-300">•</span>
                      <span className="text-xs text-gray-500">{item.date}</span>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-gray-400 flex-shrink-0 mt-1" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FinancialNews;
