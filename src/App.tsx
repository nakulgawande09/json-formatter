import React, { useState } from 'react';
import { Brackets, FileJson, FileCode, GitCompare } from 'lucide-react';
import JSONXMLFormatter from './components/JSONXMLFormatter';
import JSONXMLParser from './components/JSONXMLParser';
import JSONXMLDiff from './components/JSONXMLDiff';
import InteractiveConsole from './components/InteractiveConsole';

function App() {
  const [activeTab, setActiveTab] = useState('formatter');

  const tabs = [
    { id: 'formatter', label: 'Formatter', icon: Brackets },
    { id: 'parser', label: 'Parser', icon: FileJson },
    { id: 'diff', label: 'Diff Tool', icon: GitCompare },
    { id: 'console', label: 'Console', icon: FileCode },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">JSON/XML Tool</h1>
      </header>
      <nav className="bg-white shadow-md">
        <ul className="flex">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                className={`flex items-center px-4 py-2 ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="mr-2" size={18} />
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-grow p-4">
        {activeTab === 'formatter' && <JSONXMLFormatter />}
        {activeTab === 'parser' && <JSONXMLParser />}
        {activeTab === 'diff' && <JSONXMLDiff />}
        {activeTab === 'console' && <InteractiveConsole />}
      </main>
      <footer className="bg-gray-200 text-center p-2 text-sm text-gray-600">
        &copy; 2024 JSON/XML Tool. All rights reserved.
      </footer>
    </div>
  );
}

export default App;