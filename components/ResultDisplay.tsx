
import React from 'react';
import { ResultState } from '../types';

interface ResultDisplayProps {
  result: ResultState;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (result.status === 'idle') {
    return null;
  }

  const getStatusColor = () => {
    switch (result.status) {
      case 'available':
        return 'text-green-400';
      case 'taken':
        return 'text-red-400';
      case 'error':
        return 'text-yellow-400';
      default:
        return 'text-white';
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  return (
    <div className="mt-8 w-full max-w-2xl text-center p-6 bg-gray-light rounded-lg shadow-lg animate-fade-in">
      <h2 className={`text-2xl md:text-3xl font-bold ${getStatusColor()}`}>
        {result.domain} is {result.status.toUpperCase()}!
      </h2>
      <p className="mt-2 text-gray-300">{result.message}</p>

      {result.status === 'taken' && result.whoisData && (
        <div className="mt-6 text-left border-t border-gray-lighter pt-4 space-y-2 text-sm text-gray-200">
          <h3 className="text-lg font-semibold text-white mb-3">WHOIS Information</h3>
          <p><strong>Created:</strong> {formatDate(result.whoisData.createdDate)}</p>
          <p><strong>Expires:</strong> {formatDate(result.whoisData.expiresDate)}</p>
          <p><strong>Last Updated:</strong> {formatDate(result.whoisData.updatedDate)}</p>
          <p><strong>Registrant:</strong> {result.whoisData.registrant?.name || 'N/A'} ({result.whoisData.registrant?.organization || 'N/A'})</p>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
