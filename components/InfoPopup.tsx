import React, { useState, Fragment } from 'react';

interface InfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'About' | 'Contact' | 'Guide' | 'Privacy Policy' | 'Terms of Service' | 'DMCA';

const InfoPopup: React.FC<InfoPopupProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('About');
  const tabs: Tab[] = ['About', 'Contact', 'Guide', 'Privacy Policy', 'Terms of Service', 'DMCA'];

  if (!isOpen) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'About':
        return (
          <>
            <h3 className="text-xl font-bold mb-2 text-brand-blue">About doodax.com</h3>
            <p>doodax.com provides a free, fast, and user-friendly Domain Availability Checker. Our mission is to help innovators, entrepreneurs, and creators find the perfect domain name for their next big idea instantly. We leverage the powerful WhoisXML API to provide real-time, accurate WHOIS data.</p>
          </>
        );
      case 'Contact':
        return (
          <>
            <h3 className="text-xl font-bold mb-2 text-brand-blue">Contact Us</h3>
            <p>Have questions, feedback, or need support? We'd love to hear from you. Please reach out to our team via email, and we will get back to you as soon as possible.</p>
            <p className="mt-4"><strong>Email:</strong> <a href="mailto:hsini.web@gmail.com" className="text-brand-blue hover:underline">hsini.web@gmail.com</a></p>
          </>
        );
      case 'Guide':
        return (
          <>
            <h3 className="text-xl font-bold mb-2 text-brand-blue">How to Use the Checker</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Get a Key:</strong> First, you need an API key from <a href="https://www.whoisxmlapi.com/" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">WhoisXML API</a>. They offer a free tier to get you started.</li>
              <li><strong>Enter Your Key:</strong> Paste your API key into the designated input field. Your key is saved securely in your browser's local storage for convenience.</li>
              <li><strong>Enter Domain:</strong> Type the domain name you wish to check (without the .com, .net, etc.) into the main input field.</li>
              <li><strong>Select TLD:</strong> Choose your desired Top-Level Domain (e.g., .com) from the dropdown.</li>
              <li><strong>Check Availability:</strong> Click the "Check" button and get instant results!</li>
            </ol>
          </>
        );
      case 'Privacy Policy':
        return (
          <>
            <h3 className="text-xl font-bold mb-2 text-brand-blue">Privacy Policy</h3>
            <p>At doodax.com, we respect your privacy. We do not store any personal information or domain searches on our servers. Your API key is stored locally in your browser and is only used to communicate with the WhoisXML API. For more details, please contact us at <a href="mailto:hsini.web@gmail.com" className="text-brand-blue hover:underline">hsini.web@gmail.com</a>.</p>
          </>
        );
      case 'Terms of Service':
        return (
            <>
              <h3 className="text-xl font-bold mb-2 text-brand-blue">Terms of Service</h3>
              <p>By using the doodax.com Domain Availability Checker, you agree to comply with our terms of service. This service is provided "as is" without any warranty. You are responsible for abiding by the terms of service of the third-party API provider (WhoisXML API). We are not liable for any inaccuracies in the data provided or for any damages arising from the use of this service.</p>
            </>
        );
      case 'DMCA':
        return (
            <>
              <h3 className="text-xl font-bold mb-2 text-brand-blue">DMCA Policy</h3>
              <p>doodax.com respects the intellectual property rights of others. This tool only queries publicly available domain registration data. If you believe any content on our site infringes on your copyright, please contact us with a valid DMCA takedown notice at <a href="mailto:hsini.web@gmail.com" className="text-brand-blue hover:underline">hsini.web@gmail.com</a>.</p>
            </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gray-light w-full max-w-4xl max-h-[90vh] rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/4 bg-gray-dark p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-lighter">
          <h2 className="text-2xl font-bold mb-6 text-white">Information</h2>
          <nav className="flex flex-row md:flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                  activeTab === tab ? 'bg-brand-blue text-white font-semibold' : 'text-gray-300 hover:bg-gray-lighter'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="w-full md:w-3/4 p-6 md:p-8 overflow-y-auto text-gray-300 relative">
           <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
           >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
           </button>
          <div className="prose prose-invert max-w-none">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPopup;
