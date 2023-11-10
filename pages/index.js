
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching advice:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-10">
        Automated Financial Advisor
      </h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter your financial query"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">
          Get Advice
        </button>
      </form>
      {response && <div className="mt-4 p-4 border">{response}</div>}
    </div>
  );
}
