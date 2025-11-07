import React, { useState, useCallback, useEffect } from 'react';
import { ApiResponse, ResultState } from './types';
import LoadingSpinner from './components/LoadingSpinner';
import ResultDisplay from './components/ResultDisplay';
import InfoPopup from './components/InfoPopup';

const API_BASE_URL = "https://www.whoisxmlapi.com/whoisserver/WhoisService";

const TLD_OPTIONS = ['.com', '.net', '.org', '.io', '.co', '.ai'];

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [domainName, setDomainName] = useState('');
  const [selectedTld, setSelectedTld] = useState(TLD_OPTIONS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResultState>({ status: 'idle', domain: '', message: '' });
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);


  useEffect(() => {
    const storedApiKey = localStorage.getItem('whoisApiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = e.target.value;
    setApiKey(newKey);
    localStorage.setItem('whoisApiKey', newKey);
  };


  const handleCheckAvailability = useCallback(async () => {
    if (!apiKey.trim()) {
      setResult({
        status: 'error',
        domain: '',
        message: 'Please enter your WhoisXML API key to proceed.',
      });
      return;
    }

    if (!domainName.trim()) {
      setResult({
        status: 'error',
        domain: '',
        message: 'Please enter a domain name to check.',
      });
      return;
    }
    
    const validDomainRegex = /^[a-zA-Z0-9-]+$/;
    if (!validDomainRegex.test(domainName.trim())) {
      setResult({
        status: 'error',
        domain: domainName.trim(),
        message: 'Domain name can only contain letters, numbers, and hyphens.',
      });
      return;
    }


    setIsLoading(true);
    setResult({ status: 'idle', domain: '', message: '' });

    const fullDomain = `${domainName.trim()}${selectedTld}`;
    const apiUrl = `${API_BASE_URL}?apiKey=${apiKey}&domainName=${fullDomain}&outputFormat=JSON`;

    try {
      const response = await fetch(apiUrl);
      const data: ApiResponse = await response.json();

      if ('ErrorMessage' in data) {
         setResult({
          status: 'error',
          domain: fullDomain,
          message: `API Error: ${data.ErrorMessage.msg}. This could be an invalid key or domain.`,
        });
      } else if (data.WhoisRecord && data.WhoisRecord.createdDate) {
        setResult({
          status: 'taken',
          domain: fullDomain,
          message: 'This domain is already registered. See details below.',
          whoisData: data.WhoisRecord,
        });
      } else {
        setResult({
          status: 'available',
          domain: fullDomain,
          message: 'Congratulations! This domain is available for registration.',
        });
      }
    } catch (error) {
      console.error("Failed to check domain availability:", error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown network error occurred.';
      setResult({
        status: 'error',
        domain: fullDomain,
        message: `Failed to fetch data. ${errorMessage}`,
      });
    } finally {
      setIsLoading(false);
    }
  }, [domainName, selectedTld, apiKey]);

  return (
    <>
    <div className="min-h-screen bg-transparent text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative">
       <button 
        onClick={() => setIsInfoPopupOpen(true)}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        aria-label="Show Information"
        >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      <div className="w-full max-w-3xl mx-auto text-center">
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Domain Availability <span className="text-brand-blue">Checker</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
            Instantly check if your desired domain name is available across popular TLDs.
          </p>
        </header>
        
        <main className="flex flex-col gap-8 items-center">
          <div className="w-full max-w-lg text-left">
            <label htmlFor="api-key-input" className="block text-sm font-medium text-gray-300 mb-2">
              WhoisXML API Key
            </label>
            <input
              id="api-key-input"
              type="password"
              value={apiKey}
              onChange={handleApiKeyChange}
              placeholder="Enter your API key here"
              className="w-full bg-gray-light text-white px-4 py-3 rounded-md border border-gray-lighter focus:ring-2 focus:ring-brand-blue focus:outline-none transition"
              aria-label="WhoisXML API Key"
            />
            <p className="text-xs text-gray-500 mt-1">Your key is stored securely in your browser's local storage.</p>
          </div>


          <div className="w-full flex flex-col sm:flex-row items-center gap-2 bg-gray-light p-2 rounded-lg shadow-lg">
            <input
              type="text"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value.toLowerCase())}
              placeholder="e.g., my-awesome-site"
              className="w-full sm:flex-1 bg-gray-dark text-white px-4 py-3 rounded-md border border-gray-lighter focus:ring-2 focus:ring-brand-blue focus:outline-none transition"
              aria-label="Domain Name"
            />
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <select
                  value={selectedTld}
                  onChange={(e) => setSelectedTld(e.target.value)}
                  className="w-full appearance-none bg-gray-dark text-white px-4 py-3 rounded-md border border-gray-lighter focus:ring-2 focus:ring-brand-blue focus:outline-none transition cursor-pointer"
                  aria-label="Top-Level Domain"
                >
                  {TLD_OPTIONS.map((tld) => (
                    <option key={tld} value={tld}>{tld}</option>
                  ))}
                </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              <button
                onClick={handleCheckAvailability}
                disabled={isLoading}
                className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-3 px-6 rounded-md flex items-center justify-center transition-all duration-300 disabled:bg-gray-lighter disabled:cursor-not-allowed"
              >
                {isLoading ? <LoadingSpinner /> : 'Check'}
              </button>
            </div>
          </div>

          {result.status !== 'idle' && <ResultDisplay result={result} />}
        </main>
      </div>

       <footer className="absolute bottom-4 text-gray-400 text-sm">
        Powered by <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="font-semibold text-gold hover:opacity-80 transition-opacity">HSINI MOHAMED</a>
      </footer>
    </div>
    <InfoPopup isOpen={isInfoPopupOpen} onClose={() => setIsInfoPopupOpen(false)} />
    </>
  );
};

export default App;